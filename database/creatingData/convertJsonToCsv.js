const fs = require('fs');
const path = require('require');

let artistCount = 0;
let fileNumber = 0;
let dataFile4 = path.join(__dirname, `/dataFiles/csv/${'artists'}/data${fileNumber}.csv`);
let dataStream4 = fs.createWriteStream(dataFile4);
let dataFile2 = path.join(__dirname, `/dataFiles/csv/${'albums'}/data${fileNumber}.csv`);
let dataStream2 = fs.createWriteStream(dataFile2);
let dataFile3 = path.join(__dirname, `/dataFiles/csv/${'songs'}/data${fileNumber}.csv`);
let dataStream3 = fs.createWriteStream(dataFile3);

const streamCreated = (csvStream) => new Promise((resolve, reject) => {
  csvStream.on('open', () => {
    resolve();
  });
});

const fakeFunction = () => new Promise((resolve, reject) => {
  resolve();
});

const createNewFileStream = async (nameOfFile, resolve) => {
  let csvFile = path.join(__dirname, `/dataFiles/csv/${nameOfFile}/data${fileNumber}.csv`);
  let csvStream = fs.createWriteStream(csvFile);
  await streamCreated(csvStream);
  resolve();
  return csvStream;
};

const initializeStreams = () => new Promise((resolve, reject) => {
  streams.artists = dataStream4;
  streams.albums = dataStream2;
  streams.songs = dataStream3;
});

const streams = {};

const writeToCSV = (nameOfFile, obj, streams) => new Promise(async (resolve, reject) => {
  if (artistCount === 0 && fileNumber === 0) {
    console.log('entered intialization');
    await initializeStreams();
    console.log('finished initialization');
  }
  console.log(artistCount);
  streams[nameOfFile].write(JSON.stringify(obj), 'utf-8', (err) => {
    artistCount++;
    if (artistCount === 25000) {
      fileNumber++;
      artistCount = 0;
      csvStream.end(() => {
        streams[nameOfFile] = createNewFileStream(nameOfFile, resolve);
      });
    }
  });
});

module.exports = { writeToCSV };