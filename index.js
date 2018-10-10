const express = require('express');
const app = express();

/**
 * specify all express configurations
 * 
 * @type 
 */
require('./app/config/express.config.js')(app);

/**
 * specify the application,s routes
 * 
 * @type 
 */
require('./app/config/routes.js')(app);
	
/**
 * database connection
 */
require('./app/config/database.js')();


/**`
 * Start application,s server 
 * 
 * @type 
 */
const port = process.env.PORT || 3000;
app.listen(port);