  import React, { useState } from "react";
  import { Box, Button, Card, CardContent, Typography, useMediaQuery } from "@mui/material";
  import Chart from "react-apexcharts";
  import { CardGraphData } from "./CardGraphData";

  const CardLayout = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery((theme) =>
      theme.breakpoints.between("sm", "md"),
    );

    const handlePrev = () => {
      setCurrentCard((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
      setCurrentCard((prev) =>
        prev < CardGraphData.cardData.length - 1 ? prev + 1 : prev,
      );
    };

    const getCardWidth = () => {
      if (isSmallScreen) {
        return "100%";
      } else if (isMediumScreen) {
        return "80%";
      } else {
        return 600;
      }
    };

    const renderGraph = (graphType, graphData) => {
      switch (graphType) {
        case "line":
          // Extract series data for each language
          const seriesData = Object.keys(graphData[0] || {})
            .filter((key) => key !== "date" && key !== "month") // Exclude non-series keys
            .map((lang) => ({
              name: lang,
              data: graphData.map((item) => ({
                x: item.date || item.month, // Handle both date and month
                y: item[lang],
              })),
            }));

          return (
            <Chart
              type="line"
              width={isSmallScreen ? 300 : 500}
              height={isSmallScreen ? 200 : 300}
              series={seriesData}
              options={{
                chart: {
                  id: "line-chart",
                },
                xaxis: {
                  type: "category",
                  categories: graphData.map((item) => item.date || item.month),
                },
                yaxis: {
                  title: {
                    text: "Values",
                  },
                },
              }}
            />
          );

        case "bar":
          return (
            <Chart
              type="bar"
              width={isSmallScreen ? 300 : 500}
              height={isSmallScreen ? 200 : 300}
              series={[
                {
                  name: "Count",
                  data: graphData.map((item) => ({
                    x: item.sentiment || item.course || item.rating,
                    y: item.count || item.averageTime || item.completionRate,
                  })),
                },
              ]}
              options={{
                chart: {
                  id: "bar-chart",
                },
                xaxis: {
                  type: "category",
                  categories: graphData.map((item) => item.sentiment || item.course || item.rating),
                },
                yaxis: {
                  title: {
                    text: "Count",
                  },
                },
              }}
            />
          );

        case "pie":
          return (
            <Chart
              type="pie"
              width={isSmallScreen ? 300 : 500}
              height={isSmallScreen ? 200 : 300}
              series={graphData.map((item) => item.value)}
              options={{
                chart: {
                },
                labels: graphData.map((item) => item.name),
              }}
            />
          );

        default:
          return <Typography>No graph available</Typography>;
      }
    };
    const cardData = CardGraphData.cardData[currentCard] || {};

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Card sx={{ width: getCardWidth(), mb: 2, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 10,
              backgroundColor: "#003060",
              color: "white",
              padding: "0.6rem",
              borderRadius: ".2rem",
              fontSize: "0.75rem",
            }}
          >
            {cardData.libraryName}
          </Box>
          <CardContent>
            <Typography variant="h5" component="div">
              {cardData.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {cardData.content}
            </Typography>
            {renderGraph(cardData.graphType, cardData.graphData)}
          </CardContent>
        </Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrev}
            disabled={currentCard === 0}
            sx={{ mr: 2 }}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={currentCard === CardGraphData.cardData.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    );
  };

  export default CardLayout;
