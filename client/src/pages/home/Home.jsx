import React, {useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import {images} from '../../data.js'

import './home.css'

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  function handlePrevClick() {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }

  function handleNextClick() {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }

  const imageSrc = images[currentIndex];

  return (
    <>
        <Navbar />
        <div className='home-container'>
        <div className='home'>
          <h2 className='home-title'>Welcome The best Services Car</h2>
          <p className='home-description'>Take care of your car with our maintenance service for safe and worry-free driving. Quality and attention to detail guaranteed.</p>
        </div>
        <div>
      <button onClick={handlePrevClick}>Prev</button>
      <button onClick={handleNextClick}>Next</button>
      <img src={imageSrc} alt={`Images ${currentIndex + 1}`} />
    </div>
        </div>
    </>
  )
}



export default Home