const {
	mockRequest,
	mockResponse
} = require('../../__mocks__/http');
const indexMiddleware = require('./index.middleware');

describe('Returns status object', () => {
	it('return an object with status and success', () => {
		const req = mockRequest();
		const res = mockResponse();

		indexMiddleware(req, res);

		expect(res.data).toBeCalledWith({
			status: 'API Online'
		});
	});
});