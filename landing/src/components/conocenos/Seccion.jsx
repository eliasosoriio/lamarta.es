import '../../styles/conocenos/Seccion.css'
import React from 'react'

function Seccion({imagen, titulo, textos, alt, lado = "izquierda"}) {
  return (
    <section className={`conocenos--seccion conocenos--seccion--${lado} d-flex-row`}>
      <div className="conocenos--seccion__imagen">
        <img src={imagen} alt={alt} />
      </div>
      <div className="conocenos--seccion__contenido">
        <h3 className="conocenos--seccion__titulo">{titulo}</h3>
        {textos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}

export default Seccion
