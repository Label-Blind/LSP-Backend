var express = require('express');
var router = express.Router();
const multer = require('multer');
 
const CMSController = require('../controllers/cmsController')

// CMS List.
router.get('/', CMSController.index);

//CMS add 
router.get('/add', CMSController.add);

// CMS save
router.post('/save', CMSController.save);

// Edit CMS
router.get('/edit/:id', CMSController.edit);

// Update CMS
router.post('/update/:id', CMSController.update);

// Delete CMS
router.get('/delete/:id', CMSController.delete);

// View CMS
router.get('/view/:id', CMSController.view);


module.exports = router;