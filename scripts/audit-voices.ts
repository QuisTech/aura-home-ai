import { MsEdgeTTS } from 'edge-tts-node';

async function auditVoices() {
  const tts = new MsEdgeTTS({ enableLogger: true });
  try {
    const voices = await tts.getVoices();
    const modernVoices = voices.filter(v => v.ShortName.includes('Neural') && v.Locale.startsWith('en-US'));
    console.log("💎 AURA MODERN VOICES:");
    modernVoices.forEach(v => console.log(`- ${v.ShortName} (${v.FriendlyName})`));
  } catch (error) {
    console.error("❌ AURA: Voice audit failed", error);
  }
}

auditVoices();
