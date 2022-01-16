/* eslint-disable no-console */
const mongoose = require('mongoose');

const {
	DBUSER,
	DBPASSWORD,
	DBNAME,
	DB_PORT:DBPORT,
	DB_HOST:DBHOST,
	DBPROTOCOL = 'mongodb',
	DBOPTIONS,
} = process.env;

const hasPasswordAndUser = DBUSER && DBPASSWORD && '?authSource=admin';
const passwordSection = DBPASSWORD ? `${encodeURIComponent(DBPASSWORD)}@` : '';
const userSection = DBUSER ? `${encodeURIComponent(DBUSER)}:` : '';
const hostPortSection = DBPORT ? `${DBHOST}:${DBPORT}` : DBHOST;
const options = DBOPTIONS ? `?${DBOPTIONS}` : `${hasPasswordAndUser || ''}`;
const connectionString = `${DBPROTOCOL}://${userSection}${passwordSection}${hostPortSection}/${DBNAME}${options}`;

const connection = mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('disconnected', () => {
	console.log('Database disconnected');
	// process.exit(0);
});

module.exports = connection;