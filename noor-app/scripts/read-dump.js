const fs = require('fs');
const xml = fs.readFileSync('noor-app/window_dump.xml', 'utf8');
const matches = [...xml.matchAll(/text="([^"]+)"/g)].map(m => m[1]);
console.log('--- SCREEN TEXTS ---');
console.log(matches);
