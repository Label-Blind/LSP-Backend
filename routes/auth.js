var express = require('express');
var router = express.Router();
var multer = require('multer')
const DIR = './public/images/users';
var path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const UserController = require('../controllers/userController')

// Login Route.
router.get('/',UserController.login);

// Register dashboardRouter
router.get('/register',UserController.create);

// authenticate dashboardRouter.
router.post('/authenticate', UserController.authenticate)

// Logout API
router.post('/logout', function (req, res) {
    return res.status(200).json({ success: true, token: null, message: 'You have logout successfully.' });
})
module.exports = router;
