// require('dotenv').config();


const { textPrompt, selectionPrompt } = require('../../../__mocks__/slack');
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

	it('uses default pagination if any user defined pagination is not a number', async () => {
		const offsetSpy = jest.fn().mockResolvedValueOnce([]);
		const limitSpy = jest.fn().mockReturnValueOnce({ offset: offsetSpy });
		const responseSpy = jest.spyOn(ResponseModel, 'find').mockReturnValueOnce({ limit: limitSpy });
		await ResponseRepository.getResponses({
			user: 'user_id',
			limit: 'loki',
			offset: 'hela'
		});
		expect(offsetSpy).toBeCalledWith(0);
		expect(limitSpy).toBeCalledWith(50);
		expect(responseSpy).toBeCalledWith({ user: 'user_id' });
	});

	it('Prompts for \'/bot hello\' if prompt is not a recognized command', async () => {
		const toObjectSpy = jest.fn().mockResolvedValueOnce({ message: 'Thanos' });

		const decodeSpy = jest.spyOn(ResponseRepository, 'decodePayload').mockReturnValueOnce({
			toObject: toObjectSpy
		});

		const response = await ResponseRepository.getPromptAndReply(textPrompt('Thanos'));
		expect(decodeSpy).toBeCalledWith(textPrompt('Thanos'));
		expect(response).toEqual(ResponseRepository.QUESTIONSENUM.ASKFORHELLO.prompt);

	});

	
	it('Returns reply if prompt is a recognized command', async () => {
		const toObjectSpy = jest.fn().mockResolvedValueOnce({ message: 'hello' });

		const decodeSpy = jest.spyOn(ResponseRepository, 'decodePayload').mockReturnValueOnce({
			toObject: toObjectSpy
		});

		const response = await ResponseRepository.getPromptAndReply(textPrompt('hello'));
		expect(decodeSpy).toBeCalledWith(textPrompt('hello'));
		expect(response).toEqual(ResponseRepository.QUESTIONSENUM.INTRO.prompt);

	});
	
    
	it('method recordResponse records and tidies message payload', async () => {
		const createSpy = jest.spyOn(ResponseModel, 'create').mockReturnValueOnce({
			message: 'hello'
		});
		const mockPrompt = textPrompt('hello');

		const response = await ResponseRepository.recordResponse({
			isSelection: false,
			payload: mockPrompt
		});
		
		expect(createSpy).toBeCalledWith({
			user: mockPrompt.user_id,
			name: mockPrompt.user_name,
			message: mockPrompt.text,
			question: 'INITIATE'
		});

		expect(response).toEqual({ message: 'hello' });
	});

	it('method recordResponse records and tidies mood_list selection payload', async () => {
		const createSpy = jest.spyOn(ResponseModel, 'create').mockReturnValueOnce({
			message: 'hello'
		});
		const mockPrompt = JSON.parse(selectionPrompt({ selection: 'hello' }).payload);

		const response = await ResponseRepository.recordResponse({
			isSelection: true,
			payload: mockPrompt
		});

		expect(createSpy).toBeCalledWith({
			user: mockPrompt.user.id,
			name: mockPrompt.user.name,
			message: 'hello',
			question: 'INTRO'
		});

		expect(response).toEqual({
			message: 'hello'
		});
	});

	it('method recordResponse records and tidies hobby_list selection payload', async () => {
		const createSpy = jest.spyOn(ResponseModel, 'create').mockReturnValueOnce({
			message: 'hello'
		});
		const mockPrompt = JSON.parse(selectionPrompt({ selection: 'hello', name: 'hobby_list' }).payload);

		const response = await ResponseRepository.recordResponse({
			isSelection: true,
			payload: mockPrompt
		});

		expect(createSpy).toBeCalledWith({
			user: mockPrompt.user.id,
			name: mockPrompt.user.name,
			message: 'hello',
			question: 'HOBBIES'
		});

		expect(response).toEqual({
			message: 'hello'
		});
	});

    
	it('method decodePayload preformats selection payload', async () => {
		const recordSpy = jest.spyOn(ResponseRepository, 'recordResponse').mockReturnValueOnce({
			message: 'hello'
		});
		const mockPrompt = selectionPrompt({ selection: 'hello' });

		const response = await ResponseRepository.decodePayload(mockPrompt);

		expect(recordSpy).toBeCalledWith({
			isSelection: true,
			payload: JSON.parse(mockPrompt.payload),
		});

		expect(response).toEqual({
			message: 'hello'
		});
	});

	it('method decodePayload preformats message payload', async () => {
		const recordSpy = jest.spyOn(ResponseRepository, 'recordResponse').mockReturnValueOnce({
			message: 'hello'
		});
		const mockPrompt = textPrompt('hello');

		const response = await ResponseRepository.decodePayload(mockPrompt);

		expect(recordSpy).toBeCalledWith({
			isSelection: false,
			payload: mockPrompt,
		});

		expect(response).toEqual({
			message: 'hello'
		});
	});
});