import React from 'react'
import '../../styles/carta/HeaderSeccionCarta.css'

function HeaderSeccionCarta({titulo, imagen}) {
  return (
    <header className='carta--cabecera'>
      {imagen && (
        <span className='carta--cabecera__icono'>
          <img loading="lazy" decoding="async" src={imagen} alt="" />
        </span>
      )}
      <h2>{titulo}</h2>
    </header>
  )
}

export default HeaderSeccionCarta
