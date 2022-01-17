require('dotenv').config();

const request = require('supertest');
const server = require('../server');

const database = require('../database');
let connection;

describe('Fetches All messages', () => {
	let response;

	beforeAll(async () => {
		connection = connection || await database;
		response = await request(server).get('/messages');
	});

	afterAll(async () => {
		connection && await connection.disconnect();
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('Replies thank you', () => {
		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toBeInstanceOf(Array);
	});
});
