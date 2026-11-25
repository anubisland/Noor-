const fs = require('fs');
const xml = fs.readFileSync('noor-app/window_dump.xml', 'utf8');
const regex = /text="([^"]+)"(?:(?!bounds=).)*bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/gs;
let match;
while ((match = regex.exec(xml)) !== null) {
  if (match[1].trim()) {
    console.log(`${match[1]}: center=(${Math.round((+match[2] + +match[4])/2)}, ${Math.round((+match[3] + +match[5])/2)})`);
  }
}
