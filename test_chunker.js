const text = `বৃষ্টির শব্দে চারপাশটা নিস্তব্ধ হয়ে ছিল। রাহুল জানালার পাশে বসে বই পড়ছিল।

হঠাৎ দরজায় তিনবার টোকা পড়ল।

রাহুল দরজা খুলে দেখল, বাইরে কেউ নেই।

কিন্তু মাটিতে একটা পুরোনো চিঠি পড়ে ছিল। চিঠির ওপরে শুধু লেখা ছিল—

"রাহুল, আজ রাতে বাড়ির বাইরে যেও না।"

চিঠিটা পড়ে রাহুল কিছুক্ষণ চুপ করে দাঁড়িয়ে রইল।

ঠিক তখনই বাইরে থেকে আবার দরজায় টোকা পড়ল।`;

const sentences = text.match(/[^.?!।]+[.?!।]+|\s+[^.?!।]+/g) || [text];

const chunks = [];
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

console.log(`Generated ${chunks.length} chunks`);
chunks.forEach((c, i) => console.log(`Chunk ${i}: [${c}]`));
