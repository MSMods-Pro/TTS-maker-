import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf-8');

const newLogic = `
      // Simple sentence-aware chunking (approx 500 chars max)
      const chunks = [];
      const sentences = text.match(/[^.?!।]+[.?!।]+|\\s+[^.?!।]+/g) || [text];
      
      let currentChunk = '';
      for (let sentence of sentences) {
        if ((currentChunk.length + sentence.length) > 500 && currentChunk.length > 0) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          currentChunk += sentence;
        }
      }
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }

      const buffers = [];
      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        if (!chunk) continue;
        
        const tmpPath = path.join(os.tmpdir(), \`voiceforge_chunk_\${Date.now()}_\${i}.mp3\`);
        await tts.ttsPromise(chunk, tmpPath);
        
        const buffer = await fs.readFile(tmpPath);
        buffers.push(buffer);
        
        // Clean up temp file
        await fs.unlink(tmpPath).catch(() => {});
      }
`;

const pattern = /\/\/\s*Clean up text and convert standard aliases to internal emotion tags[\s\S]*?\/\/\s*Clean up temp file\s*await fs\.unlink\(tmpPath\)\.catch\(\(\) => \{\}\);\s*\}/;
content = content.replace(pattern, newLogic.trim());

fs.writeFileSync('server.ts', content);
console.log('Server reverted');
