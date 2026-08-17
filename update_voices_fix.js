import fs from 'fs';

let content = fs.readFileSync('src/voices.ts', 'utf-8');

const metadataMap = {
  'en-US-GuyNeural': { style: 'Narrator', character: 'Deep • Confident', supportedEmotions: ['Neutral', 'Happy', 'Sad', 'Angry', 'Excited'] },
  'en-US-AriaNeural': { style: 'Conversational', character: 'Warm • Expressive', supportedEmotions: ['Neutral', 'Happy', 'Sad', 'Angry', 'Excited', 'Fearful', 'Whisper'] },
  'en-US-JennyNeural': { style: 'Professional', character: 'Clear • Friendly', supportedEmotions: ['Neutral', 'Happy', 'Sad', 'Angry', 'Excited', 'Serious', 'Whisper'] },
  'hi-IN-MadhurNeural': { style: 'Narrator', character: 'Warm • Clear', supportedEmotions: ['Neutral'] },
  'hi-IN-SwaraNeural': { style: 'Conversational', character: 'Soft • Clear', supportedEmotions: ['Neutral', 'Happy', 'Sad'] },
  'en-GB-SoniaNeural': { style: 'News', character: 'Professional • Crisp', supportedEmotions: ['Neutral', 'Happy', 'Sad'] },
  'es-ES-AlvaroNeural': { style: 'Narrator', character: 'Deep • Engaging', supportedEmotions: ['Neutral'] },
  'fr-FR-DeniseNeural': { style: 'Conversational', character: 'Warm • Natural', supportedEmotions: ['Neutral', 'Happy'] },
  'de-DE-KatjaNeural': { style: 'Professional', character: 'Clear • Authoritative', supportedEmotions: ['Neutral'] }
};

const jackVoice = {
  id: 'future-jack-voice',
  name: 'Jack',
  language: 'en-US',
  languageCode: 'en',
  gender: 'male',
  provider: 'edge-tts',
  style: 'Narrator',
  character: 'Deep • Confident',
  description: 'A deep, confident narrator voice. (Coming soon)',
  supportedEmotions: ['Neutral', 'Happy', 'Sad', 'Angry', 'Excited'],
  isAvailable: false
};

const arrayMatch = content.match(/export const SUPPORTED_VOICES = (\[[\s\S]*?\]);/);
if (arrayMatch) {
  let voices = JSON.parse(arrayMatch[1]);
  voices = voices.map(v => {
    const meta = metadataMap[v.id];
    if (meta) {
      return { ...v, ...meta, isAvailable: true };
    }
    return {
      ...v,
      style: v.gender === 'male' ? 'Professional' : 'Conversational',
      character: v.gender === 'male' ? 'Clear • Standard' : 'Soft • Clear',
      supportedEmotions: ['Neutral'],
      isAvailable: true
    };
  });
  
  voices.unshift(jackVoice);
  
  const finalCode = `export interface Voice {
  id: string;
  name: string;
  language: string;
  languageCode: string;
  gender: 'male' | 'female';
  provider: string;
  style?: string;
  character?: string;
  description?: string;
  supportedEmotions?: string[];
  isAvailable?: boolean;
}

export const SUPPORTED_VOICES: Voice[] = ${JSON.stringify(voices, null, 2)};
`;
  fs.writeFileSync('src/voices.ts', finalCode);
  console.log('Voices updated successfully.');
} else {
  console.log('Array match failed');
}
