const fs = require('fs');
const xml = fs.readFileSync('noor-app/window_dump.xml', 'utf8');
function findBounds(text) {
  const regex = new RegExp(`text="${text}"[^>]*bounds="([^"]+)"`);
  const match = xml.match(regex);
  if (match) {
    const [_, bounds] = match;
    const [__, x1, y1, x2, y2] = bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
    const cx = Math.floor((parseInt(x1) + parseInt(x2)) / 2);
    const cy = Math.floor((parseInt(y1) + parseInt(y2)) / 2);
    console.log(`${text} -> bounds: ${bounds}, center: ${cx}, ${cy}`);
    return { cx, cy };
  } else {
    console.log(`${text} not found`);
    return null;
  }
}
findBounds('التكرار');
findBounds('إكمال الفراغات');
findBounds('التسميع');
