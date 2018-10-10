const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model.js');
const validate = require('../validations/user.validation');
const { generateAuthTokenFor } = require('../models/user.model.js');

/**
 * Controller for all the external unsecured views
 * 
 * @type 
 */
module.exports = {

	// index: function (req, res) {
	// 	res.render('index');
	// },

	/**
	 * Handle the process of registering new user
	 * 
	 * @param req, res 
	 * @return 
	 */
	store: async function (req, res) {		

		//validate req.body
		const {error, result} = Joi.validate(req.body, validate.store);
		if (error) {
			return res.status(400).send(error);
		}

		//make sure user does not exists
		let user = await userModel.findOne({
			email: req.body.email
		});
		if (user) {
			return res.status(400).send('User already exists');
		}


		//encrypt user's password
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(req.body.password, salt);


		//save user
		user = await new userModel({
			email: req.body.email,
			username: req.body.username,
			password: hashed
		}).save();


		//jwt
		const token = generateAuthTokenFor(user);

		res.header('x-auth-token', token).send(_.pick(user, [
			'email',
			'username'
		]));
	}

};