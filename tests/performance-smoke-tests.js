import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics"

const errorRate = new Rate('error');

export let options = {
	vus: 1,
	duration : '30s',
	thresholds: {
		'http_req_duration': ['p(99)<1500'],
		'error': ["rate<0.1"]
	}
}

export default function() {
	const res = http.get("https://another-nodejs-shopping-cart.herokuapp.com/");
	const result = check(res, {
		'status code': r => r.status === 200
		}
	);
	errorRate.add(!result);
	sleep(1);
}
