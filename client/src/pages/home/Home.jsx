import React from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import './home.css'
import Slider from '../../components/slider/Slider.jsx'

const Home = () => {
  return (
    <>
      <Navbar 
      isLoginVisible={true}
      isSignUpVisible={true}
      />
      <div className="home-container">
        <div className="about">
          <h2 className="home-title">Welcome The best Services Car</h2>
          <p className="home-description">
            Take care of your car with our maintenance service for safe and worry-free driving. Quality and attention to detail guaranteed.
          </p>
        </div>
        <Slider />
      </div>
    </>
  );
};



export default Home