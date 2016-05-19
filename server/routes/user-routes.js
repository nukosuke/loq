var express    = require('express');
var controller = require('../controllers/user-controller');
var router     = express.Router();

//TODO: remove this
router.get('/check', controller.check);

router.get('/', controller.index);
//router.get('/:username', controller.show);

// require authenticate
//TODO: use passport to authenticate
//TODO: users/settings-controller.js
//router.get('/settings', controller);
// JSON API
//router.post('/settings/profile', controller.updateProfile);
//router.post('/settings/password', controller.updatePassword);
//router.post('/settings/oauth/:provider', controller.updateOauthProvider);

module.exports = router;
