import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Container, Typography, Paper } from '@mui/material';

function Page9() {
  const chartRef = useRef(null);

  const option = {
    title: {
      text: 'Parts of Speech Analysis',
      subtext: 'Language Learning Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: [
        'Nouns',
        'Verbs',
        'Adjectives',
        'Adverbs',
        'Pronouns',
        'Prepositions',
        'Conjunctions',
        'Interjections'
      ]
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Parts of Speech',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { value: 35, name: 'Nouns' },
          { value: 30, name: 'Verbs' },
          { value: 20, name: 'Adjectives' },
          { value: 15, name: 'Adverbs' },
          { value: 10, name: 'Pronouns' },
          { value: 8, name: 'Prepositions' },
          { value: 5, name: 'Conjunctions' },
          { value: 2, name: 'Interjections' }
        ]
      }
    ]
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [option]);

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
        <div ref={chartRef} style={{ width: '100%', height: '600px' }}></div>
      </Paper>
    </Container>
  );
}

export default Page9;
