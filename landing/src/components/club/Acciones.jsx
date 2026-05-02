import React from 'react'
import "../../styles/club/Acciones.css";
import { Link } from "react-router-dom";

function Acciones() {
  return (
    <section className='acciones d-flex-col'>
      <Link to="/club/usuario" className='acciones--link'>
        <p className="acciones--opcion">Buscar afiliado</p>
      </Link>
      <Link to="/recompensa/anadir" className='acciones--link' >
        <p className="acciones--opcion">Añadir recompensa</p>
      </Link>
    </section>
  )
}

export default Acciones
