import { DemoDirectorAgent } from '../src/agents/video/DemoDirectorAgent';
import { VideoComposerAgent } from '../src/agents/video/VideoComposerAgent';
import { VoiceoverAgent } from '../src/agents/voice/VoiceoverAgent';
import path from 'path';
import fs from 'fs';

async function generateMasterDemo() {
  const director = new DemoDirectorAgent();
  const composer = new VideoComposerAgent();
  const voiceover = new VoiceoverAgent();
  
  const APP_URL = "https://aura-home-ai-eight.vercel.app/"; 
  const RAW_DIR = path.join(process.cwd(), 'videos/raw');
  const AUDIO_PATH = path.join(process.cwd(), 'videos/narration.mp3');
  const SILENT_VIDEO = path.join(process.cwd(), 'videos/silent_master.mp4');
  const FINAL_OUTPUT = path.join(process.cwd(), 'public/demo-cinematic-new.mp4');

  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

  console.log("🚀 AURA: Initializing Narrated Demo Production...");
  
  try {
    // 1. Record Walkthrough
    const result = await director.executeWalkthrough(APP_URL);
    
    if (result && result.videoPath) {
      // 2. Generate Narration
      await voiceover.generateNarration(result.script, AUDIO_PATH);
      
      // 3. Process Video (Silent Master)
      await composer.finalizeDemo(result.videoPath, SILENT_VIDEO);
      
      // 4. Merge Audio & Video
      await composer.mergeAudioVideo(SILENT_VIDEO, AUDIO_PATH, FINAL_OUTPUT);
      
      // 5. Generate WebP for Landing Page (Visual loop)
      await composer.generateWebPLoop(result.videoPath, path.join(process.cwd(), 'public/demo-cinematic.webp'));
      
      console.log("🏆 AURA: Narrated Master Demo Production Complete!");
    }
  } catch (error) {
    console.error("❌ AURA: Production failed", error);
  }
}

generateMasterDemo();
