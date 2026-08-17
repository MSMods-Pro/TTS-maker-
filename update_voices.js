import fs from 'fs';

let content = fs.readFileSync('src/voices.ts', 'utf-8');

// The exported interface is:
// export interface Voice { id: string; name: string; language: string; languageCode: string; gender: string; provider: string; }

// Let's replace the interface
content = content.replace(
  /export interface Voice \{[^}]+\}/,
  `export interface Voice {
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
}`
);

// We need to inject some metadata for known voices to satisfy the requirements.
// For example:
// Madhur (hi-IN-MadhurNeural): Narrator, Warm
// Swara (hi-IN-SwaraNeural): Soft, Clear
// Aria (en-US-AriaNeural): Conversational, Warm
// Guy (en-US-GuyNeural): Deep, Confident
// Ana (en-US-AnaNeural): Calm, Natural

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

// Also we need to add Jack as a disabled or mock voice that fits the "structure" requirement
// "If Jack does not exist in the current provider, do not pretend that it is a real backend voice. Instead, structure the Voice Library so that Jack can be added through the existing provider voice configuration when a valid voice ID is available."
// I will add Jack to the array but mark it with `isAvailable: false`.
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

// Parse the array
const arrayMatch = content.match(/export const SUPPORTED_VOICES: Voice\[\] = (\[[\s\S]*?\]);/);
if (arrayMatch) {
  let voices = JSON.parse(arrayMatch[1]);
  voices = voices.map(v => {
    const meta = metadataMap[v.id];
    if (meta) {
      return { ...v, ...meta, isAvailable: true };
    }
    // Default fallback traits based on gender
    return {
      ...v,
      style: v.gender === 'male' ? 'Professional' : 'Conversational',
      character: v.gender === 'male' ? 'Clear • Standard' : 'Soft • Clear',
      supportedEmotions: ['Neutral'],
      isAvailable: true
    };
  });
  
  voices.unshift(jackVoice); // Add Jack at the top
  
  content = content.replace(
    /export const SUPPORTED_VOICES: Voice\[\] = \[[\s\S]*?\];/,
    `export const SUPPORTED_VOICES: Voice[] = ${JSON.stringify(voices, null, 2)};`
  );
  
  fs.writeFileSync('src/voices.ts', content);
  console.log('Voices updated successfully.');
} else {
  console.log('Could not find SUPPORTED_VOICES array');
}
