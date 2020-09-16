
const cmsModel = require('../models/cmsModel');
var config = require('../config');
const { default: slugify } = require('slugify');

module.exports = {
    index: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            cmsModel.find({}, function (err, cms) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/cms');
                }
                res.render('cms/cms-list', {
                    title: 'Label Solution Provider | CMS Pages',
                    page_title: 'CMS Pages',
                    cms: cms,
                    error: req.flash('error'),
                    success: req.flash('success'),
                    currentUrl:'/cms'
                });
            });

        })
    },
    add: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            cmsModel.find({}, function (err, cms) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/cms');
                }
                res.render('cms/cms-add', {
                    title: 'Label Solution Provider | Add New cms',
                    page_title: 'Add cms',
                    cms: cms,
                    error: req.flash('error'),
                    success: req.flash('success'),
                    currentUrl:'/cms'
                });
            });
        })
    },
    save: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            cmsModel.find({ name: req.body.name }, function (err, cat) {
                console.log(cat)
                if (cat > 0) {
                    req.flash('error', 'Cms already exist.');
                    res.redirect('/cms');
                }
                else {
                    var slug = slugify(req.body.title, {
                        replacement: '-',  // replace spaces with replacement character, defaults to `-`
                        lower: true,      // convert to lower case, defaults to `false`
                        strict: true,     // strip special characters except replacement, defaults to `false`
                    })
                    console.log(slug)
                    let cms = new cmsModel({
                        "title": req.body.title,
                        "slug": slug,
                        "subtitle": req.body.subtitle,
                        "description": req.body.description,
                    });

                    cms.save()
                        .then(result => {
                            req.flash('success', 'CMS saved successfully.');
                            res.redirect('/cms');
                        })
                        .catch(err => {
                            req.flash('error', 'Something went wrong.');
                            res.redirect('/cms');
                        })
                }
            });
        })
    },
    edit: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            const id = req.params.id;
            cmsModel.find({}, function (err, cms) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/cms');
                }
                cmsModel.findById({ _id: id }, function (err, cms) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/cms');
                    }
                    res.render('cms/cms-edit', {
                        title: 'Label Solution Provider | Edit CMS',
                        page_title: 'Edit cms',
                        cms: cms,
                        error: req.flash('error'),
                        success: req.flash('success'),
                        currentUrl:'/cms'
                    });
                });
            });
        })
    },
    update: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            const id = req.params.id;
            cmsModel.findByIdAndUpdate(id, {
                "title": req.body.title,
                "subtitle": req.body.subtitle,
                "description": req.body.description,
            }, function (err, update) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/cms');
                }
                req.flash('success', 'CMS updated successfully.');
                res.redirect('/cms/edit/' + id);
            });
        })
    },
    delete: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            const id = req.params.id;
            cmsModel.deleteOne({ _id: id, }, function (err, del) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/cms');
                }
                req.flash('success', 'CMS deleted successfully.');
                res.redirect('/cms');
            });
        })
    },
    view: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            if (decoded.id) {
                const id = req.params.id;
                cmsModel.findOne({ _id: id }, function (err, cms) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/cms');
                    }
                    res.render('cms/cms-detail', {
                        title: 'Label Solution Provider | CMS Details',
                        page_title: 'Users list',
                        error: req.flash('error'),
                        success: req.flash('success'),
                        errormessage: req.flash('errormessage'),
                        successmessage: req.flash('successmessage'),
                        cms: cms,
                        currentUrl:'/cms'
                    });
                });
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
        })
    },
    
}