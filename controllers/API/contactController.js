const ContactModel = require('../../models/contactModel');
var config = require('../../config');
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
    sendQuery: (req, res) => {

        if (!req.body.name) {
            res.status(500).json({ "status": false, "message": "Name field can not blank." });
        }
        if (!req.body.company_name) {
            res.status(500).json({ "status": false, "message": "Company Name field can not blank." });
        }
        if (!req.body.email) {
            res.status(500).json({ "status": false, "message": "Email field can not blank." });
        }
        if (!req.body.phone) {
            res.status(500).json({ "status": false, "message": "Phone field can not blank." });
        }
        if (!req.body.subject) {
            res.status(500).json({ "status": false, "message": " Subject field can not blank." });
        }
        if (!req.body.message) {
            res.status(500).json({ "status": false, "message": " Message size field can not blank." });
        }
        const emailRegexp1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        var validateEmail1 = emailRegexp1.test(req.body.email);
        if (validateEmail1 === false) {
            res.status(500).json({ "status": false, "message": "Email is not valid." });
        }
        else {
            var mailOptions = {
                from: 'info@labelblind.com',
                to: req.body.email,
                subject: 'Enquiry',
                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <meta name="format-detection" content="telephone=no"/> <title>Label Service Provider | Enquiry Mail</title> </head> <body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center style="background-color:#E1E1E1;"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"> <tr> <td align="center" valign="top" id="bodyCell"> <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td valign="top" width="500" class="flexibleContainerCell"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none !important;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td><td align="right" valign="middle" class="flexibleContainerBox"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;"> <tr> <td align="left" class="textContent"> <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;"> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody"><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" class="textContent"> <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Label Service Provider</h1> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">An IT Platform integrated with FSSAI’s IT Platform for Licensing of Food Businesses.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">Enquiry</h3> <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;"> ' + req.body.message + ' </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" valign="top" style="background: #f8f8f8;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"> <tr> <td align="center" valign="top" width="500" class="flexibleContainerCell"> <table border="0" cellpadding="30" cellspacing="0" width="100%"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td valign="top" class="textContent"> <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Copyright &#169; 2020 <a href="https://www.labelserviceprovider.com" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">LabelServiceProvider</span></a>. All&nbsp;rights&nbsp;reserved.</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body></html>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(500).json({ "status": false, "message": "Mail is not working" });
                } else {
                    let contact = new ContactModel({
                        "name": req.body.name,
                        "company_name": req.body.company_name,
                        "email": req.body.email,
                        "code": "+91",
                        "phone": req.body.phone,
                        "subject": req.body.subject,
                        "message": req.body.message,
                        "viewed": false,
                        "replied": false,
                    })
                    contact.save()
                        .then(result => {
                            res.status(200).json({ "status": true, "message": "Query sent successfully" });
                        })
                        .catch(err => {
                            res.status(500).json({ "status": false, "message": "Query not saved!" });
                        })
                    // console.log('Email sent: ' + info.response);
                }
            });
        }
    },
}