const mongoose = require('mongoose');

const config = require('config');
const jwt = require('jsonwebtoken');

/**
 * User schema definition
 * 
 * @param  
 * @return 
 */
module.exports = mongoose.model('User', new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 255,
		validate: {
			validator: function (value) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
			},
			message: 'Please fill a valid email address' 
		}
	},
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 30
	},
	password: {
		type: String,
		required: true,
		maxlength: 225
	},		
	image_path: {
		type: String,
	},
}));


module.exports.generateAuthTokenFor = user => {
	return jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
}
