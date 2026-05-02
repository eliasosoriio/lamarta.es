import "../../styles/general/HeaderSeccion.css";
import React from 'react'

function HeaderSeccion({nombre}) {
  return (
    <header className='seccion--cabecera d-flex-row'>
        <h1>{nombre}</h1>
    </header>
  )
}

export default HeaderSeccion
