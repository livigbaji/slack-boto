const express = require('express');

const app = express();

const catchAllErrorsMiddleware = require('./common/middlewares/catch-all-errors.middleware');
const notFoundMiddleware = require('./common/middlewares/not-found.middleware');
const indexRoute = require('./common/middlewares/index.middleware');

const customExpress = Object.create(express().response, {
	data: {
		value(data) {
			return this.type('json').json({
				status: 'success',
				data,
			});
		},
	},
	error: {
		value(error, message = 'An error occured') {
			return this.json({
				message,
				status: 'error',
				error,
			});
		},
	},
	errorMessage: {
		value(message = 'API response message') {
			return this.json({
				message,
				status: 'error',
			});
		},
	},
});

app.use(express.json());
app.use(express.urlencoded({
	extended: false,
}));

app.response = Object.create(customExpress);
app.all('/', indexRoute);

// catch all errors middleware
app.use(catchAllErrorsMiddleware);

// 404 catch route
app.use('*', notFoundMiddleware);

module.exports = app;