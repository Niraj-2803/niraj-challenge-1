const express = require('express');
const { listTransactions } = require('../controllers/transactionController');

const router = express.Router();

// Route to list transactions with search and pagination
router.get('/transactions', listTransactions);

const { getStatistics } = require('../controllers/transactionController');

// Route for statistics (total sales, sold, unsold items)
router.get('/statistics', getStatistics);

// /backend/routes/transactionRoute.js
const { getBarChart } = require('../controllers/transactionController');

// Route for bar chart (price range)
router.get('/barchart', getBarChart);

// /backend/routes/transactionRoute.js
const { getPieChart } = require('../controllers/transactionController');

// Route for pie chart (categories)
router.get('/piechart', getPieChart);

const { getCombinedData } = require('../controllers/transactionController');

// Route for combined data (statistics, bar chart, pie chart)
router.get('/combined', getCombinedData);

module.exports = router;
