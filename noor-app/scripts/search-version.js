const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'android') continue;
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      searchDir(full);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('الإصدار') || content.includes('الاصدار')) {
        console.log(`Found in: ${full}`);
        const lines = content.split('\n');
        lines.forEach((l, i) => {
          if (l.includes('الإصدار') || l.includes('الاصدار')) {
            console.log(`  Line ${i+1}: ${l.trim()}`);
          }
        });
      }
    }
  }
}

searchDir('noor-app');
