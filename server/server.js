const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getArtist, postArtist } = require('../database/index.js');
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
    res.send(`Created an artist at artistID with ${artistID}`);
  });
});

module.exports = server;
