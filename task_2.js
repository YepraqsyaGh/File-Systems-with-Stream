// Transform Streams Homework
const { Transform } = require('stream');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

const readJsonFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    
    return [];

  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
};

const writeJsonFile = (filePath, jsonArray) => {
  fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), 'utf8');
};

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const input = chunk.toString().trim();
    const obj = { user: input, timestamp: new Date().toISOString() };
    const jsonArray = readJsonFile(filePath);
    jsonArray.push(obj);
    writeJsonFile(filePath, jsonArray);

    this.push(JSON.stringify(jsonArray, null, 2));
    callback();
  }
});

process.stdin.on('data', (chunk) => {
  transformStream.write(chunk);
});

transformStream.on('data', (chunk) => {
  console.log(chunk.toString());
});

process.stdin.on('end', () => {
  transformStream.end();
});

transformStream.on('end', () => {
  console.log('Transform stream ended.');
});
