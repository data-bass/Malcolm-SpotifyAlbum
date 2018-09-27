const faker = require('faker');
const fs = require('fs');
const coolImages = require('cool-images');

var generateData = (numToGenerate = 100) => {
  if (typeof numToGenerate !== 'number' || numToGenerate < 0) {
    return console.error('Requires a valid number of records to generate, please try again')
  }

  var allArtists = [];

  for (let i = 1; i < numToGenerate + 1; i++) {
    let artist = {
      artistID: i,
      artistName: faker.name.findName(),
      albums: []
    }
    var albumNumber = Math.floor(Math.random() * 4) + 1;
    for (let j = 1; j < albumNumber + 1; j++) {
      let album = {
        albumID: i * 100 + j,
        albumName: faker.random.words(),
        albumImage: coolImages.one(400, 400),
        publishedYear: Math.floor(Math.random() * 69) + 1950,
        songs: []
      }
      var songNumber = Math.floor(Math.random() * 10) + 12;
      for (let k = 1; k < songNumber + 1; k++) {
        let song = {
          songID: i * 1000 + j * 10 + k,
          songName: faker.random.words(),
          streams: Math.floor(Math.random() * 250000000),
          length: Math.floor(Math.random() * 221) + 30,
          popularity: Math.floor(Math.random() * 8) + 1,
          addedToLibrary: faker.random.boolean()
        }
        album.songs.push(song);
      }
      artist.albums.push(album);
    }
    allArtists.push(artist);
  }

  return allArtists;
};

const writeToFile = () => {
  if (persistingData === undefined || persistingData.length === 0) {
    return console.error('Current data is undefined or empty, please initialize data');
  }

  fs.writeFile('data.json', JSON.stringify(persistingData), 'utf8', (err) => {
    if (err) throw err;
    console.log("File written!");
  });
}

let persistingData = generateData() || undefined;
console.log('I ran the data generation script');

module.exports = { generateData };

