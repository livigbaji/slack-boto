const request = require('supertest');
const server = require('../server');

describe('Auth Route', () => {
	let response;

	beforeAll(async () => {
		response = await request(server).post('/auth/callback');
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('shows yo', () => {
		expect(response.body).toEqual('calledback');
	});
});