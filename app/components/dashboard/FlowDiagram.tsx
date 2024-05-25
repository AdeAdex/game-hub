import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { ThemeContext } from '@/app/lib/ThemeContext'; // Import ThemeContext

interface FlowDiagramProps {
  chartData: ChartData<'bar'>;
  chartOptions: ChartOptions<'bar'>;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ chartData, chartOptions }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className={`shadow-lg rounded-lg p-8 flex-1 md:max-w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Login Flow Chart</h2>
      <div className="overflow-x-auto">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FlowDiagram;
