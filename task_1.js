//  Basic Stream Operations
const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'output.txt');

const readStream = fs.createReadStream(inputFilePath);
const writeStream = fs.createWriteStream(outputFilePath);

readStream.pipe(writeStream);
  
readStream
.on('data', (chunk) => {
   writeStream.write(chunk);
})
.on('error', function(err) {
    console.log(err.stack);
 });

writeStream.on('error', (err) => {
    console.error('Error writing file:', err);
});


