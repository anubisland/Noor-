const fs = require('fs');
const content = fs.readFileSync('./data/topics.ts', 'utf8');
const clean = content
  .replace(/export interface QuranTopic[\s\S]*?;\n/, '')
  .replace('export const quranTopics: QuranTopic[] =', 'module.exports =');
fs.writeFileSync('./scripts/temp-topics.js', clean);
const topics = require('./temp-topics.js');
console.log('Total topics:', topics.length);
topics.forEach(t => {
  console.log(`${t.id} (${t.title}): ${t.verses.length} verses, ${t.hadiths.length} hadiths`);
});
