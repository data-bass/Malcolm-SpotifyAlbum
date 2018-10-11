const { Client, Pool } = require('pg');

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

const createArtistInfoArray = () => {
  const artistValues = getValues(createArtist());
  const albumValues = getValues(createAlbum());
  const songValues = getValues(createSong());
  let values = [artistValues, albumValues, songValues];
  return flatten(values);
};

const pool = new Pool({
  user: 'power_user',
  password: 'pass',
  host: '18.224.214.191',
  database: 'spotify',
  max: 500,
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const getArtist = (artistID) => {
  console.log('About to execute the get query');
  return new Promise((resolve, reject) => {
    // const query = `SELECT * FROM artists
    //                 INNER JOIN albums ON artists.artistid = albums.artistid
    //                 INNER JOIN songs ON albums.albumid = songs.albumid
    //                 WHERE artists.artistid = ${artistID};`

    const query = `select * from artists where artists.artistid = ${artistID};`
    pool.query(query, (err, data) => {
      if (data) {
        // console.log(data);
        resolve(data.rows[0]);
        // cb(data.rows[0]);
      } else {
        // resolve({ aritstName: 'No name here fam, error town' });
        resolve(console.error(err));
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
