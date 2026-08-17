import { EdgeTTS } from 'node-edge-tts';
import fs from 'fs';
import os from 'os';
import path from 'path';

async function run() {
  const tts = new EdgeTTS({ voice: 'en-US-AriaNeural' });
  const tmpPath = path.join(os.tmpdir(), `test_ssml_style.mp3`);
  
  // Test express-as
  const ssml = `
    <voice name="en-US-AriaNeural">
      <mstts:express-as style="cheerful">
        This is a happy voice!
      </mstts:express-as>
    </voice>
  `;
  
  // Actually node-edge-tts takes raw text and wraps it in SSML itself if you use ttsPromise.
  // Wait, does it allow passing SSML directly?
  // We should check node-edge-tts docs or just test if we can inject tags.
  // In our previous server.ts we injected `<break time="1s"/>`.
  
  await tts.ttsPromise('This is normal. <mstts:express-as style="cheerful">This is cheerful.</mstts:express-as>', tmpPath);
  console.log('File size:', fs.statSync(tmpPath).size);
}
run().catch(console.error);
