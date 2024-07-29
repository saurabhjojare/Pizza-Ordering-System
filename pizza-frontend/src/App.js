import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Pizza from './pages/pizza'; 
import Header from './components/Header/header'; 
import Navbar from './components/Navbar/navbar'; 
import Order from './pages/order';
import Customer from './pages/customer';
import Footer from './components/Footer/footer'; 
import './App.css'; 

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza" element={<Pizza />} /> 
            <Route path="/order" element={<Order />} /> 
            <Route path="/customer" element={<Customer />} /> 
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;