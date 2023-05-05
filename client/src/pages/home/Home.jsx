import React from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import './home.css'
import Slider from '../../components/slider/Slider.jsx'
import BrandsSlider from '../../components/brandsSlider/BrandsSlider.jsx';
import Footer from '../../components/footer/Footer.jsx';

const Home = () => {
  return (
    <>
      <Navbar 
      isLoginVisible={true}
      isSignUpVisible={true}
      isColaboradoresVisible={true}
      currentPage=""
      />
      <div className="home-container">
        <div className="about">
          <h2 className="home-title">Welcome The best Services Car</h2>
          <p className="home-description">
            Take care of your car with our maintenance service for safe and worry-free driving. Quality and attention to detail guaranteed.
          </p>
        </div>
        <Slider />
        <div className='spareParts'>
          <p>We know how to work with a lots car brands, for this reason we have alliances that facilitate spare parts</p>
        </div>
      </div>
      <BrandsSlider />
      <Footer />
    </>
  );
};



export default Home