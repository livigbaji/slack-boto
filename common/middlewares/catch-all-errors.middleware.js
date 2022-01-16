// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	if (err.type && err.type === 'entity.parse.failed') {
		res.status(400).errorMessage('Invalid JSON payload passed.');
	} else if (err.toString() === '[object Object]') {
		try {
			res.status(400).error(err);
		} catch {
			res.status(500).errorMessage('Server error');
		}
	} else {
		res.status(400).errorMessage(err.toString());
	}
};