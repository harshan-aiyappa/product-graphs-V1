import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const Page20 = () => {
  // Function to aggregate data by age group
  function aggregateDataByAgeGroup(data) {
    const ageGroupData = {};

    data.forEach((item) => {
      const ageGroup = item.User_Age;
      if (!ageGroupData[ageGroup]) {
        ageGroupData[ageGroup] = {
          strongWords: 0,
          mediumWords: 0,
          weakWords: 0,
        };
      }
      ageGroupData[ageGroup].strongWords += item.Total_no_of_Strong_Words
        ? parseInt(item.Total_no_of_Strong_Words, 10)
        : 0;
      ageGroupData[ageGroup].mediumWords += item.Total_no_of_Medium_Words
        ? parseInt(item.Total_no_of_Medium_Words, 10)
        : 0;
      ageGroupData[ageGroup].weakWords += item.Total_no_of_Weak_Words
        ? parseInt(item.Total_no_of_Weak_Words, 10)
        : 0;
    });

    return Object.keys(ageGroupData).map((ageGroup) => ({
      ageGroup,
      ...ageGroupData[ageGroup],
    }));
  }

  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://192.168.29.50:8081/api/getgraph_Worddistributionamongusers",
        { timeout: 10000 }
      )
      .then((response) => {
        const data = response.data.Worddistributionamongusers;

        // Aggregate the data
        const aggregatedData = aggregateDataByAgeGroup(data);

        setChartData({
          categories: aggregatedData
            .map((item) => item.ageGroup)
            .sort((a, b) => {
              if (a === "null") return -1;
              if (b === "null") return 1;

              const parseRange = (range) => {
                if (range.includes("+")) return Infinity; // Handle cases like '46+'
                return parseInt(range.split("-")[0], 10); // Handle ranges like '10-12'
              };

              return parseRange(a) - parseRange(b);
            }),

          series: [
            {
              name: "Strong Words",
              data: aggregatedData.map((item) => item.strongWords),
            },
            {
              name: "Medium Words",
              data: aggregatedData.map((item) => item.mediumWords),
            },
            {
              name: "Weak Words",
              data: aggregatedData.map((item) => item.weakWords),
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      title: {
        text: "Total Number of Words",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " words";
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: "2rem",
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
    >
      <h2>Stacked Column Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ApexCharts
          options={chartOptions}
          series={chartData.series}
          type="bar"
          height={600}
        />
      )}
    </div>
  );
};

export default Page20;
