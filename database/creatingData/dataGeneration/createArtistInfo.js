const faker = require('faker');
const coolImages = require('cool-images');
const path = require('path');
const fs = require('fs');

const numOfArtists = 0;
const numOfAlbums = 0;
const numOfSongs = 0;
const currentAlbumID = 0;


const createArtist = () => {
  var artist = {
    artistID: numOfArtists,
    artistName: faker.name.findName(),
    // albums: await createAlbums(numOfArtists),
  }
  return artist;
};

const createAlbum = () => {
  var album = {
    albumID: numOfAlbums,
    albumName: faker.random.words(),
    albumImage: coolImages.one(400, 400),
    publishedYear: Math.floor(Math.random() * 69) + 1950,
    artistID: numOfArtists,
    // songs: await createSongs(numOfAlbums),
  }
  return album;
};

const createSong = () => {
  var song = {
    songID: numOfSongs,
    songName: faker.random.words(),
    streams: Math.floor(Math.random() * 250000),
    length: Math.floor(Math.random() * 221) + 30,
    popularity: Math.floor(Math.random() * 8) + 1,
    addedToLibrary: faker.random.boolean(),
    albumID: currentAlbumID,
  }
  return song;
};


module.exports = { createArtist, createAlbum, createSong, convertObjectToCsv };
