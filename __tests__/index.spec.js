const request = require('supertest');
const server = require('../server');

describe('Index Route', () => {
	let response;

	beforeAll(async () => {
		response = await request(server).get('/');
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('shows status API Online', () => {
		expect(response.body).toEqual({
			status: 'success',
			data: {
				status: 'API Online'
			}
		});
	});
});