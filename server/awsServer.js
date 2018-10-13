const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const toobusy = require('toobusy-js');
const request = require('superagent');

const responseTime = require('response-time');
const newRelic = require('newrelic');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
const { getArtist, postArtist, updateArtist, deleteArtist, redisClient, getCache, setCache } = require('../database/awsIndex.js');
const server = express();

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running!`);
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died :(`);
//   });
// } else {
server.listen(3001, () => console.log("Listening on port 3001!"));
console.log(`Worker ${process.pid} started`);
// }




//too busy js settings
toobusy.maxLag(1000);
toobusy.interval(1500);
let currentMaxLag = toobusy.maxLag()
let interval = toobusy.interval();

// server.use((rew, res, next) => {
//   if (toobusy()) {
//     res.send(503, 'Server is overloaded, please try again later. Sorry for any inconvenience!');
//   } else {
//     next();
//   }
// });

server.use(responseTime());

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));


// server.get('/artists/albums/:artistID', (req, res) => {
//   console.log('I got a get request');
//   const artistID = req.params.artistID;
//   console.log(getCache)
//   getCache(artistID).then(
//     artistInfo => {
//       console.log('made it out of promise hell');
//       res.status(200);
//       //res.redirect()
//       res.send(artistInfo);
//       setCache(artistID, artistInfo);
//     });
// });
server.get('/artists/albums/:artistID', getCache, getArtist);
// getArtist(req.params.artistID).then(
//   data => {
//     res.status(200);
//     //res.redirect()
//     res.send(data);
//   });

server.post('/artists/albums/:artistID', (req, res) => {
  const { artistID } = req.params;
  postArtist(artistID, (err) => {
    res.status(201);
    res.send(`Created new artist with ${artistID}`);
  });
});

server.put('/artists/albums/:artistID', (req, res) => {
  const { artistID } = req.params;
  const data = req.body;
  updateArtist({ artistID, data }, (err) => {
    res.status(200);
    res.send(`Updated the artist at ${artistID} with the data requested`);
  });
});

server.delete('/artists/albums/:artistID', (req, res) => {
  const { artistID } = req.params;
  deleteArtist(artistID, (err) => {
    // res.status();
    res.send(`Deleted the artist at ${artistID}`);
  });
});


module.exports = { server, redisClient };
