import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Container,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function Page4() {
  const [chartOptions, setChartOptions] = useState({
    title: { text: "Sales Overview" },
    chart: {
      height: 600, // Set the height of the chart
    },
    series: [
      {
        type: "pie",
        name: "Sales",
        data: [
          ["Q1", 10],
          ["Q2", 20],
          ["Q3", 30],
          ["Q4", 40],
        ],
        events: {
          click: (event) => {
            setChartOptions({
              title: { text: "Detailed View" },
              chart: {
                height: 600,
              },
              xAxis: { categories: ["A", "B", "C", "D"] },
              series: [
                {
                  type: "bar",
                  name: "Details",
                  data: [5, 10, 15, 20],
                },
              ],
            });
          },
        },
      },
    ],
    drilldown: {
      series: [
        {
          id: "details",
          data: [5, 10, 15, 20],
        },
      ],
    },
  });

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
          }}
        >
          HighCharts
        </Typography>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          User Engagement Metrics
        </Typography>

        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </Paper>
    </Container>
  );
}

export default Page4;
