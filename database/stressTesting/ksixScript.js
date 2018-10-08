import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 450,
  duration: "10s",
};

export default () => {
  const randomArtistId = Math.floor(Math.random() * 6000000) + 1000000;
  let res = http.get(`http://localhost:3001/artists/albums/${randomArtistId}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};

