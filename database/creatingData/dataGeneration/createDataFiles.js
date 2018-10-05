const faker = require('faker');
const fs = require('fs');
const coolImages = require('cool-images');
const ndjson = require('ndjson');
const path = require('path');
const { createArtists, createAlbums, createSongs } = require('./createArtists.js');

// var generateData = (numToGenerate = 25000, currentArtistID) => new Promise(async (resolve, reject) => {
const generateData = (numToGenerate = 25000, currentArtistID) => {
  if (typeof numToGenerate !== 'number' || numToGenerate < 0) {
    return console.error('Requires a valid number of records to generate, please try again')
  }
  // var allArtists = await createArtists(numToGenerate, currentArtistID, resolve);
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
  console.log('--------Starting the data generation script---------');
  for (var i = 0; i < 2; i++) {
    let dataFile = path.join(__dirname + `/dataFiles/json/data${i}.json`);
    var outputStream = fs.createWriteStream(dataFile); // {flags: 'a'}
    let artists = JSON.stringify(generateData(10000, currentArtistID));
    await loopRecords(artists, outputStream);
    currentArtistID += 10000;
    console.log(`Finished writing ${currentArtistID} files!`);
  }
  console.log('-------Finished running the data generation script--------');
}

createRecords();


module.exports = { generateData };
