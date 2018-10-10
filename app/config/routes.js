const RegistrationController = require('../controllers/registration.controller');
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');

const authorization = require('../middlewares/authorization.middleware');

/**
 * Route declarations
 * 
 * @param  app 
 * @return
 */
module.exports = function (app) {	
	
	app.post('/api/registration/store', RegistrationController.store);
	app.post('/api/authentication/store', AuthController.store);

	app.post('/api/user/index', authorization, UserController.index);


	
	require('./exception.handler.js');
}