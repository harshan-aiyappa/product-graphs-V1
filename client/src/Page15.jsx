import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const Page15 = () => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    axios.get('http://192.168.29.50:8081/api/getgraph_demographicdistributionofprompts')
      .then(response => {
        const data = response.data.demographicdistributionofprompts;

        // Prepare data for the chart
        const categories = data.map(item => item.User_Age || 'Unknown');
        const totalPrompts = data.map(item => item.Total_Prompts ? parseInt(item.Total_Prompts, 10) : 0);
        const totalAttemptedPrompts = data.map(item => item.Total_Attempted_Prompts ? parseInt(item.Total_Attempted_Prompts, 10) : 0);

        setChartData({
          series: [
            {
              name: 'Total Prompts',
              data: totalPrompts,
            },
            {
              name: 'Total Attempted Prompts',
              data: totalAttemptedPrompts,
            }
          ],
          categories
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Demographic Distribution of Prompts</h1>
      <Chart
        options={{
          chart: {
            type: 'bar',
            // Remove stacked: true to show bars side by side
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          xaxis: {
            categories: chartData.categories,
            title: {
              text: 'Age Group',
            },
          },
          yaxis: {
            title: {
              text: 'Number of Prompts',
            },
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
          },
          fill: {
            opacity: 1,
          },
          dataLabels: {
            enabled: true,
          },
          grid: {
            borderColor: '#f1f1f1',
          },
        }}
        series={chartData.series}
        type="bar"
        height={600}
      />
    </div>
  );
}

export default Page15;
