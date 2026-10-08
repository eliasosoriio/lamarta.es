import '../../styles/contacto/Contacto.css'
import React, { useEffect, useState } from 'react'
import HeaderSeccion from '../general/HeaderSeccion'
import Barra from './Barra'
import Mapa from './Mapa'
import ScrollArriba from '../general/ScrollArriba'
import { HORARIOS, diaActual, estadoActual } from '../../utils/horarios'

const URL_MAPA = "https://maps.app.goo.gl/5bmD4zxCKLPidTUC6";
const URL_PEDIR = "https://r.qamarero.com/lamarta?mode=PICKUP";

function Contacto() {
  const [estado, setEstado] = useState(() => estadoActual());
  const [hoy, setHoy] = useState(() => diaActual());

  // El estado y el día marcado se refrescan cada minuto.
  useEffect(() => {
    const intervalo = setInterval(() => {
      setEstado(estadoActual());
      setHoy(diaActual());
    }, 60 * 1000);
    return () => clearInterval(intervalo);
  }, []);

  const [titularEstado, detalleEstado] = estado.texto.split(' · ');

  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre="Contacto" />

      <section className='contacto--contenido' aria-label="Datos de contacto">
        <div className='contacto--llamada'>
          <p className='contacto--eyebrow'>¿Tienes hambre?</p>
          <a href="tel:664368661" className='contacto--telefono' aria-label="Llamar al 664 36 86 61">
            664 36 86 61
          </a>
          <p className='contacto--lead'>
            Llama para reservar mesa, pide online para recoger o pásate por la
            Rúa Arcebispo Xelmírez, 7.
          </p>
          <div className='contacto--acciones'>
            <a href={URL_PEDIR} target="_blank" rel="noopener noreferrer" className='btn btn--primary'>
              <i className="fa-solid fa-bag-shopping"></i>
              Pedir online
            </a>
            <a href={URL_MAPA} target="_blank" rel="noopener noreferrer" className='btn btn--secondary'>
              <i className="fa-solid fa-location-dot"></i>
              Cómo llegar
            </a>
          </div>
        </div>

        <div className='contacto--columnas'>
          <aside className='contacto--ticket' aria-label="Horarios">
            <header className='ticket--cabecera'>
              <span className='ticket--marca'>LAMARTA</span>
              <span className='ticket--lema'>The BBB Power</span>
            </header>

            <div
              className={`ticket--sello ${estado.abierto ? 'ticket--sello--abierto' : ''}`}
              role="status"
            >
              <strong>{estado.abierto ? 'Abierto' : 'Cerrado'}</strong>
              <span>{detalleEstado || titularEstado}</span>
            </div>

            <h2 className='ticket--titulo'>Horarios</h2>
            <ul className='ticket--lista'>
              {HORARIOS.map((horario) => {
                const esHoy = horario.dias.includes(hoy);
                return (
                  <li key={horario.etiqueta} className={esHoy ? 'ticket--hoy' : ''}>
                    <span className='ticket--dia'>
                      {esHoy && <span className='ticket--marca-hoy'>Hoy</span>}
                      {horario.etiqueta}
                    </span>
                    <span className='ticket--horas'>
                      {horario.cerrado
                        ? <span className='ticket--cerrado'>Cerrado todo el día</span>
                        : horario.tramos.map(([inicio, fin]) => (
                            <span key={inicio}>{inicio} - {fin}</span>
                          ))}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className='ticket--aviso'>Los miércoles cerramos.</p>

            <footer className='ticket--pie'>
              Vilagarcía de Arousa
              <br />
              ¡Hasta pronto!
            </footer>
          </aside>

          <div className='contacto--visual'>
            <div className='contacto--mapa'>
              <Mapa />
            </div>
            <img loading="lazy" decoding="async" className='contacto--imagen' src="https://vilagarciavirtual.com/uploads/imagenes-negocio/lamarta_01.jpg" alt="Imagen del interior del local de LAMARTA" />
          </div>
        </div>

        <div className='contacto--redes'>
          <h2 className='contacto--subtitulo'>Escríbenos o síguenos</h2>
          <div className='contacto--redes__lista'>
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
          </div>
        </div>
      </section>
    </>
  )
}

export default Contacto
