import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
  /console\.error\('TTS Generation Error:', error, \{ targetVoice, textLength: text\.length, rateStr, pitchStr, volStr \}\);/,
  `console.error('TTS Generation Error:', error);`
);

fs.writeFileSync('server.ts', content);
console.log('Fixed catch block scoping error');
