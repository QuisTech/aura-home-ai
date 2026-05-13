import { Page } from 'playwright';
import { PlaywrightRecorder } from './PlaywrightRecorder';

export class DemoDirectorAgent {
  private recorder: PlaywrightRecorder;

  constructor() {
    this.recorder = new PlaywrightRecorder();
  }

  async executeWalkthrough(url: string) {
    const page = await this.recorder.startRecording({
      url,
      outputDir: './videos/raw',
      filename: `aura_demo_${Date.now()}`
    });

    console.log("🎬 AURA DIRECTOR: Starting Hero Walkthrough...");
    
    // 1. Capture Hero Discovery
    await page.waitForTimeout(3000);
    await page.mouse.wheel(0, 1000); // Scroll to logic
    await page.waitForTimeout(2000);
    await page.mouse.wheel(0, 1000); // Scroll to specialists
    await page.waitForTimeout(2000);

    // 2. Navigate to Command Center
    console.log("🎬 AURA DIRECTOR: Navigating to Command Console...");
    await page.click('a[href="/command"]');
    await page.waitForTimeout(5000);

    // 3. Interact with AI Chat
    console.log("🎬 AURA DIRECTOR: Executing AI Reasoning Demo...");
    await page.fill('input[placeholder="COMMAND AURA..."]', 'Aura, check my recent grocery spending for anomalies.');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(6000); // Wait for reasoning

    const videoPath = await this.recorder.stopRecording();
    console.log(`✅ AURA DIRECTOR: Demo captured successfully at ${videoPath}`);
    return videoPath;
  }
}
