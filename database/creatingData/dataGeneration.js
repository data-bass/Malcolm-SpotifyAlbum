const faker = require('faker');
const fs = require('fs');
const coolImages = require('cool-images');
const ndjson = require('ndjson');
const path = require('path');
const { createArtists, createAlbums, createSongs } = require('./dataCreation.js');

var generateData = (numToGenerate = 25000, currentArtistID) => {
  if (typeof numToGenerate !== 'number' || numToGenerate < 0) {
    return console.error('Requires a valid number of records to generate, please try again')
  }
  var allArtists = createArtists(numToGenerate, currentArtistID);
  currentArtistID += numToGenerate;
  return allArtists;
};

var currentArtistID = 0;

const loopRecords = (artists, outputStream) => new Promise((resolve, reject) => {
  outputStream.write(artists, 'utf-8', (err) => {
    outputStream.end(() => {
      resolve();
    });
  });
});

const createRecords = async () => {
  console.log('--------Starting the data generation script---------')
  for (var i = 0; i < 400; i++) {
    let dataFile = path.join(__dirname + `/dataFiles/data${i}.json`);
    var outputStream = fs.createWriteStream(dataFile); // {flags: 'a'}
    let artists = JSON.stringify(generateData(25000, currentArtistID));
    await loopRecords(artists, outputStream);
    currentArtistID += 25000;
    console.log(`Finished writing ${currentArtistID} files!`);
  }
  console.log('-------Finished running the data generation script--------');
}

createRecords();


module.exports = { generateData };
