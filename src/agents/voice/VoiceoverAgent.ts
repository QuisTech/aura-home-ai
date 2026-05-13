import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export class VoiceoverAgent {
  private voice: string = 'en-US-AvaNeural'; 

  async generateNarration(text: string, outputPath: string): Promise<string> {
    console.log(`🎙️ AURA VOICEOVER: Narrating with Microsoft Ava...`);
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
      // Use the python edge-tts CLI (the gold standard)
      const command = `edge-tts --voice ${this.voice} --text "${text.replace(/"/g, '\\"')}" --write-media "${outputPath}"`;
      execSync(command, { stdio: 'inherit' });
      
      console.log(`✅ AURA VOICEOVER: Audio generated at ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error("❌ AURA VOICEOVER: Narration failed", error);
      throw error;
    }
  }
}
