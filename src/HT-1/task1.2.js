const fs = require('fs');
const { Converter } = require('csvtojson');

const csvFilePath = 'src/assets/nodejs-hw1-ex1.csv';

const csvConverter = new Converter({ constructResult: false, toArrayString: true });
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream('nodejs19-hw1-ex2.txt');

readStream.pipe(csvConverter).pipe(writeStream);
