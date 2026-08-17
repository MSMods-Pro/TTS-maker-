import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace placeholder mentioning pauses
content = content.replace(
  /placeholder="Paste or write your script here\.\.\. &#10;&#10;Pro Tip: You can insert pauses using \[pause 1s\] or \[pause 500ms\]\."/g,
  `placeholder="Paste or write your script here..."`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Placeholder cleaned');
