import React from 'react'
import '../../styles/carta/Hamburguesa.css'

function Hamburguesa({nombre, carne, ingredientes, destacado, etiqueta, precio, etiquetaMenu, precioMenu}) {
  return (
    <li className='burger' role='listitem'>
        <header className="burger--contenido d-flex-col">
            {destacado && <span className="burger--sello"><i className="fa-solid fa-star"></i> Destacada</span>}
            <h3 className="burger--nombre">{nombre}</h3>
            {carne && <p className="burger--carne">{carne}</p>}
            {ingredientes && <p className="burger--ingredientes">{ingredientes}</p>}
        </header>
        <ul className="burger--precios" aria-label={`Precios de ${nombre}`}>
            <li className="precio-tag">
              <small>{etiqueta}</small>
              <strong>{precio}</strong>
            </li>
            {precioMenu && (
              <li className="precio-tag precio-tag--menu">
                <img src="https://lamarta.es/assets/corona.svg" alt="" className="precio-tag--corona" loading="lazy" decoding="async" />
                <small>{etiquetaMenu}</small>
                <strong>{precioMenu}</strong>
              </li>
            )}
        </ul>
    </li>
  )
}

export default Hamburguesa
