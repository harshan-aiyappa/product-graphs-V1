import React, { useState, useEffect } from "react";
import axios from "axios";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Container,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const Page28 = () => {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState(ViewMode.Day);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(15); // Default user ID
  const userOptions = [17, 15, 27, 24, 22, 102, 97, 16, 101, 5];

  // Function to fetch lesson journey data from the API
  const fetchLessonJourneyData = async (userId) => {
    try {
      const response = await axios.get(
        `http://10.10.20.73:8081/api/getgraph_lessonjourneycompletionstatusamongusers?usrid=${userId}`
      );
      const transformedTasks = transformLessonJourneyData(response.data);
      console.log(transformedTasks);
      setTasks(transformedTasks);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  // useEffect to fetch data when the component mounts or when selectedUser changes
  useEffect(() => {
    fetchLessonJourneyData(selectedUser);
  }, [selectedUser]);

  // Function to transform API response and add colors
  function transformLessonJourneyData(data) {
    return data.lessonjourneycompletionstatusamongusers.map((item, index) => {
      let startDate, endDate;

      // If End_Date exists, subtract 1 day to set startDate
      if (item.End_Date) {
        endDate = new Date(item.End_Date);
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 1);
      }

      // If Lesson_Journey_Start_Date exists, add 1 day to set endDate
      if (item.Lesson_Journey_Start_Date) {
        startDate = new Date(item.Lesson_Journey_Start_Date);
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
      }

      return {
        id: (index + 1).toString(), // Unique ID for each task
        name: item.LessonJourney, // Task name
        start: startDate, // Calculated start date
        end: endDate, // Calculated end date
        progress: item.Percentage_LJ_Completed || 0, // Default to 0 if not available
        type: "task",
        hideChildren: false,
        isDisabled: false,
        // Custom progress colors
        progressColor: "#ffbb54", // Default progress bar color
        progressSelectedColor: "#ff9e0d", // Progress color when selected
      };
    });
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
        padding: 5,
        backgroundColor: "background.default",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4, color: "#333" }}>
        Lesson Journey Gantt Chart (Page 28)
      </Typography>

      {/* User Selection Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 4 }}>
        <InputLabel>Select User</InputLabel>
        <Select
          value={selectedUser}
          label="Select User"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {userOptions.map((userId) => (
            <MenuItem key={userId} value={userId}>
              User {userId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display Loading and Error States */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              marginBottom: 4,
              width: "100%",
              "& .gantt-task-bar": {
                fill: "#76c7c0 !important", // Task bar color
                stroke: "#4caf50 !important", // Outline
              },
              "& .gantt-task-bar-progress": {
                fill: "#ffbb54 !important", // Progress bar color (same as specified)
              },
              "& .gantt-arrow": {
                stroke: "#ff5722 !important", // Arrow color
              },
              "& .gantt-today-highlight": {
                fill: "#ffeb3b !important", // Today's highlight color
              },
            }}
          >
            <Gantt
              tasks={tasks}
              viewMode={viewMode}
              onDateChange={(task) => {
                console.log("Date changed:", task);
              }}
              onProgressChange={(task) => {
                console.log("Progress changed:", task);
              }}
              onTaskChange={(task) => {
                console.log("Task changed:", task);
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setViewMode(ViewMode.Day)}
              sx={{ padding: "10px 20px" }}
            >
              Day View
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setViewMode(ViewMode.Week)}
              sx={{ padding: "10px 20px" }}
            >
              Week View
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setViewMode(ViewMode.Month)}
              sx={{ padding: "10px 20px" }}
            >
              Month View
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Page28;
