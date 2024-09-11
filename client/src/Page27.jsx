import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import { Box, MenuItem, FormControl, InputLabel, Select, Typography, Container, Paper } from '@mui/material';

const Page27 = () => {
  const [users, setUsers] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedJourney, setSelectedJourney] = useState('');
  const [chartData, setChartData] = useState(null);
  const [totalTimeString, setTotalTimeString] = useState(''); // Add state for formatted total time

  useEffect(() => {
    // Fetch users for the dropdown
    axios.get('http://10.10.20.73:8081/api/getgraph_completeusersassignedljs')
      .then(response => {
        // Filter out duplicate users
        const uniqueUsers = Array.from(new Set(response.data.completeusersassignedljs.map(user => user.User_ID)))
          .map(id => response.data.completeusersassignedljs.find(user => user.User_ID === id));
        setUsers(uniqueUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Fetch lesson journeys for the selected user
      const userJourneys = users.filter(user => user.User_ID === selectedUser);
      setJourneys(userJourneys);
    }
  }, [selectedUser, users]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleJourneyChange = (event) => {
    setSelectedJourney(event.target.value);
  };

  useEffect(() => {
    if (selectedUser && selectedJourney) {
      // Fetch chart data for the selected user and journey
      axios.get(`http://10.10.20.73:8081/api/getgraph_timevsperformance?usrid=${selectedUser}&ljid=${selectedJourney}`)
        .then(response => {
          const data = response.data.timevsperformance[0] || {};
          const avgTimeSpent = data.Avg_LJ_Total_Time_Spent || {};
          const totalMinutes = (avgTimeSpent.minutes || 0);
          const totalSeconds = (avgTimeSpent.seconds || 0);
          const totalTimeString = `Time Spent : ${totalMinutes} mins ${totalSeconds} secs`;
          setTotalTimeString(totalTimeString);

          const chartSeries = [
            data.Avg_Percentage_LJ_Completed || 0,
            data.Avg_of_VfAvgAccuracy || 0
          ];
          
          setChartData({
            series: chartSeries,
            options: {
              chart: {
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: '50%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: true,
                      formatter: () => totalTimeString, // Display formatted total time
                      fontSize: '24px', // Adjust size as needed
                      fontFamily: 'Roboto, sans-serif',
                      color: '#333',
                      offsetY: 0,
                    }
                  },
                  barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '16px',
                    formatter: function(seriesName, opts) {
                      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                    },
                  },
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'light',
                  type: 'vertical',
                  shadeIntensity: 0.5,
                  gradientToColors: ['#0084ff', '#39539E', '#0077B5'],
                  inverseColors: false,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100]
                }
              },
              labels: ['Completion (%)', 'Accuracy'],
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                    show: false
                  }
                }
              }]
            }
          });
        })
        .catch(error => console.error('Error fetching chart data:', error));
    }
  }, [selectedUser, selectedJourney]);

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

        <Box sx={{ mb: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="userDropdownLabel">Select User</InputLabel>
            <Select
              labelId="userDropdownLabel"
              id="userDropdown"
              value={selectedUser}
              onChange={handleUserChange}
              sx={{ fontSize: '16px' }}
            >
              <MenuItem value=""><em>Select User</em></MenuItem>
              {users.map(user => (
                <MenuItem key={user.User_ID} value={user.User_ID}>
                  {user.User_FullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="journeyDropdownLabel">Select Journey</InputLabel>
            <Select
              labelId="journeyDropdownLabel"
              id="journeyDropdown"
              value={selectedJourney}
              onChange={handleJourneyChange}
              sx={{ fontSize: '16px' }}
              disabled={!selectedUser}
            >
              <MenuItem value=""><em>Select Journey</em></MenuItem>
              {journeys.map(journey => (
                <MenuItem key={journey.ULJ_LessonJourneyID} value={journey.ULJ_LessonJourneyID}>
                  {journey.Assigned_LessonJourney}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {chartData && (
          <Box >
           
            <ApexCharts
              options={chartData.options}
              series={chartData.series}
              type="radialBar"
              height={600}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Page27;
