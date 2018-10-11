import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: "30s",
};

export default () => {
  const randomArtistId = Math.floor(Math.random() * 6000000) + 1000000;
  let res = http.get(`http://18.188.226.149:3001/artists/albums/${randomArtistId}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};

