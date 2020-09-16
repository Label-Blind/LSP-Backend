var express = require('express');
var router = express.Router();
const multer = require('multer');
const DIR = './public/images/users';
var path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
 
let upload = multer({storage: storage});

const UserController = require('../controllers/userController');

// Get User detail
router.get('/', UserController.profile);

// Update User details
router.post('/update-profile', UserController.updateProfile);

// change User password
router.post('/change-password', UserController.changePassword);

// profile update
router.post('/upload-profile', upload.single('profile_pic'), UserController.uploadProfile);

// Get All User
router.get('/users', UserController.users);

// Log Out
router.get('/logout', UserController.logout);

module.exports = router;
