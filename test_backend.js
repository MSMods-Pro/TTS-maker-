import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:3000/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: "বৃষ্টির শব্দে চারপাশটা নিস্তব্ধ হয়ে ছিল।",
      lang: "bn",
      voice: "bn-IN-BashkarNeural"
    })
  });
  
  if (!res.ok) {
    const json = await res.json();
    console.log("Error response:", json);
  } else {
    const buffer = await res.arrayBuffer();
    console.log("Success! Audio length:", buffer.byteLength);
  }
}
test();
