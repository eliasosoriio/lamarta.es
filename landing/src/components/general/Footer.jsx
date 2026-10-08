import "../../styles/general/Footer.css"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HORARIOS, diaActual, estadoActual } from '../../utils/horarios'

function Footer() {
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

  return (
    <footer className='footer'>
      <div className="footer__container">

        <div className="pie">

          {/* Marca */}
          <section className="pie__marca" aria-label="Lamarta">
            <img
              src="https://lamarta.es/assets/logo-lamarta-2.svg"
              alt="Logo de Lamarta"
              className="pie__logo"
              loading="lazy"
              decoding="async"
            />
            <p className="pie__lema">Las mejores smash burgers de Galicia</p>
            <ul className="pie__premios" aria-label="Premios">
              <li><i className="fa-solid fa-trophy" aria-hidden="true"></i> 1º Galicia</li>
              <li><i className="fa-solid fa-medal" aria-hidden="true"></i> 3º España</li>
            </ul>
            <a
              href="https://r.qamarero.com/lamarta?mode=PICKUP"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary pie__pedir"
            >
              <i className="fa-solid fa-bag-shopping" aria-hidden="true"></i>
              Pedir online
            </a>
          </section>

          {/* Explora */}
          <nav className="pie__columna" aria-label="Enlaces del sitio">
            <h3 className="pie__titulo">Explora</h3>
            <ul className="pie__lista">
              <li><Link to="/" className="pie__enlace">Inicio</Link></li>
              <li><Link to="/carta" className="pie__enlace">Carta</Link></li>
              <li><Link to="/conocenos" className="pie__enlace">¡Aplástala tú!</Link></li>
              <li><Link to="/historia" className="pie__enlace">Historia</Link></li>
              <li><Link to="/contacto" className="pie__enlace">Contacto</Link></li>
            </ul>
          </nav>

          {/* Visítanos */}
          <section className="pie__columna" aria-label="Cómo encontrarnos">
            <h3 className="pie__titulo">Visítanos</h3>
            <p className={`pie__estado ${estado.abierto ? 'pie__estado--abierto' : ''}`} role="status">
              <span className="pie__estado-punto" aria-hidden="true"></span>
              {estado.texto}
            </p>
            <a href="tel:664368661" className="pie__telefono">664 36 86 61</a>
            <a
              href="https://maps.app.goo.gl/5bmD4zxCKLPidTUC6"
              target="_blank"
              rel="noopener noreferrer"
              className="pie__enlace pie__direccion"
            >
              Rúa Arcebispo Xelmírez, 7<br />
              36600 Vilagarcía de Arousa
            </a>
          </section>

          {/* Horarios */}
          <section className="pie__columna" aria-label="Horarios">
            <h3 className="pie__titulo">Horarios</h3>
            <ul className="pie__horarios">
              {HORARIOS.map((horario) => (
                <li key={horario.etiqueta} className={horario.dias.includes(hoy) ? 'pie__hoy' : ''}>
                  <span className="pie__dia">{horario.etiqueta}</span>
                  <span className="pie__horas">
                    {horario.cerrado
                      ? <span className="pie__cerrado">Cerrado</span>
                      : horario.tramos.map(([inicio, fin]) => (
                          <span key={inicio}>{inicio} - {fin}</span>
                        ))}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Base: legal, copyright y redes */}
        <div className="pie__base">
          <ul className="pie__legal">
            <li><Link to="/avisolegal">Aviso Legal</Link></li>
            <li><Link to="/privacidad">Privacidad</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
            <li><Link to="/accesibilidad">Accesibilidad</Link></li>
            <li><Link to="/club/login">Acceso empleados</Link></li>
          </ul>
          <p className="pie__copy">
            &copy; {new Date().getFullYear()} Lamarta. Todos los derechos reservados.
          </p>
          <div className="pie__redes">
            <a href="https://www.instagram.com/lamarta_bbb/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Lamarta">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@LAMARTABBB" target="_blank" rel="noopener noreferrer" aria-label="YouTube de Lamarta">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Rótulo: la palabra, recortada, apoyada en el bloque inferior */}
        <p className="pie__rotulo" aria-hidden="true">LAMARTA</p>

        <div className="footer__subvencion" aria-labelledby="footer-subvencion-title">
          <div className="footer__subvencion-copy">
            <span className="footer__subvencion-kicker">Impulso institucional</span>
            <h3 id="footer-subvencion-title" className="footer__subvencion-title">
              Proyecto acogido al programa de Movilidad Eficiente y Sostenible MOVES III para el año 2025
            </h3>
            <p className="footer__subvencion-hashtag">#MOVESIII2025</p>
            <div className="footer__subvencion-meta">
              <p><strong>Beneficiario:</strong> Grupo Lamarta SL</p>
              <p><strong>Inversión:</strong> 4680€</p>
              <p><strong>Ayuda:</strong> 750€</p>
              <p><strong>Real Decreto-Ley 3/2025</strong></p>
            </div>
          </div>

          <div className="footer__subvencion-logos" aria-label="Organismos colaboradores">
            <div className="footer__subvencion-logo-card footer__subvencion-logo-card--dark">
              <img loading="lazy" decoding="async" src="/logo-idae.png" alt="IDAE" className="footer__subvencion-logo footer__subvencion-logo--idae" />
            </div>
            <div className="footer__subvencion-logo-card">
              <img loading="lazy" decoding="async" src="/ministerio-transicion-ecologica.jpg" alt="Ministerio para la Transición Ecológica y el Reto Demográfico" className="footer__subvencion-logo footer__subvencion-logo--ministerio" />
            </div>
            <div className="footer__subvencion-logo-card footer__subvencion-logo-card--moves">
              <img loading="lazy" decoding="async" src="/moves-III.jpg" alt="MOVES Movilidad Eficiente y Sostenible" className="footer__subvencion-logo footer__subvencion-logo--moves" />
            </div>
            <div className="footer__subvencion-logo-card">
              <img loading="lazy" decoding="async" src="/inega.jpeg" alt="Instituto Enerxético de Galicia" className="footer__subvencion-logo footer__subvencion-logo--inega" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
