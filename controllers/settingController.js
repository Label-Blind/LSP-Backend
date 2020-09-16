const SettingModel = require('../models/settingModel');
var config = require('../config');

module.exports = {
    index: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            res.render('setting', { title: 'Label Solution Provider | Site Settings', page_title: 'Site Settings', error: req.flash('error'), success: req.flash('success') });
        })
    },
    updateSetting: (req, res) => {
        console.log(req);
    }
}
