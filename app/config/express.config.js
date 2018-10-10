const express = require('express');
const hbs = require('hbs');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config'); //we can use config.get('name') or config.get('mail.host');
const winston = require('winston'); //logger
require('express-async-errors'); //with this, we do not need try_catch in controllers again. 

/**
 * This is the file were all express configuarations are declared
 * 
 * @param  app 
 * @return 
 */
module.exports = function (app) {

	/**
	 * Use for handling body parsing
	 */
	app.use(express.json());

	/**
	 * Encode incoming url
	 */
	app.use(express.urlencoded({ extended: true }));

	/**
	 * Use to set the static / asset folder
	 */
	app.use(express.static('public'));
	
	/**
	 * Guard
	 */
	app.use(helmet());

	/**
	 * Log all errors to the app.log file
	 * 
	 * @type
	 */
	winston.add(winston.transports.File, { filename: 'app.log'});

	/**
	 * Log uncaughtExceptions to the log file
	 * 
	 * @param  ex
	 * @return
	 */
	process.on('uncaughtException', ex => {
		console.dir('We got an uncaughtException');
		winston.error(ex.message, ex);
	});

	/**
	 * Log unhandledRejection to the log file
	 * 
	 * @param  ex
	 * @return
	 */
	process.on('unhandledRejection', ex => {
		console.dir('We got an unhandledRejection');
		winston.error(ex.message, ex);
	});

	/**
	 * Make sure jwtPrivate key is set for authentication
	 * 
	 * @param !config.get('jwtPrivateKey') 
	 * @return                               
	 */
	if (!config.get('jwtPrivateKey')) {
		console.dir('jwtPrivateKey not set, use==export my_app_jwtPrivateKey=key');
		process.exit(1);
	}

	/**
	 * Use the set the views template which uses handlebar
	 */
	app.set('view engine', 'html');
	app.engine('html', hbs.__express);

	// console.dir(config.get('name'));

	/**
	 * Set all development only processes
	 * 
	 * @param  app.get('env')
	 * @return                
	 */
	if (app.get('env') === 'development') {
		
		/**
		 * Log all requests to console
		 * we can set env using export NODE_ENV=production from terminal
		 */
		app.use(morgan('tiny'));
	}
}