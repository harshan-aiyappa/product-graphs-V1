import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Chart from "react-apexcharts";
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
const Page22 = () => {
  const [chartType, setChartType] = useState("echarts"); // Default chart type
  const chartRef = useRef(null);

  const [rechartsData, setRechartsData] = useState([]);
  const [apexChartData, setApexChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const [highchartsOptions, setHighchartsOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Attempt and Revisit Distribution",
    },
    xAxis: {
      categories: [],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Counts",
      },
    },
    series: [],
  });

  const libraryLabels = {
    echarts: "Echarts",
    recharts: "Recharts",
    apexcharts: "ApexCharts",
    highcharts: "Highcharts",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.10.20.73:8081/api/getgraph_attemptandrevisitsdistribution?usrid=27&ljid=111"
        );
        const data = response.data.attemptandrevisitsdistribution;

        // ECharts data preparation
        const echartsData = data.map((item) => ({
          name: `Unit ${item.Unit_ID}`,
          value: [
            item.Unit_ID,
            parseInt(item.Total_Attempts),
            parseInt(item.Total_Revisits),
          ],
        }));

        const echartsCategories = data.map((item) => `Unit ${item.Unit_ID}`);

        // Recharts data preparation
        setRechartsData(
          data.map((item) => ({
            name: `Unit ${item.Unit_ID}`,
            Total_Attempts: parseInt(item.Total_Attempts),
            Total_Revisits: parseInt(item.Total_Revisits),
          }))
        );

        // ApexCharts data preparation
        const categories = data.map((item) => `Unit ${item.Unit_ID}`);
        const seriesData = [
          {
            name: "Total Attempts",
            data: data.map((item) => parseInt(item.Total_Attempts)),
          },
          {
            name: "Total Revisits",
            data: data.map((item) => parseInt(item.Total_Revisits)),
          },
        ];

        setApexChartData({
          series: seriesData,
          options: {
            ...apexChartData.options,
            xaxis: {
              categories,
            },
          },
        });

        // Highcharts data preparation
        setHighchartsOptions({
          ...highchartsOptions,
          xAxis: {
            categories,
          },
          series: [
            {
              name: "Total Attempts",
              data: data.map((item) => parseInt(item.Total_Attempts)),
            },
            {
              name: "Total Revisits",
              data: data.map((item) => parseInt(item.Total_Revisits)),
            },
          ],
        });

        // ECharts Initialization
        if (chartRef.current && chartType === "echarts") {
          const myChart = echarts.init(chartRef.current);
          myChart.setOption({
            tooltip: {},
            xAxis: {
              type: "category",
              data: echartsCategories,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                type: "bar",
                data: data.map((item) => ({
                  name: `Unit ${item.Unit_ID}`,
                  value: parseInt(item.Total_Attempts),
                })),
                itemStyle: {
                  color: "#5470c6",
                },
              },
              {
                type: "bar",
                data: data.map((item) => ({
                  name: `Unit ${item.Unit_ID}`,
                  value: parseInt(item.Total_Revisits),
                })),
                itemStyle: {
                  color: "#91cc75",
                },
              },
            ],
          });

          window.addEventListener("resize", () => {
            myChart.resize();
          });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [chartType]); // Re-run when chartType changes

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
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
          Attempt and Revisit Distribution
        </Typography>
        <FormControl
          variant="outlined"
         
        >
          <InputLabel id="chart-type-label">Select Chart Type</InputLabel>
          <Select
            labelId="chart-type-label"
            id="chart-type"
            value={chartType}
            onChange={handleChartTypeChange}
            label="Select Chart Type"
          >
            <MenuItem value="echarts">ECharts</MenuItem>
            <MenuItem value="recharts">Recharts</MenuItem>
            <MenuItem value="apexcharts">ApexCharts</MenuItem>
            <MenuItem value="highcharts">Highcharts</MenuItem>
          </Select>
        </FormControl>
        <div style={{ marginTop: "20px" }}>
          {chartType === "echarts" && (
            <div ref={chartRef} style={{ width: "100%", height: "600px" }} />
          )}

          {chartType === "recharts" && (
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                data={rechartsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total_Attempts" fill="#8884d8" />
                <Bar dataKey="Total_Revisits" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartType === "apexcharts" && (
            <Chart
              options={apexChartData.options}
              series={apexChartData.series}
              type="bar"
              height={550}
            />
          )}

          {chartType === "highcharts" && (
            <HighchartsReact
              highcharts={Highcharts}
              options={highchartsOptions}
              containerProps={{ style: { height: "600px" } }} // Set the height to 600px
            />
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default Page22;
