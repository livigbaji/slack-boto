require('dotenv').config();

const { mockNext, mockRequest, mockResponse } = require('../../../__mocks__/http');
const AuthController = require('./auth.controller');

describe('Auth Controller', () => {
	it('Callback returns callback', async () => {
		const req = mockRequest({
			body: {
				stuffFromSlack: 'to your left',
			}
		});

		const res = mockResponse();

		await AuthController.callback(req, res, mockNext);

		expect(res.json).toBeCalledWith('calledback');
	});
});