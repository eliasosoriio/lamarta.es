import React from 'react'
import '../../styles/carta/Hamburguesa.css'

function Hamburguesa({nombre, carne, ingredientes, precio, precioMenu}) {
  return (
    <li className='smash d-flex-row' role='listitem'>
        <header className="smash--contenido d-flex-col">
            <p className="smash--contenido--nombre">{nombre}</p>
            {carne && <p className="smash--contenido--carne">{carne}</p>}
            {ingredientes && <p className="smash--contenido--ingredientes">{ingredientes}</p>}
        </header>
        <ul className="smash--precios d-flex-row" aria-label="Precios">
            <li>{precio}</li>
            <li>{precioMenu}</li>
        </ul>
    </li>
  )
}

export default Hamburguesa
