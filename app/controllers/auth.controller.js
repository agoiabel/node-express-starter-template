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

	/**
	 * Handle the process of authenticating user
	 * 
	 * @param req, res 
	 * @return 
	 */
	store: async function (req, res) {		

		//validate req.body
		const {error} = Joi.validate(req.body, validate.authentication);
		if (error) {
			return res.status(400).send(error);
		}

		//validate user
		let user = await userModel.findOne({
			email: req.body.email
		});
		if (!user) {
			return res.status(400).send('Credentials not correct');
		}

		//validate password
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			return res.status(400).send('Credentials not correct');	
		}

		//jwt
		const token = generateAuthTokenFor(user);

		res.header('x-auth-token', token).send(_.pick(user, [
			'email',
			'username'
		]));
	}

};