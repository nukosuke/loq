'use strict';
var express    = require('express');
var bodyParser = require('body-parser');
var Sequelize  = require('sequelize');
var app = express();

/**
 * load configuration files
 */
var config = {
  //config:         require('../config/config'),
  //logger: require('../config/logger'),
  database:       require('../config/database'),
  //oauthProviders: require('../config/oauth-providers'),
};
app.set('config', config);

/**
 * TODO: start logger
 */

/**
 * middleware
 * configuration
 */
app.use('/assets', express.static(__dirname + '/../public/assets'));
app.use('/favicon.ico', express.static(__dirname + '/../public/favicon.ico'))
app.use('/robots.txt', express.static(__dirname + '/../public/robots.txt'))
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());

/**
 * authentication
 * configuration
 */
var passport = require('passport');


/**
 * define model schemas
 */
 //TODO: test & production configuration
var sequelize = new Sequelize(config.database.development);
var models = {
  User: require('./models/user')(sequelize, Sequelize),
};
app.set('models', models);


/**
 * routing middleware
 * configuration
 */
app.use('/', require('./routes/authenticate-routes'));
app.use('/users', require('./routes/user-routes'));
app.use('/admin', require('./routes/admin-routes'));


app.listen(process.env.PORT || 3000);
