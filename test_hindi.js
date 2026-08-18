import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:3000/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: "God-Level Puppet? वह कितना दुर्लभ होता है",
      lang: "hi",
      voice: "hi-IN-MadhurNeural"
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
