import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const Page12 = () => {
  const [chartType, setChartType] = useState("bar");
  const [horizontal, setHorizontal] = useState(true);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          distributed: false,
          columnWidth: "50%",
          endingShape: "rounded",
          dataLabels: {
            position: "center",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      xaxis: {
        categories: [],
        labels: {
          rotate: -45,
        },
      },
      title: {
        text: "Most Popular Languages Among Users",
        align: "center",
        style: {
          fontSize: "20px",
          color: "#410099",
        },
      },
      colors: ["#FF5733", "#33FF57"],
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
    },
  });

  const fetchData = () => {
    const url = `http://10.10.20.73:8081/api/getgraph_popularlanguageamongusers`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data.popularlanguage;

        if (data.length > 0) {
          const groupedData = data.reduce((acc, item) => {
            const pair = `${item.Source_Language} - ${item.Traget_Language}`;
            const usersEnrolled = parseInt(item.Number_of_Users_Enrolled);

            if (!acc[pair]) {
              acc[pair] = { source: 0, target: 0 };
            }

            acc[pair].source += usersEnrolled;
            acc[pair].target += usersEnrolled;

            return acc;
          }, {});

          const series = [
            {
              name: "Source Language",
              data: Object.values(groupedData).map((pair) => pair.source),
              color: "#410099",
            },
            {
              name: "Target Language",
              data: Object.values(groupedData).map((pair) => pair.target),
              color: "#603f8b",
            },
          ];

          const categories = Object.keys(groupedData);

          setChartData((prevState) => ({
            ...prevState,
            series,
            options: {
              ...prevState.options,
              xaxis: {
                categories,
              },
            },
          }));
        } else {
          setChartData((prevState) => ({
            ...prevState,
            series: [],
            options: {
              ...prevState.options,
              xaxis: {
                categories: [],
              },
            },
          }));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    setChartData((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        chart: {
          type: chartType,
        },
        plotOptions: {
          ...prevState.options.plotOptions,
          bar: {
            ...prevState.options.plotOptions.bar,
            horizontal: horizontal,
          },
        },
      },
    }));

    fetchData();
  }, [chartType, horizontal]);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleHorizontalChange = (event) => {
    setHorizontal(event.target.value === 'true');
  };

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
            fontSize: { xs: "0.75rem", sm: "1rem" },
          }}
        >
          Apex React
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: { xs: 1, sm: 2, md: 3 } }}
        >
          Most Popular Languages Among Users
        </Typography>

        <FormControl component="fieldset" sx={{ marginTop: { xs: 2, sm: 3 } }}>
          <Typography>Orientation</Typography>
          <RadioGroup
            value={horizontal.toString()}
            onChange={handleHorizontalChange}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Horizontal" />
            <FormControlLabel value="false" control={<Radio />} label="Vertical" />
          </RadioGroup>
        </FormControl>

        <div style={{ marginTop: "20px" }}>
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type={chartType}
            height={600}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default Page12;
