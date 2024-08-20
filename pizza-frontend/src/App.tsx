import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header'; 
import Navbar from './Components/Navbar/Navbar'; 
import Footer from './Components/Footer/Footer';
import CustomerPage from './Pages/Customer';
import PizzaPage from './Pages/Pizza';
import OrderPage from './Pages/Order';
import AdminPage from './Pages/Admin';

const App: React.FC = () => {
  return (
    <div className="app">
    <Router>
      <Header />
      <Navbar />
      <div className="content">
      <Routes>
        <Route path='/' element={<PizzaPage/>}></Route>
        <Route path="/order" element={<OrderPage />} />

        <Route path='/admin' element={<AdminPage/>}></Route>
        <Route path='/customer' element={<CustomerPage />}></Route>
        <Route path='/pizza' element={<PizzaPage/>}></Route>
      </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;