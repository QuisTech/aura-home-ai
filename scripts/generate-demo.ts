import { DemoDirectorAgent } from '../src/agents/video/DemoDirectorAgent';
import { VideoComposerAgent } from '../src/agents/video/VideoComposerAgent';
import { VoiceoverAgent } from '../src/agents/voice/VoiceoverAgent';
import path from 'path';
import fs from 'fs';

async function generateMasterDemo() {
  const director = new DemoDirectorAgent();
  const composer = new VideoComposerAgent();
  const voiceover = new VoiceoverAgent();
  
  const APP_URL = "http://localhost:3000/"; 
  const RAW_DIR = path.join(process.cwd(), 'videos/raw');
  const AUDIO_PATH = path.join(process.cwd(), 'videos/narration.mp3');
  const SILENT_VIDEO = path.join(process.cwd(), 'videos/silent_master.mp4');
  const FINAL_OUTPUT = path.join(process.cwd(), 'public/demo-cinematic.mp4');

  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

  console.log("🚀 AURA: Initializing Audio-First Master Production...");
  
  try {
    // 1. Generate Narration FIRST for timing sync
    const script = director.getScript();
    console.log("🎙️ AURA: Generating 'Sweet Narrative' audio...");
    await voiceover.generateNarration(script, AUDIO_PATH);
    
    // 2. Record Walkthrough with the narration duration in mind
    console.log("🎬 AURA: Narration ready. Executing Walkthrough with Sovereignty...");
    const result = await director.executeWalkthrough(APP_URL);
    
    if (result && result.videoPath) {
      // 3. Process Video (Silent Master)
      await composer.finalizeDemo(result.videoPath, SILENT_VIDEO);
      
      // 4. Merge Audio & Video (Un-truncated)
      await composer.mergeAudioVideo(SILENT_VIDEO, AUDIO_PATH, FINAL_OUTPUT);
      
      // 5. Generate WebP for Landing Page (Visual loop)
      await composer.generateWebPLoop(result.videoPath, path.join(process.cwd(), 'public/demo-cinematic.webp'));
      
      console.log("🏆 AURA: Un-truncated Master Demo Production Complete!");
    }
  } catch (error) {
    console.error("❌ AURA: Production failed", error);
  }
}

generateMasterDemo();
