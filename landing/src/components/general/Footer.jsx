import "../../styles/general/Footer.css"
import React from 'react'

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer__container">

        {/* Main Footer Content */}
        <div className="footer__main">

          {/* Brand Section */}
          <div className="footer__brand">
            <img
              src="https://lamarta.es/assets/logo-lamarta-2.svg"
              alt="Logo de Lamarta"
              className="footer__logo"
            />
            <p className="footer__tagline">
              Las mejores smash burgers de Galicia
            </p>
            <div className="footer__awards">
              <div className="footer__award">
                <i className="fas fa-trophy"></i>
                <span>1º Galicia</span>
              </div>
              <div className="footer__award">
                <i className="fas fa-medal"></i>
                <span>3º España</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer__section">
            <h3 className="footer__title">
              <i className="fas fa-address-book"></i>
              Contacto
            </h3>
            <ul className="footer__list">
              <li>
                <a href="tel:664368661" className="footer__link">
                  <i className="fas fa-phone"></i>
                  664 36 86 61
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/5bmD4zxCKLPidTUC6"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  <i className="fas fa-map-marker-alt"></i>
                  Rúa Arcebispo Xelmírez, 7<br/>
                  36600 Vilagarcía de Arousa
                </a>
              </li>
              <li>
                <a href="/contacto" className="footer__link">
                  <i className="fas fa-envelope"></i>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="footer__section">
            <h3 className="footer__title">
              <i className="fas fa-link"></i>
              Enlaces rápidos
            </h3>
            <ul className="footer__list">
              <li>
                <a href="/carta" className="footer__link">
                  <i className="fas fa-utensils"></i>
                  Nuestra Carta
                </a>
              </li>
              <li>
                <a href="/conocenos" className="footer__link">
                  <i className="fas fa-users"></i>
                  Conócenos
                </a>
              </li>
              <li>
                <a href="/club/login" className="footer__link">
                  <i className="fas fa-star"></i>
                  Acceso empleados
                </a>
              </li>
              <li>
                <a href="/blog" className="footer__link">
                  <i className="fas fa-newspaper"></i>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Hours Section */}
          <div className="footer__section">
            <h3 className="footer__title">
              <i className="fas fa-clock"></i>
              Horarios
            </h3>
            <ul className="footer__list footer__list--hours">
              <li>
                <span className="footer__day">Lunes a Jueves</span>
                <span className="footer__time">13:00 - 16:00<br/>20:00 - 23:00</span>
              </li>
              <li>
                <span className="footer__day">Viernes</span>
                <span className="footer__time">13:00 - 16:00<br/>20:00 - 00:00</span>
              </li>
              <li>
                <span className="footer__day">Sábado</span>
                <span className="footer__time">13:00 - 16:00<br/>20:00 - 01:00</span>
              </li>
              <li>
                <span className="footer__day">Domingo</span>
                <span className="footer__time">20:00 - 00:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__legal">
            <a href="/avisolegal">Aviso Legal</a>
            <a href="/privacidad">Privacidad</a>
            <a href="/cookies">Cookies</a>
            <a href="/accesibilidad">Accesibilidad</a>
          </div>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Lamarta. Todos los derechos reservados.
          </p>
          <div className="footer__social">
            <a href="https://www.instagram.com/lamarta.es/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@LAMARTABBB" target="_blank" rel="noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

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
              <img src="/logo-idae.png" alt="IDAE" className="footer__subvencion-logo footer__subvencion-logo--idae" />
            </div>
            <div className="footer__subvencion-logo-card">
              <img src="/ministerio-transicion-ecologica.jpg" alt="Ministerio para la Transición Ecológica y el Reto Demográfico" className="footer__subvencion-logo footer__subvencion-logo--ministerio" />
            </div>
            <div className="footer__subvencion-logo-card footer__subvencion-logo-card--moves">
              <img src="/moves-III.jpg" alt="MOVES Movilidad Eficiente y Sostenible" className="footer__subvencion-logo footer__subvencion-logo--moves" />
            </div>
            <div className="footer__subvencion-logo-card">
              <img src="/inega.jpeg" alt="Instituto Enerxético de Galicia" className="footer__subvencion-logo footer__subvencion-logo--inega" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
