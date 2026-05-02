import React from 'react'
import "../../styles/club/CampoPanel.css";
import { Link } from "react-router-dom";

function CampoPanel({nombre, descripcion, puntos, puedeEditar=false, puedeBorrar=false, puedePerfil=false, id}) {
  const tipo = sessionStorage.getItem('tipo');
  const editarRecompensa = `/recompensa/editar/${id}`;
  const borrarRecompensa = `/recompensa/borrar/${id}`;
  const verPerfil = `/usuario/perfil/${id}`;
  
  return (
    <li className='campo--panel d-flex-row' role='listitem'>
      <section className='d-flex-col'>
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p>{puntos} puntos.</p>
      </section>
      <div className='campo--panel--iconos d-flex-row'>
        {tipo === "admin" && (
          <>
            {puedeEditar && (
              <Link to={editarRecompensa} className='icon-link' aria-label={'Acción editar: '+ nombre}>
                <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
              </Link>
            )}
            {puedeBorrar && (
              <Link to={borrarRecompensa} className='icon-link' aria-label={'Acción borrar: '+ nombre}>
                <i className="fa-solid fa-trash" aria-hidden="true"></i>
              </Link>
            )}
            {puedePerfil && (
              <Link to={verPerfil} className='icon-link' aria-label={'Acción ver perfil: '+ nombre}>
                <i className="fa-solid fa-user" aria-hidden="true"></i>
              </Link>
            )}
          </>
        )}
      </div>
    </li>
  )
}

export default CampoPanel
