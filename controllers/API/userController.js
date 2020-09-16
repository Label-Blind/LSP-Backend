const CompanyModel = require('../../models/companyModel');
const ResetPasswordModel = require('../../models/reset_passwordModel')
var config = require('../../config');
var crypto = require('crypto');
const companyModel = require('../../models/companyModel');
var transporter = config.nodemailer.createTransport({
    host: "email-smtp.ap-south-1.amazonaws.com",
    port: 587,
    secure: false,
    auth: {
        user: 'AKIAQX6EYSHDV6QGLSUK',
        pass: 'BFSi8uqrGOmCbe25maqBAANcJA/siIejSt9O9s9t6iDe'
    }
})
module.exports = {
    register: (req, res) => {

        if (!req.body.company_name) {
            res.status(500).json({ "status": false, "message": "Company Name field can not blank." });
        }
        if (!req.body.fssai_licence_no) {
            res.status(500).json({ "status": false, "message": "FSSAI Licence No field can not blank." });
        }
        if (!req.body.licence_type) {
            res.status(500).json({ "status": false, "message": " Licence type field can not blank." });
        }
        if (!req.body.profile) {
            res.status(500).json({ "status": false, "message": " Profile field can not blank." });
        }
        if (!req.body.employee_size) {
            res.status(500).json({ "status": false, "message": " Employee size field can not blank." });
        }
        if (!req.body.revenue) {
            res.status(500).json({ "status": false, "message": " Revenue field can not blank." });
        }
        if (!req.body.retail_structure) {
            res.status(500).json({ "status": false, "message": "Retail Structure field can not blank." });
        }
        if (!req.body.email) {
            res.status(500).json({ "status": false, "message": " Email field can not blank." });
        }
        if (!req.body.password) {
            res.status(500).json({ "status": false, "message": " Password field can not blank." });
        }
        if (!req.body.phone) {
            res.status(500).json({ "status": false, "message": " Phone no field can not blank." });
        }
        const emailRegexp1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        var validateEmail1 = emailRegexp1.test(req.body.email);
        if (validateEmail1 === false) {
            res.status(500).json({ "status": false, "message": "Email is not valid." });
        }

        config.bcrypt.hash(req.body.password, config.saltRounds, function (err, hash) {
            if (err) {
                res.status(500).json({ "status": false, "message": "Something goes wrong in password encryption" });
            }
            else {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    let company = new CompanyModel({
                        "company_name": req.body.company_name,
                        "fssai_licence_no": req.body.fssai_licence_no,
                        "licence_type": req.body.licence_type,
                        "profile": req.body.profile,
                        "employee_size": req.body.employee_size,
                        "revenue": req.body.revenue,
                        "retail_structure": req.body.retail_structure,
                        "email": req.body.email,
                        "password": hash,
                        "country_code": req.body.country_code,
                        "phone": req.body.phone,
                        "otp": req.body.otp,
                        "verified": req.body.verified,
                        "verificationToken": token,
                        "operator": req.body.operator
                    });
                    company.save()
                        .then(result => {
                            var mailOptions = {
                                from: 'info@labelblind.com',
                                to: req.body.email,
                                subject: 'OTP Verification',
                                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="format-detection" content="telephone=no" /><title>Label Service Provider | OTP Mail</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">OTP Code</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">OTP Verification verifies Email Address/Mobile Number of users by sending verification code(OTP) during registration. It removes the possibility of a user registering with fake Email Address/Mobile Number. </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #3498DB;"> <tr> <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"> <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;letter-spacing: 15px;font-weight: bold !important;" href="#" target="_blank">' + req.body.otp + '</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body> </html>'
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    // console.log(error);
                                    res.status(500).json({ "status": false, "token": token, "message": "Profile created successfully. Mail is not working" });
                                } else {
                                    res.status(200).json({ "status": true, "token": token, "message": "Profile created successfully. Please check email for profile verification." });
                                    // console.log('Email sent: ' + info.response);
                                }
                            });
                            // res.status(200).json({ "status": true, "token": token,"message": "Profile created successfully" });
                        })
                        .catch(err => {
                            if (err.errors.phone !== undefined) {
                                res.status(500).json({ "status": false, "message": "Phone no must be unique" });
                            } else if (err.errors.email !== undefined) {
                                res.status(500).json({ "status": false, "message": "Email must be unique" });
                            } else {
                                res.status(500).json({ "status": false, "message": err._message });
                            }

                        })
                })
            }
        });
    },
    mitra_register: (req, res) => {

        if (!req.body.mitra_name) {
            res.status(500).json({ "status": false, "message": "Name field can not blank." });
        }
        if (!req.body.fsm_registration_no) {
            res.status(500).json({ "status": false, "message": "FSM Registration No field can not blank." });
        }
        if (!req.body.mitra_type) {
            res.status(500).json({ "status": false, "message": " Mitra type field can not blank." });
        }
        if (!req.body.email) {
            res.status(500).json({ "status": false, "message": " Email field can not blank." });
        }
        if (!req.body.password) {
            res.status(500).json({ "status": false, "message": " Password field can not blank." });
        }
        if (!req.body.phone) {
            res.status(500).json({ "status": false, "message": " Phone no field can not blank." });
        }
        const emailRegexp1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        var validateEmail1 = emailRegexp1.test(req.body.email);
        if (validateEmail1 === false) {
            res.status(500).json({ "status": false, "message": "Email is not valid." });
        }

        config.bcrypt.hash(req.body.password, config.saltRounds, function (err, hash) {
            if (err) {
                res.status(500).json({ "status": false, "message": "Something goes wrong in password encryption" });
            }
            else {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    let company = new CompanyModel({
                        "name": req.body.mitra_name,
                        "fsm_registration_no": req.body.fsm_registration_no,
                        "mitra_type": req.body.mitra_type,
                        "email": req.body.email,
                        "password": hash,
                        "country_code": req.body.country_code,
                        "phone": req.body.phone,
                        "otp": req.body.otp,
                        "verified": req.body.verified,
                        "verificationToken": token,
                        "operator": req.body.operator
                    });
                    company.save()
                        .then(result => {
                            var mailOptions = {
                                from: 'info@labelblind.com',
                                to: req.body.email,
                                subject: 'OTP Verification',
                                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="format-detection" content="telephone=no" /><title>Label Service Provider | OTP Mail</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">OTP Code</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">OTP Verification verifies Email Address/Mobile Number of users by sending verification code(OTP) during registration. It removes the possibility of a user registering with fake Email Address/Mobile Number. </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #3498DB;"> <tr> <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"> <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;letter-spacing: 15px;font-weight: bold !important;" href="#" target="_blank">' + req.body.otp + '</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body> </html>'
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    // console.log(error);
                                    res.status(500).json({ "status": false, "token": token, "message": "Profile created successfully. Mail is not working" });
                                } else {
                                    res.status(200).json({ "status": true, "token": token, "message": "Profile created successfully. Please check email for profile verification." });
                                    // console.log('Email sent: ' + info.response);
                                }
                            });
                            // res.status(200).json({ "status": true, "token": token,"message": "Profile created successfully" });
                        })
                        .catch(err => {
                            if (err.errors.phone !== undefined) {
                                res.status(500).json({ "status": false, "message": "Phone no must be unique" });
                            } else if (err.errors.email !== undefined) {
                                res.status(500).json({ "status": false, "message": "Email must be unique" });
                            } else {
                                res.status(500).json({ "status": false, "message": err._message });
                            }
                        })
                })
            }
        });
    },
    verify: (req, res) => {
        if (!req.body.code) {
            res.status(500).json({ "status": false, "message": "Verification code field can not blank." });
        }
        CompanyModel.findOne({ "verificationToken": req.body.token }, function (error, company) {
            if (error) {
                res.status(500).json({ "status": false, "message": error });
            }
            else {
                if (!company) {
                    res.status(500).json({ "status": false, "message": "Acoount verification token mismatch." });
                }
                else {
                    if (company.otpExpiry <= Date.now()) {
                        res.status(500).json({ "status": false, "message": "OTP code expired. OTP is valid for 5 minutes." });
                    }
                    else if (company.otp == req.body.code) {
                        CompanyModel.findOneAndUpdate({ "email": req.body.email, 'otp': req.body.code }, { "otp": '', 'verified': true,'last_visited':Date.now() }, function (err, update) {
                            if (err) {
                                res.status(500).json({ "status": false, "message": "Something went wrong." });
                            }
                            var token = config.jwt.sign({
                                'id': company._id,
                                'email': company.email,
                                'username': company.company_name,
                            }, config.secretToken, { expiresIn: '2h' });
                            res.status(200).json({ "status": true, "accessToken": token, "message": "Account verified successfully." });
                        });
                    }
                    else {
                        res.status(500).json({ "status": false, "message": "OTP is not correct." });
                    }
                }
            }
        });
    },
    authenticate: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let operator = req.body.operator;
        if (!req.body.email) {
            req.flash('error', 'Email field can not blank.'), res.redirect('/login');
        }
        const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var validateEmail = emailRegexp.test(req.body.email);
        // console.log(validateEmail)
        if (validateEmail === false) {
            res.status(500).json({ "status": false, "message": "Email is not valid." });
        }
        if (!req.body.password) {
            req.flash('error', 'Password field can not blank.'), res.redirect('/login');
        }
        CompanyModel.findOne({ "email": email }, function (error, company) {
            if (company) {
                if(company.operator !== operator){
                    res.status(500).json({ "status": false, "message": "You are not a Food Business  Operator." });
                }
                config.bcrypt.compare(password, company.password, function (err, success) {
                    if (success) {
                        crypto.randomBytes(20, function (err, buf) {
                            var token = buf.toString('hex');
                            CompanyModel.findOneAndUpdate({ "email": req.body.email },
                                {
                                    "otp": req.body.otp,
                                    "otpExpiry": Date.now() + 300000,
                                    "verified": false,
                                    "verificationToken": token,
                                }, function (err, update) {
                                    if (err) {
                                        res.status(500).json({ "status": false, "message": err });
                                    }
                                    var mailOptions = {
                                        from: 'info@labelblind.com',
                                        to: req.body.email,
                                        subject: 'OTP Verification',
                                        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="format-detection" content="telephone=no" /><title>Label Service Provider | OTP Mail</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">OTP Code</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">OTP Verification verifies Email Address/Mobile Number of users by sending verification code(OTP) during registration. It removes the possibility of a user registering with fake Email Address/Mobile Number. </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #3498DB;"> <tr> <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"> <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;letter-spacing: 15px;font-weight: bold !important;" href="#" target="_blank">'+req.body.otp+'</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body> </html>'
                                    };

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            // console.log(error);
                                            res.status(500).json({ "status": false, "token": token, "message": "Login successfully. Mail is not working" });
                                        } else {
                                            res.status(200).json({ "status": true, "token": token, "message": "Login successfully. Please check email for login verification." });
                                            // console.log('Email sent: ' + info.response);
                                        }
                                    });
                                    // res.status(200).json({ "status": true, "token": token, "message": "Login successfully." });
                                });
                        })
                        // res.status(200).json({ "status": true, "message": "Login successfully." });
                    } else {
                        res.status(500).json({ "status": false, "message": "Password is not correct." });
                    }
                });
            }
            else {
                res.status(500).json({ "status": false, "message": "User does not exist." });
            }
        })
    },
    mitra_authenticate: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let operator = req.body.operator;
        if (!req.body.email) {
            req.flash('error', 'Email field can not blank.'), res.redirect('/login');
        }
        const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var validateEmail = emailRegexp.test(req.body.email);
        // console.log(validateEmail)
        if (validateEmail === false) {
            res.status(500).json({ "status": false, "message": "Email is not valid." });
        }
        if (!req.body.password) {
            req.flash('error', 'Password field can not blank.'), res.redirect('/login');
        }
        CompanyModel.findOne({ "email": email}, function (error, company) {
            if (company) {
                if(company.operator == operator){
                    config.bcrypt.compare(password, company.password, function (err, success) {
                        if (success) {
                            crypto.randomBytes(20, function (err, buf) {
                                var token = buf.toString('hex');
                                CompanyModel.findOneAndUpdate({ "email": req.body.email },
                                    {
                                        "otp": req.body.otp,
                                        "otpExpiry": Date.now() + 300000,
                                        "verified": false,
                                        "verificationToken": token,
                                    }, function (err, update) {
                                        if (err) {
                                            res.status(500).json({ "status": false, "message": err });
                                        }
                                        var mailOptions = {
                                            from: 'info@labelblind.com',
                                            to: req.body.email,
                                            subject: 'OTP Verification',
                                            html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="format-detection" content="telephone=no" /><title>Label Service Provider | OTP Mail</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">OTP Code</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">OTP Verification verifies Email Address/Mobile Number of users by sending verification code(OTP) during registration. It removes the possibility of a user registering with fake Email Address/Mobile Number. </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #3498DB;"> <tr> <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"> <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;letter-spacing: 15px;font-weight: bold !important;" href="#" target="_blank">'+req.body.otp+'</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body> </html>'
                                        };
    
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                // console.log(error);
                                                res.status(500).json({ "status": false, "token": token, "message": "Login successfully. Mail is not working" });
                                            } else {
                                                res.status(200).json({ "status": true, "token": token, "message": "Login successfully. Please check email for login verification." });
                                                // console.log('Email sent: ' + info.response);
                                            }
                                        });
                                        // res.status(200).json({ "status": true, "token": token, "message": "Login successfully." });
                                    });
                            })
                            // res.status(200).json({ "status": true, "message": "Login successfully." });
                        } else {
                            res.status(500).json({ "status": false, "message": "Password is not correct." });
                        }
                    });
                }
                else{
                    res.status(500).json({ "status": false, "message": "You are not a Mitra Operator." });
                }                
            }
            else {
                res.status(500).json({ "status": false, "message": "User does not exist." });
            }
        })
    },
    resend: (req, res) => {
        token = req.body.token;
        CompanyModel.findOneAndUpdate({ "verificationToken": req.body.token }, { 'otp': req.body.code, otpExpiry: Date.now() + 300000, 'verified': false }, function (err, company) {
            if (err) {
                res.status(500).json({ "status": false, "message": "Something went wrong." });
            }
            else if (!company) {
                res.status(500).json({ "status": false, "message": "Email not registered." });
            }
            else {
                var mailOptions = {
                    from: 'info@labelblind.com',
                    to: company.email,
                    subject: 'OTP Verification',
                    html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="format-detection" content="telephone=no" /><title>Label Service Provider | OTP Mail</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">OTP Code</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">OTP Verification verifies Email Address/Mobile Number of users by sending verification code(OTP) during registration. It removes the possibility of a user registering with fake Email Address/Mobile Number. </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #3498DB;"> <tr> <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"> <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;letter-spacing: 15px;font-weight: bold !important;" href="#" target="_blank">' + req.body.code + '</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body> </html>'
                };
        
                transporter.sendMail(mailOptions, function (error, info) {
                    if(error){
                        res.status(500).json({ "status": false, "message": "Something went wrong." });
                    }
                    res.status(200).json({ "status": true, "message": "Verification code sent successfully!" });
                });
            }
        });
        // var mailOptions = {
        //     from: 'info@labelblind.com',
        //     to: req.body.email,
        //     subject: 'OTP Verification',
        //     html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="format-detection" content="telephone=no" /><title>Label Service Provider | OTP Mail</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">OTP Code</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">OTP Verification verifies Email Address/Mobile Number of users by sending verification code(OTP) during registration. It removes the possibility of a user registering with fake Email Address/Mobile Number. </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #3498DB;"> <tr> <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"> <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;letter-spacing: 15px;font-weight: bold !important;" href="#" target="_blank">' + req.body.code + '</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body> </html>'
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         res.status(500).json({ "status": false, "message": "Something went wrong" });
        //     } else {
                
        //         CompanyModel.findOneAndUpdate({ "email": req.body.email }, { 'otp': req.body.code, otpExpiry: Date.now() + 120000, 'verified': false }, function (err, company) {
        //             if (err) {
        //                 res.status(500).json({ "status": false, "message": "Something went wrong." });
        //             }
        //             else if (!company) {
        //                 res.status(500).json({ "status": false, "message": "Email not registered." });
        //             }
        //             else {
        //                 res.status(200).json({ "status": true, "message": "Verification code sent successfully!" });
        //             }
        //         });
        //         // res.status(200).json({ "status": true, "message": "Verification code sent successfully!" });
        //     }
        // });
    },
    forgotPassword: (req, res) => {
        if (!req.body.email) {
            res.status(500).json({ "status": false, "message": " Email field can not blank." });
        }
        const emailRegexp1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var validateEmail1 = emailRegexp1.test(req.body.email);
        if (validateEmail1 === false) {
            res.status(500).json({ "status": false, "message": "Email is not valid." });
        }
        crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString('hex');
            CompanyModel.findOne({ email: req.body.email }, function (err, company) {
                if (!company) {
                    res.status(500).json({ "status": false, "message": "No account with that email address exists." });
                }
                else {
                    ResetPasswordModel.findOne({ "email": req.body.email }, function (err, update) {
                        if (err) {
                            res.status(500).json({ "status": false, "message": "Something went wrong." });
                        }
                        else if (!update) {
                            const reset = new ResetPasswordModel({
                                "email": req.body.email,
                                "resetPasswordToken": token,
                                "resetPasswordExpires": Date.now() + 3600000 // 1 hour
                            });
                            reset.save()
                                .then(result => {
                                    var ResetLink = "http://localhost:3000/reset/" + token
                                    var mailOptions = {
                                        from: 'info@labelblind.com',
                                        to: req.body.email,
                                        subject: 'Forgot Password',
                                        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <meta name="format-detection" content="telephone=no"/> <title>Label Service Provider | Reset Link</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;"> Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;"> An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;"> Reset Link</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;"> Click the given below link for reset your password . </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="emailButton"> <tr> <td align="center" valign="middle"> <a href="' + ResetLink + '" target="_blank">localhost:3000/reset/' + token + '</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;"> Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center></body></html>'
                                    };

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            res.status(500).json({ "status": false, "message": "Something went wrong" });
                                        } else {
                                            res.status(200).json({ "status": true, "message": "Reset link sent in your email!" });
                                        }
                                    });
                                    // res.status(200).json({ "status": true, "message": "Reset link sent in your email successfully id!" });
                                })
                                .catch(err => {
                                    res.status(500).json({ "status": false, "message": err._message });
                                });
                        }
                        else {
                            ResetPasswordModel.update({ "email": req.body.email }, { $set: { "resetPasswordToken": token, "resetPasswordExpires": Date.now() + 3600000 } }, function (err, resp) {
                                if (err) {
                                    res.status(500).json({ "status": false, "message": err._message });
                                }
                                var ResetLink = "http://localhost:3000/reset/" + token
                                var mailOptions = {
                                    from: 'info@labelblind.com',
                                    to: req.body.email,
                                    subject: 'Forgot Password',
                                    html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <meta name="format-detection" content="telephone=no"/> <title>Label Service Provider | Reset Link</title></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;"> Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;"> An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;"> Reset Link</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;"> Click the given below link for reset your password . </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr style="padding-top:0;"> <td align="center" valign="top"> <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td style="padding-top:28px;" align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="emailButton"> <tr> <td align="center" valign="middle"> <a href="' + ResetLink + '" target="_blank">localhost:3000/reset/' + token + '</a> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;"> Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center></body></html>'
                                };

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        res.status(500).json({ "status": false, "message": "Something went wrong" });
                                    } else {
                                        res.status(200).json({ "status": true, "message": "Reset link sent in your email successfully id!" });
                                    }
                                });
                                // res.status(200).json({ "status": true, "message": "Reset link sent in your email successfully id!" });
                            });
                        }
                    })
                }
            })
        })
    },
    resetPassword: (req, res) => {
        if (!req.body.new_pass) {
            res.status(500).json({ "status": false, "message": "New Password field can not blank." });
        }
        if (!req.body.conf_pass) {
            res.status(500).json({ "status": false, "message": "Confirm Password field can not blank." });
        }
        ResetPasswordModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
            if (!user) {
                res.status(500).json({ "status": false, "message": "Password reset token is invalid or has expired." });
            }
            else if (req.body.new_pass === req.body.conf_pass) {
                config.bcrypt.hash(req.body.new_pass, config.saltRounds, function (err, hash) {
                    if (err) {
                        res.status(500).json({ "status": false, "message": "Something goes wrong in password encryption" });
                    }
                    else {
                        CompanyModel.findOneAndUpdate({ email: user.email }, { password: hash }, function (error, com) {
                            if (error) {
                                res.status(500).json({ "status": true, "message": "Something went wrong" });
                            }
                            else {
                                ResetPasswordModel.findOneAndDelete({ resetPasswordToken: req.params.token }, function (erri, upd) {
                                    if (erri) {
                                        res.status(500).json({ "status": false, "message": "Something went wrong." });
                                    }
                                    else {
                                        res.status(200).json({ "status": true, "message": "Password changed successfully" });
                                    }
                                })
                            }
                        });
                    }
                });
            }
            else {
                res.status(500).json({ "status": false, "message": "New Password & Confirm Password is not match." });
            }
        });
    },
    logout: (req, res) => {
        var token = req.body.token;
        if (!token){
            res.status(500).json({ "status": false, "message": "Token not found." });
        }
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                res.status(500).json({ "status": false, "message": "Token already expired please login again." });
            }
            else if (decoded.id) {
                companyModel.findOneAndUpdate({email:decoded.email},{last_visited:Date.now()}, function(err, comp){
                    if(err){
                        res.status(500).json({ "status": false, "message": "Problem on updating Data." });
                    }
                    res.status(200).json({ "status": true, "message": "Log Out successfully." });
                })
            }
            else{

            }
        })
    }
    // mail: (req, res) => {
    //     var transporter = config.nodemailer.createTransport({
    //         host: "email-smtp.ap-south-1.amazonaws.com",
    //         port: 587,
    //         secure: false,
    //         auth: {
    //             user: 'AKIAQX6EYSHDV6QGLSUK',
    //             pass: 'BFSi8uqrGOmCbe25maqBAANcJA/siIejSt9O9s9t6iDe'
    //         }
    //     });

    //     var mailOptions = {
    //         from: 'info@labelblind.com',
    //         to: 'surajk.labelblind@gmail.com',
    //         subject: 'Sending Email using Node.js',
    //         text: 'That was easy!',
    //         html: 'That was easy!'
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //         }
    //     });
    // },
}