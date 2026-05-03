import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Analysis from "./pages/Analysis/Analysis";
import LandingPage from "./pages/LandingPage/LandingPage";
import Suggestion from "./pages/Suggestion/Suggestion";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/career-tips" element={<Suggestion />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;