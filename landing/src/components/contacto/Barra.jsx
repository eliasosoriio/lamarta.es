import '../../styles/contacto/Barra.css'
import React from 'react'

function Barra({enlace, icono, titulo}) {
  return (
    <>
      <a
        href={enlace}
        {...(enlace.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className='barra d-flex-row'
      >
        <i className={icono}></i>
        <p>{titulo}</p>
      </a>
    </>
  )
}

export default Barra
