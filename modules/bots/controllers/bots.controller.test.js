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

		expect(res.json).toBeCalledWith('yo');
	});
});