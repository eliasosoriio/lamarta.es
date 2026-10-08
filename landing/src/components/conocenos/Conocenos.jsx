import React, { useEffect } from 'react'
import Juego from './Juego'
import '../../styles/conocenos/Conocenos.css'
import ScrollArriba from '../general/ScrollArriba'

// La página es el juego: toda la historia de Lamarta se cuenta mientras se prepara la burger.
// El texto completo queda también en la página (solo para lectores de pantalla y buscadores).
function Conocenos() {
  useEffect(() => {
    const anterior = document.title
    document.title = '¡Aplástala tú! · Lamarta'
    return () => {
      document.title = anterior
    }
  }, [])

  return (
    <>
      <ScrollArriba />
      <h1 className="sr-only">¡Aplástala tú!, el juego de Lamarta</h1>
      <div className="sr-only">
        <p>
          LAMARTA está en el corazón de Vilagarcía de Arousa, Galicia. Abrimos en enero de 2024 con la
          pasión de crear hamburguesas artesanales de máxima calidad. Nos especializamos en smash burgers:
          la carne se aplasta contra la plancha a alta temperatura para lograr una costra crujiente por
          fuera y una hamburguesa jugosa por dentro.
        </p>
        <p>
          Ganamos el Burger Combat regional 2024 a la mejor hamburguesa de Galicia con la Onion Ring:
          cebolla al estilo Oklahoma, cheddar, pepinillos, camembert y nuestra salsa Lamarta. En 2025
          quedamos terceros como mejor hamburguesa de España en el Burger Combat nacional.
        </p>
        <p>
          Usamos carne de ternera o de vaca y buey (según la burger), panes brioche artesanales horneados
          cada día y vegetales frescos. La carta incluye tequeños, alitas BBQ, nuggets, pops de pollo y
          opciones veggie y sin gluten.
        </p>
      </div>

      <Juego />
    </>
  )
}

export default Conocenos
