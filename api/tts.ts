import { EdgeTTS } from 'node-edge-tts';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import { Buffer } from 'buffer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { text, lang = 'en', voice, speed = 1, pitch = 0, volume = 1 } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    if (text.length > 50000) {
      return res.status(400).json({ error: 'Text exceeds maximum length of 50,000 characters.' });
    }

    let rateStr = '+0%';
    if (speed !== 1) {
      const percent = Math.round((speed - 1) * 100);
      rateStr = percent >= 0 ? \`+\${percent}%\` : \`\${percent}%\`;
    }

    let pitchStr = '+0Hz';
    if (pitch !== 0) {
      pitchStr = pitch > 0 ? \`+\${pitch}Hz\` : \`\${pitch}Hz\`;
    }

    let volStr = '+0%';
    if (volume !== 1) {
      const percent = Math.round((volume - 1) * 100);
      volStr = percent >= 0 ? \`+\${percent}%\` : \`\${percent}%\`;
    }

    const targetVoice = voice || 'en-US-AriaNeural';
    const tts = new EdgeTTS({
      voice: targetVoice,
      lang: targetVoice.split('-').slice(0, 2).join('-'), 
      rate: rateStr,
      pitch: pitchStr,
      volume: volStr
    });

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
      
      const tmpPath = path.join(os.tmpdir(), \`voiceforge_vercel_\${Date.now()}_\${i}.mp3\`);
      await tts.ttsPromise(chunk, tmpPath);
      
      const buffer = await fs.readFile(tmpPath);
      buffers.push(buffer);
      
      await fs.unlink(tmpPath).catch(() => {});
    }

    const finalBuffer = Buffer.concat(buffers);
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', \`attachment; filename="voiceover_\${Date.now()}.mp3"\`);
    res.setHeader('Content-Length', finalBuffer.length);
    
    return res.send(finalBuffer);

  } catch (error) {
    console.error('Vercel TTS Generation Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate speech on Vercel.',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
