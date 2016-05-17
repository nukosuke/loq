'use strict';
var express    = require('express');
var bodyParser = require('body-parser');
var app = express();

/**
 * middleware
 * configuration
 */
// static directory
app.use('/assets', express.static(__dirname + '/../public/assets'));
//TODO: serve favicon
app.use('/robots.txt', express.static(__dirname + '/../public/robots.txt'))

// view template engine
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

// parsing json request
app.use(bodyParser.json());


/**
 * routing middleware
 * configuration
 */
app.use('/users', require('./routes/user-routes'));
app.use('/admin', require('./routes/admin-routes'));


app.listen(process.env.PORT || 3000);
