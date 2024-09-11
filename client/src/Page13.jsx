import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
} from "@mui/material";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const Page13 = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 600,
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      title: {
        text: '',
        align: 'center',
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Learners'
        }
      },
      yaxis: {
        title: {
          text: 'Number of Activities'
        }
      },
      dataLabels: {
        enabled: true
      },
      markers: {
        size: 5
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 3,
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.10.20.73:8081/api/gegraph_top5mostactivelearners');
        const data = response.data.top5mostactivelearners;

        const userNames = data.map(item => item.User_Name);
        const activities = data.map(item => parseInt(item.Number_of_Activities, 10));

        setChartData({
          ...chartData,
          series: [{
            name: 'Number of Activities',
            data: activities,
          }],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: userNames
            }
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
            fontSize: { xs: "0.75rem", sm: "1rem" },
          }}
        >
          ApexCharts
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: { xs: 1, sm: 2, md: 3 } }}
        >
          Top 5 Most Active Learners
        </Typography>
        <div style={{ width: '100%' }}>
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={600}
            width="100%" // Ensure the chart takes up the full width of the container
          />
        </div>
      </Paper>
    </Container>
  );
};

export default Page13;
