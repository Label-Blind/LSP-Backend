var express = require('express');
var router = express.Router();

const UserController = require('../../controllers/API/userController')
const ContactController = require('../../controllers/API/contactController')
const CmsController = require('../../controllers/API/cmsController')
const FaqsController = require('../../controllers/API/faqsController')
const CategoryController = require('../../controllers/API/categoryController')
const LabelController = require('../../controllers/API/labelController')

// Categories List.
router.post('/register', UserController.register);

// Mitra registration
router.post('/mitra-register', UserController.mitra_register);

// OTP Verification
router.post('/verification', UserController.verify);

// Login
router.post('/login', UserController.authenticate);

// Mitra Login
router.post('/mitra-login',UserController.mitra_authenticate)

// Resend OTP
router.post('/resend-otp', UserController.resend)

// Send Mail
// router.post('/send-mail', UserController.mail);

// Send Query
router.post('/send-query', ContactController.sendQuery)

// Forgot Password
router.post('/forgot-password', UserController.forgotPassword)
        
//Reset Password
router.post('/reset-password/:token', UserController.resetPassword)

// Get CMS Pages
router.get('/cms/:slug', CmsController.getCms)

// LogOut
router.post('/logout', UserController.logout)

// Get Faqs Category
router.get('/faq_category', FaqsController.category)

// Fetch FAQs
router.post('/faqs', FaqsController.faqs)

// Fetch Category
router.get('/all-categories', CategoryController.getAllCategory)

// Fetch Category
router.get('/categories', CategoryController.getCategory)

// Fetch subCategory
router.post('/sub-categories', CategoryController.getSubCategory)

// Fetch Category From Code
router.post('/get-category-from-code', CategoryController.getCategoryFromCode)

// Create Label Layouts
router.post('/save-label-layouts', LabelController.saveLayout)


module.exports = router;