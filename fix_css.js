import fs from 'fs';

let content = fs.readFileSync('src/index.css', 'utf-8');

content = content.replace(
  /@layer utilities \{/g,
  `@layer utilities {
  @media (min-width: 1024px) {
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgb(64, 64, 64); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgb(82, 82, 91); }
  }`
);

// We need to add closing brace for the @media query if we did that string replace.
// Let's just rewrite the whole file cleanly.
fs.writeFileSync('src/index.css', `@import "tailwindcss";

@theme {
  --animate-shimmer: shimmer 2s linear infinite;
  @keyframes shimmer {
    from {
      transform: translateX(-100%) skewX(12deg);
    }
    to {
      transform: translateX(200%) skewX(12deg);
    }
  }
}

@layer utilities {
  @media (min-width: 1024px) {
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgb(64, 64, 64);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: rgb(82, 82, 91);
    }
  }
}
`);
console.log('CSS fixed');
