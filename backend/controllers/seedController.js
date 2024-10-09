const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchAndSeedData = async (req, res) => {
  try {
    // Fetching data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Inserting the data into the transactions collection
    await Transaction.insertMany(transactions);

    res.status(200).json({ message: 'Data seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding data', error });
  }
};

module.exports = { fetchAndSeedData };
