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


const sampleData = {
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      name: 'User Engagement',
      data: [15, 25, 20, 30],
    },
    {
      name: 'Course Completion',
      data: [10, 20, 15, 25],
    },
    {
      name: 'New Signups',
      data: [5, 15, 10, 20],
    },
    {
      name: 'Active Courses',
      data: [8, 18, 14, 22],
    },
  ],
};

const options = {
  chart: {
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth',
    width: 5,
  },
  title: {
    text: 'Slope Chart',
    align: 'left',
  },
  xaxis: {
    categories: sampleData.categories,
  },
  yaxis: {
    title: {
      text: 'Values',
    },
    min: 0,
    max: 35,
  },
  markers: {
    size: 5,
  },
  grid: {
    borderColor: '#f1f1f1',
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
};

function Page2() {
  return (
    <Container
      sx={{
        border: "1px solid red",
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
            }}
          >
            Apex React
          </Typography>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            User Engagement Metrics
          </Typography>
      <ApexCharts options={options} series={sampleData.series} type="line"  height={600}  /></Paper>
    </Container>
  );
}

export default Page2;
