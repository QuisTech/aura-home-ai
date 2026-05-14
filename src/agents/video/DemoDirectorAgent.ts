import { Page } from 'playwright';
import { PlaywrightRecorder } from './PlaywrightRecorder';

export class DemoDirectorAgent {
  private recorder: PlaywrightRecorder;

  constructor() {
    this.recorder = new PlaywrightRecorder();
  }

  async executeWalkthrough(url: string) {
    const page = await this.recorder.startRecording({
      url: "http://localhost:3000",
      outputDir: './videos/raw',
      filename: `aura_demo_master_${Date.now()}`
    });

    const script = [
      "Welcome to Aura Home AI. We are living in a cognitive crisis. Our homes, once our sanctuaries, have become unmanaged enterprises of subscription leaks, energy waste, and security gaps. Aura is the solution. We lead with Inspiration—our Zen Discovery sequence creates a sanctuary of focus before the technology even begins.",
      "Aura is architected around the Seven Pillars of Autonomy. This isn't just a smart home; it's a multi-agent orchestration node. Our Finance Sentinel autonomously audits your digital life, identifying the nine-hundred-and-twenty dollars the average household loses to subscription creep every year.",
      "The Guardian Protocol reasons across your perimeter, using Gemini Vision to distinguish between a delivery and a threat. Our Energy Architect dynamically shifts your HVAC load to match peak utility rates, reducing waste by nearly twenty-five percent. This is total home sovereignty.",
      "Let's enter the Command Console—the cockpit of your digital life. Here, Aura translates thousands of background data points into actionable consumer value. Notice the live logs: Aura is sensing, reasoning, and resolving in real-time, without a single human click.",
      "Aura doesn't just show data; it thinks. I'm asking Aura to perform a deep-dive audit of my recent grocery spending for anomalies. It identifies the trend, cross-references it with local market data, and suggests an autonomous path forward.",
      "Crucially, every decision is committed to our Sovereign MongoDB Vault via the Model Context Protocol. Unlike closed systems, Aura maintains persistent state and context, ensuring your home intelligence is owned by you, and only you. This is the future of the Agentic Home. Live more. Manage less. This is Aura Home AI."
    ];

    console.log("🎬 AURA DIRECTOR: Starting 3-Minute Master Film Production...");
    await page.waitForTimeout(5000);
    await page.mouse.wheel(0, 800); 
    await page.waitForTimeout(8000);
    await page.mouse.wheel(0, 1000); 
    await page.waitForTimeout(10000);
    await page.mouse.wheel(0, 1000); 
    await page.waitForTimeout(10000);

    // 2. Navigate to Command Center
    console.log("🎬 AURA DIRECTOR: Navigating to Command Console...");
    await page.goto("http://localhost:3000/command", { timeout: 120000 });
    await page.waitForTimeout(10000);

    // 3. Detailed Dashboard Walkthrough
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(15000);

    // 4. Interact with AI Chat (Deep reasoning)
    console.log("🎬 AURA DIRECTOR: Executing Complex AI Reasoning Demo...");
    await page.fill('input[placeholder="COMMAND AURA..."]', 'Aura, perform a sovereign audit of my household expenses and energy usage from the last 30 days.');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(20000); // Extended wait for deep reasoning narration

    // 5. Final Vision & Sovereign Ascent
    console.log("🎬 AURA DIRECTOR: Executing Sovereign Ascent (Conclusion)...");
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(15000);
    
    // Smooth cinematic scroll back to top for the finale
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    await page.waitForTimeout(60000); // Bulletproof buffer for final sign-off

    const videoPath = await this.recorder.stopRecording();
    console.log(`✅ AURA DIRECTOR: 3-Minute Master Demo captured at ${videoPath}`);
    return { videoPath, script: script.join(" ") };
  }

  getScript() {
    return [
      "Welcome to Aura Home AI. We are living in a cognitive crisis. Our homes, once our sanctuaries, have become unmanaged enterprises of subscription leaks, energy waste, and security gaps. Aura is the solution. We lead with Inspiration—our Zen Discovery sequence creates a sanctuary of focus before the technology even begins.",
      "Aura is architected around the Seven Pillars of Autonomy. This isn't just a smart home; it's a multi-agent orchestration node. Our Finance Sentinel autonomously audits your digital life, identifying the nine-hundred-and-twenty dollars the average household loses to subscription creep every year.",
      "The Guardian Protocol reasons across your perimeter, using Gemini Vision to distinguish between a delivery and a threat. Our Energy Architect dynamically shifts your HVAC load to match peak utility rates, reducing waste by nearly twenty-five percent. This is total home sovereignty.",
      "Let's enter the Command Console—the cockpit of your digital life. Here, Aura translates thousands of background data points into actionable consumer value. Notice the live logs: Aura is sensing, reasoning, and resolving in real-time, without a single human click.",
      "Aura doesn't just show data; it thinks. I'm asking Aura to perform a deep-dive audit of my recent grocery spending for anomalies. It identifies the trend, cross-references it with local market data, and suggests an autonomous path forward.",
      "Crucially, every decision is committed to our Sovereign MongoDB Vault via the Model Context Protocol. Unlike closed systems, Aura maintains persistent state and context, ensuring your home intelligence is owned by you, and only you. This is the future of the Agentic Home. Live more. Manage less. This is Aura Home AI."
    ].join(" ");
  }
}
