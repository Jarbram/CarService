import React from 'react'
import './error404.css'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='flex-container'>
        <div className='text-center'>
            <h1>
                <span className='fade-in' id='digit1'>4</span>
                <span className='fade-in' id='digit2'>0</span>
                <span className='fade-in' id='digit3'>4</span>
            </h1>
            <h3 className='fadeIn'>PAGE NOT FOUND</h3>
            <Link to='/'>
              <button>RETURN TO HOME</button>
            </Link>
        </div>
    </div>
  )
}

export default Page404