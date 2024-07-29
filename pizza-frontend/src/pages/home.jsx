// src/pages/home.jsx

import React from 'react';

const Home = () => {
  return (
    <div className='container-fluid'>
      <div className='text-center'>
      <h1 className='text-center mt-3 mb-3'>Welcome to the Home Page!</h1>
      <img  src={`${window.location.origin}/images/banner.jpg`}  class="img-fluid" alt="Pizza Baner"></img>
      </div>
    </div>
  );
};

export default Home;
