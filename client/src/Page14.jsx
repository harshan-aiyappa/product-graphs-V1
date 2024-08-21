import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import * as echarts from 'echarts'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell } from 'recharts';

// Utility function to process API data
const processData = (data) => {
  const lessons = data.map(item => `Lesson ${item.Tracker_LessonJourneyID}`);
  const timeTaken = data.map(item => {
    const { minutes = 0, seconds = 0, milliseconds = 0 } = item.Time_Taken || {};
    return minutes * 60 + seconds + milliseconds / 1000;
  });
  const promptsCompleted = data.map(item => item.Prompts_Completed);
  const totalPrompts = data.map(item => item.LJ_Total_Prompts);
  const percentageCompleted = data.map(item => item.Percentage_LJ_Completed);
  return { lessons, timeTaken, promptsCompleted, totalPrompts, percentageCompleted };
};

const Page14 = () => {
  const [chartData, setChartData] = useState({
    lineChart: { timeTaken: [], lessons: [], promptsCompleted: [], totalPrompts: [], percentageCompleted: [] }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChart, setSelectedChart] = useState('ApexCharts'); // Default to ApexCharts
  const echartsRef = useRef(null); // Ref for ECharts container

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.29.50:8081/api/getgraph_coursecompletionovertime?p_usrid=27');
        const data = response.data.completionstatus;
        const processedData = processData(data);
        setChartData({ lineChart: processedData });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart configuration for ApexCharts with gradient color
  const apexOptions = {
    chart: { type: 'area', animations: { enabled: true, easing: 'easeinout', dynamicAnimation: { enabled: true } } },
    xaxis: { categories: chartData.lineChart.lessons, title: { text: 'Lessons', style: { fontSize: '14px', fontWeight: 600 } } },
    yaxis: { title: { text: 'Time Taken (s)', style: { fontSize: '14px', fontWeight: 600 } } },
    title: { text: 'Time Taken per Lesson', align: 'left', style: { fontSize: '16px', fontWeight: 600 } },
    tooltip: { theme: 'dark', x: { show: true }, y: { formatter: (value) => `${value} s` } },
    colors: ['#FF4560'],
    fill: { type: 'gradient', gradient: { shade: 'light', type: 'vertical', gradientToColors: ['#00E396'], opacityFrom: 0.5, opacityTo: 0.1 } },
    markers: { size: 4, colors: ['#FF4560'], strokeColor: '#FFF', strokeWidth: 2 },
  };

  const echartOptions = {
    title: { text: 'Time Taken per Lesson (s)', left: 'center', textStyle: { fontSize: 16, fontWeight: 'bold' } },
    xAxis: { type: 'category', data: chartData.lineChart.lessons, axisLabel: { rotate: 45, margin: 15 } },
    yAxis: { type: 'value', name: 'Time Taken (s)', axisLabel: { formatter: '{value} s' } },
    series: [{ data: chartData.lineChart.timeTaken, type: 'line', smooth: true, itemStyle: { color: '#FF4560' }, lineStyle: { width: 2 } }],
    tooltip: { trigger: 'axis', backgroundColor: '#333', textStyle: { color: '#fff' }, formatter: '{b}: {c} s' },
    grid: { left: '10%', right: '10%', bottom: '15%' },
  };

  // Initialize and render ECharts when selected
  useEffect(() => {
    if (selectedChart === 'ECharts' && echartsRef.current) {
      const chartInstance = echarts.init(echartsRef.current);
      chartInstance.setOption(echartOptions);

      // Cleanup on unmount or when switching charts
      return () => {
        chartInstance.dispose();
      };
    }
  }, [selectedChart, echartOptions]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  // Prepare data for Recharts
  const rechartsData = chartData.lineChart.lessons.map((lesson, index) => ({
    lesson,
    timeTaken: chartData.lineChart.timeTaken[index],
    promptsCompleted: chartData.lineChart.promptsCompleted[index],
    totalPrompts: chartData.lineChart.totalPrompts[index],
    percentageCompleted: chartData.lineChart.percentageCompleted[index],
  }));

  // Prepare data for PieChart
  const pieData = [
    { name: 'Completed', value: chartData.lineChart.promptsCompleted.reduce((a, b) => a + b, 0) },
    { name: 'Remaining', value: chartData.lineChart.totalPrompts.reduce((a, b) => a + b, 0) - chartData.lineChart.promptsCompleted.reduce((a, b) => a + b, 0) }
  ];

  // Prepare data for Heatmap
  const heatmapData = chartData.lineChart.lessons.map((lesson, index) => ({
    lesson,
    timeTaken: chartData.lineChart.timeTaken[index]
  }));

  return (
    <div>
      <h1>Page 14 - Analytics</h1>
      
      {/* Dropdown to select chart type */}
      <div>
        <label htmlFor="chart-select">Select Chart Type: </label>
        <select
          id="chart-select"
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
        >
          <option value="ApexCharts">ApexCharts</option>
          <option value="ECharts">ECharts</option>
          <option value="Recharts">Recharts</option>
          <option value="BarChart">BarChart</option>
          <option value="PieChart">PieChart</option>
          <option value="RadarChart">RadarChart</option>
          <option value="Heatmap">Heatmap</option>
        </select>
      </div>

      {/* Conditionally render the selected chart */}
      <div>
        {selectedChart === 'ApexCharts' && (
          <ApexCharts
            options={apexOptions}
            series={[{ name: 'Time Taken (s)', data: chartData.lineChart.timeTaken }]}
            type="area"
            height={600}
          />
        )}
        {selectedChart === 'ECharts' && (
          <div
            ref={echartsRef}
            style={{ height: 600, width: '100%' }}
          />
        )}
        {selectedChart === 'Recharts' && (
          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={rechartsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lesson" label={{ value: 'Lessons', position: 'insideBottomRight', offset: 0 }} />
              <YAxis label={{ value: 'Time Taken (s)', angle: -90, position: 'insideLeft', offset: 0 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="timeTaken" stroke="#FF4560" dot={{ stroke: '#FF4560', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
        {selectedChart === 'BarChart' && (
          <ResponsiveContainer width="100%" height={600}>
            <BarChart data={rechartsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lesson" label={{ value: 'Lessons', position: 'insideBottomRight', offset: 0 }} />
              <YAxis label={{ value: 'Time Taken (s)', angle: -90, position: 'insideLeft', offset: 0 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="timeTaken" fill="#FF4560" />
            </BarChart>
          </ResponsiveContainer>
        )}
        {selectedChart === 'PieChart' && (
          <PieChart width={800} height={600}>
            <Pie
              data={pieData}
              cx={400}
              cy={300}
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#FF4560' : '#00E396'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
        {selectedChart === 'RadarChart' && (
          <ResponsiveContainer width="100%" height={600}>
            <RadarChart outerRadius={150} data={rechartsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="lesson" />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Radar name="Time Taken" dataKey="timeTaken" stroke="#FF4560" fill="#FF4560" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )}
        {selectedChart === 'Heatmap' && (
          <ApexCharts
            options={{
              chart: { type: 'heatmap' },
              xaxis: { type: 'category', categories: chartData.lineChart.lessons },
              yaxis: { title: { text: 'Time Taken (s)' } },
              colors: ['#FF4560']
            }}
            series={[{
              name: 'Time Taken',
              data: heatmapData.map(item => ({ x: item.lesson, y: item.timeTaken }))
            }]}
            type="heatmap"
            height={600}
          />
        )}
      </div>
    </div>
  );
};

export default Page14;
