import "../../styles/general/Menu.css";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menu() {
  const [estadoMenu, setEstadoMenu] = useState(false);
  const location = useLocation();

  const cambiarMenu = () => {
    setEstadoMenu((estadoMenu) => !estadoMenu);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="desplegable d-flex-col" aria-label="Menú desplegable móvil">
      <input
        id="menu"
        type="checkbox"
        className="d-none"
        checked={estadoMenu}
        onChange={cambiarMenu}
      />

      <label
        htmlFor="menu"
        className="desplegable--boton"
        aria-label={estadoMenu ? "Cerrar menú" : "Abrir menú"}
      >
        <span className={`hamburger ${estadoMenu ? 'active' : ''}`}>
          <span className="hamburger--line"></span>
          <span className="hamburger--line"></span>
          <span className="hamburger--line"></span>
        </span>
      </label>

      <div className={`desplegable--overlay ${estadoMenu ? 'active' : ''}`}>
        <div className="desplegable--contenido">
          <ul className="desplegable--opciones">
            <li>
              <Link
                className={`desplegable--link ${isActive('/')}`}
                onClick={cambiarMenu}
                to="/"
              >
                <i className="fa-solid fa-house"></i>
                <span>Inicio</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </Link>
            </li>
            <li>
              <Link
                className={`desplegable--link ${isActive('/blog')}`}
                onClick={cambiarMenu}
                to="/blog"
              >
                <i className="fa-solid fa-newspaper"></i>
                <span>Blog</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </Link>
            </li>
            <li>
              <Link
                className={`desplegable--link ${isActive('/conocenos')}`}
                onClick={cambiarMenu}
                to="/conocenos"
              >
                <i className="fa-solid fa-award"></i>
                <span>Conócenos</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </Link>
            </li>
            <li>
              <Link
                className={`desplegable--link ${isActive('/carta')}`}
                onClick={cambiarMenu}
                to="/carta"
              >
                <i className="fa-solid fa-utensils"></i>
                <span>Carta</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </Link>
            </li>
            <li>
              <Link
                className={`desplegable--link ${isActive('/contacto')}`}
                onClick={cambiarMenu}
                to="/contacto"
              >
                <i className="fa-solid fa-envelope"></i>
                <span>Contacto</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </Link>
            </li>
            <li>
              <a
                className="desplegable--link desplegable--link--cta"
                onClick={cambiarMenu}
                href="https://r.qamarero.com/lamarta?mode=PICKUP"
                aria-label="Realizar un pedido para recoger"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-bag-shopping"></i>
                <span>Pedir Online</span>
                <i className="fa-solid fa-external-link-alt arrow"></i>
              </a>
            </li>
          </ul>

          <div className="desplegable--footer">
            <div className="desplegable--social">
              <a href="tel:664368661" aria-label="Llamar" className="social-btn">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="https://maps.app.goo.gl/5bmD4zxCKLPidTUC6"
                 target="_blank"
                 rel="noreferrer"
                 aria-label="Ubicación"
                 className="social-btn">
                <i className="fa-solid fa-location-dot"></i>
              </a>
            </div>
            <p className="desplegable--copyright">© 2025 Lamarta</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
