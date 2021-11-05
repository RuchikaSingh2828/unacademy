const { createGzip } = require('zlib');
const {  createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');

const gzip = createGzip();
const inputStream = createReadStream('input.txt');
const destinationStream = createWriteStream('input.txt.gz');

pipeline(inputStream, gzip, destinationStream, (err) => {
  if(err) {
    console.error('An error occurred : ', err);
    process.exitCode = 1;
  }
})
