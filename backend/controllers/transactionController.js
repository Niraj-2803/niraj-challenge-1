const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
    const { search, page = 1, perPage = 10, month } = req.query;
  
    try {
      const filters = {};
      if (month && month !== 'All') {
        const monthIndex = new Date(`${month} 1, 2023`).getMonth();
        filters.$expr = { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] };
      }
      if (search) {
        filters.$or = [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { price: Number(search) || 0 }
        ];
      }
      const transactions = await Transaction.find(filters)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions', error });
    }
  };
const getStatistics = async (req, res) => {
    const { month } = req.query;
  
    try {
      const monthIndex = new Date(`${month} 1, 2023`).getMonth();
  
      // Counting sold items
      const soldItems = await Transaction.countDocuments({
        sold: true,
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
      });
  
      // Counting unsold items
      const unsoldItems = await Transaction.countDocuments({
        sold: false,
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
      });
  
      // Calculating total sales
      const totalSales = await Transaction.aggregate([
        {
          $match: {
            sold: true,
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
          },
        },
        { $group: { _id: null, totalAmount: { $sum: '$price' } } },
      ]);
  
      res.status(200).json({
        totalSales: totalSales[0]?.totalAmount || 0,
        soldItems,
        unsoldItems,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching statistics', error });
    }
  };
const getBarChart = async (req, res) => {
    const { month } = req.query;
  
    try {
      const monthIndex = new Date(`${month} 1, 2023`).getMonth();
  
      const priceRanges = await Transaction.aggregate([
        { 
          $match: { 
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
          }
        },
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            default: "901-above",
            output: { count: { $sum: 1 } }
          },
        },
      ]);
  
      res.status(200).json(priceRanges);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
  };
const getPieChart = async (req, res) => {
    const { month } = req.query;
  
    try {
      const monthIndex = new Date(`${month} 1, 2023`).getMonth();
      const categories = await Transaction.aggregate([
        { 
          $match: { 
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
          }
        },
        { 
          $group: { 
            _id: "$category", 
            count: { $sum: 1 } 
          } 
        },
      ]);
  
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pie chart data', error });
    }
  };
const getCombinedData = async (req, res) => {
    const { month } = req.query;
  
    try {
      const monthIndex = new Date(`${month} 1, 2023`).getMonth();
      const soldItems = await Transaction.countDocuments({
        sold: true,
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
      });
  
      const unsoldItems = await Transaction.countDocuments({
        sold: false,
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
      });
  
      const totalSales = await Transaction.aggregate([
        {
          $match: {
            sold: true,
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
          },
        },
        { $group: { _id: null, totalAmount: { $sum: '$price' } } },
      ]);
      const priceRanges = await Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
          }
        },
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            default: "901-above",
            output: { count: { $sum: 1 } }
          }
        }
      ]);
      const categories = await Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
          }
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);
      res.status(200).json({
        statistics: {
          totalSales: totalSales[0]?.totalAmount || 0,
          soldItems,
          unsoldItems
        },
        barChart: priceRanges,
        pieChart: categories
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching combined data', error });
    }
  };
  
module.exports = { listTransactions, getStatistics, getBarChart, getPieChart, getCombinedData };
  

  
  
  
  
  