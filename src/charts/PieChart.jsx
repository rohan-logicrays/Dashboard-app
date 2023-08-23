import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend);

// Generate random data for the chart datasets

/**
 * PieChart component displays a pie chart using React Chart.js.
 * @returns {JSX.Element} - The PieChart component.
 */
export const PieChart = ({data,options,chartRef}) => {
  return <Pie data={data} options={options}  ref={chartRef} />;
};
