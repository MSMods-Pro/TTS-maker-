import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove emotion state
content = content.replace(
  /const \[pitch, setPitch\] = useState\(0\);\s*const \[volume, setVolume\] = useState\(1\);\s*const \[emotion, setEmotion\] = useState\('auto'\);/,
  `const [pitch, setPitch] = useState(0);\n  const [volume, setVolume] = useState(1);`
);

// 2. Remove script guide state
content = content.replace(
  /const \[showAdvanced, setShowAdvanced\] = useState\(false\);\s*const \[showScriptGuide, setShowScriptGuide\] = useState\(false\);/,
  `const [showAdvanced, setShowAdvanced] = useState(false);`
);

// 3. Revert handleGenerate logic (remove bracket validation and emotion string replacement)
const validationRegex = /\/\/ Basic validation for unclosed markers[\s\S]*?setIsGenerating\(true\);/;
content = content.replace(validationRegex, `setIsGenerating(true);`);

const replaceEmotionRegex = /let finalText = processTextWithReplacements\(text\);\s*if \(emotion !== 'auto'\) \{\s*finalText = \`\[emotion:\$\{emotion\}\] \$\{finalText\}\`;\s*\}/;
content = content.replace(replaceEmotionRegex, `const finalText = processTextWithReplacements(text);`);

// 4. Revert handlePreview logic (remove emotion string replacement)
const previewRegex = /let sampleText = sampleTexts\[language\] \|\| 'Hello! This is a voice preview\.';\s*if \(emotion !== 'auto'\) \{\s*sampleText = \`\[emotion:\$\{emotion\}\] \$\{sampleText\}\`;\s*\}/;
content = content.replace(previewRegex, `const sampleText = sampleTexts[language] || 'Hello! This is a voice preview.';`);

// 5. Remove Script Guide UI Modal
const scriptGuideRegex = /\{\/\* Script Guide Modal \*\/\}(.|\n)*?(?=<div className=\{\`flex flex-col gap-6 \$\{isFocusMode)/;
content = content.replace(scriptGuideRegex, '');

// 6. Remove Script Guide button from Toolbar
const scriptGuideBtnRegex = /<button \s*onClick=\{\(\) => setShowScriptGuide\(true\)\}[\s\S]*?<\/button>\s*<div className="w-px h-6 bg-neutral-800 mx-1 hidden sm:block"><\/div>/;
content = content.replace(scriptGuideBtnRegex, '');

// 7. Remove Emotion dropdown from Voice Controls
const emotionSelectRegex = /\{\/\* Emotion Selection \*\/\}(.|\n)*?(?=\{\/\* Speed Slider \*\/\})/;
content = content.replace(emotionSelectRegex, '');

// 8. Remove `supportedEmotions` from Voice cards UI
const voiceEmotionsRegex = /\{v\.supportedEmotions && v\.supportedEmotions\.length > 1 && \([\s\S]*?\}\)/;
content = content.replace(voiceEmotionsRegex, '');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx cleaned');
