// src/Page1.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ApexCharts from "react-apexcharts";

function Page1() {
  const [chartType, setChartType] = useState("line");

  // Data for line, bar, and area charts
  const lineBarAreaData = {
    series: [
      {
        name: "Active Users",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Session Duration",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      },
      {
        name: "Frequency of Use",
        data: [5, 10, 15, 20, 25, 30, 35, 40, 45],
      },
      {
        name: "Retention Rates",
        data: [80, 70, 60, 50, 40, 30, 20, 10, 5],
      },
    ],
    options: {
      chart: {
        type: chartType,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      title: {
        text: "User Engagement Metrics",
        align: "left",
      },
    },
  };

  // Data for pie and donut charts
  const pieDonutData = {
    series: [30, 20, 15, 35],
    options: {
      chart: {
        type: chartType,
      },
      labels: [
        "Active Users",
        "Session Duration",
        "Frequency of Use",
        "Retention Rates",
      ],
      title: {
        text: "User Engagement Metrics",
        align: "left",
      },
    },
  };

  // Data for radar chart
  const radarData = {
    series: [
      {
        name: "User Metrics",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    options: {
      chart: {
        type: "radar",
      },
      title: {
        text: "Radar Chart",
        align: "left",
      },
      labels: [
        "Active Users",
        "Session Duration",
        "Frequency of Use",
        "Retention Rates",
      ],
    },
  };

  // Data for heatmap chart
  const heatmapData = {
    series: [
      {
        name: "Metric 1",
        data: [80, 50, 30, 40],
      },
      {
        name: "Metric 2",
        data: [60, 40, 70, 50],
      },
      {
        name: "Metric 3",
        data: [30, 60, 80, 20],
      },
    ],
    options: {
      chart: {
        type: "heatmap",
      },
      title: {
        text: "Heatmap Chart",
        align: "left",
      },
      xaxis: {
        categories: [
          "Active Users",
          "Session Duration",
          "Frequency of Use",
          "Retention Rates",
        ],
      },
    },
  };

  // Select the appropriate data based on chart type
  const chartData =
    chartType === "pie" || chartType === "donut"
      ? pieDonutData
      : chartType === "radar"
        ? radarData
        : chartType === "heatmap"
          ? heatmapData
          : lineBarAreaData;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "100%",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "background.default",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          width: "100%",
          minHeight:"100%",
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
            fontSize: { xs: '0.75rem', sm: '1rem' }, // Responsive font size
          }}
        >
          Apex React
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: { xs: 1, sm: 2, md: 3 } }} // Responsive margin
        >
          User Engagement Metrics
        </Typography>
        <FormControl fullWidth sx={{ marginTop: { xs: 1, sm: 2 } }}> {/* Responsive margin */}
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            label="Chart Type"
          >
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="area">Area</MenuItem>
            <MenuItem value="pie">Pie</MenuItem>
            <MenuItem value="donut">Donut</MenuItem>
            <MenuItem value="radar">Radar</MenuItem>
          </Select>
        </FormControl>
        <div style={{ marginTop: "20px" }}>
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type={chartType}
            height={600} // Adjust the height as needed
          />
        </div>
      </Paper>
    </Container>
  );
}

export default Page1;
