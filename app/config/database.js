const mongoose = require('mongoose');

module.exports = function () {
	mongoose.connect('mongodb://localhost/chats')
			.then(() => console.dir('Connected to MongoDB'))
			.catch(err => console.dir('Could not connect to MongoDB..', err));
}
