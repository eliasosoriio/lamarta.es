import "../../styles/historia/Historia.css";
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import HeaderSeccion from "../general/HeaderSeccion";
import ScrollArriba from "../general/ScrollArriba";

// Hitos verificados en prensa. Del más reciente al más antiguo.
const HITOS = [
  {
    fecha: "Abril 2025",
    icono: "fa-trophy",
    destacado: true,
    titulo: "Tercera mejor hamburguesa de España",
    texto:
      "José Jamardo sube al podio del Burger Combat 2025, disputado en el Salón Gourmets de Madrid, con la \"Onion Belly\". Ya se puede probar en el local.",
    fuente: "Diario de Arousa",
    enlace:
      "https://diariodearousa.elidealgallego.com/articulo/vilagarcia/tercera-mejor-hamburguesa-espana-esta-vilagarcia-5247559",
  },
  {
    fecha: "Marzo 2025",
    icono: "fa-medal",
    titulo: "Rumbo al Burger Combat nacional",
    texto:
      "Como campeones gallegos, Lamarta es una de las seis cocinas de toda España que compiten en el Salón Gourmets por el título de mejor chef de hamburguesas gourmet.",
    fuente: "Diario de Pontevedra",
    enlace:
      "https://www.diariodepontevedra.es/articulo/vilagarcia-arousa/restaurante-vilagarcia-aspirante-mejor-chef-hamburguesas-espana/202503101920261380660.html",
  },
  {
    fecha: "Octubre 2024",
    icono: "fa-award",
    titulo: "A la final de \"Con L de Lugo\"",
    texto:
      "De diez cocinas en semifinales, nuestra Onion Ring (brioche, crema de Camembert, cheddar, cebolla, pepinillos y salsa Lamarta) se mete entre las cinco finalistas del concurso de Adislugo y Europastry.",
    fuente: "Diario de Pontevedra",
    enlace:
      "https://www.diariodepontevedra.es/articulo/vilagarcia-arousa/hamburguesas-finalistas-lugo-chimichurri-whisky/202410241156221357017.html",
  },
  {
    fecha: "2024",
    icono: "fa-crown",
    destacado: true,
    titulo: "Campeones de Galicia",
    texto:
      "Con la Onion Ring, de rubia gallega, camembert, cheddar, pepinillos propios y salsa Lamarta, ganamos el campeonato gallego de hamburguesas en Vigo: cinco burgers en solo veinte minutos y apenas unos meses de vida.",
    fuente: "La Voz de Galicia",
    enlace:
      "https://www.lavozdegalicia.es/noticia/arousa/vilagarcia-de-arousa/2025/03/12/mejor-hamburguesa-galicia-prepara-lamarta-vilagarcia/0003_202503A12C4992.htm",
  },
  {
    fecha: "4 de enero de 2024",
    icono: "fa-utensils",
    titulo: "Abrimos en Vilagarcía",
    texto:
      "Lamarta abre sus puertas en la Rúa Arzobispo Gelmírez con una idea clara: calidad y accesibilidad, sin renunciar al sabor.",
  },
];

function Historia() {
  const reducirMovimiento = useReducedMotion();

  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre="Nuestra historia" />

      <section className="historia" aria-label="Hitos de Lamarta">
        <p className="historia__intro">
          Del primer día a los concursos nacionales. Esto es lo que hemos
          cocinado hasta ahora.
        </p>

        <ol className="historia__lista">
          {HITOS.map((hito) => (
            <motion.li
              key={hito.fecha}
              className={`historia__hito${hito.destacado ? " historia__hito--destacado" : ""}`}
              initial={reducirMovimiento ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <span className="historia__punto" aria-hidden="true">
                <i className={`fa-solid ${hito.icono}`}></i>
              </span>
              <article className="historia__tarjeta">
                <time className="historia__fecha">{hito.fecha}</time>
                <h2 className="historia__titulo">{hito.titulo}</h2>
                <p>{hito.texto}</p>
                {hito.enlace && (
                  <a
                    className="historia__enlace"
                    href={hito.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer en {hito.fuente}
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                )}
              </article>
            </motion.li>
          ))}
        </ol>

        <div className="historia__cta">
          <p>¿Te apetece probarlo?</p>
          <Link to="/carta" className="btn btn--primary">
            <i className="fa-solid fa-utensils"></i>
            VER CARTA
          </Link>
        </div>
      </section>
    </>
  );
}

export default Historia;
