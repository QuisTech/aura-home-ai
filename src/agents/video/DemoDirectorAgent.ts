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
      "Welcome to Aura Home AI—the world's first truly autonomous home orchestration engine. We are currently living in a cognitive crisis, where our digital lives are fragmented and our homes are unmanaged enterprises of hidden costs and security gaps. Aura is the solution. We begin with Inspiration: our Zen Discovery sequence, which you see here, is designed to create a sanctuary of focus, calming the mind before the technology even begins to reason.",
      "Aura is architected around the Seven Pillars of Sovereignty. This isn't just a collection of smart devices; it's a high-performance multi-agent node. Our Finance Sentinel autonomously audits your digital expenditures in real-time. In this latest audit, Aura has already identified and resolved twelve distinct financial leaks, saving the household hundreds of dollars in redundant subscription creep. Every resolution is committed to our Sovereign MongoDB Vault, ensuring your financial history remains your private property.",
      "Our Multimodal Agentic Sensors are now online, creating a 360-degree sensory envelope around your home. As we look at the Vision Advisor Diagnostic for Perimeter 7, notice how the Guardian Protocol doesn't just watch—it reasons. Using the latest Gemini Vision models, Aura has identified a verified Courier with a 98.2% face match accuracy and assigned the Object ID FedEx_V1. It distinguishes between a routine delivery and a threat, triggering the model context protocol to provide a high-fidelity narrative of every event. Meanwhile, our Energy Architect dynamically shifts your HVAC loads, reducing carbon waste by nearly twenty-five percent.",
      "Let's step into the Command Console—the cockpit of your digital life. Here, the complexity of seven specialized agents is translated into actionable consumer value. Notice the live logs: Aura is sensing, reasoning, and resolving in the background without a single human click. This is the definition of Agentic Autonomy. Aura is currently querying Ledger 7 for water utility expenditures, confirming a bill of seventy-eight dollars and forty-three cents, and autonomously verifying the payment window.",
      "But Aura goes deeper—it thinks. I am now asking Aura to perform a deep-dive, sovereign audit of my recent grocery spending to identify inflationary anomalies. Notice how the engine identifies the trend, cross-references it with local market data stored in our vault, and suggests an autonomous path forward. This isn't a search result; it's a strategic conclusion from a specialized cognitive agent.",
      "Crucially, the entire Aura architecture is built on the principle of Persistent Sovereignty. Unlike closed-loop commercial systems, Aura maintains deep state and long-term context within your private MongoDB instance via the Model Context Protocol. Your home's intelligence is owned by you, managed by us, and protected by the most advanced agentic logic ever deployed to the edge. This is the future of living. Live more. Manage less. This is Aura Home AI."
    ];

    console.log("🎬 AURA DIRECTOR: Starting 3-Minute Master Film Production...");
    await page.waitForTimeout(15000);
    await page.mouse.wheel(0, 800); 
    await page.waitForTimeout(20000);
    await page.mouse.wheel(0, 1000); 
    await page.waitForTimeout(20000);
    await page.mouse.wheel(0, 1000); 
    await page.waitForTimeout(20000);

    // 2. Navigate to Command Center
    console.log("🎬 AURA DIRECTOR: Navigating to Command Console...");
    await page.goto("http://localhost:3000/command", { timeout: 120000 });
    await page.waitForTimeout(20000);

    // 3. Detailed Dashboard Walkthrough
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(30000);

    // 4. Interact with AI Chat (Deep reasoning)
    console.log("🎬 AURA DIRECTOR: Executing Complex AI Reasoning Demo...");
    await page.fill('input[placeholder="COMMAND AURA..."]', 'Aura, perform a sovereign audit of my household expenses and energy usage from the last 30 days.');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(40000); // Massive wait for deep reasoning narration

    // 5. Final Vision & Sovereign Ascent
    console.log("🎬 AURA DIRECTOR: Executing Sovereign Ascent (Conclusion)...");
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(20000);
    
    // Smooth cinematic scroll back to top for the finale
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    await page.waitForTimeout(25000); // 25-second cinematic sign-off

    const videoPath = await this.recorder.stopRecording();
    console.log(`✅ AURA DIRECTOR: 3-Minute Master Demo captured at ${videoPath}`);
    return { videoPath, script: script.join(" ") };
  }

  getScript() {
    return [
      "Welcome to Aura Home AI—the world's first truly autonomous home orchestration engine. We are currently living in a cognitive crisis, where our digital lives are fragmented and our homes are unmanaged enterprises of hidden costs and security gaps. Aura is the solution. We begin with Inspiration: our Zen Discovery sequence, which you see here, is designed to create a sanctuary of focus, calming the mind before the technology even begins to reason.",
      "Aura is architected around the Seven Pillars of Sovereignty. This isn't just a collection of smart devices; it's a high-performance multi-agent node. Our Finance Sentinel autonomously audits your digital expenditures in real-time. In this latest audit, Aura has already identified and resolved twelve distinct financial leaks, saving the household hundreds of dollars in redundant subscription creep. Every resolution is committed to our Sovereign MongoDB Vault, ensuring your financial history remains your private property.",
      "Our Multimodal Agentic Sensors are now online, creating a 360-degree sensory envelope around your home. As we look at the Vision Advisor Diagnostic for Perimeter 7, notice how the Guardian Protocol doesn't just watch—it reasons. Using the latest Gemini Vision models, Aura has identified a verified Courier with a 98.2% face match accuracy and assigned the Object ID FedEx_V1. It distinguishes between a routine delivery and a threat, triggering the model context protocol to provide a high-fidelity narrative of every event. Meanwhile, our Energy Architect dynamically shifts your HVAC loads, reducing carbon waste by nearly twenty-five percent.",
      "Let's step into the Command Console—the cockpit of your digital life. Here, the complexity of seven specialized agents is translated into actionable consumer value. Notice the live logs: Aura is sensing, reasoning, and resolving in the background without a single human click. This is the definition of Agentic Autonomy. Aura is currently querying Ledger 7 for water utility expenditures, confirming a bill of seventy-eight dollars and forty-three cents, and autonomously verifying the payment window.",
      "But Aura goes deeper—it thinks. I am now asking Aura to perform a deep-dive, sovereign audit of my recent grocery spending to identify inflationary anomalies. Notice how the engine identifies the trend, cross-references it with local market data stored in our vault, and suggests an autonomous path forward. This isn't a search result; it's a strategic conclusion from a specialized cognitive agent.",
      "Crucially, the entire Aura architecture is built on the principle of Persistent Sovereignty. Unlike closed-loop commercial systems, Aura maintains deep state and long-term context within your private MongoDB instance via the Model Context Protocol. Your home's intelligence is owned by you, managed by us, and protected by the most advanced agentic logic ever deployed to the edge. This is the future of living. Live more. Manage less. This is Aura Home AI."
    ].join(" ");
  }
}
