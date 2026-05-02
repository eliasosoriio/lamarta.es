import React from 'react'
import "../../styles/club/Panel.css";
import Saludo from './Saludo'
import Recompensas from './Recompensas'
import Transacciones from './Transacciones'
import Puntos from './Puntos';
import ScrollArriba from '../general/ScrollArriba'

function PanelAfiliado() {
  return (
    <>
      <h1 className='paneles--titulo'>LAMARTA CLUB</h1>
      <section className="paneles d-flex-col">
        <ScrollArriba />

        <Saludo /> 

        <Recompensas /> 

        <Transacciones /> 

        <Puntos /> 
      </section>
    </>
  )
}

export default PanelAfiliado
