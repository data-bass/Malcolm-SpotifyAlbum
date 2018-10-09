const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const toobusy = require('toobusy-js');
// const newRelic = require('newrelic');

const { getArtist, postArtist, updateArtist, deleteArtist } = require('../database/index.js');
const server = express();

//too busy js settings
toobusy.maxLag(1500);
toobusy.interval(1900);
let currentMaxLag = toobusy.maxLag()
let interval = toobusy.interval();
toobusy.onLag((currentLag) => {
  console.log('Event loop lag detected! Latency: ' + currentLag + 'ms');
});
server.use((rew, res, next) => {
  if (toobusy()) {
    res.send(503, 'Server is overloaded, please try again later. Sorry for any inconvenience!');
  } else {
    next();
  }
});


server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));


server.get('/artists/albums/:artistID', (req, res) => {
  // console.log('I got a get request');
  getArtist(req.params.artistID).then(
    data => {
      res.status(200);
      //res.redirect()
      res.send(data);
    });
});

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


module.exports = server;
