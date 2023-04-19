import React, { useState, useEffect } from 'react';
import './Slider.css';
import {AiFillCaretRight, AiFillCaretLeft} from 'react-icons/ai';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideItems = [
    {
      imgUrl: require(`../../assets/img1.jpg`),
      alt: 'Slide 1',
      description: 'the best way to keep your car in good condition'
    },
    {
      imgUrl: require(`../../assets/img2.jpg`),
      alt: 'Slide 2',
      description: 'Make your car look like new'
    },
    {
      imgUrl: require(`../../assets/img3.jpg`),
      alt: 'Slide 3',
      description: 'Enjoy your ride'
    }
  ];

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? slideItems.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(activeIndex === slideItems.length - 1 ? 0 : activeIndex + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  return (
    <div className="slider">
      <img className="slider-img" src={slideItems[activeIndex].imgUrl} alt={slideItems[activeIndex].alt} />
      <div className="slider-description">{slideItems[activeIndex].description}</div>
      <div className="slider-nav">
        <AiFillCaretLeft className="slider-nav-btn slider-nav-prev" onClick={handlePrevClick} />
        <AiFillCaretRight className="slider-nav-btn slider-nav-next" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default Slider;
