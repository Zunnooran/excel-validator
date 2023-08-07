import React from 'react'
import './Unknown.css'
import { useNavigate } from 'react-router-dom';
import image from '../../assets/error/error2.png'

import  Button from '../../atom/button/Button'
const Unknown = () => {
  const navigate=useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };
  return (
    <div className='section'>
      <img src={image} alt="" className="image" />
      <div className='rightSection'>
        <h1 className='headerText'>Looks like you are lost!</h1>
        <Button btnText="Go Home" primary  btnClick={handleButtonClick} />
      </div>
    </div>
  )
}

export default Unknown