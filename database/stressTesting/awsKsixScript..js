import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,
  duration: "30s",
};

export default () => {
  const getRandomArtistId = () => Math.floor(Math.random() * 6000000) + 1000000;
  const randomArtistId = Math.random() * 10 < 7 ? 2222222 : getRandomArtistId();

  let res = http.get(`http://18.222.27.94/artists/albums/${randomArtistId}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};

