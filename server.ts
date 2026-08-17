import express from 'express';
import cors from 'cors';
import path from 'path';
import { EdgeTTS } from 'node-edge-tts';
import { createServer as createViteServer } from 'vite';
import fs from 'fs/promises';
import os from 'os';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  app.post('/api/tts', async (req, res) => {
    try {
      const { text, lang = 'en', voice, speed = 1, pitch = 0, volume = 1 } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
      }

      if (text.length > 50000) { // Increased limit for long-form
        return res.status(400).json({ error: 'Text exceeds maximum length of 50,000 characters.' });
      }

      // Format speed for edge-tts (e.g. 1.0 -> '+0%', 1.5 -> '+50%', 0.5 -> '-50%')
      let rateStr = '+0%';
      if (speed !== 1) {
        const percent = Math.round((speed - 1) * 100);
        rateStr = percent >= 0 ? `+${percent}%` : `${percent}%`;
      }

      // Format pitch (0 -> default, +10 -> +10Hz)
      let pitchStr = '+0Hz';
      if (pitch !== 0) {
        pitchStr = pitch > 0 ? `+${pitch}Hz` : `${pitch}Hz`;
      }

      // Format volume (1 -> default, 0.5 -> -50%)
      let volStr = '+0%';
      if (volume !== 1) {
        const percent = Math.round((volume - 1) * 100);
        volStr = percent >= 0 ? `+${percent}%` : `${percent}%`;
      }

      // Default voice fallback if not provided
      const targetVoice = voice || 'en-US-AriaNeural';

      const tts = new EdgeTTS({
        voice: targetVoice,
        lang: targetVoice.split('-').slice(0, 2).join('-'), // e.g. en-US
        rate: rateStr,
        pitch: pitchStr,
        volume: volStr
      });

      
      // Simple sentence-aware chunking (approx 500 chars max)
      const chunks = [];
      const sentences = text.match(/[^.?!।]+[.?!।]+|\s+[^.?!।]+/g) || [text];
      
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
        
        const tmpPath = path.join(os.tmpdir(), `voiceforge_chunk_${Date.now()}_${i}.mp3`);
        await tts.ttsPromise(chunk, tmpPath);
        
        const buffer = await fs.readFile(tmpPath);
        buffers.push(buffer);
        
        // Clean up temp file
        await fs.unlink(tmpPath).catch(() => {});
      }

      const finalBuffer = Buffer.concat(buffers);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="voiceover_${Date.now()}.mp3"`,
        'Content-Length': finalBuffer.length,
      });

      res.send(finalBuffer);
    } catch (error) {
      console.error('TTS Generation Error:', error, { targetVoice, textLength: text.length, rateStr, pitchStr, volStr });
      res.status(500).json({ 
        error: 'Failed to generate speech. Please try again or check the language/voice configuration.',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
