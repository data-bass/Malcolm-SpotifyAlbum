  DROP TABLE IF EXISTS songs;
  DROP TABLE IF EXISTS albums;
  DROP TABLE IF EXISTS artists;

  CREATE TABLE artists (
    artistID int,
    artistName varchar(300),
    -- albums integer[],
    PRIMARY KEY (artistID)
    -- FOREIGN KEY (albums) REFERENCES albums(Album)
  );

  -- COPY artists(artistID, artistName) FROM 'user/local/Desktop/Malcolm-SpotifyAlbum/database/creatingData/dataFiles/csv/artists/data0.csv' DELIMITER ',' CSV HEADER;

  CREATE TABLE albums (
    albumID int, 
    albumName varchar(300),
    albumImage varchar(150),
    publishedYear integer,
    -- songs integer [],
    artistID integer, 
    PRIMARY KEY (albumID)
    -- FOREIGN KEY (songs) REFERENCES songs(SongID),
    -- FOREIGN KEY (artistID) REFERENCES artists(artistID)
  );

  CREATE TABLE songs (
    songID int,
    songName varchar(300),
    streams integer,
    length integer,
    popularity integer,
    addedToLibrary Boolean,
    albumID integer,
    PRIMARY KEY (songID)
    -- FOREIGN KEY (albumID) REFERENCES albums(albumID) 
  );

  -- ALTER TABLE artists ADD FOREIGN KEY(albums) REFERENCES albums(albumID);
  ALTER TABLE albums ADD FOREIGN KEY(artistID) REFERENCES artists(artistID) ON DELETE CASCADE;
  ALTER TABLE songs ADD FOREIGN KEY(albumID) REFERENCES albums(albumID) ON DELETE CASCADE;

-- Join table query to select the information for a specific artist
-- select * from artists
-- join albums on artists.artistid=albums.artistid
-- join songs on albums.albumid=songs.albumid
-- where artists.artistid=999888;

