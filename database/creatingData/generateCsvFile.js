const faker = require('faker');
const coolImages = require('cool-images');
const path = require('path');
const fs = require('fs');

var numOfArtists = 1;
var numOfAlbums = 1;
var numOfSongs = 1;

let dataFile = undefined;
let dataFile2 = undefined;
let dataFile3 = undefined;
let dataStream = undefined;
let dataStream2 = undefined;
let dataStream3 = undefined;

const artistHeaders = "artistID,artistName";
const albumHeaders = "albumID,albumName,albumImage,publishedYear,artistID";
const songHeaders = "songID,songName,streams,length,popularity,addedToLibrary,albumID";

const convertObject = (obj) => {
  const values = Object.values(obj);
  const joinedValues = values.join('|') + '\n';
  return joinedValues;
}

const createArtist = () => new Promise(async (resolve, reject) => {
  let artist = {
    artistID: numOfArtists,
    artistName: faker.name.findName(),
    // albums: await createAlbums(numOfArtists),
  }
  await createAlbums(numOfArtists);
  await dataStream.write(convertObject(artist), 'utf-8', () => { resolve(); });
  return artist;
});

const createAlbums = () => new Promise(async (resolve, reject) => {
  const albums = [];
  const albumIDs = [];
  // const albumNumber = Math.floor(Math.random() * 8) + 1;
  const albumNumber = 2;
  for (var j = 1; j < albumNumber + 1; j++) {
    const currentAlbumID = (numOfArtists) * 1000 + j;
    let album = {
      albumID: numOfAlbums,
      albumName: faker.random.words(),
      albumImage: coolImages.one(400, 400),
      publishedYear: Math.floor(Math.random() * 69) + 1950,
      artistID: numOfArtists,
      // songs: await createSongs(numOfAlbums),
    }
    await createSongs(numOfAlbums);
    await dataStream2.write(convertObject(album), 'utf-8', () => { resolve(); });
    // albums.push(album);
    albumIDs.push('""' + numOfAlbums + '""');
    numOfAlbums++;
  }
  resolve("[" + albumIDs + "]");
  return;
});

const createSongs = (currentAlbumID) => new Promise(async (resolve, reject) => {
  const songs = [];
  const songIDs = [];
  // var songNumber = Math.floor(Math.random() * 10) + 5;
  var songNumber = 3;
  for (var k = 1; k < songNumber + 1; k++) {
    // const currentSongID = (numOfArtists) * 10000 + currentAlbumID * 100 + k;
    let song = {
      songID: numOfSongs,
      songName: faker.random.words(),
      streams: Math.floor(Math.random() * 250000),
      length: Math.floor(Math.random() * 221) + 30,
      popularity: Math.floor(Math.random() * 8) + 1,
      addedToLibrary: faker.random.boolean(),
      albumID: currentAlbumID,
    }
    await dataStream3.write(convertObject(song), 'utf-8', () => { resolve(); });
    // songs.push(song);
    songIDs.push('""' + numOfSongs + '""');
    numOfSongs++;
  }
  resolve("[" + songIDs + "]");
  return;
});

const createFileStreams = (fileNumber) => {
  dataFile = path.join(__dirname, `/dataFiles/csv/${'artists'}/data${fileNumber}.csv`);
  dataFile2 = path.join(__dirname, `/dataFiles/csv/${'albums'}/data${fileNumber}.csv`);
  dataFile3 = path.join(__dirname, `/dataFiles/csv/${'songs'}/data${fileNumber}.csv`);
  dataStream = fs.createWriteStream(dataFile);
  dataStream2 = fs.createWriteStream(dataFile2);
  dataStream3 = fs.createWriteStream(dataFile3);
};

const writeHeaders = (headers, stream) => new Promise((resolve, reject) => {
  const newlineAdded = headers.concat('\n');
  stream.on('open', () => {
    stream.write(newlineAdded, 'utf-8', (err) => {
      if (err) return console.error(err);
      resolve();
    });
  });
});

const closeFileStream = (stream) => new Promise((resolve, reject) => {
  stream.end();
  stream.on('close', () => {
    resolve();
  });
});

const numOfFiles = 10;
const writeCsvFile = async () => {
  console.log('--------Starting the data generation script---------');
  for (let j = 0; j < numOfFiles; j++) {
    createFileStreams(j);
    await Promise.all([writeHeaders(artistHeaders, dataStream), writeHeaders(albumHeaders, dataStream2), writeHeaders(songHeaders, dataStream3)]);
    for (let i = 1; i < 100000; i++) {
      await createArtist();
      numOfArtists += 1;
    }
    console.log(`Finished writing ${j + 1} files!`);
    await Promise.all([closeFileStream(dataStream), closeFileStream(dataStream2), closeFileStream(dataStream3)]);
  }
  console.log('-------Finished running the data generation script--------');
}

// writeCsvFile();

module.exports = { artistHeaders, albumHeaders, songHeaders, numOfFiles };
