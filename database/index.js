const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/spotify');

const db = mongoose.connection;
const { generateData } = require('../dataGeneration.js');



const ArtistSchema = new mongoose.Schema({
  artistID: Number,
  artistName: String,
  albums: [{
    albumID: Number,
    albumName: String,
    albumImage: String,
    publishedYear: Number,
    songs: [{
      songID: Number,
      songName: String,
      streams: Number,
      length: Number,
      popularity: Number,
      addedToLibrary: Boolean
    }]
  }]
});

const Artist = mongoose.model('Artist', ArtistSchema);

const getArtist = (artistID, cb) => {
  Artist.find({ 'artistID': artistID }, (err, data) => {
    if (err) throw err;
    cb(data);
  });
}

const postArtist = (artistID, cb) => {
  Artist.count({}, (err, numOfRecords) => {
    if (err) throw err;
    let newArtist = generateData(1)[0];
    newArtist.artistID = numOfRecords + 1;
    Artist.create(newArtist, (err, data) => {
      if (err) throw err;
      cb();
    });
  });

}

module.exports = { db, Artist, getArtist, postArtist };
