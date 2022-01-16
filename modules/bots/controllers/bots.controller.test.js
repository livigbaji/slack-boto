require('dotenv').config();

const { mockNext, mockRequest, mockResponse } = require('../../../__mocks__/http');
const BotsController = require('./bots.controller');

describe('Bots Controller', () => {
	it('Callback returns yo', async () => {
		const req = mockRequest({
			body: {
				stuffFromSlack: '...and I, am Iron man',
			}
		});

		const res = mockResponse();

		await BotsController.bot(req, res, mockNext);

		expect(res.json).toBeCalledWith({
			text: 'Would you like to play a game?',
			response_type: 'in_channel',
			attachments: [{
				text: 'Choose a game to play',
				fallback: 'If you could read this message, you\'d be choosing something fun to do right now.',
				color: '#3AA3E3',
				attachment_type: 'default',
				callback_id: 'game_selection',
				actions: [{
					name: 'games_list',
					text: 'Pick a game...',
					type: 'select',
					options: [{
						text: 'Hearts',
						value: 'hearts'
					},
					{
						text: 'Bridge',
						value: 'bridge'
					},
					{
						text: 'Checkers',
						value: 'checkers'
					},
					{
						text: 'Chess',
						value: 'chess'
					},
					{
						text: 'Poker',
						value: 'poker'
					},
					{
						text: 'Falken\'s Maze',
						value: 'maze'
					},
					{
						text: 'Global Thermonuclear War',
						value: 'war'
					}
					]
				}]
			}]
		});
	});
});