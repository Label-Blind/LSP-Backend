var express = require('express');
var router = express.Router();
 
const FAQsController = require('../controllers/faqController')

// FAQs List.
router.get('/', FAQsController.index);

//FAQs add 
router.get('/add', FAQsController.add);

// FAQs save
router.post('/save', FAQsController.save);

// Edit FAQs
router.get('/edit/:id', FAQsController.edit);

// Update FAQs
router.post('/update/:id', FAQsController.update);

// Delete FAQs
router.get('/delete/:id', FAQsController.delete);

// Create FAQs Category
// router.get('/createCategory', FAQsController.createCategory);

// View FAQs
router.get('/view/:id', FAQsController.view);

// Add FAQs Category
router.get('/category', FAQsController.category)

// Add FAQs Category
router.get('/add-category', FAQsController.categoryAdd)

// Save FAQs Category
router.post('/category-save', FAQsController.categorySave)

// Edit FAQs Category
router.get('/category-edit/:id', FAQsController.categoryEdit)

// Update FAQs Category
router.post('/category-update/:id', FAQsController.categoryUpdate)

// Update FAQs Category
router.get('/category-delete/:id', FAQsController.categoryDelete)


module.exports = router;