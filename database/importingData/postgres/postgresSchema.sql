--   DROP TABLE IF EXISTS songs;
--   DROP TABLE IF EXISTS albums;
--   DROP TABLE IF EXISTS artists;

-- CREATE TABLE artists (
--   artistID serial,
--   artistName varchar(300),
--   -- albums integer[],
--   PRIMARY KEY (artistID)
--   -- FOREIGN KEY (albums) REFERENCES albums(Album)
-- );

-- COPY artists(artistID, artistName)
-- FROM 'user/local/Desktop/Malcolm-SpotifyAlbum/database/creatingData/dataFiles/csv/artists/data0.csv'
-- DELIMITER ',' CSV HEADER;

-- CREATE TABLE albums (
--   albumID serial, 
--   albumName varchar(300),
--   albumImage varchar(150),
--   publishedYear integer,
--   -- songs integer [],
--   artistID integer, 
--   PRIMARY KEY (albumID)
--   -- FOREIGN KEY (songs) REFERENCES songs(SongID),
--   -- FOREIGN KEY (artistID) REFERENCES artists(artistID)
-- );

-- CREATE TABLE songs (
--   songID serial,
--   songName varchar(300),
--   streams integer,
--   length integer,
--   popularity integer,
--   addedToLibrary Boolean,
--   albumID integer,
--   PRIMARY KEY (songID)
--   -- FOREIGN KEY (albumID) REFERENCES albums(albumID) 
-- );

  -- ALTER TABLE artists ADD FOREIGN KEY(albums) REFERENCES albums(albumID);
  -- ALTER TABLE albums ADD FOREIGN KEY(artistID) REFERENCES artists(artistID) ON DELETE CASCADE;
  -- ALTER TABLE songs ADD FOREIGN KEY(albumID) REFERENCES albums(albumID) ON DELETE CASCADE;

-- Join table query to select the information for a specific artist
-- select * from artists
-- join albums on artists.artistid=albums.artistid
-- join songs on albums.albumid=songs.albumid
-- where artists.artistid=999888;

-- Drop indices
-- DROP INDEX IF EXISTS primaryKeyArtistHash
-- DROP INDEX IF EXISTS primaryKeyAlbumHash;
-- DROP INDEX IF EXISTS primaryKeySongHash;


-- Create Binary Tree Indices -------
-- CREATE INDEX primaryKeyArtistBTree
-- ON artists 
-- USING BTREE (artistID);

-- CREATE INDEX primaryKeyAlbumBTree
-- ON albums 
-- USING BTREE (albumID);

-- CREATE INDEX primaryKeySongBTree
-- ON songs 
-- USING BTREE (songID);
---------------------------------

-- Hash indices on primary keys to further increase equality search speed
-- CREATE INDEX "primaryKeyArtistHash"
-- ON artists 
-- USING HASH (artistID);

-- CREATE INDEX primaryKeyAlbumHash
-- ON albums 
-- USING HASH (albumID);

-- CREATE INDEX primaryKeySongHash
-- ON songs 
-- USING HASH (songID);

-- -- Foreign key indices to further increase equality search speed
-- CREATE INDEX foreignKeyArtistHash
-- ON albums 
-- USING HASH (artistID);

-- CREATE INDEX foreignKeySongHash
-- ON albums 
-- USING HASH (songID);

-- CREATE INDEX foreignKeyAlbumHash
-- ON songs
-- USING HASH (albumID);

-- -- Cluster albums based on their ArtistIds (Improves Speed)
-- CLUSTER VERBOSE albums USING "foreignKeyArtistHash";
-- CLUSTER VERBOSE songs USING foreignKeyAlbumHash;

-- Reindex the table can get bloated after many adds/deletes
REINDEX TABLE artists;
REINDEX TABLE albums;
REINDEX TABLE songs;

-- Cluster songs based on their songIds (Improves Speed)
-- CLUSTER VERBOSE songs USING albumid;

-- -- To Re-cluster 
-- CLUSTER albums;
-- CLUSTER songs;

-- ------------------------------
-- ------------------------------
-- ----DATABASE CONFIGURATION----
-- ------------------------------
-- ------------------------------

-- -- Increase maintenance working memory (in KB)
-- ALTER DATABASE malcolmjones SET maintenance_work_mem TO 128000; 