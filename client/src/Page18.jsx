import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

const Page18 = () => {
  const [chartData, setChartData] = useState({
    series: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(27); // Default userId
  const [userIds] = useState([101, 17, 15, 16, 24, 22, 102, 97, 27]);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    axios
      .get(
        `http://10.10.20.73:8081/api/getgraph_posdistribution?usrid=${selectedUserId}`,
        {
          timeout: 10000,
        }
      )
      .then((response) => {
        const data = response.data.posdistribution;

        const seriesData = data.map((item) => ({
          x: item.Tracker_PoS_Element || "Unknown",
          y: parseInt(item.count, 10),
        }));

        setChartData({
          series: [
            {
              data: seriesData,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data is fetched
      });
  }, [selectedUserId]); // Dependency array to refetch data when selectedUserId changes

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
          Parts of Speech Distribution TreeMap
        </Typography>
        <FormControl  sx={{ mb: 3 }}>
          <InputLabel>Select User</InputLabel>
          <Select
            labelId="user-select-label"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            label="Select User"
          >
            {userIds.map((id) => (
              <MenuItem key={id} value={id}>
                User ID {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Chart
            options={{
              chart: {
                type: "treemap",
                toolbar: {
                  show: true,
                },
                animations: {
                  enabled: true,
                  easing: "easeinout",
                  speed: 800,
                  animateGradually: {
                    enabled: true,
                    delay: 150,
                  },
                  dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                  },
                },
              },
              plotOptions: {
                treemap: {
                  distributed: true,
                  enableShades: true,
                  shadeIntensity: 0.5,
                  reverseNegativeShade: true,
                  colorScale: {
                    ranges: [
                      {
                        from: 0,
                        to: 50,
                        color: "#08313A", // Coral
                      },
                      {
                        from: 51,
                        to: 150,
                        color: "#FF4500", // Light Teal
                      },
                      {
                        from: 151,
                        to: 300,
                        color: "#104210", // Deep Orange
                      },
                    ],
                  },
                },
              },
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: "16px",
                  colors: ["#fff"],
                },
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val;
                  },
                },
              },
            }}
            series={chartData.series}
            type="treemap"
            height={600}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Page18;
