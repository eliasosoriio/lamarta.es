import React from 'react'
import '../../styles/carta/HeaderSeccionCarta.css'

function HeaderSeccionCarta({titulo, imagen}) {
  return (
    <header className='entrantes--header d-flex-row'>
      <h2>{titulo}</h2>
      {imagen && <img src={imagen} alt={`Imagen de sección en la carta: ${titulo}`} />}
    </header>
  )
}

export default HeaderSeccionCarta
