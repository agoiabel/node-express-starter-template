const winston = require('winston');


module.exports = function (app) {
	/**
	 * Handle 404 error
	 * 
	 * @return 
	 */
	app.use(function (req, res, next) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	/**
	 * General error handler
	 * 
	 * @param  err, req, res, next
	 * @return 
	 */
	app.use(function (err, req, res, next) {

		//log error
		winston.error(err.message, err);

		res.status(err.status || 500);
		res.status(500).send('Something failed');

		// res.render('error', {
		// 	message: err.message,
		// 	error: {}
		// });
	});
}