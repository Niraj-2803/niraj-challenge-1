import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../services/api';
import 'chart.js/auto';

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBarChartData = async () => {
      setLoading(true);
      try {
        const selectedMonth = month === 'All' ? '' : month;
        const data = await fetchBarChart(selectedMonth);
        
        const labels = data.map(item => item._id);
        const values = data.map(item => item.count);

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Number of Items',
            data: values,
            backgroundColor: 'rgba(30, 144, 255, 0.6)',
            borderColor: 'rgba(30, 144, 255, 1)',
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBarChartData();
  }, [month]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading bar chart...</div>;
  }

  return (
    <div className="p-4 bg-card rounded-lg text-center">
      <h3 className="text-lg text-gray-300 mb-4">Price Range Distribution for {month === '' ? 'all months' : month}</h3>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {chartData ? <Bar data={chartData} options={{ maintainAspectRatio: false }} height={300} /> : <p className="text-gray-400">No data available.</p>}
      </div>
    </div>
  );
};

export default BarChart;
