import { EdgeTTS } from 'node-edge-tts';
const tts = new EdgeTTS();
tts.getVoices().then(v => {
    console.log(v.filter(x => x.Locale === 'en-US' || x.Name.includes('Jack')).map(x => x.Name).join(', '));
}).catch(console.error);
