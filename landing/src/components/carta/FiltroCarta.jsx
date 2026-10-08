import React from 'react'
import "../../styles/carta/FiltroCarta.css";

function FiltroCarta({mensaje, onClick, className}) {
  return (
    <button className={`button--filter ${className}`} aria-pressed={className === 'activo'} type='button' onClick={onClick}>{mensaje}</button>
  )
}

export default FiltroCarta
