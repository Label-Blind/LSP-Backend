const CompanyModel = require('../models/companyModel');
const CategoryModel = require('../models/categoryModel');
var config = require('../config');

module.exports = {
    index: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            CompanyModel.find({}, function(error, count){
                CategoryModel.find({}, function(error, cat){
                    res.render('dashboard', { 
                        title: 'Label Solution Provider | Welcome to dashboard', 
                        page_title: 'Dashbaord', error: req.flash('error') ,
                        success: req.flash('success'),
                        currentUrl:'/dashboard',
                        totalUsers: count,
                        totalCategory: cat,
                        completedLabels: 0,
                        incompletedLabels: 0,
                    });
                }).count(); 
            }).count();            
        })
    }
}