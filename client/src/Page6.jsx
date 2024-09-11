import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Container, Typography, Paper } from '@mui/material';

function Page6() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
      },
      series: [
        {
          name: 'Age Group',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 400, name: '18-24' },
            { value: 600, name: '25-34' },
            { value: 300, name: '35-44' },
            { value: 200, name: '45-54' },
            { value: 100, name: '55-64' },
            { value: 50, name: '65+' }
          ]
        }
      ]
    };

    myChart.setOption(option);

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
      minWidth: "100%",
      alignItems: "center",
      p: 5,
      backgroundColor: "background.default",
    }}
    >
      <Paper
        elevation={5}
        style={{
          padding: '20px',
          width: '100%',
          marginTop: '20px',
          position: 'relative'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: 1,
            right: 0,
            background: '#4E4F50',
            color: '#E2DED0',
            padding: '5px 10px',
            borderBottomLeftRadius: '.5rem'
          }}
        >
          ECharts Example
        </Typography>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
          User Demographics - Age Group
        </Typography>
        <div ref={chartRef} style={{ width: '100%', height: '600px' }}></div>
      </Paper>
    </Container>
  );
}

export default Page6;
