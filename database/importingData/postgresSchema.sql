  
  
  CREATE TABLE Artists {
    ArtistID int,
    ArtistName varchar(80),
    Albums integer[],
    PRIMARY KEY (ArtistID),
    FOREIGN KEY (Albums) REFERENCES Albums(Album)
  }

  CREATE TABLE Albums {
    AlbumID int, 
    AlbumName varchar(80),
    AlbumImage varchar(150),
    PublishedYear integer,
    Songs integer [],
    ArtistID integer, 
    PRIMARY KEY (AlbumID),
    FOREIGN KEY (Songs) REFERENCES Songs(SongID),
    FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
  }

  CREATE TABLE Songs {
    SongID int,
    SongName varchar(80),
    Streams integer,
    Length integer,
    Popularity integer,
    addedToLibrary Boolean,
    AlbumID number,
    PRIMARY KEY (SongID),
    FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID) 
  }