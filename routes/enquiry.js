var express = require('express');
var router = express.Router();

 
const QueryController = require('../controllers/enquiryController')

// Query List.
router.get('/', QueryController.index);

// Query List.
router.get('/details/:id', QueryController.details);

// Delete Query
router.get('/delete/:id', QueryController.delete);

// Reply Message
router.post('/reply', QueryController.reply);


module.exports = router;