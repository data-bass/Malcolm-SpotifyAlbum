DROP KEYSPACE IF EXISTS spotify;

CREATE KEYSPACE spotify 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1}
AND durable_writes = true;