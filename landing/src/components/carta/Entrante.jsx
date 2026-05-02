import React from 'react'
import '../../styles/carta/Entrante.css'

function Entrante({nombre, precio}) {
  return (
    <li className='entrante d-flex-row' role='listitem'>
        <p className='entrante--nombre'>{nombre}</p>
        <p className='entrante--precio'>{precio}</p>
    </li>
  )
}

export default Entrante
