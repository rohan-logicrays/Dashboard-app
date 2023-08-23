import React from "react";
import { useSelector } from 'react-redux';
const ExportOptions = ({
  isExporting,
  chartRef1,
  chartRef2,
  handleExport,
  handleDataExport,
  tableData,
  setIsexporting,
}) => {
    const theme = useSelector((state) => state.theme.value);
  return (
    <div
      className={`grid bg-${theme}-500 duration-200 ease-in-out rounded-lg w-[15rem] h-[12rem] grid  justify-center items-center    fixed right-0 ${
        isExporting ? "translate-x-0 opacity-1" : "translate-x-full opacity-0"
      }`}
    >
      <button
        onClick={() =>{ handleDataExport(tableData, "data.csv", setIsexporting(false));}}
        className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600 text-white`}
      >
        Export Data
      </button>
      <button
        onClick={() => {handleExport(chartRef1), setIsexporting(false)}}
        className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600 text-white`}
      >
        Export Pie Chart
      </button>
      <button
        onClick={() =>{ handleExport(chartRef2), setIsexporting(false)}}
        className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600 text-white`}
      >
        Export Bar Chart
      </button>
    </div>
  );
};

export default ExportOptions;
