import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Container, Typography, Paper } from '@mui/material';

function Page7() {
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
        data: ['Active Users', 'Churn Rate', 'Retention Rate']
      },
      series: [
        {
          name: 'Engagement Metrics',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1200, name: 'Active Users' },
            { value: 100, name: 'Churn Rate' },
            { value: 900, name: 'Retention Rate' }
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
          ECharts
        </Typography>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
          Engagement Metrics
        </Typography>
        <div ref={chartRef} style={{ width: '100%', height: '600px' }}></div>
      </Paper>
    </Container>
  );
}

export default Page7;
