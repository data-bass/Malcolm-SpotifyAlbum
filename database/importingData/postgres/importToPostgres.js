
const { Client } = require('pg');
const path = require('path');
const { artistHeaders, albumHeaders, songHeaders, numOfFiles, startingFile } = require('../writingFiles/generateSqlCsvFile.js');

const client = new Client({
  user: 'malcolmjones',
  host: 'localhost',
  database: 'malcolmjones',
  port: 5432
})
client.connect();


const importTable = (tableName, tableColumns, fileNumber) => new Promise((resolve, reject) => {
  const tableSpecifications = `${tableName}(${tableColumns})`;
  console.log(tableSpecifications);
  const filePath = path.join(__dirname, `../creatingData/dataFiles/csv/${tableName}/data${fileNumber}.csv`);
  const copyCommand = `COPY ${tableSpecifications} FROM '${filePath}' DELIMITER '|' CSV HEADER;`
  client.query(copyCommand, (err, res) => {
    console.log(`finished query ${fileNumber} on`, tableName);
    if (err) return console.error(err);
    resolve();
  });
});

const importAll = async () => {
  for (var i = startingFile; i < numOfFiles; i++) {
    await Promise.all([
      importTable('artists', artistHeaders, i),
      importTable('albums', albumHeaders, i),
      importTable('songs', songHeaders, i)
    ]);
  }
  client.end();
  console.log('completed the importing into postgres');
};

importAll();
