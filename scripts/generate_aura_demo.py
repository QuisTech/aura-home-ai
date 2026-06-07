import asyncio
import os
import glob
import subprocess
import shutil
import math
# pyrefly: ignore [missing-import]
from playwright.async_api import async_playwright

# 1. Narrator voiceover text - Crisp, Snappy, Fast, and Purposeful
VOICEOVER_TEXT = (
    "Welcome to Aura Home AI. Instead of a standard smart home, we've built a multi-agent orchestration node. "
    "We begin with the Zen discovery sequence, an elegant design that calms the mind before the technology reasons. "
    "Aura operates on seven pillars of autonomy, continuously sensing, reasoning, persisting, and resolving. "
    "Let's step into the command console—the cockpit of your digital life. "
    "Here, seven specialized agents translate complex data into actionable consumer value. "
    "Notice the autonomous logic trace resolving issues in the background without a single human click. "
    "Let's review the active nodes. "
    "The Finance Sentinel audits household expenditures, resolving subscription leaks automatically. "
    "The Guardian Protocol secures your perimeter and manages smart locks. "
    "The Pantry Architect reroutes grocery orders to optimize budgets. "
    "The Energy Optimizer sheds HVAC loads during peak hours, reducing your carbon footprint. "
    "The Wellness Adviser manages air quality and lighting for a healthy environment. "
    "The Vision Adviser processes CCTV feeds with Gemini multimodal vision to classify threats. "
    "Finally, the Timeline Coordinator unifies scheduling and triggers critical audit sweeps. "
    "Let's execute a deep dive audit. "
    "Watch as Aura simultaneously secures the perimeter, adjusts the HVAC, and cancels unused subscriptions, committing immutable receipts to our secure MongoDB vault. "
    "Aura Home AI. Total autonomy, finally realized."
)

# 2. Virtual cursor CSS/JS
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

function initCursor() {
  if (!document.getElementById('virtual-cursor')) {
    document.body.appendChild(cursor);
  }
}
if (document.body) {
  initCursor();
} else {
  document.addEventListener('DOMContentLoaded', initCursor);
}

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.width = '8px';
  cursor.style.height = '8px';
  cursor.style.backgroundColor = '#f59e0b';
  cursor.style.boxShadow = '0 0 8px #f59e0b, 0 0 15px #f59e0b';
});

