import "../../styles/general/Header.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
   const location = useLocation();

   const isActive = (path) => {
      return location.pathname === path ? 'active' : '';
   };

   return (
        <header className="header">
            <div className="header__container">
                <Link className="header__logo" to="/" aria-label="Ir a la página de inicio">
                    <img
                        src="https://lamarta.es/assets/logo-lamarta-2.svg"
                        alt="Logo de Lamarta"
                        width="120"
                        decoding="async"
                    />
                </Link>

                <nav className="header__nav" aria-label="Menú de navegación principal">
                    <Link className={`header__link ${isActive('/')}`} to="/">
                       Inicio
                    </Link>
                    <Link className={`header__link ${isActive('/carta')}`} to="/carta">
                       Carta
                    </Link>
                    <Link className={`header__link ${isActive('/conocenos')}`} to="/conocenos">
                       ¡Aplástala tú!
                    </Link>
                    <Link className={`header__link ${isActive('/historia')}`} to="/historia">
                       Historia
                    </Link>
                    <Link className={`header__link ${isActive('/contacto')}`} to="/contacto">
                       Contacto
                    </Link>
                </nav>

                {location.pathname !== '/conocenos' && (
                    <Link className="header__juego" to="/conocenos" aria-label="Jugar a ¡Aplástala tú!, el juego de Lamarta">
                        <i className="fa-solid fa-gamepad" aria-hidden="true"></i>
                        <span className="header__juego-texto" aria-hidden="true">Juega ya</span>
                        <span className="header__juego-punto" aria-hidden="true"></span>
                    </Link>
                )}

                <a
                    className="btn btn--primary btn--sm header__cta"
                    href="https://r.qamarero.com/lamarta?mode=PICKUP"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Realizar un pedido"
                >
                    PEDIR AHORA
                </a>
            </div>
        </header>
   );
}

export default Header;
