import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The block to remove is:
// {v.supportedEmotions && v.supportedEmotions.length > 1 && (
//   <div className="text-[10px] text-neutral-500 mt-2 flex items-center gap-1">
//     <Sparkles className="w-3 h-3 text-indigo-400/70" />
//     {v.supportedEmotions.join(' • ')}
//   </div>
// )}

content = content.replace(/\{v\.supportedEmotions && v\.supportedEmotions\.length > 1 && \([\s\S]*?\}\)/g, '');

fs.writeFileSync('src/App.tsx', content);
console.log('Emotions UI removed');
