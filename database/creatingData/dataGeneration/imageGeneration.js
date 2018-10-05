var request = require('request');
var fs = require('fs');

let imageGetter = function (imageNumber) {
  const keywords = [
    'singer',
    'artist',
    'human',
    'rapper',
    'hollywood',
    'musician',
    'dancer',
    'performer'
  ];
  const randIndex = Math.floor(Math.random() * keywords.length);
  request
    .get(
      `https://loremflickr.com/250/250/${keywords[randIndex] +
      ',' +
      keywords[randIndex]}?random=${imageNumber}`
    )
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(fs.createWriteStream(`./creatingData/dataFiles/images/${imageNumber}.jpg`));
};

for (let i = 0; i < 1000; i += 1) {
  setTimeout(imageGetter.bind(null, i), i * 500);
}