'use strict';
var express    = require('express');
//TODO: var bodyParser = require('body-parser');
var app = express();

/**
 * middleware
 * configuration
 */
// static directory
app.use('/assets', express.static(__dirname + '/../public/assets'));
//TODO: favicon & robots.txt

// view template engine
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

// parsing json request
//TODO: app.use(bodyParser.json);


/**
 * routing middleware
 * configuration
 */
//TODO: var adminRouter = require('./admin-router');
//TODO: app.use('/admin', adminRouter);
app.get('/', function(req, res) {
  return res.render('admin/index', { title: 'admin' });
});
//TODO: app.use('/', userRouter);


app.listen(process.env.PORT || 3000);