document.addEventListener('mouseup', () => {
  cursor.style.width = '14px';
  cursor.style.height = '14px';
  cursor.style.backgroundColor = '#00FFFF';
  cursor.style.boxShadow = '0 0 10px #00FFFF, 0 0 20px #00FFFF';
});
"""

current_mouse_x = 640
current_mouse_y = 360

async def smooth_move_to(page, selector, offset_x=0, offset_y=0):
    global current_mouse_x, current_mouse_y
    locator = page.locator(selector).first
    box = await locator.bounding_box()
    if not box:
        print(f"Warning: Selector '{selector}' bounding box not found.")
        return
    
    target_x = box["x"] + box["width"] / 2 + offset_x
    target_y = box["y"] + box["height"] / 2 + offset_y
    
    steps = 15
    for i in range(1, steps + 1):
        t = i / steps
        t_smooth = t * t * (3 - 2 * t)
        x = current_mouse_x + (target_x - current_mouse_x) * t_smooth
        y = current_mouse_y + (target_y - current_mouse_y) * t_smooth
        await page.mouse.move(x, y)
        await asyncio.sleep(0.01)
        
    current_mouse_x = target_x
    current_mouse_y = target_y
    await asyncio.sleep(0.05)

async def smooth_click(page, selector):
    await smooth_move_to(page, selector)
    await page.mouse.down()
    await asyncio.sleep(0.04)
    await page.mouse.up()
    await asyncio.sleep(0.1)

async def smooth_scroll_to(page, target_percent):
    current_y = await page.evaluate("window.scrollY")
    max_scroll = await page.evaluate("document.documentElement.scrollHeight - window.innerHeight")
    target_y = int(target_percent * max_scroll)
    
    step = 25 if target_y > current_y else -25
    if step == 0:
        return
    steps_count = int(abs(target_y - current_y) / abs(step))
    
    for _ in range(steps_count):
        current_y += step
        await page.evaluate(f"window.scrollTo(0, {current_y})")
        await asyncio.sleep(0.005) 
        
    await page.evaluate(f"window.scrollTo(0, {target_y})")
    await asyncio.sleep(0.3)

async def random_hover(page, x_center, y_center, radius=30, duration=1.0):
    global current_mouse_x, current_mouse_y
    steps = int(duration * 30)  
    for i in range(steps):
        t = i / steps
        angle = t * math.pi * 4
        current_x = x_center + math.sin(angle) * radius * math.sin(t * math.pi)
        current_y = y_center + math.cos(angle) * radius * math.cos(t * math.pi)
        await page.mouse.move(current_x, current_y)
        current_mouse_x = current_x
        current_mouse_y = current_y
        await asyncio.sleep(1/30)

async def smooth_scroll_element(page, selector, target_percent):
    await page.evaluate(f"""
        const el = document.querySelector("{selector}");
        if (el) {{
            const maxScroll = el.scrollHeight - el.clientHeight;
            const targetY = maxScroll * {target_percent};
            el.scrollTo({{top: targetY, behavior: 'smooth'}});
        }}
    """)
    await asyncio.sleep(0.8)

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
            device_scale_factor=1.0, # Removed zoom so the whole dashboard is visible
            record_video_dir=temp_dir,
            record_video_size={"width": 1280, "height": 720}
        )
        
        page = await context.new_page()
        print(f"   Opening page: {url}")
        
        await page.add_init_script(CURSOR_INJECT_JS)
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        # --- SCENE 1: Landing Page (Fast & Purposeful) ---
        print("   - Scene 1: Landing Page")
        # Welcome
        await random_hover(page, 640, 360, radius=30, duration=4.0)
        
        # Zen sequence
        await smooth_scroll_to(page, 0.25)
        await smooth_move_to(page, "text='01. SENSE'")
        await random_hover(page, 200, 500, radius=10, duration=1.0)
        await smooth_move_to(page, "text='04. RESOLVE'")
        await random_hover(page, 1000, 500, radius=10, duration=1.0)
        
        # Seven Pillars
        await smooth_scroll_to(page, 0.55)
        await smooth_move_to(page, "text='Finance Sentinel'")
        await random_hover(page, 300, 300, radius=10, duration=1.0)
        await smooth_move_to(page, "text='Sovereign Vault'")
        await random_hover(page, 1000, 600, radius=15, duration=1.5)
        
        # Launch Console
        await smooth_scroll_to(page, 0.0)
        await smooth_click(page, "a:has-text('Launch Console')")
        await page.wait_for_timeout(2500)
        
        # --- SCENE 2: Command Console Deep Tour ---
        print("   - Scene 2: Command Console")
        # Pan around top stats to show layout
        await smooth_move_to(page, "#finance-sentinel-card")
        await smooth_move_to(page, "#energy-optimizer-card")
        
        # Notice the autonomous logic trace...
        await smooth_scroll_to(page, 0.8) # Scroll down to reveal the Logic Trace!
        await smooth_move_to(page, "#logic-trace")
        await random_hover(page, 600, 600, radius=40, duration=4.0)
        
        # "Let's review the active nodes..."
        await smooth_scroll_to(page, 0.35) # Scroll back up slightly to perfectly frame the Agent Diagnostics card in the center
        await page.wait_for_timeout(1000)
        
        # Agent Iteration: Actively click the sidebar, then pan back to the center content to show the changes!
        print("   - Scene 3: Agent Navigation")
        
        # 1. Finance Sentinel (6s)
        await smooth_click(page, "#agent-card-fin")
        await smooth_move_to(page, "#vision-advisor-card")
        await random_hover(page, 500, 400, radius=20, duration=3.0)
        
        # 2. Guardian Protocol (4s)
        await smooth_click(page, "#agent-card-grd")
        await smooth_move_to(page, "#vision-advisor-card")
        await random_hover(page, 500, 400, radius=20, duration=2.0)
        
        # 3. Pantry Architect (4s)
        await smooth_click(page, "#agent-card-pntry")
        await smooth_move_to(page, "#vision-advisor-card")
        await random_hover(page, 500, 400, radius=20, duration=2.0)
        
        # 4. Energy Optimizer (6s)
        await smooth_click(page, "#agent-card-nrgy")
        await smooth_move_to(page, "#vision-advisor-card")
        await random_hover(page, 500, 400, radius=20, duration=4.0)
        
        # Scroll the autonomous engine sidebar to reveal the remaining agents
        await smooth_scroll_element(page, ".custom-scrollbar", 1.0)
        
        # 5. Wellness Advisor (5s)
        await smooth_click(page, "#agent-card-wlns")
        await smooth_move_to(page, "#vision-advisor-card")
        await random_hover(page, 500, 400, radius=20, duration=3.0)
        
        # 6. Vision Advisor (6s)
        await smooth_click(page, "#agent-card-vis")
        await smooth_move_to(page, "#vision-advisor-card")
        await random_hover(page, 500, 400, radius=20, duration=4.0)
        
        # 7. Timeline Coordinator (5s)
        await smooth_click(page, "#agent-card-time")
        await smooth_move_to(page, "#vision-advisor-card")
        await random_hover(page, 500, 400, radius=20, duration=3.0)
        
        # --- SCENE 4: Deep Dive Audit ---
        print("   - Scene 4: Deep Dive Audit")
        await smooth_click(page, "#trigger-audit-btn")
        
        # Scroll to the bottom to watch the massive trace print out
        await smooth_scroll_to(page, 1.0)
        await smooth_move_to(page, "#logic-trace")
        await random_hover(page, 600, 650, radius=30, duration=15.0)
        await page.wait_for_timeout(3000)
        
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
        "-c:v", "libx264",
        "-preset", "ultrafast",
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
