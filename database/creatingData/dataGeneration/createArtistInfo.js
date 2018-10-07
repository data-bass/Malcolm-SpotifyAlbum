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

const convertObjectToCsv = (obj) => {
  const values = Object.values(obj);
  const joinedValues = values.join('|') + '\n';
  return joinedValues;
};

const createArtistInfoArray = () => {
  const artistValues = getValues(createArtist());
  const albumValues = getValues(createAlbum());
  const songValues = getValues(createSong());
  let values = [artistValues, albumValues, songValues];
  return flatten(values);
};

const getValues = (obj) => {
  var valuesArray = [];
  for (let key in obj) {
    valuesArray.push(obj[key]);
  }
  return valuesArray;
}

const flatten = (outerArray) => {
  let flattenedArray = [];
  outerArray.map(innerArray => {
    return innerArray.reduce((acc, val) => {
      acc.push(val);
      return acc;
    }, flattenedArray);
  });
  return flattenedArray;
}

module.exports = { createArtist, createAlbum, createSong, convertObjectToCsv, createArtistInfoArray };
