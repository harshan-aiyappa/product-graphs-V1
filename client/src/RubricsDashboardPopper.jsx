import React, { useState } from "react";
import {
  Box,
  Button,
  Popper,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
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

export default function RubricsDashboardPopper() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popper-rubrics-dashboard" : undefined;

  const data = rubricsData.rubricsdashboard[0];
  const themeColor = "#410099";

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          mb: 2,
          backgroundColor: themeColor,
          "&:hover": {
            backgroundColor: themeColor,
          },
        }}
      >
        Toggle Rubrics Dashboard
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper
          sx={{
            width: { xs: "100%", sm: "auto" },
            maxWidth: "600px",
            p: 3,
            borderRadius: "8px",
            boxShadow: 3,
            bgcolor: "#f9f9f9", // Light background for contrast
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: themeColor }}
            >
              Rubrics Dashboard
            </Typography>
            <Divider sx={{ mb: 2, borderColor: themeColor }} />
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "400px",
                overflow: "auto",
                borderRadius: "8px",
                boxShadow: 1,
                bgcolor: "#ffffff", // White background for table
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
          </Box>
        </Paper>
      </Popper>
    </div>
  );
}
