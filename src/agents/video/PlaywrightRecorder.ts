import { chromium, Browser, BrowserContext, Page } from 'playwright';

export interface RecordOptions {
  url: string;
  outputDir: string;
  filename: string;
  width?: number;
  height?: number;
}

export class PlaywrightRecorder {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;

  async startRecording(options: RecordOptions): Promise<Page> {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
      viewport: { width: options.width || 1920, height: options.height || 1080 },
      recordVideo: {
        dir: options.outputDir,
        size: { width: options.width || 1920, height: options.height || 1080 }
      }
    });

    const page = await this.context.newPage();
    await page.goto(options.url);
    return page;
  }

  async stopRecording(): Promise<string | undefined> {
    if (!this.context) return undefined;
    const page = (await this.context.pages())[0];
    const video = page.video();
    const path = await video?.path();
    
    await this.browser?.close();
    return path;
  }
}
