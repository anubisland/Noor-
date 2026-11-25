const fs = require('fs');
const path = require('path');

function searchAll(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'android') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchAll(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const txt = fs.readFileSync(full, 'utf8');
      const lines = txt.split('\n');
      lines.forEach((l, i) => {
        if (/إصدار|اصدار|version|Constants\.expoConfig/i.test(l)) {
          console.log(`${full}:${i+1}: ${l.trim()}`);
        }
      });
    }
  }
}
searchAll('noor-app');
