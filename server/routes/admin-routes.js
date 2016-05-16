var express    = require('express');
var controller = require('../controllers/admin-controller');
var router     = express.Router();

router.get('/', controller.index);

// JSON API
//router.post('/settings/', controller.);
//router.post('/settings/', controller.);

module.exports = router;
