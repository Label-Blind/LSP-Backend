
const faqModel = require('../models/faqModel');
const faqCategoryModel = require('../models/faq_categoryModel');
var config = require('../config');

module.exports = {
    // Manage FAQs 
    index: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            faqModel.find({}, function (err, faqs) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                res.render('faqs/faq-list', {
                    title: 'Label Solution Provider | Faqs',
                    page_title: 'Manage FAQs',
                    faqs: faqs,
                    error: req.flash('error'),
                    success: req.flash('success'),
                    currentUrl:'/faqs'
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
            faqCategoryModel.find({}, function (err, categories) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                res.render('faqs/faq-add', {
                    title: 'Label Solution Provider | Add New FAQs',
                    page_title: 'Add FAQs',
                    categories: categories,
                    error: req.flash('error'),
                    success: req.flash('success'),
                    currentUrl:'/faqs'
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
            else {
                let faq = new faqModel({
                    "category": req.body.category,
                    "question": req.body.question,
                    "answer": req.body.answer,
                });

                faq.save()
                    .then(result => {
                        req.flash('success', 'FAQs saved successfully.');
                        res.redirect('/faqs');
                    })
                    .catch(err => {
                        console.log(err)
                        req.flash('error', 'Something went wrong.');
                        res.redirect('/faqs');
                    })
            }
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
            faqCategoryModel.find({}, function (err, categories) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                faqModel.findById({ _id: id }, function (err, category) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/faqs');
                    }
                    res.render('faqs/faq-edit', {
                        title: 'Label Solution Provider | Edit FAQs',
                        page_title: 'Edit FAQs',
                        categories: categories,
                        category: category,
                        error: req.flash('error'),
                        success: req.flash('success'),
                        currentUrl:'/faqs'
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
            faqModel.findByIdAndUpdate(id, {
                "category": req.body.category,
                "question": req.body.question,
                "answer": req.body.answer,
                "updated_at": Date.now()
            }, function (err, update) {
                console.log(update)
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                req.flash('success', 'FAQs updated successfully.');
                res.redirect('/faqs/edit/' + id);
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
            faqModel.deleteOne({ _id: id, }, function (err, del) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                req.flash('success', 'FAQs deleted successfully.');
                res.redirect('/faqs');
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
                faqModel.findOne({ _id: id }, function (err, faqs) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/faqs');
                    }
                    res.render('faqs/faq-detail', {
                        title: 'Label Solution Provider | FAQ Details',
                        page_title: 'FAQs Details',
                        error: req.flash('error'),
                        success: req.flash('success'),
                        errormessage: req.flash('errormessage'),
                        successmessage: req.flash('successmessage'),
                        faq: faqs,
                        currentUrl:'/faqs'
                    });
                });
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
        })
    },

    // Manage FAQs Category
    category: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            faqCategoryModel.find({}, function (err, faqs) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                res.render('faq-category/faqcategory-list', {
                    title: 'Label Solution Provider | FAQs Category Lists',
                    page_title: 'Manage FAQs Category',
                    error: req.flash('error'),
                    category:faqs,
                    success: req.flash('success'),
                    currentUrl:'/faqs/category'
                });
            });
        })
    },
    categoryAdd: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            faqCategoryModel.find({}, function (err, faqs) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                res.render('faq-category/faqcategory-add', {
                    title: 'Label Solution Provider | Add FAQs Category',
                    page_title: 'Add FAQs Category',
                    error: req.flash('error'),
                    category:faqs,
                    success: req.flash('success'),
                    currentUrl:'/faqs/category'
                });
            });
        })
    },
    categorySave: (req, res) => {
        console.log(req.body)
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            else {
                let faqCat = new faqCategoryModel({
                    "name": req.body.cat_name,
                });

                faqCat.save()
                    .then(result => {
                        req.flash('success', 'FAQs Category saved successfully.');
                        res.redirect('/faqs/category');
                    })
                    .catch(err => {
                        console.log(err)
                        req.flash('error', 'Something went wrong.');
                        res.redirect('/faqs/category');
                    })
            }
        })
    },
    categoryEdit: (req, res) =>{
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            const id = req.params.id;
            faqCategoryModel.findOne({_id:id}, function (err, faqs) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/faqs');
                }
                res.render('faq-category/faqcategory-edit', {
                    title: 'Label Solution Provider | Edit FAQs Category',
                    page_title: 'Edit FAQs Category',
                    error: req.flash('error'),
                    category:faqs,
                    success: req.flash('success'),
                    currentUrl:'/faqs/category'
                });
            });
        })
    },
    categoryUpdate: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            const id = req.params.id;
            faqCategoryModel.findByIdAndUpdate(id, {
                "name": req.body.cat_name,
            }, function (err, update) {
                console.log(update)
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/faqs/category');
                }
                req.flash('success', 'FAQs Category updated successfully.');
                res.redirect('/faqs/category-edit/' + id);
            });
        })
    },
    categoryDelete: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            const id = req.params.id;
            faqCategoryModel.deleteOne({ _id: id, }, function (err, del) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/faqs/category');
                }
                req.flash('success', 'FAQs Category deleted successfully.');
                res.redirect('/faqs/category');
            });
        })
    }
}