import React, { useEffect, useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Dashboard from './components/Dashboard';
import { fetchCombinedData } from './services/api';

function App() {
  const [month, setMonth] = useState('March');   //Default is set to March

  useEffect(() => {
    fetchCombinedData(month).then(data => {
      console.log('Combined Data:', data);
    }).catch(err => {
      console.error('Error fetching data:', err);
    });
  }, [month]);

  return (
    <div className="container mx-auto p-4">
      <img src="/logo.png" alt="Logo" className="h-18 w-40" />
        <div className="flex items-center mb-4 justify-center">
          <h1 className="text-align-center text-4xl font-bold p-4 text-white font-times">Roxiler Systems Transaction App</h1>
        </div>
      <div className="flex justify-end mb-4">
        <select
          className="bg-gray-800 text-white border border-gray-700 rounded p-2 mr-2"
          onChange={(e) => setMonth(e.target.value)}
          value={month}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <TransactionsTable month={month} />

      <Dashboard month={month} />

      <hr className="my-4 border-gray-600" />
      <footer className="text-center text-gray-400 mt- p-2">
        <p>© Copyright Roxiler Systems 2024</p>
      </footer>
    </div>
  );
}

export default App;
