require('dotenv').config();

const { mockNext, mockRequest, mockResponse } = require('../../../__mocks__/http');
const { textPrompt } = require('../../../__mocks__/slack');
// jest.mock('../models/response.model');
const BotsController = require('./bots.controller');
const ResponseRepository = require('../repositories/response.repository');

describe('Bots Controller', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('Returns all user response with default pagination', async () => {
		const req = mockRequest({});

		const res = mockResponse();

		const mockRepoResponse = [
			{ 
				message: 'Cap! Come in',
				question: 'stuff Cap said'
			}
		];

		const responseSpy = jest.spyOn(ResponseRepository, 'getResponses').mockResolvedValueOnce(mockRepoResponse);
		await BotsController.responses(req, res, mockNext);
		expect(responseSpy).toBeCalledWith({
			user: undefined,
			limit: undefined,
			offset: undefined
		});
		expect(res.data).toBeCalledWith(mockRepoResponse);
	});

	it('Returns all user response with user defined pagination', async () => {
		const req = mockRequest({
			query: {
				limit: 10,
				offset: 0,
				user: 'stuff'
			}
		});

		const res = mockResponse();

		const mockRepoResponse = [{
			message: 'Cap! Come in',
			question: 'stuff Cap said'
		}];

		const responseSpy = jest.spyOn(ResponseRepository, 'getResponses').mockResolvedValueOnce(mockRepoResponse);
		await BotsController.responses(req, res, mockNext);
		expect(responseSpy).toBeCalledWith({
			limit: 10,
			offset: 0,
			user: 'stuff'
		});
		expect(res.data).toBeCalledWith(mockRepoResponse);
	});

	it('Gets prompt and replies', async () => {
		const req = mockRequest({
			body: textPrompt('Thanos')
		});

		const res = mockResponse();

		const mockRepoResponse = ResponseRepository.QUESTIONSENUM.ASKFORHELLO.promt;

		const responseSpy = jest.spyOn(ResponseRepository, 'getPromptAndReply').mockResolvedValueOnce(mockRepoResponse);
		await BotsController.message(req, res, mockNext);
		expect(responseSpy).toBeCalledWith(textPrompt('Thanos'));
		expect(res.json).toBeCalledWith(mockRepoResponse);
	});
});