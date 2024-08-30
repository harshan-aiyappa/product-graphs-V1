import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

// Function to transform data into a format suitable for ApexCharts
const transformData = (data) => {
  const levels = ["Advance", "Intermediate", "Beginner"];
  const result = {};

  levels.forEach((level) => {
    result[level] = [];
  });

  data.languageproficiencyovertime.forEach((entry) => {
    try {
      if (entry.VfAvgAccuracy && entry.Proficiency_Level) {
        const key = entry.Proficiency_Level.trim();
        if (result[key]) {
          result[key].push({
            x: `${entry.Month.trim()} ${entry.Day.trim()}`,
            y: Math.round(parseFloat(entry.VfAvgAccuracy)), // Round up VfAvgAccuracy
          });
        }
      }
    } catch (error) {
      console.error("Error processing entry:", entry, error);
    }
  });

  return result;
};

const Page21 = () => {
  const [data, setData] = useState(null);
  const [usrid, setUsrid] = useState(27); // Default user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.29.50:8081/api/getgraph_languageproficiencyovertime?usrid=${usrid}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [usrid]);

  const transformedData = data
    ? transformData(data)
    : { Advance: [], Intermediate: [], Beginner: [] };

  const series = [
    {
      name: "Advance",
      data: transformedData["Advance"] || [],
    },
    {
      name: "Intermediate",
      data: transformedData["Intermediate"] || [],
    },
    {
      name: "Beginner",
      data: transformedData["Beginner"] || [],
    },
  ];

  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Average Accuracy",
      },
      labels: {
        formatter: (value) => Math.round(value), // Rounds y-axis values to integers
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    colors: ["#04D010", "#0000FF", "#D01110"], // Custom colors for lines
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <div>
      <h2>Language Proficiency Over Time</h2>
      <select value={usrid} onChange={(e) => setUsrid(e.target.value)}>
        {/* Dropdown options for user IDs */}
        {[27, 15, 5].map((id) => (
          <option key={id} value={id}>
            User {id}
          </option>
        ))}
      </select>
      {data ? (
        <ApexCharts
          options={options}
          series={series}
          type="line"
          height={600}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// Use the Page21 component
const App = () => {
  return (
    <div className="App" style={{ padding: "2rem",boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>
      <Page21 />
    </div>
  );
};

export default App;
