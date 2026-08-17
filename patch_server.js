import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
  /console\.error\('TTS Generation Error:', error\);\s*res\.status\(500\)\.json\(\{ error: 'Failed to generate speech. Please try again or check the language\/voice configuration.' \}\);/,
  `console.error('TTS Generation Error:', error, { targetVoice, textLength: text.length, rateStr, pitchStr, volStr });
      res.status(500).json({ 
        error: 'Failed to generate speech. Please try again or check the language/voice configuration.',
        details: error instanceof Error ? error.message : String(error)
      });`
);

fs.writeFileSync('server.ts', content);
console.log('Server patched for better error logging');
