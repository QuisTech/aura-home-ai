import asyncio
import os
import glob
import subprocess
import shutil
# pyrefly: ignore [missing-import]
from playwright.async_api import async_playwright

# 1. Narrator voiceover text
VOICEOVER_TEXT = (
    "Welcome to Aura Home AI, the world's first truly autonomous home orchestration engine. "
    "We are currently living in a cognitive crisis where our digital lives are fragmented and our homes are unmanaged enterprises of hidden costs and security gaps. "
    "Aura is the solution. We begin with inspiration. "
    "Our Zen discovery sequence, which you see here, is designed to create a sanctuary of focus, calming the mind before the technology even begins to reason. "
    "Aura is architected around the seven pillars of autonomy. "
    "This isn't just a collection of smart devices. It's a higher performance multi-agent node. "
    "Under the system, our home's resources, finances, and security layers are unified under a single cognitive framework. "
    "The logic is elegant and robust. We continuously sense, reason, persist, and resolve, transforming chaotic sensory noise into clean, automated action. "
    "Let's step into the command console, the cockpit of your digital life. "
    "Here, the complexity of seven specialized agents is translated into actionable consumer value. "
    "Notice the live logs Aura is sensing, reasoning, and resolving in the background without a single human click. "
    "This is the definition of agentic autonomy. "
    "Let's look at each of the seven active nodes in our sidebar orchestration matrix. "
    "First, our finance sentinel autonomously audits household expenditures in real time. "
    "It continuously scans bank statements and utility invoices to identify redundant subscription creep. "
    "The Sentinel has already resolved 12 distinct financial leaks, saving the household hundreds of dollars automatically. "
    "Second, our guardian protocol manages home security and smart locks, monitoring entry points to ensure perimeter safety and arming the home when residents leave. "
    "Third, the pantry architect tracks kitchen stock and automates grocery purchases. "
    "If a price spike is detected on common items, it compares local market indices and reroutes orders to optimize food budgets. "
    "Fourth, the energy optimizer coordinates smart thermostats and solar grids, shifting HVAC load cycles during peak use periods to reduce carbon footprints by 25%. "
    "Fifth, the wellness adviser manages indoor air quality, humidity levels, and ambient lighting protocols to foster a healthy, stress-free living environment. "
    "Sixth, the vision adviser processes CCTV feeds using Gemini multimodal vision. "
    "It classifies courier deliveries and threat levels with 98% match accuracy, committing visual logs via the model context protocol. "
    "Finally, our timeline coordinator unifies scheduling and triggers critical audit sequences. "
    "When executing a deep dive audit, the engine reasons across all nodes, cancels leaks, resolves billing overcharges, and commits immutable receipts to our secure vault."
)

# 2. Virtual cursor CSS/JS to inject on page load
CURSOR_INJECT_JS = """
const cursor = document.createElement('div');
cursor.id = 'virtual-cursor';
cursor.style.position = 'fixed';
cursor.style.width = '14px';
cursor.style.height = '14px';
cursor.style.background = '#00FFFF';
cursor.style.borderRadius = '50%';
cursor.style.border = '2px solid #ffffff';
cursor.style.boxShadow = '0 0 10px #00FFFF, 0 0 20px #00FFFF';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '99999';
cursor.style.transform = 'translate(-50%, -50%)';
cursor.style.transition = 'width 0.1s, height 0.1s, background-color 0.1s';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.width = '8px';
  cursor.style.height = '8px';
  cursor.style.backgroundColor = '#f59e0b'; // amber-500
  cursor.style.boxShadow = '0 0 8px #f59e0b, 0 0 15px #f59e0b';
});

document.addEventListener('mouseup', () => {
  cursor.style.width = '14px';
  cursor.style.height = '14px';
  cursor.style.backgroundColor = '#00FFFF';
  cursor.style.boxShadow = '0 0 10px #00FFFF, 0 0 20px #00FFFF';
});
"""

# Mouse coordinate state tracking
current_mouse_x = 640
current_mouse_y = 360

async def smooth_move_to(page, selector):
    global current_mouse_x, current_mouse_y
    locator = page.locator(selector).first
    box = await locator.bounding_box()
    if not box:
        print(f"Warning: Selector '{selector}' bounding box not found.")
        return
    
    target_x = box["x"] + box["width"] / 2
    target_y = box["y"] + box["height"] / 2
    
    steps = 22
    for i in range(1, steps + 1):
        t = i / steps
        t_smooth = t * t * (3 - 2 * t)
        x = current_mouse_x + (target_x - current_mouse_x) * t_smooth
        y = current_mouse_y + (target_y - current_mouse_y) * t_smooth
        await page.mouse.move(x, y)
        await asyncio.sleep(0.01)
        
    current_mouse_x = target_x
    current_mouse_y = target_y
    await asyncio.sleep(0.12)

async def smooth_click(page, selector):
    await smooth_move_to(page, selector)
    await page.mouse.down()
    await asyncio.sleep(0.08)
    await page.mouse.up()
    await asyncio.sleep(0.2)

async def smooth_scroll_to(page, target_percent):
    current_y = await page.evaluate("window.scrollY")
    max_scroll = await page.evaluate("document.documentElement.scrollHeight - window.innerHeight")
    target_y = int(target_percent * max_scroll)
    
    step = 8 if target_y > current_y else -8
    if step == 0:
        return
    steps_count = int(abs(target_y - current_y) / abs(step))
    
    print(f"Scrolling smoothly to {int(target_percent * 100)}% depth...")
    for _ in range(steps_count):
        current_y += step
        await page.evaluate(f"window.scrollTo(0, {current_y})")
        await asyncio.sleep(0.008) # smooth high framerate scroll wait
        
    await page.evaluate(f"window.scrollTo(0, {target_y})")
    await asyncio.sleep(0.6) # allow visual layout elements to settle

