import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics"

const errorRate = new Rate('error');

export let options = {
	stages : [
		{ duration : '30s', target: 100 },
		{ duration: '10s', target: 1400 },
		{ duration: '5m', target: 1400 },
		{ duration: '10s', target: 100 }
	],
	thresholds: {
		'http_req_duration': ['p(95)<1500'],
		'error': ["rate<0.1"]
	}
}

export default function() {
	const host = __ENV.HOST_NAME || "another-nodejs-shopping-cart.herokuapp.com"
	const response = http.batch([
		[
			'GET',
			`https://${host}/`,
			null,
			{
				tag: {
					name: 'shopping-cart-homepage'
				}
			}
		],
		[
			'GET',
			`https://${host}/user/signin`,
			null,
			{
				tag: {
					name: 'shopping-cart-homepage-signin'
				}
			}
		]
	])
	const result = check(response, {
		'status code': r => r.status === 200
		}
	);
	errorRate.add(!result);
	sleep(1);
}
