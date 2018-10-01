const faker = require('faker');
const coolImages = require('cool-images');
const path = require('path');
const fs = require('fs');

const countAlbums = (createArtistID, i) => {
  const numAlbums = createAlbums(currentArtistID, i).length;
  const refIds = [];

  for (var i = 0; i < numAlbums; i++) {
    const albumID = currentArtistID * 100 + i;
    refIds.push(albumID);
  }
  return refIds;
}


const createArtists = (numToGenerate = 25000, currentArtistID, resolve) => {
  const artists = [];
  for (var i = 1; i < numToGenerate + 1; i++) {
    let artist = {
      artistID: currentArtistID + i,
      artistName: faker.name.findName(),
      albums: countAlbums(createArtistID, i),
    }
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
    songs.push(song);
  }
  return songs;
};

module.exports = { createArtists, createAlbums, createSongs };
