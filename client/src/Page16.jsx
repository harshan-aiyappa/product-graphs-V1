import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const processData = (data) => {
  const root = { name: "root", children: [] };
  const lessonsMap = {};

  data.forEach(item => {
    if (!lessonsMap[item.LessonJourney_Title]) {
      lessonsMap[item.LessonJourney_Title] = { name: item.LessonJourney_Title, children: [] };
      root.children.push(lessonsMap[item.LessonJourney_Title]);
    }
    let lesson = lessonsMap[item.LessonJourney_Title];

    let chapter = lesson.children.find(c => c.name === item.Chapter_Title);
    if (!chapter) {
      chapter = { name: item.Chapter_Title, children: [] };
      lesson.children.push(chapter);
    }

    let unit = chapter.children.find(u => u.name === item.Unit_Title);
    if (!unit) {
      unit = { name: item.Unit_Title, children: [] };
      chapter.children.push(unit);
    }

    unit.children.push({ name: item.Prompt });
  });

  return root;
};

const SunburstChart = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const width = 600;
      const radius = width / 6;

      const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(1 / radius)
        .padRadius(radius)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

      const partition = data => {
        const root = d3.hierarchy(data)
          .sum(d => d.size)
          .sort((a, b) => b.value - a.value);
        return d3.partition()
          .size([2 * Math.PI, root.height + 1])
          (root);
      };

      const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

      const root = partition(data);

      root.each(d => d.current = d);

      const svg = d3.select(d3Container.current)
        .attr("viewBox", [-width / 2, -width / 2, width, width])
        .style("font", "10px sans-serif");

      const g = svg.append("g");

      const path = g.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("d", d => arc(d.current));

      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }
    }
  }, [data]);

  return (
    <svg ref={d3Container} width="600" height="600"/>
  );
};

const Page16 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.29.50:8081/api/getgraph_coursedistribution');  // Replace with your actual API URL
        console.log("response :",response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const processedData = processData(json);
        console.log(processData)
        setData(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data ? <SunburstChart data={data} /> : <p>No data available</p>}
    </div>
  );
};

export default Page16;