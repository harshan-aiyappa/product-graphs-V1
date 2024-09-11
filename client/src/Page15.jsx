import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Chart from "react-apexcharts";

const Page15 = () => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    axios
      .get(
        "http://10.10.20.73:8081/api/getgraph_demographicdistributionofprompts"
      )
      .then((response) => {
        const data = response.data.demographicdistributionofprompts;

        // Prepare data for the chart
        const categories = data.map((item) => item.User_Age || "Unknown");
        const totalPrompts = data.map((item) =>
          item.Total_Prompts ? parseInt(item.Total_Prompts, 10) : 0
        );
        const totalAttemptedPrompts = data.map((item) =>
          item.Total_Attempted_Prompts
            ? parseInt(item.Total_Attempted_Prompts, 10)
            : 0
        );

        setChartData({
          series: [
            {
              name: "Total Prompts",
              data: totalPrompts,
            },
            {
              name: "Total Attempted Prompts",
              data: totalAttemptedPrompts,
            },
          ],
          categories,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
          Demographic Distribution of Prompts
        </Typography>
        <div style={{ marginTop: "20px" }}>
          <Chart
            options={{
              chart: {
                type: "bar",
                // Remove stacked: true to show bars side by side
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                },
              },
              xaxis: {
                categories: chartData.categories,
                title: {
                  text: "Age Group",
                },
              },
              yaxis: {
                title: {
                  text: "Number of Prompts",
                },
              },
              legend: {
                position: "top",
                horizontalAlign: "left",
              },
              fill: {
                opacity: 1,
              },
              dataLabels: {
                enabled: true,
              },
              grid: {
                borderColor: "#f1f1f1",
              },
            }}
            series={chartData.series}
            type="bar"
            height={650}
          />{" "}
        </div>
      </Paper>
    </Container>
  );
};

export default Page15;