def generate_voiceover(text, output_file):
    print(f"1. Synthesizing voiceover narration with edge-tts...")
    if os.path.exists(output_file):
        os.remove(output_file)
    cmd = [
        "edge-tts",
        "--voice", "en-US-AvaNeural",
        "--text", text,
        "--write-media", output_file
    ]
    subprocess.run(cmd, check=True)
    print(f"   [SUCCESS] Narration audio saved to {output_file}")

async def record_walkthrough(url, temp_dir):
    print("2. Starting Playwright video recording...")
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    os.makedirs(temp_dir)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 720},
            record_video_dir=temp_dir,
            record_video_size={"width": 1280, "height": 720}
        )
        
        page = await context.new_page()
        print(f"   Opening page: {url}")
        
        await page.add_init_script(CURSOR_INJECT_JS)
        await page.goto(url, wait_until="networkidle")
        
        # --- SCENE 1: Landing Page Hero ---
        # "Welcome to Aura Home AI..."
        print("   - Scene 1: Landing Page Hero")
        await page.wait_for_timeout(18000) 
        
        # --- SCENE 2: Zen Discovery Sequence ---
        # "Our Zen discovery sequence..."
        print("   - Scene 2: Zen Discovery Fold")
        await smooth_scroll_to(page, 0.25) # Scroll down to pipeline section
        await page.wait_for_timeout(15000)
        
        # --- SCENE 3: Seven Pillars of Autonomy ---
        # "Aura is architected around the seven pillars..."
        print("   - Scene 3: Seven Pillars Fold")
        await smooth_scroll_to(page, 0.55) # Scroll down to Aura Seven section
        await page.wait_for_timeout(20000)
        
        # --- SCENE 4: Navigate to Command Console ---
        # "Let's step into the command console..."
        print("   - Scene 4: Transition to Command Console")
        await smooth_scroll_to(page, 0.0) # Scroll to top
        await smooth_click(page, "nav a[href='/command']")
        await page.wait_for_timeout(8000) # Give time for route and load
        
        # --- SCENE 5: Command Console Observation ---
        # "Here, the complexity of seven specialized agents is translated..."
        print("   - Scene 5: Command Console Observation")
        await page.wait_for_timeout(15000)
        
        # --- SCENE 6: The 7 Active Nodes ---
        print("   - Scene 6: Agent Navigation")
        # 1. Finance Sentinel
        await smooth_click(page, "#agent-card-fin")
        await page.wait_for_timeout(15000)
        
        # 2. Guardian Protocol
        await smooth_click(page, "#agent-card-grd")
        await page.wait_for_timeout(10000)
        
        # 3. Pantry Architect
        await smooth_click(page, "#agent-card-pntry")
        await page.wait_for_timeout(12000)
        
        # 4. Energy Optimizer
        await smooth_click(page, "#agent-card-nrgy")
        await page.wait_for_timeout(12000)
        
        # 5. Wellness Advisor
        await smooth_click(page, "#agent-card-wlns")
        await page.wait_for_timeout(12000)
        
        # 6. Vision Advisor
        await smooth_click(page, "#agent-card-vis")
        await page.wait_for_timeout(12000)
        
        # 7. Timeline Coordinator
        await smooth_click(page, "#agent-card-time")
        await page.wait_for_timeout(10000)
        
        # --- SCENE 7: Deep Dive Audit ---
        print("   - Scene 7: Deep Dive Audit")
        await smooth_click(page, "#trigger-audit-btn")
        
        # Wait for the 11-step terminal sequence to complete
        await page.wait_for_timeout(25000) # Extended to ensure video outlasts audio stream for safe ffmpeg trim
        
        await page.close()
        await context.close()
        await browser.close()
    print("   [SUCCESS] Playwright video recording completed.")

def compile_final_video(temp_dir, narration_audio, final_output):
    print("3. Compiling final video with FFmpeg...")
    webm_files = glob.glob(os.path.join(temp_dir, "*.webm"))
    if not webm_files:
        raise FileNotFoundError("Could not find the recorded Playwright video file.")
    
    recorded_webm = webm_files[0]
    
    if os.path.exists(final_output):
        os.remove(final_output)
        
    cmd = [
        "C:\\Users\\Administrator\\Downloads\\ffmpeg\\bin\\ffmpeg.exe",
        "-y",
        "-i", recorded_webm,
        "-i", narration_audio,
        "-map", "0:v",
        "-map", "1:a",
        "-vf", "scale=1920:1080",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-shortest",
        final_output
    ]
    
    subprocess.run(cmd, check=True)
    print(f"   [SUCCESS] Final presentation compiled: {final_output}")

def main():
    narration_audio = "narration.mp3"
    temp_video_dir = "video_temp"
    final_output = "aura_home_ai_demo.mp4"
    target_url = "https://aura-home-ai-eight.vercel.app"
    
    try:
        generate_voiceover(VOICEOVER_TEXT, narration_audio)
        
        # Ensure the server is running locally first!
        asyncio.run(record_walkthrough(target_url, temp_video_dir))
        
        compile_final_video(temp_video_dir, narration_audio, final_output)
        
        if os.path.exists(temp_video_dir):
            shutil.rmtree(temp_video_dir)
        if os.path.exists(narration_audio):
            os.remove(narration_audio)
            
        print(f"\\n=======================================================")
        print(f"AURA HOME AI DEMO VIDEO COMPILATION COMPLETE!")
        print(f"File created: {os.path.abspath(final_output)}")
        print(f"=======================================================")
        
    except Exception as e:
        print(f"\\n[ERROR] Video generation failed: {e}")

if __name__ == "__main__":
    main()
