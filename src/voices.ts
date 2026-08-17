export interface Voice {
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

export const SUPPORTED_VOICES: Voice[] = [
  {
    "id": "future-jack-voice",
    "name": "Jack",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Narrator",
    "character": "Deep • Confident",
    "description": "A deep, confident narrator voice. (Coming soon)",
    "supportedEmotions": [
      "Neutral",
      "Happy",
      "Sad",
      "Angry",
      "Excited"
    ],
    "isAvailable": false
  },
  {
    "id": "bn-BD-NabanitaNeural",
    "name": "Nabanita",
    "language": "bn-BD",
    "languageCode": "bn",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "bn-BD-PradeepNeural",
    "name": "Pradeep",
    "language": "bn-BD",
    "languageCode": "bn",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "bn-IN-BashkarNeural",
    "name": "Bashkar",
    "language": "bn-IN",
    "languageCode": "bn",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "bn-IN-TanishaaNeural",
    "name": "Tanishaa",
    "language": "bn-IN",
    "languageCode": "bn",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-AU-WilliamMultilingualNeural",
    "name": "WilliamMultilingual",
    "language": "en-AU",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-AU-NatashaNeural",
    "name": "Natasha",
    "language": "en-AU",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-CA-ClaraNeural",
    "name": "Clara",
    "language": "en-CA",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-CA-LiamNeural",
    "name": "Liam",
    "language": "en-CA",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-HK-YanNeural",
    "name": "Yan",
    "language": "en-HK",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-HK-SamNeural",
    "name": "Sam",
    "language": "en-HK",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-IN-NeerjaExpressiveNeural",
    "name": "Neerja",
    "language": "en-IN",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-IN-NeerjaNeural",
    "name": "Neerja",
    "language": "en-IN",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-IN-PrabhatNeural",
    "name": "Prabhat",
    "language": "en-IN",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-IE-ConnorNeural",
    "name": "Connor",
    "language": "en-IE",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-IE-EmilyNeural",
    "name": "Emily",
    "language": "en-IE",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-KE-AsiliaNeural",
    "name": "Asilia",
    "language": "en-KE",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-KE-ChilembaNeural",
    "name": "Chilemba",
    "language": "en-KE",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-NZ-MitchellNeural",
    "name": "Mitchell",
    "language": "en-NZ",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-NZ-MollyNeural",
    "name": "Molly",
    "language": "en-NZ",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-NG-AbeoNeural",
    "name": "Abeo",
    "language": "en-NG",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-NG-EzinneNeural",
    "name": "Ezinne",
    "language": "en-NG",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-PH-JamesNeural",
    "name": "James",
    "language": "en-PH",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-PH-RosaNeural",
    "name": "Rosa",
    "language": "en-PH",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-AvaNeural",
    "name": "Ava",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-AndrewNeural",
    "name": "Andrew",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-EmmaNeural",
    "name": "Emma",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-BrianNeural",
    "name": "Brian",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-SG-LunaNeural",
    "name": "Luna",
    "language": "en-SG",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-SG-WayneNeural",
    "name": "Wayne",
    "language": "en-SG",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-ZA-LeahNeural",
    "name": "Leah",
    "language": "en-ZA",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-ZA-LukeNeural",
    "name": "Luke",
    "language": "en-ZA",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-TZ-ElimuNeural",
    "name": "Elimu",
    "language": "en-TZ",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-TZ-ImaniNeural",
    "name": "Imani",
    "language": "en-TZ",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-GB-LibbyNeural",
    "name": "Libby",
    "language": "en-GB",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-GB-MaisieNeural",
    "name": "Maisie",
    "language": "en-GB",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-GB-RyanNeural",
    "name": "Ryan",
    "language": "en-GB",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-GB-SoniaNeural",
    "name": "Sonia",
    "language": "en-GB",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "News",
    "character": "Professional • Crisp",
    "supportedEmotions": [
      "Neutral",
      "Happy",
      "Sad"
    ],
    "isAvailable": true
  },
  {
    "id": "en-GB-ThomasNeural",
    "name": "Thomas",
    "language": "en-GB",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-AnaNeural",
    "name": "Ana",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-AndrewMultilingualNeural",
    "name": "AndrewMultilingual",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-AriaNeural",
    "name": "Aria",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Warm • Expressive",
    "supportedEmotions": [
      "Neutral",
      "Happy",
      "Sad",
      "Angry",
      "Excited",
      "Fearful",
      "Whisper"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-AvaMultilingualNeural",
    "name": "AvaMultilingual",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-BrianMultilingualNeural",
    "name": "BrianMultilingual",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-ChristopherNeural",
    "name": "Christopher",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-EmmaMultilingualNeural",
    "name": "EmmaMultilingual",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-EricNeural",
    "name": "Eric",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-GuyNeural",
    "name": "Guy",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Narrator",
    "character": "Deep • Confident",
    "supportedEmotions": [
      "Neutral",
      "Happy",
      "Sad",
      "Angry",
      "Excited"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-JennyNeural",
    "name": "Jenny",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Friendly",
    "supportedEmotions": [
      "Neutral",
      "Happy",
      "Sad",
      "Angry",
      "Excited",
      "Serious",
      "Whisper"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-MichelleNeural",
    "name": "Michelle",
    "language": "en-US",
    "languageCode": "en",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-RogerNeural",
    "name": "Roger",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "en-US-SteffanNeural",
    "name": "Steffan",
    "language": "en-US",
    "languageCode": "en",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-BE-CharlineNeural",
    "name": "Charline",
    "language": "fr-BE",
    "languageCode": "fr",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-BE-GerardNeural",
    "name": "Gerard",
    "language": "fr-BE",
    "languageCode": "fr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-CA-ThierryNeural",
    "name": "Thierry",
    "language": "fr-CA",
    "languageCode": "fr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-CA-AntoineNeural",
    "name": "Antoine",
    "language": "fr-CA",
    "languageCode": "fr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-CA-JeanNeural",
    "name": "Jean",
    "language": "fr-CA",
    "languageCode": "fr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-CA-SylvieNeural",
    "name": "Sylvie",
    "language": "fr-CA",
    "languageCode": "fr",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-FR-VivienneMultilingualNeural",
    "name": "VivienneMultilingual",
    "language": "fr-FR",
    "languageCode": "fr",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-FR-RemyMultilingualNeural",
    "name": "RemyMultilingual",
    "language": "fr-FR",
    "languageCode": "fr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-FR-DeniseNeural",
    "name": "Denise",
    "language": "fr-FR",
    "languageCode": "fr",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Warm • Natural",
    "supportedEmotions": [
      "Neutral",
      "Happy"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-FR-EloiseNeural",
    "name": "Eloise",
    "language": "fr-FR",
    "languageCode": "fr",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-FR-HenriNeural",
    "name": "Henri",
    "language": "fr-FR",
    "languageCode": "fr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-CH-ArianeNeural",
    "name": "Ariane",
    "language": "fr-CH",
    "languageCode": "fr",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "fr-CH-FabriceNeural",
    "name": "Fabrice",
    "language": "fr-CH",
    "languageCode": "fr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-AT-IngridNeural",
    "name": "Ingrid",
    "language": "de-AT",
    "languageCode": "de",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-AT-JonasNeural",
    "name": "Jonas",
    "language": "de-AT",
    "languageCode": "de",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-DE-SeraphinaMultilingualNeural",
    "name": "SeraphinaMultilingual",
    "language": "de-DE",
    "languageCode": "de",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-DE-FlorianMultilingualNeural",
    "name": "FlorianMultilingual",
    "language": "de-DE",
    "languageCode": "de",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-DE-AmalaNeural",
    "name": "Amala",
    "language": "de-DE",
    "languageCode": "de",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-DE-ConradNeural",
    "name": "Conrad",
    "language": "de-DE",
    "languageCode": "de",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-DE-KatjaNeural",
    "name": "Katja",
    "language": "de-DE",
    "languageCode": "de",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Authoritative",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-DE-KillianNeural",
    "name": "Killian",
    "language": "de-DE",
    "languageCode": "de",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-CH-JanNeural",
    "name": "Jan",
    "language": "de-CH",
    "languageCode": "de",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "de-CH-LeniNeural",
    "name": "Leni",
    "language": "de-CH",
    "languageCode": "de",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "gu-IN-DhwaniNeural",
    "name": "Dhwani",
    "language": "gu-IN",
    "languageCode": "gu",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "gu-IN-NiranjanNeural",
    "name": "Niranjan",
    "language": "gu-IN",
    "languageCode": "gu",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "hi-IN-MadhurNeural",
    "name": "Madhur",
    "language": "hi-IN",
    "languageCode": "hi",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Narrator",
    "character": "Warm • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "hi-IN-SwaraNeural",
    "name": "Swara",
    "language": "hi-IN",
    "languageCode": "hi",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral",
      "Happy",
      "Sad"
    ],
    "isAvailable": true
  },
  {
    "id": "ja-JP-KeitaNeural",
    "name": "Keita",
    "language": "ja-JP",
    "languageCode": "ja",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ja-JP-NanamiNeural",
    "name": "Nanami",
    "language": "ja-JP",
    "languageCode": "ja",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "kn-IN-GaganNeural",
    "name": "Gagan",
    "language": "kn-IN",
    "languageCode": "kn",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "kn-IN-SapnaNeural",
    "name": "Sapna",
    "language": "kn-IN",
    "languageCode": "kn",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ko-KR-HyunsuMultilingualNeural",
    "name": "HyunsuMultilingual",
    "language": "ko-KR",
    "languageCode": "ko",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ko-KR-InJoonNeural",
    "name": "InJoon",
    "language": "ko-KR",
    "languageCode": "ko",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ko-KR-SunHiNeural",
    "name": "SunHi",
    "language": "ko-KR",
    "languageCode": "ko",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ml-IN-MidhunNeural",
    "name": "Midhun",
    "language": "ml-IN",
    "languageCode": "ml",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ml-IN-SobhanaNeural",
    "name": "Sobhana",
    "language": "ml-IN",
    "languageCode": "ml",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "mr-IN-AarohiNeural",
    "name": "Aarohi",
    "language": "mr-IN",
    "languageCode": "mr",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "mr-IN-ManoharNeural",
    "name": "Manohar",
    "language": "mr-IN",
    "languageCode": "mr",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-AR-ElenaNeural",
    "name": "Elena",
    "language": "es-AR",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-AR-TomasNeural",
    "name": "Tomas",
    "language": "es-AR",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-BO-MarceloNeural",
    "name": "Marcelo",
    "language": "es-BO",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-BO-SofiaNeural",
    "name": "Sofia",
    "language": "es-BO",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CL-CatalinaNeural",
    "name": "Catalina",
    "language": "es-CL",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CL-LorenzoNeural",
    "name": "Lorenzo",
    "language": "es-CL",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CO-GonzaloNeural",
    "name": "Gonzalo",
    "language": "es-CO",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CO-SalomeNeural",
    "name": "Salome",
    "language": "es-CO",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-ES-XimenaNeural",
    "name": "Ximena",
    "language": "es-ES",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CR-JuanNeural",
    "name": "Juan",
    "language": "es-CR",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CR-MariaNeural",
    "name": "Maria",
    "language": "es-CR",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CU-BelkysNeural",
    "name": "Belkys",
    "language": "es-CU",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-CU-ManuelNeural",
    "name": "Manuel",
    "language": "es-CU",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-DO-EmilioNeural",
    "name": "Emilio",
    "language": "es-DO",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-DO-RamonaNeural",
    "name": "Ramona",
    "language": "es-DO",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-EC-AndreaNeural",
    "name": "Andrea",
    "language": "es-EC",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-EC-LuisNeural",
    "name": "Luis",
    "language": "es-EC",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-SV-LorenaNeural",
    "name": "Lorena",
    "language": "es-SV",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-SV-RodrigoNeural",
    "name": "Rodrigo",
    "language": "es-SV",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-GQ-JavierNeural",
    "name": "Javier",
    "language": "es-GQ",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-GQ-TeresaNeural",
    "name": "Teresa",
    "language": "es-GQ",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-GT-AndresNeural",
    "name": "Andres",
    "language": "es-GT",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-GT-MartaNeural",
    "name": "Marta",
    "language": "es-GT",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-HN-CarlosNeural",
    "name": "Carlos",
    "language": "es-HN",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-HN-KarlaNeural",
    "name": "Karla",
    "language": "es-HN",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-MX-DaliaNeural",
    "name": "Dalia",
    "language": "es-MX",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-MX-JorgeNeural",
    "name": "Jorge",
    "language": "es-MX",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-NI-FedericoNeural",
    "name": "Federico",
    "language": "es-NI",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-NI-YolandaNeural",
    "name": "Yolanda",
    "language": "es-NI",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PA-MargaritaNeural",
    "name": "Margarita",
    "language": "es-PA",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PA-RobertoNeural",
    "name": "Roberto",
    "language": "es-PA",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PY-MarioNeural",
    "name": "Mario",
    "language": "es-PY",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PY-TaniaNeural",
    "name": "Tania",
    "language": "es-PY",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PE-AlexNeural",
    "name": "Alex",
    "language": "es-PE",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PE-CamilaNeural",
    "name": "Camila",
    "language": "es-PE",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PR-KarinaNeural",
    "name": "Karina",
    "language": "es-PR",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-PR-VictorNeural",
    "name": "Victor",
    "language": "es-PR",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-ES-AlvaroNeural",
    "name": "Alvaro",
    "language": "es-ES",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Narrator",
    "character": "Deep • Engaging",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-ES-ElviraNeural",
    "name": "Elvira",
    "language": "es-ES",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-US-AlonsoNeural",
    "name": "Alonso",
    "language": "es-US",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-US-PalomaNeural",
    "name": "Paloma",
    "language": "es-US",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-UY-MateoNeural",
    "name": "Mateo",
    "language": "es-UY",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-UY-ValentinaNeural",
    "name": "Valentina",
    "language": "es-UY",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-VE-PaolaNeural",
    "name": "Paola",
    "language": "es-VE",
    "languageCode": "es",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "es-VE-SebastianNeural",
    "name": "Sebastian",
    "language": "es-VE",
    "languageCode": "es",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-IN-PallaviNeural",
    "name": "Pallavi",
    "language": "ta-IN",
    "languageCode": "ta",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-IN-ValluvarNeural",
    "name": "Valluvar",
    "language": "ta-IN",
    "languageCode": "ta",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-MY-KaniNeural",
    "name": "Kani",
    "language": "ta-MY",
    "languageCode": "ta",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-MY-SuryaNeural",
    "name": "Surya",
    "language": "ta-MY",
    "languageCode": "ta",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-SG-AnbuNeural",
    "name": "Anbu",
    "language": "ta-SG",
    "languageCode": "ta",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-SG-VenbaNeural",
    "name": "Venba",
    "language": "ta-SG",
    "languageCode": "ta",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-LK-KumarNeural",
    "name": "Kumar",
    "language": "ta-LK",
    "languageCode": "ta",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ta-LK-SaranyaNeural",
    "name": "Saranya",
    "language": "ta-LK",
    "languageCode": "ta",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "te-IN-MohanNeural",
    "name": "Mohan",
    "language": "te-IN",
    "languageCode": "te",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "te-IN-ShrutiNeural",
    "name": "Shruti",
    "language": "te-IN",
    "languageCode": "te",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ur-IN-GulNeural",
    "name": "Gul",
    "language": "ur-IN",
    "languageCode": "ur",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ur-IN-SalmanNeural",
    "name": "Salman",
    "language": "ur-IN",
    "languageCode": "ur",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ur-PK-AsadNeural",
    "name": "Asad",
    "language": "ur-PK",
    "languageCode": "ur",
    "gender": "male",
    "provider": "edge-tts",
    "style": "Professional",
    "character": "Clear • Standard",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  },
  {
    "id": "ur-PK-UzmaNeural",
    "name": "Uzma",
    "language": "ur-PK",
    "languageCode": "ur",
    "gender": "female",
    "provider": "edge-tts",
    "style": "Conversational",
    "character": "Soft • Clear",
    "supportedEmotions": [
      "Neutral"
    ],
    "isAvailable": true
  }
];
