const text = `A. B. C.`;
const sentences = text.match(/[^.?!।]+[.?!।]+|\s+[^.?!।]+/g) || [text];
console.dir(sentences);
