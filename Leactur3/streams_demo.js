var fs = require('fs');
const transformStream = require('stream');
const zlib = require('zlib')

const zipper = zlib.createGzip();
const archiever = zlib.createGunZip();

let inputStream = fs.createReadStream(__dirname + "/input.txt");
// to write the creates stream into a new file we need to create a write stream
let targetStream = fs.createWriteStream(__dirname + "/output.txt");

let outputStream = process.stdout;

let midStream = new transformStream.Transform({
  transform(chunk, en, nextCB ) {
    this.push(chunk.toString().toUpperCase());
    setTimeout(nextCB,1000);
  }
})


inputStream.pipe(midStream).pipe(targetStream);

//homework - create a zip folder as a target stream 
// use const zlib = require('zlib')

