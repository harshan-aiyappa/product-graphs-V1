import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ApexCharts from "react-apexcharts";

const options = {
  chart: {
    type: "treemap",
  },
  title: {
    text: "Course Popularity",
  },
  plotOptions: {
    treemap: {
      distributed: true,
    },
  },
  dataLabels: {
    style: {
      fontSize: "12px",
      colors: ["#fff"],
    },
  },
  colors: ["#FF4560", "#00E396", "#0098D4", "#3F51B5", "#FF9800"],
};

// Sample datasets
const data = {
  userEngagement: [
    { x: "Active Users", y: 200 },
    { x: "Session Duration", y: 150 },
    { x: "Frequency of Use", y: 100 },
  ],
  coursePopularity: [
    { x: "French", y: 20 },
    { x: "Spanish", y: 30 },
    { x: "Portuguese", y: 25 },
    { x: "English", y: 15 },
    { x: "Kannada", y: 10 },
  ],
  contentInteraction: [
    { x: "Videos", y: 50 },
    { x: "Quizzes", y: 30 },
    { x: "Articles", y: 20 },
  ],
  learningOutcomes: [
    { x: "Grammar", y: 40 },
    { x: "Vocabulary", y: 35 },
    { x: "Pronunciation", y: 25 },
  ],
  feedbackAnalysis: [
    { x: "Positive", y: 60 },
    { x: "Negative", y: 25 },
    { x: "Suggestions", y: 15 },
  ],
};

function Page3() {
  const [selectedDataset, setSelectedDataset] = useState("coursePopularity");

  const handleChange = (event) => {
    setSelectedDataset(event.target.value);
  };

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
          minHeight:"100%",
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
          Apex React
        </Typography>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Tree maps
        </Typography>
        <FormControl fullWidth style={{ marginTop: ".5rem" }}>
          <InputLabel>Select Dataset</InputLabel>
          <Select
            labelId="dataset-select-label"
            value={selectedDataset}
            onChange={handleChange}
          >
            <MenuItem value="userEngagement">User Engagement</MenuItem>
            <MenuItem value="coursePopularity">Course Popularity</MenuItem>
            <MenuItem value="contentInteraction">Content Interaction</MenuItem>
            <MenuItem value="learningOutcomes">Learning Outcomes</MenuItem>
            <MenuItem value="feedbackAnalysis">Feedback Analysis</MenuItem>
          </Select>
        </FormControl>
      

        <ApexCharts
          options={options}
          series={[{ name: "Data", data: data[selectedDataset] }]}
          type="treemap"
          height={600} 
        />
      </Paper>
    </Container>
  );
}

export default Page3;
