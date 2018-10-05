DROP TABLE IF EXISTS cassandraExport;

CREATE TABLE cassandraExport AS 
  SELECT artists.artistID, artists.artistName,
  albums.albumID, albums.albumName, albums.albumImage, albums.publishedYear,
  songs.songID, songs.songName, songs.streams, songs.length, songs.popularity, songs.addedToLibrary
  FROM artists
  JOIN albums on albums.artistID = artists.artistID
  JOIN songs on songs.albumID = albums.albumID;

 COPY cassandraExport 
   TO '/Users/malcolmjones/Desktop/Malcolm-SpotifyAlbum/database/creatingData/dataFiles/csv/cassandraArtists/data0.csv' 
   DELIMITER '|' CSV HEADER;

