import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: "30s",
};

export default () => {
  let res = http.get('http://test.loadimpact.com');
  check(res, {
    "status was 200": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
  sleep(3);
};

