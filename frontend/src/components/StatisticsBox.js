import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api';

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSales: 0, soldItems: 0, unsoldItems: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatistics = async () => {
      setLoading(true);
      try {
        const selectedMonth = month === 'All' ? '' : month;
        const data = await fetchStatistics(selectedMonth);
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [month]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading statistics...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-[#303030] rounded-lg">
      <div className="p-4 bg-customHover rounded-lg text-center">
        <h3 className="text-lg text-gray-300">Total Sales</h3>
        <p className="text-2xl font-semibold text-white">${statistics.totalSales}</p>
      </div>
      <div className="p-4 bg-customHover rounded-lg text-center">
        <h3 className="text-lg text-gray-300">Sold Items</h3>
        <p className="text-2xl font-semibold text-white">{statistics.soldItems}</p>
      </div>
      <div className="p-4 bg-customHover rounded-lg text-center">
        <h3 className="text-lg text-gray-300">Unsold Items</h3>
        <p className="text-2xl font-semibold text-white">{statistics.unsoldItems}</p>
      </div>
    </div>
  );
};

export default StatisticsBox;
