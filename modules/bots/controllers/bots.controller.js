
const ResponseRepository = require('../repositories/response.repository');

module.exports = class {
	// eslint-disable-next-line no-unused-vars
	static async message(req, res, next) {
		const response = await ResponseRepository.getPromptAndReply(req.body);
		
		res.json(response);
	}

	// eslint-disable-next-line no-unused-vars
	static async responses(req, res, next) {
		const { user, limit, offset } = req.query;

		const response = await ResponseRepository.getResponses({
			user,
			limit,
			offset
		});

		res.data(response);
	}
};
