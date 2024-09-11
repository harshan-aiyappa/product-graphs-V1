import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Container, Typography, Paper } from "@mui/material";

const Page10 = () => {
  useEffect(() => {
    const chartDom = document.getElementById("radarChart");
    const myChart = echarts.init(chartDom);

    const option = {
      color: ["#67F9D8", "#FFE434", "#56A3F1", "#FF917C"],
      title: {
        // text: "French Language Parts of Speech Analysis",
        left: "center",
        top: 20,
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      legend: {
        bottom: 10,
      },
      radar: [
        // First radar component
        {
          indicator: [
            { text: "Nouns" },
            { text: "Verbs" },
            { text: "Adjectives" },
            { text: "Adverbs" },
            { text: "Pronouns" },
          ],
          center: ["25%", "50%"],
          radius: 120,
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
          axisName: {
            formatter: "【{value}】",
            color: "#428BD4",
          },
          splitArea: {
            areaStyle: {
              color: ["#77EADF", "#26C3BE", "#64AFE9", "#428BD4"],
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowBlur: 10,
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(211, 253, 250, 0.8)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(211, 253, 250, 0.8)",
            },
          },
        },
        // Second radar component
        {
          indicator: [
            { text: "Nouns", max: 100 },
            { text: "Verbs", max: 100 },
            { text: "Adjectives", max: 100 },
            { text: "Adverbs", max: 100 },
            { text: "Pronouns", max: 100 },
            { text: "Prepositions", max: 100 },
          ],
          center: ["75%", "50%"],
          radius: 120,
          axisName: {
            color: "#fff",
            backgroundColor: "#666",
            borderRadius: 3,
            padding: [3, 5],
          },
        },
      ],
      series: [
        {
          type: "radar",
          emphasis: {
            lineStyle: {
              width: 4,
            },
          },
          data: [
            {
              value: [80, 70, 60, 50, 40],
              name: "Basic Text Analysis",
            },
            {
              value: [60, 65, 70, 55, 50],
              name: "Comparative Text Analysis",
              areaStyle: {
                color: "rgba(255, 228, 52, 0.6)",
              },
            },
          ],
        },
        {
          type: "radar",
          radarIndex: 1,
          data: [
            {
              value: [85, 75, 65, 55, 45, 35],
              name: "Detailed Analysis with Prepositions",
              symbol: "rect",
              symbolSize: 12,
              lineStyle: {
                type: "dashed",
              },
              label: {
                show: true,
                formatter: function (params) {
                  return params.value;
                },
              },
            },
            {
              value: [70, 80, 75, 60, 50, 45],
              name: "Extended Analysis with Extra Metrics",
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: "rgba(255, 145, 124, 0.1)",
                    offset: 0,
                  },
                  {
                    color: "rgba(255, 145, 124, 0.9)",
                    offset: 1,
                  },
                ]),
              },
            },
          ],
        },
      ],
    };

    myChart.setOption(option);
  }, []);

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
        style={{
          padding: "20px",
          width: "100%",
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
          French Language Parts of Speech Analysis
        </Typography>
        <div id="radarChart" style={{ width: "100%", height: "600px" }}></div>
      </Paper>
    </Container>
  );
};

export default Page10;
