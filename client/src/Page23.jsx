import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Page23 = () => {
  const chartRef = useRef(null);

  const data = {
    attemptandrevisitsdistribution: [
      {
        User_ID: 27,
        Lesson_Journey_ID: 111,
        Chapter_ID: 166,
        Unit_ID: 167,
        No_OF_Prompts: "8",
        Total_Attempts: "14",
        Total_Revisits: "13",
        Total_Time_Taken: {
          seconds: 12,
          milliseconds: 48,
        },
      },
      {
        User_ID: 27,
        Lesson_Journey_ID: 111,
        Chapter_ID: 166,
        Unit_ID: 380,
        No_OF_Prompts: "5",
        Total_Attempts: "1",
        Total_Revisits: "0",
        Total_Time_Taken: {
          seconds: 5,
          milliseconds: 443,
        },
      },
    ],
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const units = data.attemptandrevisitsdistribution.map(
      (item) => `Unit ${item.Unit_ID}`
    );
    const totalAttempts = data.attemptandrevisitsdistribution.map((item) =>
      parseInt(item.Total_Attempts)
    );
    const totalRevisits = data.attemptandrevisitsdistribution.map((item) =>
      parseInt(item.Total_Revisits)
    );

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Total Attempts", "Total Revisits"],
      },
      xAxis: {
        type: "category",
        data: units,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Total Attempts",
          type: "bar",
          data: totalAttempts,
        },
        {
          name: "Total Revisits",
          type: "bar",
          data: totalRevisits,
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
    >
      <div ref={chartRef} style={{ height: "600px", width: "100%" }} />;
    </div>
  );
};
export default Page23;
