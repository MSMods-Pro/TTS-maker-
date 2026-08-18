import fs from 'fs';
let content = fs.readFileSync('src/index.css', 'utf-8');
if (!content.includes('html, body {')) {
  content += `\nhtml, body {\n  overflow-x: hidden;\n  width: 100%;\n  max-width: 100vw;\n}\n`;
  fs.writeFileSync('src/index.css', content);
  console.log('Added overflow-x: hidden to body');
}
