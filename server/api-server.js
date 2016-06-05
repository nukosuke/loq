'use strict';
var express    = require('express');
var bodyParser = require('body-parser');
var passport   = require('passport');
var Sequelize  = require('sequelize');
var log4js     = require('log4js');
var _          = require('lodash');
var app       = express();

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
var config = require('../config');

_(config).each((v, k) => {
  config[k] = v[mode];
});

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

var schema = config.config.useSSL ? 'https' : 'http';
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //res.header("Cache-Control", "no-cache");
  return next();
});
//schema+'://'+config.config.baseUrl

/**
 * authentication
 * configuration
 */
var Authenticator = require('./middlewares/authenticator');
var Mailer        = require('./middlewares/mailer');

var httpStatus    = require('http-status');

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
var routeApiClasses = require('./routes/api');
_(routeApiClasses).each(Route => {
    var route = new Route(controllers, middlewares);
    app.use(route);
});

logger.info(`starting loq API v${constants.version}`);
app.listen(process.env.API_PORT || 3001);
