var express = require('express');
var router = express.Router();
var SettingController = require('../controllers/settingController')

/* GET setting page. */
router.get('/', SettingController.index);

// update Setting Values
router.post('/update-setting', SettingController.updateSetting)

module.exports = router;
