require('dotenv').config();

const request = require('supertest');
const server = require('../server');
const { textPrompt, selectionPrompt } = require('../__mocks__/slack');
const database = require('../database');
let connection;

describe('PROMPT FOR HELLO IF NORMAL PROMPT IS NOT HELLO', () => {
	let response;

	beforeAll(async () => {
		connection = connection || await database;
		response = await request(server).post('/messages').send(textPrompt('time travel!'));
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('Sends a prompt to use hello', () => {
		expect(response.body).toEqual('Send \'/bot hello\' to start a conversation');
	});
});

describe('INTRO RETURNS DROP DOWN OF MOODS', () => {
	let response;

	beforeAll(async () => {
		connection = connection || await database;
		response = await request(server).post('/messages').send(textPrompt('hello'));
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('Sends a prompt to select mood', () => {
		expect(response.body).toEqual({
			text: 'Welcome. How are you doing?',
			response_type: 'in_channel',
			attachments: [{
				text: 'Select Your Mood',
				fallback: 'If you could read this message, you\'d be choosing something fun to do right now.',
				color: '#3AA3E3',
				attachment_type: 'default',
				callback_id: 'mood_selection',
				actions: [{
					name: 'mood_list',
					text: 'Pick a mood...',
					type: 'select',
					options: [{
						text: 'Doing Well',
						value: 'Doing Well'
					},
					{
						text: 'Neutral',
						value: 'Neutral'
					},
					{
						text: 'Feeling Lucky',
						value: 'Feeling Lucky'
					}
					]
				}]
			}]
		});
	});
});

describe('ANSWER TO INTRO RETURNS LIST OF HOBBIES', () => {
	let response;

	beforeAll(async () => {
		connection = connection || await database;
		response = await request(server).post('/messages').send(selectionPrompt({ selection: 'Feeling Lucky' }));
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('Sends a prompt to select hobby', () => {
		expect(response.body).toEqual({
			text: 'What are your favorite hobbies?',
			response_type: 'in_channel',
			attachments: [{
				text: 'Select Your Hobby',
				fallback: 'If you could read this message, you\'d be choosing something fun to do right now.',
				color: '#3AA3E3',
				attachment_type: 'default',
				callback_id: 'hobby_selection',
				actions: [{
					name: 'hobby_list',
					text: 'Pick a hobby...',
					type: 'select',
					options: [{
						text: 'Football',
						value: 'Football'
					},
					{
						text: 'Music',
						value: 'Music'
					},
					{
						text: 'Sleep',
						value: 'Sleep'
					},
					{
						text: 'Movies',
						value: 'Movies'
					},
					{
						text: 'Basketball',
						value: 'Basketball'
					}
					]
				}]
			}]
		});
	});
});

describe('ANSWER TO HOBBIES RETRUNS THANK YOU', () => {
	let response;

	beforeAll(async () => {
		connection = connection || await database;
		response = await request(server).post('/messages').send(selectionPrompt({ selection: 'Music', name: 'hobby_list' }));
	});

	afterAll(async () => {
		connection && await connection.disconnect();
	});

	it('returns 200 status code', () => {
		expect(response.statusCode).toBe(200);
	});

	it('Replies thank you', () => {
		expect(response.body).toEqual('thank you');
	});
});
