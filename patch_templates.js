import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace templates with natural punctuation instead of [pause]
content = content.replace(/\[pause 1s\]/g, '... ');
content = content.replace(/\[pause 0\.5s\]/g, '... ');
content = content.replace(/\[pause 2s\]/g, '... ');
content = content.replace(/\[pause 500ms\]/g, '... ');

fs.writeFileSync('src/App.tsx', content);
console.log('Templates cleaned');
