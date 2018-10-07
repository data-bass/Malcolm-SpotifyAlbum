import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: "5s",
};

export default () => {
  const randomArtistId = Math.floor(Math.random() * 8000000) + 1000000;
  let res = http.get(`http://localhost:3001/artists/album/${randomArtistId}`);
  check(res, {
    "status was 200": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
  sleep(1);
};

