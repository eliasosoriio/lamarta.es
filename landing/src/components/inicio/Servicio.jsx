import '../../styles/inicio/Servicio.css'
import React from 'react'

function Servicio({icono, nombre, descripcion}) {
  return (
    <article className="servicios--apartado d-flex-col">
        <header className='servicios--apartado--titulo d-flex-row'>
            <h3>{nombre}</h3>
            <span
              className={icono}
              aria-hidden="true"
              role="img"
            >
            </span>
        </header>
        <p>{descripcion}</p>
    </article>
  )
}

export default Servicio
