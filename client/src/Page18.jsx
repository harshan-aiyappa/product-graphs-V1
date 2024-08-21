import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

const Page18 = () => {
    const [chartData, setChartData] = useState({
      series: [],
    });
  
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get('http://192.168.29.50:8081/api/getgraph_posdistribution?usrid=27', { timeout: 10000 })
        .then(response => {
          const data = response.data.posdistribution;
  
          const seriesData = data.map(item => ({
            x: item.Tracker_PoS_Element || 'Unknown',
            y: parseInt(item.count, 10)
          }));
  
          setChartData({
            series: [{
              data: seriesData
            }]
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  
    return (
      <Container sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#410099' }}>
          Parts of Speech Distribution TreeMap
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Chart
            options={{
              chart: {
                type: 'treemap',
                toolbar: {
                  show: true,
                },
                animations: {
                  enabled: true,
                  easing: 'easeinout',
                  speed: 800,
                  animateGradually: {
                    enabled: true,
                    delay: 150
                  },
                  dynamicAnimation: {
                    enabled: true,
                    speed: 350
                  }
                },
              },
              plotOptions: {
                treemap: {
                  distributed: true,
                  enableShades: true,
                  shadeIntensity: 0.5,
                  reverseNegativeShade: true,
                  colorScale: {
                    ranges: [{
                      from: 0,
                      to: 50,
                      color: '#08313A' // Coral
                    }, {
                      from: 51,
                      to: 150,
                      color: '#FF4500' // Light Teal
                    }, {
                      from: 151,
                      to: 300,
                      color: '#104210' // Deep Orange
                    }]
                  }
                }
              },
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '16px',
                  colors: ['#fff']
                },
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val;
                  }
                }
              }
            }}
            series={chartData.series}
            type="treemap"
            height={600}
          />
        )}
      </Container>
    );
  };
  
export default Page18;
