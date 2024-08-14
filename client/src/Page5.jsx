import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import {
  Container,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function Page5() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      legend: {},
      tooltip: {
        trigger: "axis",
        showContent: false,
      },
      dataset: {
        source: [
          [
            "Metric",
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
            "Week 5",
            "Week 6",
          ],
          ["Correct Pronunciations", 100, 110, 120, 115, 130, 125],
          ["Mispronunciations", 15, 10, 12, 8, 7, 5],
          ["Pronunciation Accuracy (%)", 85, 90, 88, 93, 95, 96],
          ["Learning Scores", 70, 75, 80, 78, 85, 83],
        ],
      },
      xAxis: { type: "category" },
      yAxis: { gridIndex: 0 },
      grid: { top: "55%" },
      series: [
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "pie",
          id: "pie",
          radius: "30%",
          center: ["50%", "25%"],
          emphasis: {
            focus: "self",
          },
          label: {
            formatter: "{b}: {@Week 1} ({d}%)",
          },
          encode: {
            itemName: "Metric",
            value: "Week 1",
            tooltip: "Week 1",
          },
        },
      ],
    };

    myChart.setOption(option);

    myChart.on("updateAxisPointer", function (event) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: "pie",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        });
      }
    });

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80%",
        backgroundColor: "background.default",
      }}
    >
      {" "}
      <Paper
        elevation={5}
        style={{
          padding: "20px",
          width: "100%",
          maxWidth: "800px",
          marginTop: "20px",
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
          ECharts
        </Typography>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Pronunciation Teaching Data
        </Typography>
        <div ref={chartRef} style={{ width: "100%", height: "600px" }}></div>{" "}
      </Paper>
    </Container>
  );
}

export default Page5;
