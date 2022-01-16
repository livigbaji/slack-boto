

module.exports = class {
	// eslint-disable-next-line no-unused-vars
	static async callback(req, res, next) {
		// eslint-disable-next-line no-console
		console.log(req.body);
		res.json('calledback');
	}
};