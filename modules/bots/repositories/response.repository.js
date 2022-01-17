
const Response = require('../models/response.model');

module.exports = class {
	static get FEELINGENUM() {
		return {
			DOING_WELL: 'Doing Well',
			NEUTRAL: 'Neutral',
			FELLING_LUCKY: 'Feeling Lucky'
		};
	}

	static get HOOBIESENUM() {
		return {
			FOOTBALL: 'Football',
			MUSIC: 'Music',
			SLEEP: 'Sleep',
			MOVIES: 'Movies',
			BASKETBALL: 'Basketball'
		};
	}

	static get QUESTIONSENUM() {
		return {
			HOBBIES: {
				trigger: Object.values(this.FEELINGENUM),
				prompt: {
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
							options: Object.values(this.HOOBIESENUM).map(item => ({
								text: item,
								value: item
							}))
						}]
					}]
				}
			},
			INTRO: {
				trigger: ['hello'],
				prompt: {
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
							options: Object.values(this.FEELINGENUM).map(item => ({
								text: item,
								value: item
							}))
						}]
					}]
				}
			},
			THANKYOU: {
				trigger: Object.values(this.HOOBIESENUM),
				prompt: 'thank you'
			},
			ASKFORHELLO: {
				prompt: 'Send \'/bot hello\' to start a conversation'
			}
		};
	}

	/**
	 * Records user response in the DB
	 * @param {Object} params
	 * @param {boolean} params.isSelection
	 * @param {Object} params.payload
	 * @returns 
	 */
	static async recordResponse({ isSelection, payload }) {
		return Response.create(Object.assign({}, isSelection ? {
			user: payload.user.id,
			name: payload.user.name,
			message: payload.actions[0].selected_options[0].value,
			question: payload.actions[0].name === 'mood_list' ? 'INTRO' : 'HOBBIES'
		} : {
			user: payload.user_id,
			name: payload.user_name,
			message: payload.text,
			question: 'INITIATE'
		}));
	}

	/**
	 * Decodes the request payload
	 * @param {Object} requestPayload 
	 * @returns 
	 */
	static async decodePayload(requestPayload) {
		const isSelection = !!requestPayload.payload;
		
		return this.recordResponse({
			isSelection,
			payload: isSelection ? JSON.parse(requestPayload.payload) : requestPayload
		});
	}

	/**
	 * Gets a user prompt and sends corresponding reply
	 * @param {Object} prompt 
	 */
	static async getPromptAndReply(prompt) {
		const { message } = await this.decodePayload(prompt).toObject();
		return (Object.values(this.QUESTIONSENUM).find(({ trigger }) => trigger && trigger.includes(message)) || this.QUESTIONSENUM.ASKFORHELLO).prompt;
	}

	/**
	 * Returns a list of response from users
	 * @param {Object} param
	 * @param {string} param.user
	 * @param {number} param.limit
	 * @param {number} param.offset
	 * @returns 
	 */
	static async getResponses({user = null, limit = 50, offset = 0} = {}) {
		return Response.find(user && { user }).limit(parseInt(limit) || 50 ).offset(parseInt(offset) || 0);
	}
};