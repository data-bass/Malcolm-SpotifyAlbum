USE spotify;

DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
  artistID int,
  artistName text,
  albumID int,
  albumName text,
  albumImage text,
  publishedYear int, 
  songID int,
  songName text, 
  streams int,
  length int, 
  popularity int, 
  addedToLibrary Boolean, 
  PRIMARY KEY (artistID, albumID, songID)
);

COPY artists (artistID, artistName, albumID, albumName, albumImage, publishedYear, songID, songName, streams, length, popularity, addedToLibrary)
FROM '/Users/malcolmjones/Desktop/Malcolm-SpotifyAlbum/database/creatingData/dataFiles/csv/cassandraArtists/data0.csv'
WITH DELIMITER = '|' AND HEADER = TRUE;

CREATE INDEX id
ON artists (artistid);