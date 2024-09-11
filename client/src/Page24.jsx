import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";

const Page24 = () => {
  const [userId, setUserId] = useState(27);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(7);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userIds = [27, 15, 102];
  const years = [2024];
  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://10.10.20.73:8081/api/getgraph_specificusersmostactivedaysandtime?usrid=${userId}&year=${year}&month=${month}`
        );

        const apiData = response.data?.specificusersmostactivedaysandtime;

        if (apiData) {
          setData(processHeatmapData(apiData));
        } else {
          setError("No data available for the selected user.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, year, month]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const processHeatmapData = (apiData) => {
    const daysInMonth = getDaysInMonth(year, month);
    const dayHoursMap = {};
    for (let day = 1; day <= daysInMonth; day++) {
      dayHoursMap[day] = Array(24).fill(0);
    }

    apiData.forEach((entry) => {
      const { Day, Hour_of_Day } = entry;
      if (Day && Hour_of_Day) {
        if (!dayHoursMap[Day]) {
          dayHoursMap[Day] = Array(24).fill(0);
        }
        dayHoursMap[Day][Hour_of_Day] += 1;
      }
    });

    const heatmapSeries = Object.keys(dayHoursMap).map((day) => ({
      name: `Day ${day}`,
      data: dayHoursMap[day].map((activityLevel, hour) => ({
        x: `Hour ${hour}`,
        y: activityLevel,
      })),
    }));

    return heatmapSeries;
  };

  const heatmapOptions = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 0.5, color: "#00A100", name: "Low Activity" },
            { from: 0.5, to: 2, color: "#128FD9", name: "Moderate Activity" },
            { from: 3, to: 4, color: "#FFB200", name: "High Activity" },
            { from: 5, to: 40, color: "#FF0000", name: "Very High Activity" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      title: {
        text: "Time of Day",
        style: {
          color: "#603f8b",
        },
      },
      labels: {
        style: {
          colors: "#7e7c73",
        },
      },
    },
    yaxis: {
      title: {
        text: "Days",
        style: {
          color: "#603f8b",
        },
      },
      labels: {
        style: {
          colors: "#7e7c73",
        },
      },
    },
    title: {
      text: `User ${userId}'s Most Active Days and Times`,
      style: {
        color: "#603f8b",
      },
    },
    tooltip: {
      theme: "dark",
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
          Specific Users' Most Active Days and Times
        </Typography>

        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 1 }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Select User ID</InputLabel>
            <Select
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              sx={{ backgroundColor: "#ffffff", color: "#464033" }}
            >
              {userIds.map((id) => (
                <MenuItem key={id} value={id}>
                  User ID: {id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Select Year</InputLabel>
            <Select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              sx={{ backgroundColor: "#ffffff", color: "#464033" }}
            >
              {years.map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Select Month</InputLabel>
            <Select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              sx={{ backgroundColor: "#ffffff", color: "#464033" }}
            >
              {months.map((mn) => (
                <MenuItem key={mn.value} value={mn.value}>
                  {mn.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading && (
          <Typography
            sx={{
              color: "#ff0000",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CircularProgress size={24} /> Loading...
          </Typography>
        )}
        {error && (
          <Typography sx={{ color: "#ff0000", fontWeight: "bold" }}>
            {error}
          </Typography>
        )}

        {data.length > 0 && !loading && !error && (
          <ReactApexChart
            options={heatmapOptions}
            series={data}
            type="heatmap"
            height={650}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Page24;
