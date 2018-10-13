const { Client, Pool } = require('pg');
const redis = require('redis');
const bluebird = require('bluebird');
const redisClient = redis.createClient(6379, '18.223.98.213');



redisClient.on('connect', () => {
  console.log('Redis connected');
  bluebird.promisifyAll(redisClient);
});
redisClient.on('ready', () => {
  console.log('Redis ready');
});
redisClient.on('error', (err) => {
  console.log('Redis error:', err.message);
});

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

let pool = new Pool({
  user: 'power_user',
  password: 'pass',
  host: '18.224.214.191',
  database: 'spotify',
  max: 500,
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

bluebird.promisifyAll(pool);

// const getArtist = (artistID) => {
//   return new Promise((resolve, reject) => {
//     // const query = `SELECT * FROM artists
//     //                 INNER JOIN albums ON artists.artistid = albums.artistid
//     //                 INNER JOIN songs ON albums.albumid = songs.albumid
//     //                 WHERE artists.artistid = ${artistID};`

//     const query = `select * from artists where artists.artistid = ${artistID};`
//     pool.query(query, (err, data) => {
//       if (data) {
//         resolve(data.rows[0]);
//       } else {
//         resolve(console.error(err));
//       }
//     });
//   });
// };

const getArtist = (req, res) => {
  // const artistID = req.params.artistID || 2222222;
  const query = `SELECT * FROM artists
                  INNER JOIN albums ON artists.artistid = albums.artistid
                  INNER JOIN songs ON albums.albumid = songs.albumid
                  WHERE artists.artistid = ${req.params.artistID};`
  pool.queryAsync(query).then((data) => {
    if (data) {
      res.send(data.rows[0]);
      setCache(req.params.artistID, data.rows[0]);
    }
  }).catch(err => console.error(err));
};


// const getCache = (artistID) => {
//   console.log('about to execute the cache');
//   return new Promise((resolve, reject) => {
//     redisClient.getAsync(artistID).then((err, artistInfo) => {
//       if (artistInfo) {
//         resolve(artistInfo);
//       } else {
//         console.log('going to call get artist');
//         getArtist(artistID).then(artistInfo => {
//           resolve(artistInfo);
//         }).catch(err => {
//           res.send('There was an error with finding the artist you searched for!');
//         });
//       };
//     });
//   });
// };

const getCache = (req, res, next) => {
  // const artistID = req.params.artistID || 2222222;
  redisClient.getAsync(req.params.artistID).then((data) => {
    if (data != null) {
      // console.log('served from cache');
      res.send(data);
    } else {
      next();
    }
  }).catch(err => console.error(err));
};

let setCache = (artistID, artistInfo) => {
  // return new Promise((resolve, reject) => {
  // const artist = JSON.stringify(artistInfo);
  redisClient.setex(artistID, 3600, JSON.stringify(artistInfo));
  // });
};

setCache = bluebird.promisify(setCache);


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

module.exports = { getArtist, postArtist, updateArtist, deleteArtist, redisClient, getCache, setCache };
