import React, { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";

// Sample JSON data
const rubricsData = {
  rubricsdashboard: [
    {
      ljid: "44",
      chid: "157",
      uid: "158",
      eval: {
        Overall_Eval: {
          Overall_Remarks: "",
          Total_Score_Perc: 100,
        },
        "Rubric Score": {
          Fluency: {
            Score: 10,
            Remarks: "",
          },
          Grammar: {
            Score: 50,
            Remarks: "",
          },
          Comprehension: {
            Score: 10,
            Remarks: "",
          },
          "Mother Tongue Influence": {
            Score: 30,
            Remarks: "",
          },
        },
      },
    },
  ],
};

const TooltipContent = ({ data }) => {
  const themeColor = "#6b4c96";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "400px", // Set max height
              overflowY: "auto", // Enable vertical scrolling
              borderRadius: "8px",
              boxShadow: 1,
              bgcolor: "#ffffff", // White background for table
              width: "100%", // Full width for responsiveness
            }}
          >
            <Table aria-label="evaluation table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: themeColor }}>
                    Criteria
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", color: themeColor }}
                  >
                    Score
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", color: themeColor }}
                  >
                    Remarks
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data.eval["Rubric Score"]).map(
                  ([criteria, details]) => (
                    <TableRow key={criteria}>
                      <TableCell component="th" scope="row">
                        {criteria}
                      </TableCell>
                      <TableCell align="right">{details.Score}</TableCell>
                      <TableCell align="right">
                        {details.Remarks || "No Remarks"}
                      </TableCell>
                    </TableRow>
                  ),
                )}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Score Percentage</strong>
                  </TableCell>
                  <TableCell align="right" colSpan={2}>
                    {data.eval.Overall_Eval.Total_Score_Perc}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function RubricsDashboardTooltip() {
  const [open, setOpen] = useState(false);
  const data = rubricsData.rubricsdashboard[0];
  const themeColor = "#410099";

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Tooltip
      title={<TooltipContent data={data} />}
      arrow
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      placement="bottom-start"
      enterDelay={500}
      leaveDelay={200}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#c4b1e0", // Match Tooltip background color with Paper
            boxShadow: 3,
            maxWidth: "none", // Ensure Tooltip does not limit width
            minWidth: "auto", // Ensure Tooltip adapts to content width
            p: 0, // Remove default padding
            "& .MuiTooltip-arrow": {
              color: "#410099", // Red arrow color
            },
          },
        },
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: themeColor,
          "&:hover": {
            backgroundColor: themeColor,
          },
        }}
        onClick={handleClick}
      >
        Show Rubrics Dashboard
      </Button>
    </Tooltip>
  );
}
