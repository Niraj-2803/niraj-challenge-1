import axios from 'axios';
const API_BASE_URL = 'https://mern-transaction-app.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTransactions = async (month, search = '', page = 1, perPage = 10) => {
  const response = await api.get('/transactions', {
    params: { month, search, page, perPage },
  });
  return response.data;
};


export const fetchStatistics = async (month) => {
  const response = await api.get('/statistics', { params: { month } });
  return response.data;
};


export const fetchBarChart = async (month) => {
  const response = await api.get('/barchart', { params: { month } });
  return response.data;
};


export const fetchPieChart = async (month) => {
  const response = await api.get('/piechart', { params: { month } });
  return response.data;
};


export const fetchCombinedData = async (month) => {
  const response = await api.get('/combined', { params: { month } });
  return response.data;
};
