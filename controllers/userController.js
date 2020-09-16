const UserModel = require('../models/usersModel');
const CompanyModel = require('../models/companyModel');
var config = require('../config');

module.exports = {
    login: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token){
            // req.flash('error', 'Authentication failed.'),
            res.render('login', { title: 'Admin Panel', error: req.flash('error'), success: req.flash('success') });
        }
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                res.render('login', { title: 'Admin Panel', error: req.flash('error'), success: req.flash('success') });
            }
            else if (decoded.id) {
                res.redirect('/dashboard');
            }
            else{
                res.render('login', { title: 'Admin Panel', error: req.flash('error'), success: req.flash('success') });
            }
        })        
    },
    create: (req, res) => {
        let user = new UserModel({
            "first_name": "Admin",
            "last_name": "Panel",
            "email": "admin@gmail.com",
            "address": "",
            "phone": "9534033101",
            "password": config.md5("123456"),
            "profile_pic": "",
            "role": "Admin"
        });

        user.save()
            .then(result => {
                res.status(200).json({ "status": true, "message": "Admin created successfully" });
            })
            .catch(err => {
                res.status(500).json({ "status": false, "messgae": err });
            })
    },
    authenticate: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role;
        if (!req.body.email) {
            req.flash('error', 'Email field can not blank.'), res.redirect('/login');
        }
        if (!req.body.password) {
            req.flash('error', 'Password field can not blank.'), res.redirect('/login');
        }
        if (!req.body.role) {
            req.flash('error', 'Role field can not blank.'), res.redirect('/login');
        }
        UserModel.findOne({ "email": email, "role": role }, function (error, user) {
            if (user) {
                var encrypt_pass = config.md5(password);
                if (encrypt_pass === user.password) {
                    var token = config.jwt.sign({
                        'id': user.id,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                    }, config.secretToken, { expiresIn: '2h' });
                    res.cookie('jwtoken', token);
                    req.flash('success', 'Login successfully'), res.redirect('/dashboard');
                }
                else {
                    req.flash('error', 'Password is not correct.'), res.redirect('/login');
                }
            }
            else {
                req.flash('error', 'User does not exist.'), res.redirect('/login');
            }
        })
    },
    profile: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            UserModel.findById(decoded.id, function (err, result) {
                if (err) req.flash('error', 'There was a problem finding the user.'), res.redirect('/login');
                if (!result) req.flash('error', 'token expired please login again'), res.redirect('/login');
                res.render('profile', {
                    title: 'Profile',
                    page_title: 'Profile',
                    error: req.flash('error'),
                    success: req.flash('success'),
                    errormessage: req.flash('errormessage'),
                    successmessage: req.flash('successmessage'),
                    first_name: result.first_name,
                    last_name: result.last_name,
                    phone: result.phone,
                    address: result.address,
                    email: result.email,
                    profile: result.profile_pic,
                    
                });
            });
        })
    },
    updateProfile: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            if (decoded.id) {
                UserModel.findByIdAndUpdate(decoded.id, req.body, function (err, update) {
                    if (err) {
                        req.flash('error', 'Something went wrong ! try again.');
                        res.redirect('/profile');
                    }
                    req.flash('success', 'Profile updated successfully.');
                    res.redirect('/profile');
                });
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
        })
    },
    changePassword: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            if (decoded.id) {
                let new_pass = req.body.new_password
                let confirm_pass = req.body.confirm_password
                if (new_pass === confirm_pass) {
                    UserModel.findByIdAndUpdate(decoded.id, { password: config.md5(new_pass) }, function (err, update) {
                        if (err) {
                            req.flash('errormessage', 'Something went wrong ! try again.');
                            res.redirect('/profile');
                        }
                        req.flash('successmessage', 'Password updated successfully.');
                        res.redirect('/profile');
                    });
                }
                else {
                    req.flash('errormessage', "New password and Confirm password is not correct.");
                    res.redirect('/profile');
                }
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
        })
    },
    uploadProfile: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            if (decoded.id) {
                var image = req.file.filename;
                UserModel.findByIdAndUpdate(decoded.id, { profile_pic: image }, function (err, update) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/profile');
                    }
                    req.flash('successmessage', 'Password updated successfully.');
                    res.redirect('/profile');
                });
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
        })
    },
    users: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            if (decoded.id) {
                CompanyModel.find({}, function (err, users) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/users');
                    }
                    res.render('users/user-list', {
                        title: 'Label Solution Provider | Users List',
                        page_title: 'Users list',
                        error: req.flash('error'),
                        success: req.flash('success'),
                        errormessage: req.flash('errormessage'),
                        successmessage: req.flash('successmessage'),
                        users: users,
                        currentUrl:'/users'
                    });
                });
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
        })
    },
    details: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            if (decoded.id) {
                const id = req.params.id;
                CompanyModel.findOne({_id: id}, function (err, company) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/users');
                    }
                    res.render('users/user-detail', {
                        title: 'Label Solution Provider | Users List',
                        page_title: 'Users list',
                        error: req.flash('error'),
                        success: req.flash('success'),
                        errormessage: req.flash('errormessage'),
                        successmessage: req.flash('successmessage'),
                        company: company,
                        currentUrl:'/users'
                    });
                });
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
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
            CompanyModel.deleteOne({ _id: id, }, function (err, del) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/users');
                }
                req.flash('success', 'User deleted successfully.');
                res.redirect('/users');
            });
        })
    },
    logout: (req, res) => {
        res.clearCookie("jwtoken");
        var token = req.cookies.jwtoken;
        req.flash('success', 'you have log out successfully.');
        res.redirect('/login');
    }

}