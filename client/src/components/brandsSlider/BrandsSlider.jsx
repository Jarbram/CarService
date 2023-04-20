import React from 'react'
import './brandsSlider.css'
import {TbBrandMercedes} from 'react-icons/tb'
import {SiHyundai, SiHonda,SiToyota,SiVolkswagen,SiSubaru,SiFord,SiNissan,SiTesla,SiJeep,SiBmw,SiAudi} from 'react-icons/si'


const BrandsSlider = () => {
  return (
    <div className='brands-container'>
    <div className='slider-brands'>
        <div className='slide-track'>
            <div className='slide'>
                <TbBrandMercedes />
            </div>
            <div className='slide'>
                <SiToyota />
            </div>
            <div className='slide'>
                <SiHyundai />
            </div>
            <div className='slide'>
                <SiHonda />
            </div>
            <div className='slide'>
                <SiVolkswagen />
            </div>
            <div className='slide'>
                <SiSubaru />
            </div>
            <div className='slide'>
                <SiFord />
            </div>
            <div className='slide'>
                <SiAudi />
            </div>
            <div className='slide'>
                <SiBmw />
            </div>
            <div className='slide'>
                <SiJeep />
            </div>
            <div className='slide'>
                <SiTesla />
            </div>
            <div className='slide'>
                <SiNissan />
            </div>
        </div>
    </div>
    </div>
  )
}

export default BrandsSlider