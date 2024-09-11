import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "react-apexcharts"; // For ApexCharts
import * as echarts from "echarts"; // For ECharts
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts"; // For Recharts
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Page19 = () => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("apex"); // Default chart type

  // Reference to hold the ECharts instance
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        "http://10.10.20.73:8081/api/getgraph_Worddistributionamongusers?usrid=27",
        { timeout: 10000 }
      )
      .then((response) => {
        const data = response.data.Worddistributionamongusers[0];
        const seriesData = [
          parseInt(data.Total_no_of_Strong_Words, 10),
          parseInt(data.Total_no_of_Medium_Words, 10),
          parseInt(data.Total_no_of_Weak_Words, 10),
        ];
        const labels = ["Strong Words", "Medium Words", "Weak Words"];

        setChartData({
          series: seriesData,
          labels: labels,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  useEffect(() => {
    if (chartType === "echarts" && chartData.labels.length) {
      const chart = echarts.init(chartRef.current);

      const options = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: chartData.labels,
        },
        series: [
          {
            name: "Word Type",
            type: "pie",
            radius: ["40%", "70%"],
            data: chartData.labels.map((label, index) => ({
              value: chartData.series[index],
              name: label,
            })),
            emphasis: {
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 2,
                shadowBlur: 10,
                shadowColor: "#000",
              },
            },
            label: {
              formatter: "{b}: {c} ({d}%)",
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
          },
        ],
        color: ["#CEDF9F", "#FFBE98", "#E8B86D"],
      };

      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
  }, [chartType, chartData]);

  const apexOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
      height: 400,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `${chartData.series.reduce((a, b) => a + b, 0)}`,
            },
          },
        },
        expandOnClick: true,
      },
    },
    colors: ["#CEDF9F", "#FFBE98", "#E8B86D"],
    labels: chartData.labels,
    legend: {
      position: "bottom",
      labels: { fontSize: "16px", colors: "#000" },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        colors: ["#fff"],
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const rechartsData = chartData.labels.map((label, index) => ({
    name: label,
    value: chartData.series[index],
  }));
  const libraryLabels = {
    echarts: "Echarts",
    recharts: "Recharts",
    apex: "ApexCharts",
    highcharts: "Highcharts",
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
          {libraryLabels[chartType]}
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: { xs: 1, sm: 2, md: 3 } }} // Responsive margin
        >
          Word Distribution Among Users
        </Typography>

        <FormControl sx={{ marginBottom: "20px" }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={handleChartTypeChange}
            label="Chart Type"
          >
            <MenuItem value="apex">ApexCharts</MenuItem>
            <MenuItem value="echarts">ECharts</MenuItem>
            <MenuItem value="recharts">Recharts</MenuItem>
          </Select>
        </FormControl>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "600px",
            }}
          >
            <CircularProgress sx={{ color: "#410099" }} />
          </Box>
        ) : (
          <>
            {chartType === "apex" && (
              <Chart
                options={apexOptions}
                series={chartData.series}
                type="pie"
                height={600}
              />
            )}
            {chartType === "echarts" && (
              <div ref={chartRef} style={{ height: "600px", width: "100%" }} />
            )}
            {chartType === "recharts" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "600px",
                }}
              >
                <PieChart width={700} height={650}>
                  <Pie
                    data={rechartsData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {rechartsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#CEDF9F", "#FFBE98", "#E8B86D"][index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Page19;
