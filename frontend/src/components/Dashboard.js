import React, { useState } from 'react';
import StatisticsBox from './StatisticsBox';
import BarChart from './BarChart';
import PieChart from './PieChart';

const Dashboard = ({ month }) => {
  const [activeTab, setActiveTab] = useState('statistics');

  const renderContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <StatisticsBox month={month} />;
      case 'barchart':
        return <BarChart month={month} />;
      case 'piechart':
        return <PieChart month={month} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-6">
      <div className="grid grid-cols-3 gap-4 w-full max-w-5xl">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'statistics' ? ' text-white' : 'bg-[#282828] text-gray-200'}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'barchart' ? ' text-white' : 'bg-[#282828] text-gray-200'}`}
          onClick={() => setActiveTab('barchart')}
        >
          Bar Chart
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'piechart' ? ' text-white' : 'bg-[#282828] text-gray-200'}`}
          onClick={() => setActiveTab('piechart')}
        >
          Pie Chart
        </button>
      </div>

      <div className="w-full max-w-5xl p-6 bg-card">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
