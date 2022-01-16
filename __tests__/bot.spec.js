const request = require('supertest');
const server = require('../server');

describe('Message Route', () => {
	let response;

	beforeAll(async () => {
		response = await request(server).post('/messages');
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('shows yo', () => {
		expect(response.body).toEqual('yo');
	});
});