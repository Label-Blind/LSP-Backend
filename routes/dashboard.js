var express = require('express');
var router = express.Router();

const DashboardController = require('../controllers/dashboardController')

// Dashboard Route.
router.get('/', DashboardController.index);

module.exports = router;