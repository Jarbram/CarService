import React from 'react'
import './footer.css'
import {AiFillFacebook,AiFillInstagram,AiFillCar} from 'react-icons/ai'
import {FaTiktok} from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='footer'>
    <p className='message-nextContainer'>Learn more about us through our networks</p>
      <div className='footer-container'>
        <div className='redes'>
        <a>
        <AiFillFacebook />
        </a>
        <a>
        <AiFillInstagram />
        </a>
        <a>
        <FaTiktok />
        </a>
        </div>
        <div className='footerLogo'>
        <h2>Jarbram</h2>
        <AiFillCar />
        </div>
      </div>


    </div>
  )
}

export default Footer