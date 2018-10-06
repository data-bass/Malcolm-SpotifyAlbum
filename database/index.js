const newRelic = require('newrelic');
const { Client } = require('pg');


const client = new Client({
  user: 'malcolmjones',
  host: 'localhost',
  database: 'malcolmjones',
  port: 5432
})
await client.connect();

const getArtist = async (artistID, cb) => {
  let res = await client.query(`SELECT * FROM artists WHERE artistid = ${artistID};`);
  //add error handling
  cb(res);

  // Artist.find({ 'artistID': artistID }, (err, data) => {
  //   if (err) throw err;
  //   cb(data);
  // });
}

const postArtist = (artistID, cb) => {
  Artist.count({}, (err, numOfRecords) => {
    if (err) throw err;
    let newArtist = generateData(1)[0];
    newArtist.artistID = numOfRecords + 1;
    Artist.create(newArtist, (err, data) => {
      if (err) throw err;
      cb();
    }); cons
  });
}

const updateArtist = (artistInfo, cb) => {
  const { artistID, data } = artistInfo;
  Artist.findOneAndUpdate({ 'artistID': artistID }, data, (err, artists) => {
    if (err) throw err;
    cb();
  });
}

const deleteArtist = (artistID, cb) => {
  Artist.deleteOne({ 'artistID': artistID }, (err) => {
    if (err) throw err;
    cb();
  });
}

module.exports = { db, Artist, getArtist, postArtist, updateArtist, deleteArtist };
