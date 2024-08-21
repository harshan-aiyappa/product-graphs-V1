// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./Layout";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";
import Page8 from "./Page8";
import Page9 from "./Page9";
import Page10 from "./Page10";
import Page11 from "./Page11";

// API Data from here
import Page12 from "./Page12";
import Page13 from "./Page13";
import Page14 from "./Page14";
import Page15 from "./Page15";
import Page16 from "./Page16";
import Page17 from "./Page17";
import Page18 from "./Page18";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Page1" element={<Page1 />} />
          <Route path="Page2" element={<Page2 />} />
          <Route path="Page3" element={<Page3 />} />
          <Route path="Page4" element={<Page4 />} />
          <Route path="Page5" element={<Page5 />} />
          <Route path="Page6" element={<Page6 />} />
          <Route path="Page7" element={<Page7 />} />
          <Route path="Page8" element={<Page8 />} />
          <Route path="Page9" element={<Page9 />} />
          <Route path="Page10" element={<Page10 />} />
          <Route path="Page11" element={<Page11 />} />
          <Route path="Page12" element={<Page12 />} />
          <Route path="Page13" element={<Page13 />} />
          <Route path="Page14" element={<Page14 />} />
          <Route path="Page15" element={<Page15 />} />
          <Route path="Page16" element={<Page16 />} />
          <Route path="Page17" element={<Page17 />} />
          <Route path="Page18" element={<Page18 />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
