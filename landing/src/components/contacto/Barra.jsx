import '../../styles/contacto/Barra.css'
import React from 'react'

function Barra({enlace, icono, titulo}) {
  return (
    <>
      <a href={enlace} target="_blank" rel="noreferrer" className='barra d-flex-row'>
        <i className={icono}></i>
        <p>{titulo}</p>
      </a>
    </>
  )
}

export default Barra
