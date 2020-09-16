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

// Get all users
router.get('/', UserController.users);

// Users Details
router.get('/details/:id', UserController.details);

// Delete Users
router.get('/delete/:id', UserController.delete);



module.exports = router;
