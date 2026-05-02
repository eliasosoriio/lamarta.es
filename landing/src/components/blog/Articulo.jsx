import '../../styles/blog/Articulo.css'
import React from 'react'

function Articulo({imagen, titulo, descripcion, href}) {
  return (
    <article className='blog--articulo d-flex-row'>
        <figure className="blog--articulo--img">
          <img src={imagen} alt={`Imagen del artículo: ${titulo}`} />
        </figure>
        <section className='blog--articulo--contenido d-flex-col'>
          <h3><a href={href} className="articulo--link" target="_blank" rel="noopener noreferrer">{titulo}</a></h3>
          <p>{descripcion}</p>
        </section>
    </article>
  )
}

export default Articulo
