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

const Page17 = () => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });
  const [lessonJourneyIds, setLessonJourneyIds] = useState([]);
  const [selectedLessonJourneyId, setSelectedLessonJourneyId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(17); // Default userId
  const [loading, setLoading] = useState(true);
  const userIds = [101, 17, 15, 27];

  useEffect(() => {
    fetchChartData(selectedUserId);
  }, [selectedUserId]);

  const fetchChartData = (userId) => {
    setLoading(true);
    axios
      .get(
        `http://10.10.20.73:8081/api/getgraph_leanerrubricskill?usrid=${userId}`
      )
      .then((response) => {
        const data = response.data.leanerrubricskill;
        const ids = data.map((item) => item.Doc_Response_LessonJourneyID);
        setLessonJourneyIds(ids);
        setSelectedLessonJourneyId(ids[0]); // Default to the first ID

        // Set initial chart data based on the first LessonJourneyID
        const initialData = data.find(
          (item) => item.Doc_Response_LessonJourneyID === ids[0]
        );
        updateChartData(initialData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateChartData = (data) => {
    const categories = [
      "Fluency Score",
      "Grammar Score",
      "Comprehension Score",
      "Mother Tongue Influence Score",
    ];
    const scores = [
      data.Fluency_Score ? parseFloat(data.Fluency_Score) : 0,
      data.Grammar_Score ? parseFloat(data.Grammar_Score) : 0,
      data.Comprehension_Score ? parseFloat(data.Comprehension_Score) : 0,
      data.Mother_Tongue_Influence_Score
        ? parseFloat(data.Mother_Tongue_Influence_Score)
        : 0,
    ];

    setChartData({
      series: [
        {
          name: "Skill Scores",
          data: scores,
        },
      ],
      categories,
    });
  };

  const handleLessonJourneyChange = (event) => {
    const selectedId = event.target.value;
    setSelectedLessonJourneyId(selectedId);

    axios
      .get(
        `http://10.10.20.73:8081/api/getgraph_leanerrubricskill?usrid=${selectedUserId}`
      )
      .then((response) => {
        const data = response.data.leanerrubricskill.find(
          (item) => item.Doc_Response_LessonJourneyID === selectedId
        );
        updateChartData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleUserIdChange = (event) => {
    const selectedId = event.target.value;
    setSelectedUserId(selectedId);
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
          Learner Rubric Skill Radar
        </Typography>

        <FormControl sx={{ width: "100px", marginRight: "10px" }}>
          <InputLabel>User ID</InputLabel>
          <Select
            value={selectedUserId}
            label="User ID"
            onChange={handleUserIdChange}
          >
            {userIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "120px" }}>
          <InputLabel>Lesson Journey ID</InputLabel>
          <Select
            value={selectedLessonJourneyId}
            label="Lesson Journey ID"
            onChange={handleLessonJourneyChange}
          >
            {lessonJourneyIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
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
                type: "radar",
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
              xaxis: {
                categories: chartData.categories,
                labels: {
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    colors: ["#410099"],
                  },
                },
              },
              yaxis: {
                labels: {
                  formatter: (val) => val.toFixed(2),
                  style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    colors: ["#333"],
                  },
                },
                tickAmount: 7,
              },
              dataLabels: {
                enabled: true,
                background: {
                  enabled: true,
                  foreColor: "#410099",
                  borderRadius: 2,
                  borderWidth: 0,
                },
                style: {
                  fontSize: "12px",
                  colors: ["#fff"],
                },
              },
              plotOptions: {
                radar: {
                  size: 250,
                  polygons: {
                    strokeColor: "#e9e9e9",
                    fill: {
                      colors: ["#f8f8f8", "#fff"],
                    },
                  },
                },
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["#410099"],
              },
              fill: {
                opacity: 0.2,
                colors: ["#410099"],
              },
              markers: {
                size: 5,
                colors: ["#fff"],
                strokeColor: "#410099",
                strokeWidth: 2,
              },
              tooltip: {
                theme: "dark",
                y: {
                  formatter: (val) => val.toFixed(2),
                },
              },
              responsive: [
                {
                  breakpoint: 768,
                  options: {
                    chart: {
                      height: 500,
                    },
                    xaxis: {
                      labels: {
                        style: {
                          fontSize: "12px",
                        },
                      },
                    },
                    markers: {
                      size: 3,
                    },
                  },
                },
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      height: 500,
                    },
                    xaxis: {
                      labels: {
                        style: {
                          fontSize: "12px",
                        },
                      },
                    },
                    markers: {
                      size: 2,
                    },
                  },
                },
              ],
            }}
            series={chartData.series}
            type="radar"
            height={600}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Page17;
