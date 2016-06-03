'use strict';
var express    = require('express');
var bodyParser = require('body-parser');
var passport   = require('passport');
var Sequelize  = require('sequelize');
var log4js     = require('log4js');
var app = express();

//TODO: wrap into Server and ApiServer

/**
 * mode
 */
var mode = process.env.NODE_ENV || 'development';

/**
 * shared constants configuration
 */
var constants = {
  version: require('../package.json').version,
  rootdir: __dirname + '/../',
};
app.set('constants', constants);

/**
 * load configuration files
 */
var config = {
  config:         require('../config/config')[mode],
  logger:         require('../config/logger')[mode],
  database:       require('../config/database')[mode],
  authentication: require('../config/authentication')[mode],
  mailer:         require('../config/mailer')[mode],
};
app.set('config', config);

/**
 * create logger
 */
log4js.configure(config.logger);
var logger = log4js.getLogger();

/**
 * middleware
 * configuration
 */
app.use(log4js.connectLogger(logger, { level: 'auto' }));
app.enable('strict routing');
app.use('/assets', express.static(__dirname + '/../public/assets'));
app.use('/favicon.ico', express.static(__dirname + '/../public/favicon.ico'))
app.use('/robots.txt', express.static(__dirname + '/../public/robots.txt'))
app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

/**
 * authentication
 * configuration
 */
var Authenticator = require('./middlewares/authenticator');
var Mailer        = require('./middlewares/mailer');

var httpStatus    = require('http-status');
var _             = require('lodash');
var authenticator = new Authenticator(app, passport);
var mailer        = new Mailer(app, logger);

var middlewares = {
  httpStatus,
  _,
  logger,
  authenticator,
  mailer,
};
app.set('middlewares', middlewares);

/**
 * define model schemas
 */
config.database.logging = args => logger.debug(args);

var sequelize    = new Sequelize(config.database);
var modelClasses = require('./models');

var models = _(modelClasses).each((Model, name) => {
  modelClasses[name] = Model(sequelize, Sequelize);
});

_(models).each(model => model.associate(models));
app.set('models', models);

/**
 * create controller
 * instances
 */
var controllerClasses = require('./controllers');
var controllers = {
  page:    new controllerClasses.PageController(app),
  user:    new controllerClasses.UserController(app),
  article: new controllerClasses.ArticleController(app),
  admin:   new controllerClasses.AdminController(app),
  api: {
    user:    new controllerClasses.ApiUserController(app),
    article: new controllerClasses.ApiArticleController(app),
  },
};
app.set('controllers', controllers);

/**
 * routing middleware
 * configuration
 */
var routeClasses = require('./routes');
_(routeClasses).each(Route => {
  var route = new Route(controllers, middlewares);
  app.use(route);
});

logger.info(`starting loq v${constants.version}`);
app.listen(process.env.PORT || 3000);
