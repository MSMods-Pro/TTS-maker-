import { EdgeTTS } from 'node-edge-tts';

async function test() {
  try {
    const tts = new EdgeTTS({
      voice: 'bn-IN-BashkarNeural',
      lang: 'bn-IN'
    });
    console.log("Generating Bengali TTS...");
    await tts.ttsPromise("বৃষ্টির শব্দে চারপাশটা নিস্তব্ধ হয়ে ছিল।", "bengali.mp3");
    console.log("Success! File saved as bengali.mp3");
  } catch (err) {
    console.error("Failed:", err);
  }
}
test();
