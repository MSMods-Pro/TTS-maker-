import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(
  /throw new Error\(data\?\.error \|\| 'Failed to generate audio\. Please try again\.'\);/g,
  "throw new Error(data?.details ? `${data.error} (${data.details})` : (data?.error || 'Failed to generate audio. Please try again.'));"
);
fs.writeFileSync('src/App.tsx', content);
console.log('App error handling patched');
