const faker = require('faker');
const coolImages = require('cool-images');
const path = require('path');
const fs = require('fs');

const { createArtist, createAlbum, createSong, convertObjectToCsv } = require('./../../creatingData/dataGeneration/createArtists');

let numOfArtists = 0;
let numOfAlbums = 0;
let numOfSongs = 0;

let artistFile = undefined;
let artistStream = undefined;

let albumFile = undefined;
let albumStream = undefined;

let songFile = undefined;
let songStream = undefined;

const artistHeaders = "artistID,artistName";
const albumHeaders = "albumID,albumName,albumImage,publishedYear,artistID";
const songHeaders = "songID,songName,streams,length,popularity,addedToLibrary,albumID";

const createArtist = () => new Promise(async (resolve, reject) => {
  let artist = createArtist();
  await createAlbums(numOfArtists);
  await artistStream.write(convertObjectToCsv(artist), 'utf-8', () => { resolve(); });
  return artist;
});

const createAlbums = () => new Promise(async (resolve, reject) => {
  const albums = [];
  const albumIDs = [];
  // const albumNumber = Math.floor(Math.random() * 8) + 1;
  const albumNumber = 2;
  for (var j = 1; j < albumNumber + 1; j++) {
    const currentAlbumID = (numOfArtists) * 1000 + j;

    let album = createAlbum();
    await createSongs(numOfAlbums);
    await albumStream.write(convertObjectToCsv(album), 'utf-8', () => { resolve(); });

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
    let song = createSong();
    await songStream.write(convertObjectToCsv(song), 'utf-8', () => { resolve(); });

    // songs.push(song);
    songIDs.push('""' + numOfSongs + '""');
    numOfSongs++;
  }
  resolve("[" + songIDs + "]");
  return;
});

const createFileStreams = (fileNumber) => {
  artistFile = path.join(__dirname, `/dataFiles/csv/${'artists'}/data${fileNumber}.csv`);
  artistStream = fs.createWriteStream(artistFile);

  albumFile = path.join(__dirname, `/dataFiles/csv/${'albums'}/data${fileNumber}.csv`);
  albumStream = fs.createWriteStream(albumFile);

  songFile = path.join(__dirname, `/dataFiles/csv/${'songs'}/data${fileNumber}.csv`);
  songStream = fs.createWriteStream(songFile);
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

const numOfFiles = 13;
const startingFile = 11;
const writeCsvFile = async () => {
  console.log('--------Starting the data generation script---------');
  for (let currentFileNumber = startingFile; currentFileNumber < numOfFiles; currentFileNumber++) {
    createFileStreams(currentFileNumber);
    await Promise.all([writeHeaders(artistHeaders, artistStream), writeHeaders(albumHeaders, albumStream), writeHeaders(songHeaders, songStream)]);

    for (let i = 1; i < 100000; i++) {
      await createArtist();
      numOfArtists += 1;
    }

    console.log(`Finished writing file ${currentFileNumber + 1}!`);
    await Promise.all([closeFileStream(artistStream), closeFileStream(albumStream), closeFileStream(songStream)]);
  }
  console.log('-------Finished running the data generation script--------');
}

writeCsvFile();

module.exports = { artistHeaders, albumHeaders, songHeaders, numOfFiles, startingFile };
