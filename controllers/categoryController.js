
const CategoryModel = require('../models/categoryModel');
var config = require('../config');
const XLSX = require('../node_modules/xlsx');
var fs = require('fs')

module.exports = {
    index: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            CategoryModel.find({}, function (err, category) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/category');
                }
                res.render('category/category-list', {
                    title: 'Label Solution Provider | Category List',
                    page_title: 'Categories list',
                    categories: category,
                    error: req.flash('error'),
                    success: req.flash('success'),
                    currentUrl: '/categories'
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
            CategoryModel.find({}, function (err, category) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/category');
                }
                res.render('category/category-add', {
                    title: 'Label Solution Provider | Add New category',
                    page_title: 'Add Categories',
                    categories: category,
                    error: req.flash('error'),
                    success: req.flash('success'),
                    currentUrl: '/categories'
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
            CategoryModel.find({ name: req.body.name }, function (err, cat) {
                if (cat > 0) {
                    req.flash('error', 'Same name category already exist.');
                    res.redirect('/categories');
                }
                else {
                    let category = new CategoryModel({
                        "code": req.body.code,
                        "name": req.body.name,
                        "parent": req.body.parent,
                        "category": req.body.parent + "/" + req.body.name,
                        "description": req.body.description,
                    });

                    category.save()
                        .then(result => {
                            req.flash('success', 'Category saved successfully.');
                            res.redirect('/categories');
                        })
                        .catch(err => {
                            req.flash('error', 'Something went wrong.');
                            res.redirect('/categories');
                        })
                }
            }).count();
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
            CategoryModel.find({}, function (err, categories) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/category');
                }
                CategoryModel.findById({ _id: id }, function (err, category) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/category');
                    }
                    res.render('category/category-edit', {
                        title: 'Label Solution Provider | Add New category',
                        page_title: 'Add Categories',
                        categories: categories,
                        category: category,
                        error: req.flash('error'),
                        success: req.flash('success'),
                        currentUrl: '/categories'
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
            CategoryModel.findByIdAndUpdate(id, {
                "code": req.body.code,
                "name": req.body.name,
                "parent": req.body.parent,
                "category": req.body.parent + "/" + req.body.name,
                "description": req.body.description,
            }, function (err, update) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/categories');
                }
                req.flash('success', 'Category updated successfully.');
                res.redirect('/categories/edit/' + id);
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
            CategoryModel.deleteOne({ _id: id, }, function (err, del) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/categories');
                }
                req.flash('success', 'Category deleted successfully.');
                res.redirect('/categories');
            });
        })
    },
    import: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            const workbook = XLSX.readFile(req.file.path)
            const sheet_name_list = workbook.SheetNames;
            const exceldData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            exceldData.forEach(function (element) {
                var categories = element.category_name.split("/");
                if (categories[1] === undefined) {
                    CategoryModel.findOne({code: element.code}, function(err, category) {
                        if(!err) {
                            if(!category) {
                                category = new CategoryModel();
                            }
                            category.code = element.code;
                            category.name = categories[0];
                            category.parent = "/";
                            category.category = "/" + element.category_name;
                            category.description = element.description;
                            category.save(function(err) {
                                if(!err) {
                                    // console.log("contact ");
                                }
                                else {
                                    // console.log("Error: could not save contact ");
                                }
                            });
                        }
                    });
                }
                else if (categories[2] === undefined) {
                    CategoryModel.findOne({code: element.code}, function(err, category) {
                        if(!err) {
                            if(!category) {
                                category = new CategoryModel();
                            }
                            category.code = element.code;
                            category.name = categories[1];
                            category.parent = "/" + categories[0];
                            category.category = "/" + element.category_name;
                            category.description = element.description;
                            category.save(function(err) {
                                if(!err) {
                                    console.log("contact ");
                                }
                                else {
                                    console.log("Error: could not save contact ");
                                }
                            });
                        }
                    });
                }
                else if (categories[3] === undefined) {
                    CategoryModel.findOne({code: element.code}, function(err, category) {
                        if(!err) {
                            if(!category) {
                                category = new CategoryModel();
                            }
                            category.code = element.code;
                            category.name = categories[2];
                            category.parent = "/" + categories[0]+ "/" + categories[1];
                            category.category = "/" + element.category_name;
                            category.description = element.description;
                            category.save(function(err) {
                                if(!err) {
                                }
                                else {
                                }
                            });
                        }
                    });
                }
                else {
                    CategoryModel.findOne({code: element.code}, function(err, category) {
                        if(!err) {
                            if(!category) {
                                category = new CategoryModel();
                            }
                            category.code = element.code;
                            category.name = categories[3];
                            category.parent = "/" + categories[0]+ "/" + categories[1] + "/" + categories[2];
                            category.category = "/" + element.category_name;
                            category.description = element.description;
                            category.save(function(err) {
                                if(!err) {
                                }
                                else {
                                }
                            });
                        }
                    });
                }
            });
            fs.unlinkSync(req.file.path);
            req.flash('success', 'Category imported successfully.');
            res.redirect('/categories');
        })
    },
}