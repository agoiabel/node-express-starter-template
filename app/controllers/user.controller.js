const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model.js');
const validate = require('../validations/user.validation');
const { generateAuthToken } = require('../models/user.model.js');

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
	index: async function (req, res) {		
		res.send(req.authenticatedUser._id);
	}

};