const { Schema, ...mongoose } = require('mongoose');

const responseSchema = new Schema({
	user: { type: String, required: true },
	name: { type: String, required: true },
	message: { type: String, required: true },
	question: { type: String, enum: ['INTRO', 'HOBBIES', 'INITIATE'] }
}, {
	timestamps: true
});

module.exports = mongoose.model('Response', responseSchema);