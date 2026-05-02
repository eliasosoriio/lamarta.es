import '../../styles/contacto/Contacto.css'
import React from 'react'
import HeaderSeccion from '../general/HeaderSeccion'
import Barra from './Barra'
import ScrollArriba from '../general/ScrollArriba'

function Contacto() {
  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre="Contacto" />
      <section className='contacto--contenido d-flex-col'>
          <section className='contacto--social d-flex-col'>
            <Barra 
              enlace={"https://maps.app.goo.gl/5bmD4zxCKLPidTUC6"}
              icono={"fa-solid fa-map-pin"}
              titulo={"Rúa Arcebispo Xelmírez, 7, 36600 Vilagarcía de Arousa"}
            />
            <Barra
              enlace={"tel:664368661"}
              icono={"fa-solid fa-phone"}
              titulo={"664 36 86 61"}
            />
            <Barra
              enlace={"mailto:grupolamarta@gmail.com"}
              icono={"fa-solid fa-envelope"}
              titulo={"grupolamarta@gmail.com"}
            />
            <Barra
              enlace={"https://www.instagram.com/lamarta_bbb/"}
              icono={"fa-brands fa-instagram"}
              titulo={"@lamarta_bbb"}
            />
            <Barra
              enlace={"https://www.youtube.com/@LAMARTABBB"}
              icono={"fa-brands fa-youtube"}
              titulo={"LAMARTA Youtube"}
            />
          </section>
          <img className='contacto--imagen' src="https://vilagarciavirtual.com/uploads/imagenes-negocio/lamarta_01.jpg" alt="Imagen del interior del local de LAMARTA" />
      </section>
    </>
  )
}

export default Contacto
