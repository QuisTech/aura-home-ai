import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

export class VideoComposerAgent {
  async finalizeDemo(inputPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("🎬 AURA COMPOSER: Post-processing video...");
      
      ffmpeg(inputPath)
        .outputOptions([
          '-vf scale=1920:1080',
          '-vcodec libx264',
          '-crf 23',
          '-preset fast'
        ])
        .on('end', () => {
          console.log(`✅ AURA COMPOSER: Final demo exported to ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('❌ AURA COMPOSER: Error processing video', err);
          reject(err);
        })
        .save(outputPath);
    });
  }

  async generateWebPLoop(inputPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("🎬 AURA COMPOSER: Generating high-fidelity WebP loop...");
      
      ffmpeg(inputPath)
        .outputOptions([
          '-vf scale=1280:-1',
          '-vcodec libwebp',
          '-lossless 0',
          '-compression_level 4',
          '-q:v 75',
          '-loop 0'
        ])
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }

  async mergeAudioVideo(videoPath: string, audioPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("🎬 AURA COMPOSER: Merging Sovereignty Voice with Visuals...");
      
      ffmpeg(videoPath)
        .input(audioPath)
        .outputOptions([
          '-c:v copy',
          '-c:a aac',
          '-shortest'
        ])
        .on('end', () => {
          console.log(`✅ AURA COMPOSER: Narrated Master Demo ready at ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('❌ AURA COMPOSER: Error merging audio/video', err);
          reject(err);
        })
        .save(outputPath);
    });
  }
}
