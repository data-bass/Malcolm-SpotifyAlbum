const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getArtist, postArtist, updateArtist } = require('../database/index.js');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/albums/:artistID', (req, res) => {
  getArtist(req.params.artistID, data => {
    res.status(200);
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

module.exports = server;
