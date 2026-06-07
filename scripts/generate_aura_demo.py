import asyncio
import os
import glob
import subprocess
import shutil
from playwright.async_api import async_playwright

# 1. Narrator voiceover text
VOICEOVER_TEXT = (
    "Welcome to Aura Home AI, the ultimate seven-agent home orchestration node. "
    "Unlike standard smart homes, Aura features specialized autonomous agents that actively monitor, reason, and optimize your entire property to save you time and money. "
    "At the center, our Finance Sentinel constantly audits your connected accounts for subscription leaks. "
    "The Guardian Protocol cross-references neighborhood watch databases to secure your perimeter. "
    "Our Pantry Architect uses computer vision to detect low stock, and automatically reroutes grocery orders to find the best prices. "
    "The Energy Optimizer actively monitors grid pricing to shed non-essential HVAC loads during peak hours. "
    "Meanwhile, the Wellness Advisor, Timeline Coordinator, and Vision Advisor work in perfect harmony to manage air quality, daily schedules, and multimodal security streams. "
    "Let's see it in action. When we trigger a Critical Household Audit, Aura orchestrates a full sweep across all seven agents simultaneously. "
    "Watch the terminal trace as it secures the perimeter, adjusts the HVAC, orders groceries, and cancels unused subscriptions in real-time, syncing all resolutions securely to MongoDB. "
    "Aura Home AI. Total home autonomy, finally realized."
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
        await page.wait_for_timeout(3000)
        
        print("   - Clicking through 7 Agents")
        agents = ['fin', 'grd', 'pntry', 'nrgy', 'wlns', 'time', 'vis']
        
        for agent in agents:
            await smooth_click(page, f"#agent-card-{agent}")
            await page.wait_for_timeout(2500) # Give it time to show the dynamic diagnostic panel
        
        print("   - Executing Critical Audit Sweep")
        await smooth_click(page, "#trigger-audit-btn")
        
        # Wait for the 11-step terminal sequence to complete
        await page.wait_for_timeout(15000)
        
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
    target_url = "http://localhost:3000"
    
    try:
        generate_voiceover(VOICEOVER_TEXT, narration_audio)
        
        # Ensure the server is running locally first!
        asyncio.run(record_walkthrough(target_url, temp_video_dir))
        
        compile_final_video(temp_video_dir, narration_audio, final_output)
        
        if os.path.exists(temp_video_dir):
            shutil.rmtree(temp_video_dir)
        if os.path.exists(narration_audio):
            os.remove(narration_audio)
            
        print(f"\n=======================================================")
        print(f"AURA HOME AI DEMO VIDEO COMPILATION COMPLETE!")
        print(f"File created: {os.path.abspath(final_output)}")
        print(f"=======================================================")
        
    except Exception as e:
        print(f"\n[ERROR] Video generation failed: {e}")

if __name__ == "__main__":
    main()
