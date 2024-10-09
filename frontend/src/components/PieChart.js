import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChart } from '../services/api';
import 'chart.js/auto';

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPieChartData = async () => {
      setLoading(true);
      try {
        const selectedMonth = month === 'All' ? '' : month;
        const data = await fetchPieChart(selectedMonth);

        const labels = data.map(item => item._id);
        const values = data.map(item => item.count);

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Category Distribution',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPieChartData();
  }, [month]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading pie chart...</div>;
  }

  return (
    <div className="p-4 bg-card rounded-lg text-center">
      <h3 className="text-lg text-gray-300 mb-4">Category Distribution for {month === '' ? 'all months' : month}</h3>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {chartData ? <Pie data={chartData} options={{ maintainAspectRatio: false }} height={300} /> : <p className="text-gray-400">No data available.</p>}
      </div>
    </div>
  );
};

export default PieChart;
