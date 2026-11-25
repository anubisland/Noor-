const fs = require('fs');
const content = fs.readFileSync('noor-app/app/surah/[id].tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Modal') || l.includes('settings') || l.includes('showSettings')) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
