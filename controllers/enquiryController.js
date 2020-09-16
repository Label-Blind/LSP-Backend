
const ContactModel = require('../models/contactModel');
var config = require('../config');
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
    index: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            ContactModel.find({}, function (err, enquiry) {
                if (err) {
                    req.flash('errormessage', 'Something went wrong ! try again.');
                    res.redirect('/enquiry');
                }
                res.render('enquiry/enquiry-list', {
                    title: 'Label Solution Provider | All Quieries',
                    page_title: 'enquiry Pages',
                    enquiries: enquiry,
                    error: req.flash('error'),
                    success: req.flash('success'),
                    currentUrl:'/enquiries'
                });
            });

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
                ContactModel.findOneAndUpdate({ _id: id }, { viewed: true }, function (err, query) {
                    if (err) {
                        req.flash('errormessage', 'Something went wrong ! try again.');
                        res.redirect('/enquiries');
                    }
                    res.render('enquiry/enquiry-detail', {
                        title: 'Label Solution Provider | Query Details',
                        page_title: 'Enquiry Details',
                        error: req.flash('error'),
                        success: req.flash('success'),
                        errormessage: req.flash('errormessage'),
                        successmessage: req.flash('successmessage'),
                        enquiry: query,
                        currentUrl:'/enquiries'
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
            ContactModel.deleteOne({ _id: id, }, function (err, del) {
                if (err) {
                    req.flash('error', 'Something went wrong ! try again.');
                    res.redirect('/enquiries');
                }
                req.flash('success', 'enquiry deleted successfully.');
                res.redirect('/enquiries');
            });
        })
    },
    reply: (req, res) => {
        var token = req.cookies.jwtoken;
        if (!token) req.flash('error', 'Authentication failed.'), res.redirect('/login');
        config.jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                req.flash('error', 'token expired please login again'), res.redirect('/login');
            }
            if (decoded.id) {
                var mailOptions = {
                    from: 'info@labelblind.com',
                    to: req.body.email,
                    subject: 'Enquiry Response',
                    html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <meta name="format-detection" content="telephone=no"/> <title>Label Service Provider | Enquiry Mail</title> </head> <body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">Enquiry Reply</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;"> ' + req.body.message + ' </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body></html>'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                        req.flash('error', 'Mail is not working.');
                        res.redirect('/enquiries');
                    } else {
                        ContactModel.findOneAndUpdate({ email: req.body.email }, {replied:true}, function (err, reply) {
                            if (err) {
                                req.flash('errormessage', 'Something went wrong ! try again.');
                                res.redirect('/enquiries');
                            }
                            req.flash('success', 'Reply sent successfully.');
                            res.redirect('/enquiries');
                        })
                    }
                });
            }
            else {
                req.flash('error', 'You have not logged in.');
                res.redirect('/login');
            }
        })
    }
}