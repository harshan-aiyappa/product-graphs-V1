import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const Page12 = () => {
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: "Most Popular Languages Among Users",
        align: "center",
        style: {
          fontSize: "20px",
          color: "#410099",
        },
      },
      colors: ["#603f8b"],
    },
  });

  const fetchData = () => {
    axios
      .get("/api/popularlanguage") // Replace with your actual API endpoint
      .then((response) => {
        const data = response.data.popularlanguage;
        const filteredData = data.filter(
          (item) =>
            item.Source_Language === sourceLanguage &&
            item.Traget_Language === targetLanguage,
        );
        if (filteredData.length > 0) {
          const usersEnrolled = filteredData.map((item) =>
            parseInt(item.Number_of_Users_Enrolled),
          );
          setChartData({
            ...chartData,
            series: [
              {
                name: "No. of Users",
                data: usersEnrolled,
              },
            ],
            options: {
              ...chartData.options,
              xaxis: {
                categories: [targetLanguage],
              },
            },
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSubmit = () => {
    fetchData();
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Source Language:
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="en-GB">English (GB)</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          Target Language:
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="es-ES">Spanish (ES)</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {chartData.series.length > 0 ? (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      ) : (
        <p>No data available. Please select languages and submit.</p>
      )}
    </div>
  );
};

export default Page12;
