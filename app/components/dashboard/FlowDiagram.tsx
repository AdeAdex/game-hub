import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

interface FlowDiagramProps {
  chartData: ChartData<"bar">;
  chartOptions: ChartOptions<"bar">;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({
  chartData,
  chartOptions,
}) => {
  return (
    <div
      className={`shadow-lg rounded-lg p-8 flex-1 dark:bg-gray-900 bg-white dark:text-white text-gray-800`}
    >
      <h2
        className={`text-2xl font-semibold mb-4 dark:text-white text-gray-800`}
      >
        Login Flow Chart
      </h2>
      <div className="overflow-x-auto dark:text-white text-gray-800">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FlowDiagram;
