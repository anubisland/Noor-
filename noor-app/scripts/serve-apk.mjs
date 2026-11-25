import http from 'http';
import fs from 'fs';
import path from 'path';

const apkPath = path.resolve('android/app/build/outputs/apk/debug/app-debug.apk');

if (!fs.existsSync(apkPath)) {
  console.error('APK file not found at:', apkPath);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (!fs.existsSync(apkPath)) {
    res.writeHead(404);
    res.end('APK not found');
    return;
  }
  const currentSize = fs.statSync(apkPath).size;
  console.log(`Download started by: ${req.socket.remoteAddress} (size: ${(currentSize / 1024 / 1024).toFixed(1)} MB)`);
  res.writeHead(200, {
    'Content-Type': 'application/vnd.android.package-archive',
    'Content-Disposition': 'attachment; filename="zad-al-quran.apk"',
    'Content-Length': currentSize,
  });

  const stream = fs.createReadStream(apkPath);
  stream.pipe(res);
  stream.on('end', () => {
    console.log(`Download completed successfully for: ${req.socket.remoteAddress}`);
  });
});

server.listen(8000, '0.0.0.0', () => {
  console.log('APK Server is running at http://0.0.0.0:8000');
  console.log('You can download the APK from: http://10.0.0.175:8000');
});
