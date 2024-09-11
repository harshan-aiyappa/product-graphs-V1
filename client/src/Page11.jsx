import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Container, Typography, Paper } from "@mui/material";

const Page11 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const data = [
      {
        name: "Nouns",
        itemStyle: { color: "#da0d68" },
        children: [
          {
            name: "Common",
            value: 1,
            itemStyle: { color: "#975e6d" },
          },
          {
            name: "Proper",
            value: 1,
            itemStyle: { color: "#e0719c" },
          },
          {
            name: "Countable",
            value: 1,
            itemStyle: { color: "#f99e1c" },
          },
          {
            name: "Uncountable",
            value: 1,
            itemStyle: { color: "#f7f1bd" },
          },
        ],
      },
      {
        name: "Verbs",
        itemStyle: { color: "#da1d23" },
        children: [
          {
            name: "Action",
            value: 1,
            itemStyle: { color: "#dd4c51" },
          },
          {
            name: "Linking",
            value: 1,
            itemStyle: { color: "#3e0317" },
          },
          {
            name: "Auxiliary",
            value: 1,
            itemStyle: { color: "#6569b0" },
          },
        ],
      },
      {
        name: "Adjectives",
        itemStyle: { color: "#ebb40f" },
        children: [
          {
            name: "Descriptive",
            value: 1,
            itemStyle: { color: "#e1c315" },
          },
          {
            name: "Quantitative",
            value: 1,
            itemStyle: { color: "#9ea718" },
          },
          {
            name: "Demonstrative",
            value: 1,
            itemStyle: { color: "#94a76f" },
          },
        ],
      },
      {
        name: "Adverbs",
        itemStyle: { color: "#187a2f" },
        children: [
          {
            name: "Manner",
            value: 1,
            itemStyle: { color: "#a2b029" },
          },
          {
            name: "Frequency",
            value: 1,
            itemStyle: { color: "#718933" },
          },
          {
            name: "Degree",
            value: 1,
            itemStyle: { color: "#3aa255" },
          },
          {
            name: "Place",
            value: 1,
            itemStyle: { color: "#038549" },
          },
        ],
      },
      {
        name: "Pronouns",
        itemStyle: { color: "#0aa3b5" },
        children: [
          {
            name: "Personal",
            value: 1,
            itemStyle: { color: "#8b8c90" },
          },
          {
            name: "Possessive",
            value: 1,
            itemStyle: { color: "#beb276" },
          },
          {
            name: "Relative",
            value: 1,
            itemStyle: { color: "#fefef4" },
          },
          {
            name: "Demonstrative",
            value: 1,
            itemStyle: { color: "#744e03" },
          },
        ],
      },
      {
        name: "Prepositions",
        itemStyle: { color: "#c94930" },
        children: [
          {
            name: "Time",
            value: 1,
            itemStyle: { color: "#caa465" },
          },
          {
            name: "Place",
            value: 1,
            itemStyle: { color: "#dfbd7e" },
          },
          {
            name: "Direction",
            value: 1,
            itemStyle: { color: "#be8663" },
          },
        ],
      },
      {
        name: "Conjunctions",
        itemStyle: { color: "#ad213e" },
        children: [
          {
            name: "Coordinating",
            value: 1,
            itemStyle: { color: "#794752" },
          },
          {
            name: "Subordinating",
            value: 1,
            itemStyle: { color: "#cc3d41" },
          },
          {
            name: "Correlative",
            value: 1,
            itemStyle: { color: "#b14d57" },
          },
        ],
      },
      {
        name: "Interjections",
        itemStyle: { color: "#a87b64" },
        children: [
          {
            name: "Exclamatory",
            value: 1,
            itemStyle: { color: "#c78869" },
          },
          {
            name: "Optative",
            value: 1,
            itemStyle: { color: "#bb764c" },
          },
        ],
      },
    ];

    const option = {
      title: {
        // text: "WORLD COFFEE RESEARCH SENSORY LEXICON",
        // subtext:
        //   "Source: https://worldcoffeeresearch.org/work/sensory-lexicon/",
        textStyle: {
          fontSize: 14,
          align: "center",
        },
        subtextStyle: {
          align: "center",
        },
        sublink: "https://worldcoffeeresearch.org/work/sensory-lexicon/",
      },
      series: {
        type: "sunburst",
        data: data,
        radius: [0, "95%"],
        sort: undefined,
        emphasis: {
          focus: "ancestor",
        },
        levels: [
          {},
          {
            r0: "15%",
            r: "35%",
            itemStyle: {
              borderWidth: 2,
            },
            label: {
              rotate: "tangential",
            },
          },
          {
            r0: "35%",
            r: "70%",
            label: {
              align: "right",
            },
          },
          {
            r0: "70%",
            r: "72%",
            label: {
              position: "outside",
              padding: 3,
              silent: false,
            },
            itemStyle: {
              borderWidth: 3,
            },
          },
        ],
      },
    };

    myChart.setOption(option);

    const resizeHandler = () => myChart.resize();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      myChart.dispose();
    };
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
          marginTop: "10px",
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
          Sunburst
        </Typography>
        <div ref={chartRef} style={{ width: "100%", height: "60VW" }} />
      </Paper>
    </Container>
  );
};

export default Page11;
