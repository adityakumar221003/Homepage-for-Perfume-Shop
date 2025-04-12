import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSlider from "./components/Heroslider";
import ProductCardSection from "./pages/Home.js";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductDetail.js";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroSlider />} />
        <Route path="/products" element={<ProductCardSection />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
