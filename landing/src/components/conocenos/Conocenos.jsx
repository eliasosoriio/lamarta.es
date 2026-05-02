import React from 'react'
import HeaderSeccion from '../general/HeaderSeccion'
import Seccion from './Seccion'
import '../../styles/conocenos/Conocenos.css'
import ScrollArriba from '../general/ScrollArriba'

function Conocenos() {
  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre={"Conócenos"}></HeaderSeccion>
      <section className="conocenos--secciones d-flex-col">
        
        {/* Sección 1: Nuestra Historia */}
        <Seccion 
          imagen={"https://lamarta.es/assets/premiumbacon.JPG"}
          titulo={"Nuestra Historia"}
          textos={[
            "LAMARTA es un restaurante ubicado en el corazón de Vilagarcía de Arousa, Galicia. Abierto en enero de 2024, nace de la pasión por crear hamburguesas artesanales de máxima calidad.",
            "Nos especializamos en smash burgers, una técnica que consiste en aplastar la carne sobre la plancha a alta temperatura, creando una costra crujiente por fuera mientras mantenemos la jugosidad interior. Cada hamburguesa es una experiencia única."
          ]}
          alt={"Premium Bacon - Una de nuestras hamburguesas estrella"}
          lado="izquierda"
        />

        {/* Sección 2: Nuestros Premios */}
        <Seccion 
          imagen={"https://lamarta.es/assets/popsdepollo.jpg"}
          titulo={"Reconocimiento Nacional"}
          textos={[
            "Hemos ganado el BURGER COMBAT REGIONAL 2024 a la mejor hamburguesa de Galicia con nuestra espectacular ONION RING, una creación que combina cebolla al estilo Oklahoma, queso cheddar, pepinillos, queso camembert y nuestra salsa secreta LAMARTA.",
            "Además, obtuvimos el tercer puesto como mejor hamburguesa de España en el BURGER COMBAT NACIONAL 2025. Estos reconocimientos son el reflejo de nuestro compromiso con la calidad y la innovación en cada plato que servimos."
          ]}
          alt={"Preparación de nuestros platos con dedicación"}
          lado="derecha"
        />

        {/* Sección 3: Nuestra Filosofía */}
        <Seccion 
          imagen={"https://lamarta.es/assets/onionring.jpg"}
          titulo={"Calidad y Pasión"}
          textos={[
            "En LAMARTA creemos que una buena hamburguesa empieza con ingredientes de primera calidad. Trabajamos con carne 100% de vaca y buey, panes artesanales horneados diariamente, y vegetales frescos seleccionados con cuidado.",
            "Nuestra carta va más allá de las hamburguesas: ofrecemos entrantes caseros como tequeños, alitas BBQ, nuggets y pops de pollo. También tenemos opciones veggie y sin gluten para que todos puedan disfrutar de la experiencia LAMARTA."
          ]}
          alt={"Ambiente acogedor del restaurante"}
          lado="izquierda"
        />

      </section>
      <h2 className='conocenos--final'>Ven a LAMARTA y descubre por qué somos la joya gastronómica de Vilagarcía de Arousa. ¡Te esperamos!</h2>
    </>
  )
}
 
export default Conocenos
