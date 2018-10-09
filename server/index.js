const server = require('./server.js');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running!`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died :(`);
  });
} else {
  server.listen(3001, () => console.log("Listening on port 3001!"));
  console.log(`Worker ${process.pid} started`);
}
