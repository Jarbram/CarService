import React, { useState } from 'react';
import './Slider.css';



const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideItems = [
    {
      imgUrl: require(`../../assets/img1.jpg`),
      alt: 'Slide 1',
      description: 'This is the first slide'
    },
    {
      imgUrl: require(`../../assets/img2.jpg`),
      alt: 'Slide 2',
      description: 'This is the second slide'
    },
    {
      imgUrl: require(`../../assets/img3.jpg`),
      alt: 'Slide 3',
      description: 'This is the third slide'
    }
  ];

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? slideItems.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(activeIndex === slideItems.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="slider">
      <img className="slider-img" src={slideItems[activeIndex].imgUrl} alt={slideItems[activeIndex].alt} />
      <div className="slider-description">{slideItems[activeIndex].description}</div>
      <div className="slider-nav">
        <button className="slider-nav-btn slider-nav-prev" onClick={handlePrevClick}>
          Prev
        </button>
        <button className="slider-nav-btn slider-nav-next" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
