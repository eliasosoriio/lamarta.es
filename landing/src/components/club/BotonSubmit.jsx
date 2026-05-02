import React from 'react'
import "../../styles/club/BotonSubmit.css";

function BotonSubmit({mensaje, button, onClick}) {
  return (
    <button className='button--submit' type={button ? "button" : "submit"} onClick={onClick}>{mensaje}</button>
  )
}

export default BotonSubmit
