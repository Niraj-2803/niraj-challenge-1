const express = require('express');
const { fetchAndSeedData } = require('../controllers/seedController');

const router = express.Router();

// Route to seed the database
router.get('/seed', fetchAndSeedData);

module.exports = router;
