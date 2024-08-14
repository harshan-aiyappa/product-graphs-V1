// src/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";

import RubricsDashboardPopper from "./RubricsDashboardPopper";
import RubricsDashboardTooltip from "./RubricsDashboardTooltip";

function Home() {
  const navigate = useNavigate();

  const handleGoToPage1 = () => {
    navigate("/Page1");
  };

  const handleGoToGraphs = () => {
    navigate("/Graphs"); // Adjust this route to match your graph page route
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        padding: 2,
      }}
    >
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#0C4160", // Purple color
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Home Page
        </Typography>
      </motion.div>

      {/* Animated Introduction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 4, fontStyle: "italic", color: "#181310" }} // Purple Haze color
        >
          Welcome to the Home Page! Explore the following sections to get
          started
        </Typography>
      </motion.div>

      {/* Animated Buttons */}
      <Stack spacing={2} alignItems="center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Button
            variant="contained"
            onClick={handleGoToPage1}
            sx={{
              borderRadius: 2,
              padding: "12px 24px",
              bgcolor: "#603f8b", // Purple color
              color: "#FBFBF4", // Purple Haze color
            }}
          >
            Let's Dive
          </Button>
        </motion.div>
      </Stack>

      {/* Animated Information Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
          padding: 2,
          backgroundColor: "#616c59", // Gunmetal Gray color
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#282E3A", // Purple Haze color
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Explore Our Graphs
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#3D4957" }} // Purple Haze color
        >
          Dive into various graphs that visualize data trends and insights.
          Choose from the following types:
        </Typography>
        <Stack spacing={1} alignItems="center" mt={2}>
          {[
            // Data for graph types
            "User Engagement",
            "Course Completion Rates",
            "Assessment Scores Distribution",
            "User Feedback Sentiment",
            "Content Popularity",
          ].map((text, index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.5 + 0.2 * index,
                ease: "easeOut",
              }}
            >
              <Typography variant="body2" sx={{ color: "#31352E" }}>
                • {text}
              </Typography>
            </motion.div>
          ))}
        </Stack>
        {/* <Stack spacing={1} alignItems="center" mt={2}>
          <RubricsDashboardPopper />
          <RubricsDashboardTooltip />
        </Stack> */}
      </motion.div>
    </Box>
  );
}

export default Home;
