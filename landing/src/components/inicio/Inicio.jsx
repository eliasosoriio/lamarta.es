import "../../styles/inicio/Inicio.css";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ScrollArriba from "../general/ScrollArriba";
import { estadoActual } from "../../utils/horarios";
import heroOnionRing from "../../assets/img/home/hero-onion-ring.webp";
import menu2x12 from "../../assets/img/home/menu-2x12.webp";
import tequenos from "../../assets/img/home/tequenos.webp";
import alitas from "../../assets/img/home/alitas.webp";
import gouda from "../../assets/img/home/gouda.webp";

const URL_RECOGER = "https://r.qamarero.com/lamarta?mode=PICKUP";
const URL_DOMICILIO = "https://r.qamarero.com/lamarta?mode=DELIVERY";

const LOGROS = [
  { icono: "fa-trophy", titulo: "1º Galicia", detalle: "Burger Combat 2024" },
  { icono: "fa-medal", titulo: "3º España", detalle: "Burger Combat Nacional 2025" },
  { icono: "fa-star", titulo: "4.5/5", detalle: "Valoración en Google" },
];

const FORMAS = [
  {
    icono: "fa-utensils",
    titulo: "En el local",
    texto: "Reserva tu mesa y disfruta de la experiencia completa en nuestro restaurante con el mejor ambiente.",
    nota: "664 36 86 61 · Los miércoles cerramos",
    accion: "Llamar ahora",
    enlace: "tel:664368661",
  },
  {
    icono: "fa-bag-shopping",
    titulo: "Para recoger",
    texto: "Pide online o por teléfono y recoge tu pedido cuando quieras. Rápido, fácil y sin esperas.",
    nota: "Te enviamos un SMS cuando esté listo",
    accion: "Pedir ahora",
    enlace: URL_RECOGER,
    popular: true,
  },
  {
    icono: "fa-motorcycle",
    titulo: "A domicilio",
    texto: "Reparto a domicilio en Vilagarcía. Relájate en casa mientras nosotros te lo llevamos caliente.",
    nota: "Solo Vilagarcía y cercanías",
    accion: "Pedir a domicilio",
    enlace: URL_DOMICILIO,
  },
];

const DESTACADOS = [
  {
    imagen: menu2x12,
    alt: "Menú 2x12",
    ancho: 1000,
    etiqueta: "Oferta especial",
    titulo: "Menú 2x12€",
    texto: "2 hamburguesas + 2 bebidas por solo 12€",
    grande: true,
  },
  { imagen: tequenos, alt: "Tequeños", titulo: "Tequeños", texto: "Crujientes por fuera, cremosos por dentro" },
  { imagen: alitas, alt: "Alitas BBQ", titulo: "Alitas BBQ", texto: "Con nuestra salsa barbacoa casera" },
  { imagen: gouda, alt: "Gouda Rings", titulo: "Gouda Rings", texto: "Anillos de queso gouda empanados" },
];

