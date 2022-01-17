// require('dotenv').config();


const { textPrompt, selectionPrompt } = require('../../../__mocks__/slack');
const ResponseModel = require('../models/response.model');
const ResponseRepository = require('./response.repository');

describe('Bots Controller', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('Returns all user response with default pagination', async () => {
		const responseSpy = jest.spyOn(ResponseModel, 'find').mockResolvedValueOnce([]);
		await ResponseRepository.getResponses();
		expect(responseSpy).toBeCalledWith(null, null, { limit: 50, skip: 0 });
	});

	it('Returns all user response with user defined pagination', async () => {
		const responseSpy = jest.spyOn(ResponseModel, 'find').mockResolvedValueOnce([]);
		await ResponseRepository.getResponses({
			user: 'user_id',
			limit: 1000,
			offset: 10
		});

		expect(responseSpy).toBeCalledWith({ user: 'user_id' }, null, {
			limit: 1000,
			skip: 10
		});
	});

	it('uses default pagination if any user defined pagination is not a number', async () => {
		const responseSpy = jest.spyOn(ResponseModel, 'find').mockResolvedValueOnce([]);
		await ResponseRepository.getResponses({
			user: 'user_id',
			limit: 'loki',
			offset: 'hela'
		});
		expect(responseSpy).toBeCalledWith({ user: 'user_id' }, null, {
			limit: 50,
			skip: 0
		});
	});

	it('Prompts for \'/bot hello\' if prompt is not a recognized command', async () => {
		const decodeSpy = jest.spyOn(ResponseRepository, 'decodePayload').mockResolvedValueOnce({ message: 'Thanos' });

		const response = await ResponseRepository.getPromptAndReply(textPrompt('Thanos'));
		expect(decodeSpy).toBeCalledWith(textPrompt('Thanos'));
		expect(response).toEqual(ResponseRepository.QUESTIONSENUM.ASKFORHELLO.prompt);

	});

	it('Prompts for \'/bot hello\' if prompt is empty', async () => {
		const decodeSpy = jest.spyOn(ResponseRepository, 'decodePayload').mockRejectedValueOnce({
			message: 'Thanos'
		});

		const response = await ResponseRepository.getPromptAndReply(textPrompt('Thanos'));
		expect(decodeSpy).toBeCalledWith(textPrompt('Thanos'));
		expect(response).toEqual(ResponseRepository.QUESTIONSENUM.ASKFORHELLO.prompt);

	});

	
	it('Returns reply if prompt is a recognized command', async () => {
		const decodeSpy = jest.spyOn(ResponseRepository, 'decodePayload').mockResolvedValueOnce({
			message: 'hello'
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