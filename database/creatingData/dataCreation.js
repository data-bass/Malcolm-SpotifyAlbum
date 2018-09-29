const faker = require('faker');
const coolImages = require('cool-images');
const path = require('path');
const fs = require('fs');


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

const createArtists = (numToGenerate = 25000, currentArtistID, resolve) => {
  const artists = [];
  for (var i = 1; i < numToGenerate + 1; i++) {
    let artist = {
      artistID: currentArtistID + i,
      artistName: faker.name.findName(),
      albums: createAlbums(currentArtistID, i),
    }
    // await writeToCSV('artists', artist, streams);
    // await fakeFunction();
    // resolve();
    artists.push(artist);
  }
  return artists;
};

const createAlbums = (currentArtistID, index) => {
  const albums = [];
  const albumNumber = Math.floor(Math.random() * 10) + 1;
  for (var j = 1; j < albumNumber + 1; j++) {
    let album = {
      albumID: (currentArtistID + index) * 100 + j,
      albumName: faker.random.words(),
      albumImage: coolImages.one(400, 400),
      publishedYear: Math.floor(Math.random() * 69) + 1950,
      songs: createSongs(currentArtistID, index, j),
    }
    // await writeToCSV('albums', album, streams);
    // await fakeFunction();
    albums.push(album);
  }
  return albums;
};

const createSongs = (currentArtistID, index, albumNumber) => {
  const songs = [];
  var songNumber = Math.floor(Math.random() * 21) + 9;
  for (var k = 1; k < songNumber + 1; k++) {
    let song = {
      songID: (currentArtistID + index) * 1000 + albumNumber * 10 + k,
      songName: faker.random.words(),
      streams: Math.floor(Math.random() * 250000000),
      length: Math.floor(Math.random() * 221) + 30,
      popularity: Math.floor(Math.random() * 8) + 1,
      addedToLibrary: faker.random.boolean()
    }
    // await writeToCSV('songs', song, streams);
    // await fakeFunction();
    songs.push(song);
  }
  return songs;
};

module.exports = { createArtists, createAlbums, createSongs };
