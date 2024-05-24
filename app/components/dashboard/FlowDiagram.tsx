// app/components/dashboard/FlowDiagram.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface FlowDiagramProps {
  chartData: ChartData<'bar'>;
  chartOptions: ChartOptions<'bar'>;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ chartData, chartOptions }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 flex-1 md:max-w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login Flow Chart</h2>
      <div className="overflow-x-auto">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FlowDiagram;
