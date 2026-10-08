import "../../styles/general/Menu.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { estadoActual } from "../../utils/horarios";

const ENLACES = [
  { to: "/", texto: "Inicio", nota: "La barra de smash burgers" },
  { to: "/carta", texto: "Carta", nota: "Burgers, entrantes y más" },
  { to: "/conocenos", texto: "¡Aplástala tú!", nota: "Juega en la barra de Lamarta" },
  { to: "/historia", texto: "Historia", nota: "Premios y hitos" },
  { to: "/contacto", texto: "Contacto", nota: "Horarios, mapa y teléfono" },
];

function Menu() {
  const [abierto, setAbierto] = useState(false);
  const [estado, setEstado] = useState(() => estadoActual());
  const panelRef = useRef(null);
  const location = useLocation();

  // Se cierra al cambiar de página.
  useEffect(() => {
    setAbierto(false);
  }, [location.pathname]);

  // Mientras está abierto: sin scroll de fondo, cierre con Escape, estado al día y foco en el primer enlace.
  useEffect(() => {
    if (!abierto) return undefined;

    setEstado(estadoActual());
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alPulsarTecla = (evento) => {
      if (evento.key === "Escape") setAbierto(false);
    };
    document.addEventListener("keydown", alPulsarTecla);
    panelRef.current?.querySelector("a")?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", alPulsarTecla);
    };
  }, [abierto]);

  return (
    <nav className="movil" aria-label="Menú móvil">
      <button
        type="button"
        className={`movil--boton ${abierto ? "movil--boton--abierto" : ""}`}
        aria-expanded={abierto}
        aria-controls="movil-panel"
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setAbierto((valor) => !valor)}
      >
        <span className="movil--linea"></span>
        <span className="movil--linea"></span>
        <span className="movil--linea"></span>
      </button>

      <div
        id="movil-panel"
        ref={panelRef}
        className={`movil--panel ${abierto ? "movil--panel--abierto" : ""}`}
        inert={!abierto}
      >
        <div className="movil--contenido">
          <header className="movil--cabecera">
            <img
              src="https://lamarta.es/assets/logo-lamarta-2.svg"
              alt="Lamarta"
              className="movil--logo"
              decoding="async"
            />
            <p className="movil--lema">The BBB Power</p>
          </header>

          <ul className="movil--enlaces">
            {ENLACES.map((enlace, i) => (
              <li key={enlace.to} style={{ "--i": i }}>
                <Link
                  to={enlace.to}
                  className={`movil--enlace ${location.pathname === enlace.to ? "movil--enlace--activo" : ""}`}
                  aria-current={location.pathname === enlace.to ? "page" : undefined}
                >
                  <span className="movil--texto">{enlace.texto}</span>
                  <span className="movil--nota">{enlace.nota}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="movil--accion" style={{ "--i": ENLACES.length }}>
            <a
              className="btn btn--primary btn--block"
              href="https://r.qamarero.com/lamarta?mode=PICKUP"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-bag-shopping"></i>
              Pedir online
            </a>
          </div>

          <footer className="movil--pie" style={{ "--i": ENLACES.length + 1 }}>
            <p className={`movil--estado ${estado.abierto ? "movil--estado--abierto" : ""}`} role="status">
              <span className="movil--estado__punto" aria-hidden="true"></span>
              {estado.texto}
            </p>
            <a href="tel:664368661" className="movil--telefono">664 36 86 61</a>
            <a
              href="https://maps.app.goo.gl/5bmD4zxCKLPidTUC6"
              target="_blank"
              rel="noopener noreferrer"
              className="movil--direccion"
            >
              Rúa Arcebispo Xelmírez, 7 · Vilagarcía de Arousa
            </a>
            <div className="movil--redes">
              <a href="https://www.instagram.com/lamarta_bbb/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Lamarta">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@LAMARTABBB" target="_blank" rel="noopener noreferrer" aria-label="YouTube de Lamarta">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
