import React from 'react'
import '../../styles/carta/Entrante.css'

// Un plato con uno o varios precios (por ejemplo, 6 ud. y 12 ud.).
function Entrante({nombre, opciones}) {
  return (
    <li className='plato' role='listitem'>
        <p className='plato--nombre'>{nombre}</p>
        <span className='plato--guia' aria-hidden="true"></span>
        <ul className='plato--precios' aria-label={`Precios de ${nombre}`}>
          {opciones.map((opcion) => (
            <li key={opcion.etiqueta || opcion.precio} className='precio-tag'>
              {opcion.etiqueta && <small>{opcion.etiqueta}</small>}
              <strong>{opcion.precio}</strong>
            </li>
          ))}
        </ul>
    </li>
  )
}

export default Entrante
