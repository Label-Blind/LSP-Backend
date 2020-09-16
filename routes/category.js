var express = require('express');
var router = express.Router();
const multer = require('multer');
const DIR = './public/excel';
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

const CategoryController = require('../controllers/categoryController')

// Categories List.
router.get('/', CategoryController.index);

//Category add 
router.get('/add', CategoryController.add);

// Category save
router.post('/save', CategoryController.save);

// Edit Category
router.get('/edit/:id', CategoryController.edit);

// Update Category
router.post('/update/:id', CategoryController.update);

// Delete Category
router.get('/delete/:id', CategoryController.delete);

// Import Excel
router.post('/import', upload.single('excel'), CategoryController.import)
// router.get('/import',CategoryController.import)

module.exports = router;