function Inicio() {
  const [estado, setEstado] = useState(() => estadoActual());
  const [elegida, setElegida] = useState(1);

  // Flechas del teclado para moverse entre las opciones.
  const moverEleccion = (evento, indice) => {
    const salto = { ArrowRight: 1, ArrowLeft: -1 }[evento.key];
    if (!salto) return;
    evento.preventDefault();
    const siguiente = (indice + salto + FORMAS.length) % FORMAS.length;
    setElegida(siguiente);
    document.getElementById(`forma-tab-${siguiente}`)?.focus();
  };

  // El estado "abierto ahora" se refresca cada minuto.
  useEffect(() => {
    const intervalo = setInterval(() => setEstado(estadoActual()), 60 * 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <ScrollArriba />

      {/* Portada */}
      <section className="portada">
        <div className="portada__texto">
          <p className={`portada__estado ${estado.abierto ? 'portada__estado--abierto' : ''}`} role="status">
            <span className="portada__estado-punto" aria-hidden="true"></span>
            {estado.texto}
          </p>
          <h1 className="portada__titulo">THE BEST<br />BURGER BAR</h1>
          <p className="portada__subtitulo">
            Las mejores hamburguesas de Vilagarcía de Arousa.<br />
            Disfruta en nuestro local, recoge tu pedido o te lo llevamos a casa.
          </p>
          <div className="portada__acciones">
            <a href={URL_RECOGER} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <i className="fa-solid fa-bag-shopping"></i>
              PEDIR AHORA
            </a>
            <Link to="/carta" className="btn btn--secondary">
              <i className="fa-solid fa-utensils"></i>
              VER CARTA
            </Link>
          </div>
        </div>

        <figure className="portada__foto">
          <img
            src={heroOnionRing}
            alt="Onion Ring, la smash burger campeona de Galicia"
            width="1000"
            height="1000"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className="portada__pie">Onion Ring</figcaption>

          {/* Sello de premios */}
          <svg className="portada__sello" viewBox="0 0 200 200" role="img" aria-label="Campeones de Galicia 2024 y tercera mejor hamburguesa de España 2025">
            <defs>
              <path id="sello-circulo" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
            </defs>
            <circle cx="100" cy="100" r="98" fill="#fece00" />
            <circle cx="100" cy="100" r="92" fill="none" stroke="#3c3935" strokeWidth="2" strokeDasharray="3 4" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#3c3935" strokeWidth="2" />
            <text className="portada__sello-texto" fill="#3c3935">
              <textPath href="#sello-circulo" textLength="432" lengthAdjust="spacing">
                CAMPEONES DE GALICIA 2024 · 3ª DE ESPAÑA 2025 ·
              </textPath>
            </text>
            <text className="portada__sello-centro" x="100" y="118" textAnchor="middle" fill="#3c3935">★</text>
          </svg>
        </figure>
      </section>

      {/* Logros */}
      <section className="logros" aria-label="Premios y valoración">
        <ul className="logros__lista">
          {LOGROS.map((logro) => (
            <li key={logro.titulo} className="logros__item">
              <i className={`fa-solid ${logro.icono}`} aria-hidden="true"></i>
              <span className="logros__titulo">{logro.titulo}</span>
              <span className="logros__detalle">{logro.detalle}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Formas de disfrutar */}
      <section className="formas" aria-labelledby="formas-titulo">
        <header className="formas__cabecera">
          <p className="etiqueta">Tú eliges</p>
          <h2 id="formas-titulo" className="formas__titulo">¿Cómo prefieres disfrutar?</h2>
        </header>

        <div className="eleccion" role="tablist" aria-label="Cómo prefieres disfrutar">
          {FORMAS.map((forma, i) => (
            <button
              key={forma.titulo}
              type="button"
              role="tab"
              id={`forma-tab-${i}`}
              aria-selected={elegida === i}
              aria-controls="forma-panel"
              tabIndex={elegida === i ? 0 : -1}
              className={`eleccion__opcion ${elegida === i ? 'eleccion__opcion--activa' : ''}`}
              onClick={() => setElegida(i)}
              onKeyDown={(evento) => moverEleccion(evento, i)}
            >
              {forma.popular && <span className="eleccion__sello">Más popular</span>}
              <i className={`fa-solid ${forma.icono}`} aria-hidden="true"></i>
              <span className="eleccion__nombre">{forma.titulo}</span>
            </button>
          ))}
        </div>

        <div
          id="forma-panel"
          role="tabpanel"
          aria-labelledby={`forma-tab-${elegida}`}
          className="eleccion__panel"
          style={{ "--sel": elegida }}
          key={elegida}
        >
          <div className="eleccion__texto">
            <h3>{FORMAS[elegida].titulo}</h3>
            <p>{FORMAS[elegida].texto}</p>
            <p className="eleccion__nota">{FORMAS[elegida].nota}</p>
          </div>
          <a
            href={FORMAS[elegida].enlace}
            className="btn btn--primary eleccion__accion"
            {...(FORMAS[elegida].enlace.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {FORMAS[elegida].accion}
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </section>

      {/* Lo más pedido */}
      <section className="destacados" aria-labelledby="destacados-titulo">
        <header className="formas__cabecera">
          <p className="etiqueta">Best sellers</p>
          <h2 id="destacados-titulo" className="formas__titulo">Lo más pedido</h2>
          <p className="destacados__descripcion">
            Los productos estrella que conquistan a todos nuestros clientes.
          </p>
        </header>

        <ul className="destacados__lista">
          {DESTACADOS.map((destacado) => (
            <li key={destacado.titulo} className={`destacado ${destacado.grande ? 'destacado--grande' : ''}`}>
              <Link to="/carta" className="destacado__enlace" aria-label={`${destacado.titulo}: ver en la carta`}>
                <figure className="destacado__foto">
                  <img
                    src={destacado.imagen}
                    alt={destacado.alt}
                    width={destacado.ancho || 800}
                    height={Math.round((destacado.ancho || 800) * 4219 / 3375)}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="destacado__texto">
                  {destacado.etiqueta && <span className="destacado__etiqueta">{destacado.etiqueta}</span>}
                  <h3>{destacado.titulo}</h3>
                  <p>{destacado.texto}</p>
                  <span className="destacado__ver">
                    Ver en carta <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="destacados__cta">
          <Link to="/carta" className="btn btn--primary">
            <i className="fa-solid fa-utensils"></i>
            VER CARTA COMPLETA
          </Link>
        </div>
      </section>
    </>
  )
}

export default Inicio
