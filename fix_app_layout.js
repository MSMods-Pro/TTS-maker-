import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Hide background glows on mobile
content = content.replace(
  /<div className="absolute top-0 inset-x-0 h-\[500px\] bg-gradient-to-b/g,
  '<div className="hidden sm:block absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b'
);
content = content.replace(
  /<div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500\/5/g,
  '<div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5'
);
content = content.replace(
  /<div className="absolute top-40 -left-40 w-96 h-96 bg-cyan-500\/5/g,
  '<div className="hidden sm:block absolute top-40 -left-40 w-96 h-96 bg-cyan-500/5'
);

// Reduce gap on mobile
content = content.replace(
  /className="max-w-\[1600px\] mx-auto w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col gap-6"/g,
  'className="max-w-[1600px] mx-auto w-full h-full p-3 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6"'
);
content = content.replace(
  /className={`flex flex-col gap-6 \$\{isFocusMode \? '' : 'lg:flex-row'\}`}/g,
  'className={`flex flex-col gap-4 sm:gap-6 ${isFocusMode ? \'\' : \'lg:flex-row\'}`}'
);

// Script Studio Header padding
content = content.replace(
  /<div className="bg-neutral-900\/60 border-b border-neutral-800\/60 p-4 sm:px-6 flex items-center justify-between shrink-0">/g,
  '<div className="bg-neutral-900/60 border-b border-neutral-800/60 p-3 sm:p-4 sm:px-6 flex items-center justify-between shrink-0">'
);

// Textarea padding on mobile
content = content.replace(
  /className="flex-1 w-full bg-transparent p-4 sm:p-6 text-neutral-300 resize-none focus:outline-none text-base leading-relaxed custom-scrollbar"/g,
  'className="flex-1 w-full bg-transparent p-3 sm:p-6 text-neutral-300 resize-none focus:outline-none text-base leading-relaxed custom-scrollbar"'
);

// Bottom padding of textarea container
content = content.replace(
  /<div className="p-4 sm:p-6 border-t border-neutral-800\/60 bg-neutral-900\/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">/g,
  '<div className="p-3 sm:p-6 border-t border-neutral-800/60 bg-neutral-900/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 shrink-0">'
);

fs.writeFileSync('src/App.tsx', content);
console.log('App layout fixed');
