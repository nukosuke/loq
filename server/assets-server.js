'use strict';
var express    = require('express');
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
app.use('/favicon.ico', express.static(__dirname + '/../public/favicon.ico'));
app.use('/robots.txt', express.static(__dirname + '/../public/robots.txt'));
app.use('/', express.static(__dirname + '/../public/assets'));


logger.info(`starting loq assets v${constants.version}`);
app.listen(process.env.ASSETS_PORT || 3002);
