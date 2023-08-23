import React, { useEffect, useState, useRef } from "react";
import { PieChart } from "../charts/PieChart";
import { BarChart } from "../charts/BarChart";
import { saveAs } from "file-saver";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import ExportOptions from "../components/ExportOptions";
import {
  fetchData,
  postDataAsync,
  editDataAsync,
  deleteDataAsync,
} from "../store/dataSlice";

const DashBoard = ({ isVisible }) => {
  const theme = useSelector((state) => state.theme.value);
  const { chartData, status, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [draggedItem, setDraggedItem] = useState(null);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const [isExporting, setIsexporting] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editId, setEditId] = useState();
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [newPieChartData, setNewPieChartData] = useState({
    value: 0,
    label: "",
    color: "",
  });

  const [pieChartData, setPieChartData] = useState({
    value: [],
    label: [],
    color: [],
  });
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  useEffect(() => {
    if (chartData.length > 0) {
      const newValueArray = [];
      const newLabelArray = [];
      const newColorArray = [];

      chartData.forEach((item) => {
        newValueArray.push(item.value);
        newLabelArray.push(item.label);
        newColorArray.push(item.color);
      });

      setTableData(chartData);
      setPieChartData({
        value: newValueArray,
        label: newLabelArray,
        color: newColorArray,
      });
    }
  }, [chartData]);

  const handleAddPie = async () => {
    const obj = {
      value: newPieChartData.value,
      label: newPieChartData.label,
      color: newPieChartData.color,
    };
    if (
      newPieChartData.value.length > 0 &&
      newPieChartData.label.length > 0 &&
      newPieChartData.color.length > 0
    ) {
      if (isEditModeOn) {
        dispatch(editDataAsync({ id: editId, newData: obj }));
        setNewPieChartData({
          value: 0,
          label: "",
          color: "",
        });
        setEditId("");
        setIsEditModeOn(false);
      } else {
        dispatch(postDataAsync(obj));
        setNewPieChartData({
          value: 0,
          label: "",
          color: "",
        });
      }
    } else {
      alert("Please Fill All The Fields");
    }
  };
  const hanldeDelete = (id) => {
    dispatch(deleteDataAsync(id));
    dispatch(fetchData());
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPieChartData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleExport = (chartRef) => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      canvas.toBlob(function (blob) {
        saveAs(blob, "chart.png");
      });
    }
  };
  const handleDataExport = (data, filename) => {
    const csvData = convertDataToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, filename);
  };

  const convertDataToCSV = (data) => {
    // Convert the data object to CSV format
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    return `${headers}\n${rows.join("\n")}`;
  };

  const handleDragStart = (event, item) => {
    setDraggedItem(item);
  };

  const handleDragEnter = (event, targetItem) => {
    // Make sure the dragged item and target item are different
    if (draggedItem && draggedItem.id !== targetItem.id) {
      // Swap the dragged item and target item in the tableData
      const updatedTableData = tableData.map((item) => {
        if (item.id === targetItem.id) {
          return draggedItem;
        }
        if (item.id === draggedItem.id) {
          return targetItem;
        }
        return item;
      });
      const newValueArray = [];
      const newLabelArray = [];
      const newColorArray = [];

      updatedTableData.forEach((item) => {
        newValueArray.push(item.value);
        newLabelArray.push(item.label);
        newColorArray.push(item.color);
      });
      setPieChartData({
        value: newValueArray,
        label: newLabelArray,
        color: newColorArray,
      });
      setTableData(updatedTableData);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const data = {
    labels: pieChartData.label,
    datasets: [
      {
        label: "# of Votes",
        data: pieChartData.value,
        backgroundColor: pieChartData.color,
        borderColor: "#fb8989",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  if (status === "pending" || status === "idle") {
    return (
      <div
        className={`${
          isVisible ? "w-4/5 right-0" : "w-full "
        } flex items-center justify-center absolute z-0  h-screen `}
      >
        <svg className="h-32 w-32 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            className="fill-gray-800"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div
        className={`${
          isVisible ? "w-4/5 right-0" : "w-full "
        } flex items-center justify-center absolute z-0  h-screen `}
      >
        Error: {error}
      </div>
    );
  }
  if (chartData.length === 0) {
    return (
      <div
        className={`${
          isVisible ? "w-4/5 right-0" : "w-full "
        } flex items-center justify-center absolute z-0  h-screen `}
      >
        <svg className="h-32 w-32 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            className="fill-gray-800"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <div
      className={`${
        isVisible ? "w-4/5 right-0" : "w-full "
      } mt-16 p-2 grid grid-cols-2 gap-4 items-center ease-in-out  justify-center absolute z-0  h-screen `}
      onClick={()=>isExporting ?setIsexporting(false):none}
    >
      <section className="col-span-2 grid grid-cols-3  rounded-lg p-1 h-64">
        <section
          className={`border border-${theme}-300 border-2 shadow-xl rounded-lg p-2 mx-2 grid items-center justify-center justify-items-center`}
        >
          <input
            type="number"
            className={`border border-${theme}-500 shadow-xl rounded-lg p-2 sm:w-10/12 md:w-full`}
            placeholder="value..."
            name="value"
            value={newPieChartData.value}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className={`border border-${theme}-500 shadow-xl rounded-lg p-2 sm:w-10/12 md:w-full`}
            placeholder="label..."
            name="label"
            value={newPieChartData.label}
            onChange={handleInputChange}
          />
          <input
            type="color"
            className={`border border-${theme}-500 shadow-xl rounded-lg p-1 h-9  sm:w-10/12 md:w-1/2`}
            name="color"
            value={newPieChartData.color}
            onChange={handleInputChange}
          />
          <button
            className={`border bg-${theme}-500 shadow-xl rounded-lg text-white hover:bg-${theme}-400 sm:w-2/3 md:w-full`}
            onClick={() => handleAddPie()}
          >
            {isEditModeOn ? "Edit" : "Add"}
          </button>
        </section>
        <section
          className={` rounded-lg grid gap-2 sm:grid-col-1 md:grid-cols-2  lg:grid-cols-4 p-2 mx-2 col-span-2 overflow-y-auto`}
        >
          {tableData.map((item) => {
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(event) => handleDragStart(event, item)}
                onDragEnter={(event) => handleDragEnter(event, item)}
                onDragEnd={handleDragEnd}
                className={`bg-slate-50 shadow-xl border-2 border-indigo-300 duration-300 ease-in-out transition-transform transform-gpu hover:scale-105 h-24 mx-1 grid rounded-lg p-2 m-1`}
              >
                <span className="grid grid-cols-4">
                  <span className="col-span-2 text-xl">{item.value}</span>
                  <img
                    src={Edit}
                    alt=""
                    className="h-6 cursor-pointer"
                    onClick={() => {
                      setNewPieChartData({
                        value: item?.value,
                        label: item?.label,
                        color: item?.color,
                      });
                      setEditId(item?.id);
                      setIsEditModeOn(true);
                    }}
                  />
                  <img
                    src={Delete}
                    alt=""
                    className="h-6 cursor-pointer"
                    onClick={() => hanldeDelete(item.id)}
                  />
                </span>
                <span>{item.label}</span>
                <input type="color" value={item.color} disabled className="border-none p-0"></input>
              </div>
            );
          })}
        </section>
      </section>
      <section className={`border border-2 border-${theme}-300 rounded-lg p-2 h-64 shadow-xl`}>
        <PieChart data={data} options={options} chartRef={chartRef1} />
      </section>
      <section className={`border border-2 border-${theme}-300 rounded-lg p-2 h-64 shadow-xl`}>
        <BarChart data={data} options={options} chartRef={chartRef2} />
      </section>
      <section className="col-span-2 border-1 flex">
        <button
          className={`bg-${theme}-500 rounded-lg p-1 w-1/5 shadow-xl`}
          onClick={() => setIsexporting(!isExporting)}
        >
          Export
        </button>
      </section>
      <ExportOptions
        isExporting={isExporting}
        theme={theme}
        handleExport={handleExport}
        chartRef1={chartRef1}
        chartRef2={chartRef2}
        setIsexporting={setIsexporting}
        handleDataExport={handleDataExport}
        tableData={tableData}
      />
    </div>
  );
};

export default DashBoard;


