require('dotenv').config();

const ResponseModel = require('../models/response.model');
const ResponseRepository = require('./response.repository');

describe('Bots Controller', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('Returns all user response with default pagination', async () => {
		const offsetSpy = jest.fn().mockResolvedValueOnce([]);
		const limitSpy = jest.fn().mockReturnValueOnce({ offset: offsetSpy });
		const responseSpy = jest.spyOn(ResponseModel, 'find').mockReturnValueOnce({ limit: limitSpy });
		await ResponseRepository.getResponses();
		expect(offsetSpy).toBeCalledWith(0);
		expect(limitSpy).toBeCalledWith(50);
		expect(responseSpy).toBeCalledWith(null);
	});

	it('Returns all user response with user defined pagination', async () => {
		const offsetSpy = jest.fn().mockResolvedValueOnce([]);
		const limitSpy = jest.fn().mockReturnValueOnce({ offset: offsetSpy });
		const responseSpy = jest.spyOn(ResponseModel, 'find').mockReturnValueOnce({ limit: limitSpy });
		await ResponseRepository.getResponses({
			user: 'user_id',
			limit: 1000,
			offset: 10
		});
		expect(offsetSpy).toBeCalledWith(10);
		expect(limitSpy).toBeCalledWith(1000);
		expect(responseSpy).toBeCalledWith({ user: 'user_id' });
	});

	// PROMPT FOR HELLO IF NORMAL PROMPT IS NOT HELLO
	// INTRO RETURNS DROP DOWN OF MOODS
	// ANSWER TO INTRO RETURNS LIST OF HOBBIES
	// ANSWER TO HOBBIES RETRUNS THANK YOU
});