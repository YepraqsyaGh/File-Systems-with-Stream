// HTTP Streaming
const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Disposition': 'attachment; filename=text.txt'
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);

  readStream.on('error', (err) => {
    console.error('Error reading file:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });

  readStream.on('end', () => {
    console.log('File streaming completed.');
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
