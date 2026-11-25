const fs = require('fs');
const content = fs.readFileSync('./data/topics.ts', 'utf8');
const start = content.indexOf('[\n  {');
const end = content.lastIndexOf(']');
const topics = JSON.parse(content.slice(start, end + 1));
console.log('Total topics:', topics.length);
topics.forEach((t, i) => {
  console.log(`${i+1}. ${t.id} (${t.title}): ${t.verses.length} verses, ${t.hadiths.length} hadiths`);
});
