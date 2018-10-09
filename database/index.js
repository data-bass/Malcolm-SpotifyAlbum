const { Client, Pool } = require('pg');
const { createArtistInfoArray } = require('./creatingData/dataGeneration/createArtistInfo');

const pool = new Pool({
  user: 'malcolmjones',
  host: 'localhost',
  database: 'malcolmjones',
  max: 500,
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});



const getArtist = (artistID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM artists
                    INNER JOIN albums ON artists.artistid = albums.artistid
                    INNER JOIN songs ON albums.albumid = songs.albumid
                    WHERE artists.artistid = 7863212;`
    pool.query(query, (err, data) => {
      if (data) {
        resolve(data.rows[0]);
        // cb(data.rows[0]);
      } else {
        // cb(undefined, null);
      }
    });
  });
};



//turn artistsID into an array *********
const postArtist = (artistID, cb) => {
  const query = `INSERT INTO artists VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
  // ADD AN AUTO INCRMENTER ************
  const count = `SELECT COUNT (*) FROM artists`;
  pool.query(count, (err, numOfRecords) => {
    if (err) return console.error(err);
    newArtist = createArtistInfoArray();
    newArtist[0] = numOfRecords + 1; // changes artistID

    // ******************
    // NEED TO ADD CHANGE FOR ALBUMID
    // NEED TO ADD CAHNGE FOR SONGID
    // ******************

    client.query(query, newArtist, (err, data) => {
      if (err) return console.error(err);
      cb(err);
    }); cons
  });
};
//************************************ 
// ******** Completely Refactor *******
//************************************ 
const updateArtist = (artistInfo, cb) => {
  const { artistID, data } = artistInfo;
  pool.query({ 'artistID': artistID }, data, (err, artists) => {
    if (err) throw err;
    cb();
  });
};
//************************************ 
// ******** Completely Refactor *******
//************************************ 
const deleteArtist = (artistID, cb) => {
  Artist.deleteOne({ 'artistID': artistID }, (err) => {
    if (err) throw err;
    cb();
  });
};

module.exports = { getArtist, postArtist, updateArtist, deleteArtist };
