// Implementing Basic Back Pressure
const fs = require('fs');
const path = require('path');
const { Readable, Writable } = require('stream');

const readable = new Readable({
    read(size) {
        this.push(null);
    }
});

const writable = new Writable({
    write(chunk, encoding, callback) {
        console.log(`Writing: ${chunk.toString()}`);
        setTimeout(callback, 1000);
    }
});

readable.pipe(writable);

writable.on('drain', () => {
    console.log('Writable stream is drained, resuming readable stream');
});

writable.on('finish', () => {
    console.log('All data successfully written to the writable stream');
});
