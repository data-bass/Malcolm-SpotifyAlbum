
-- ------------------------------
-- ------------------------------
-- ------ Table Creation --------
-- ------------------------------
-- ------------------------------

--   DROP TABLE IF EXISTS songs;
--   DROP TABLE IF EXISTS albums;
--   DROP TABLE IF EXISTS artists;

-- CREATE TABLE artists (
--   artistID serial,
--   artistName varchar(300),
--   -- albums integer[],
--   PRIMARY KEY (artistID)
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


-- ------------------------------
-- ------------------------------
-- ------- Table Indexing -------
-- ------------------------------
-- ------------------------------

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
-- USING BTREE (song4ID);
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
-- REINDEX TABLE artists;
-- REINDEX TABLE albums;
-- REINDEX TABLE songs;

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


-- ------------------------------
-- ------------------------------
-- ----Join Table Queries -------
-- ------------------------------
-- ------------------------------


-- EXPLAIN ANALYZE -- To get timing/planner stats
-- /timing in terminal -- For basic timing

------ CURRENT FASTEST QUERY ----------
-- Select * 
-- from albums 
-- join artists on artists.artistid=albums.artistid
-- AND artists.artistid= 4134567
-- join songs on albums.albumid = songs.albumid
-- where albums.artistid = 4134567;      

-- Former Fastest Query 
-- SELECT * FROM artists
-- INNER JOIN albums ON artists.artistid = albums.artistid
-- INNER JOIN songs ON albums.albumid = songs.albumid
-- WHERE artists.artistid = 3234567
-- AND albums.artistid=3234567;

-- Could Reconfigure table to be just two tables, reduces query time
-- select * 
-- from albums 
-- join songs on albums.albumid = songs.albumid
-- where albums.artistid = 8135579;