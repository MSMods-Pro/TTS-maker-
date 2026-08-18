import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Fix the audio generation response handling
content = content.replace(
  /const blob = await response\.blob\(\);\s*const url = URL\.createObjectURL\(blob\);\s*setAudioUrl\(url\);/,
  `const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("TTS provider returned empty audio data.");
      }
      
      const url = URL.createObjectURL(blob);
      
      // Validate audio duration
      const audio = new Audio(url);
      await new Promise((resolve, reject) => {
        audio.onloadedmetadata = () => {
          if (audio.duration > 0) {
            resolve(true);
          } else {
            reject(new Error("Generated audio is empty or has 0 duration."));
          }
        };
        audio.onerror = () => {
          reject(new Error("Generated audio could not be decoded."));
        };
      });

      setAudioUrl(url);`
);

// Fix the width issues on mobile
content = content.replace(
  /animate={{ opacity: 1, width: 'auto', marginLeft: 0 }}/g,
  `animate={{ opacity: 1, marginLeft: 0 }}`
);
content = content.replace(
  /initial={{ opacity: 0, width: 0, marginLeft: 0 }}/g,
  `initial={{ opacity: 0, marginLeft: 0 }}`
);
content = content.replace(
  /exit={{ opacity: 0, width: 0, marginLeft: 0 }}/g,
  `exit={{ opacity: 0, marginLeft: 0 }}`
);

// We should also remove width:0 on small screens but for desktop we want to hide it completely on FocusMode.
// Actually, if we just remove the motion.div width animation, it will toggle instantly or fade out, which is fine.

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx fixed');
