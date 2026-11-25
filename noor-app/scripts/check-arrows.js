const fs = require('fs');
const content = fs.readFileSync('noor-app/app/surah/[id].tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('التالية') || line.includes('السابقة')) {
    console.log(`${i+1}: ${line}`);
  }
});
