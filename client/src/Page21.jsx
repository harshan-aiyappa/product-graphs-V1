import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

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
          `http://10.10.20.73:8081/api/getgraph_languageproficiencyovertime?usrid=${usrid}`
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "100%",
        alignItems: "center",
        p: 5,
        backgroundColor: "background.default",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          width: "100%",
          minHeight: "100%",
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            top: 1,
            right: 0,
            background: "#4E4F50",
            color: "#E2DED0",
            padding: "5px 10px",
            borderBottomLeftRadius: ".5rem",
            fontSize: { xs: "0.75rem", sm: "1rem" }, // Responsive font size
          }}
        >
          Apex React
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: { xs: 1, sm: 2, md: 3 } }} // Responsive margin
        >
          Language Proficiency Over Time
        </Typography>
        <FormControl variant="outlined" sx={{ width: "300px" }}>
          <InputLabel id="user-id-label">Select User</InputLabel>
          <Select
            labelId="user-id-label"
            id="user-id"
            value={usrid}
            onChange={(e) => setUsrid(e.target.value)}
            label="Select User"
          >
            {[27, 15, 5].map((id) => (
              <MenuItem key={id} value={id}>
                User {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </Paper>
    </Container>
  );
};

export default Page21;
