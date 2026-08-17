import fetch from 'node-fetch';

async function test() {
  const text = `বৃষ্টির শব্দে চারপাশটা নিস্তব্ধ হয়ে ছিল। রাহুল জানালার পাশে বসে বই পড়ছিল।

হঠাৎ দরজায় তিনবার টোকা পড়ল।

রাহুল দরজা খুলে দেখল, বাইরে কেউ নেই।

কিন্তু মাটিতে একটা পুরোনো চিঠি পড়ে ছিল। চিঠির ওপরে শুধু লেখা ছিল—

"রাহুল, আজ রাতে বাড়ির বাইরে যেও না।"

চিঠিটা পড়ে রাহুল কিছুক্ষণ চুপ করে দাঁড়িয়ে রইল।

ঠিক তখনই বাইরে থেকে আবার দরজায় টোকা পড়ল।`;

  const res = await fetch('http://localhost:3000/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
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
