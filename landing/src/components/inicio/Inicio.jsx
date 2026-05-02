import "../../styles/inicio/Inicio.css";
import React from 'react'
import Servicio from "./Servicio";
import { Link } from "react-router-dom";
import ScrollArriba from "../general/ScrollArriba";

function Inicio() {
  return (
    <>
      <ScrollArriba />
      
      {/* Hero Section - Redesigned */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">THE BEST<br />BURGER BAR</h1>
            <p className="hero__subtitle">
              Las mejores hamburguesas de Vilagarcía de Arousa.<br />
              Disfruta en nuestro local, recoge tu pedido o te lo llevamos a casa.
            </p>
            <div className="hero__actions">
              <a
                href="https://r.qamarero.com/lamarta?mode=PICKUP"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__btn hero__btn--primary"
              >
                <i className="fa-solid fa-bag-shopping"></i>
                PEDIR AHORA
              </a>
              <Link to="/carta" className="hero__btn hero__btn--secondary">
                <i className="fa-solid fa-utensils"></i>
                VER CARTA
              </Link>
            </div>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-icon">
                <i className="fa-solid fa-trophy"></i>
              </span>
              <div className="hero__stat-content">
                <span className="hero__stat-number">1º GALICIA</span>
                <span className="hero__stat-label">Burger Combat 2023</span>
              </div>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-icon">
                <i className="fa-solid fa-medal"></i>
              </span>
              <div className="hero__stat-content">
                <span className="hero__stat-number">3º ESPAÑA</span>
                <span className="hero__stat-label">Burger Combat Nacional</span>
              </div>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-icon">
                <i className="fa-solid fa-star"></i>
              </span>
              <div className="hero__stat-content">
                <span className="hero__stat-number">4.5/5</span>
                <span className="hero__stat-label">Valoración en Google</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section className="services">
        <div className="services__container">
          <div className="services__header">
            <span className="services__badge">TU ELIGES</span>
            <h2 className="services__title">¿Cómo prefieres disfrutar?</h2>
            <p className="services__description">
              Elige la opción que más te convenga. Estamos aquí para hacerte la vida más fácil.
            </p>
          </div>
          
          <div className="services__grid">
            <div className="service-box">
              <div className="service-box__number">01</div>
              <div className="service-box__icon-wrapper">
                <div className="service-box__icon">
                  <i className="fa-solid fa-utensils"></i>
                </div>
              </div>
              <h3 className="service-box__title">En el local</h3>
              <p className="service-box__description">
                Reserva tu mesa y disfruta de la experiencia completa en nuestro restaurante con el mejor ambiente.
              </p>
              <div className="service-box__info">
                <i className="fa-solid fa-phone"></i>
                <span>664 36 86 61</span>
              </div>
              <a href="tel:664368661" className="service-box__btn">
                Llamar ahora
                <i className="fa-solid fa-phone"></i>
              </a>
            </div>

            <div className="service-box service-box--featured">
              <div className="service-box__badge">MÁS POPULAR</div>
              <div className="service-box__number">02</div>
              <div className="service-box__icon-wrapper">
                <div className="service-box__icon">
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>
              </div>
              <h3 className="service-box__title">Para recoger</h3>
              <p className="service-box__description">
                Pide online o por teléfono y recoge tu pedido cuando quieras. Rápido, fácil y sin esperas.
              </p>
              <div className="service-box__info">
                <i className="fa-solid fa-clock"></i>
                <span>Te enviamos un SMS cuando esté listo</span>
              </div>
              <a 
                href="https://r.qamarero.com/lamarta?mode=PICKUP"
                target="_blank"
                rel="noopener noreferrer"
                className="service-box__btn"
              >
                Pedir ahora
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-box">
              <div className="service-box__number">03</div>
              <div className="service-box__icon-wrapper">
                <div className="service-box__icon">
                  <i className="fa-solid fa-motorcycle"></i>
                </div>
              </div>
              <h3 className="service-box__title">A domicilio</h3>
              <p className="service-box__description">
                Reparto a domicilio en Vilagarcía. Relájate en casa mientras nosotros te lo llevamos caliente.
              </p>
              <div className="service-box__info">
                <i className="fa-solid fa-location-dot"></i>
                <span>Solo Vilagarcía y cercanías</span>
              </div>
              <a 
                href="https://r.qamarero.com/lamarta?mode=DELIVERY"
                target="_blank"
                rel="noopener noreferrer"
                className="service-box__btn"
              >
                Pedir delivery
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Redesigned Gallery */}
      <section className="gallery">
        <div className="gallery__container">
          <div className="gallery__header">
            <span className="gallery__badge">BEST SELLERS</span>
            <h2 className="gallery__title">Lo más pedido</h2>
            <p className="gallery__description">
              Descubre nuestros productos estrella que conquistan a todos nuestros clientes
            </p>
          </div>
          
          <div className="gallery__grid">
            <div className="gallery-item gallery-item--hero">
              <div className="gallery-item__image">
                <img 
                  src="https://lamarta.es/assets/2x12.png" 
                  alt="Menú 2x12" 
                  loading="lazy"
                />
              </div>
              <div className="gallery-item__overlay">
                <span className="gallery-item__tag">OFERTA ESPECIAL</span>
                <h3 className="gallery-item__title">Menú 2x12€</h3>
                <p className="gallery-item__text">2 Hamburguesas + 2 Bebidas por solo 12€</p>
                <Link to="/carta" className="gallery-item__btn">
                  Ver en carta <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="gallery-item">
              <div className="gallery-item__image">
                <img 
                  src="https://lamarta.es/assets/tequenos.jpg" 
                  alt="Tequeños" 
                  loading="lazy"
                />
              </div>
              <div className="gallery-item__overlay">
                <h3 className="gallery-item__title">Tequeños</h3>
                <p className="gallery-item__text">Crujientes por fuera, cremosos por dentro</p>
                <Link to="/carta" className="gallery-item__btn">
                  Ver en carta <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="gallery-item">
              <div className="gallery-item__image">
                <img 
                  src="https://lamarta.es/assets/alitas.png" 
                  alt="Alitas BBQ" 
                  loading="lazy"
                />
              </div>
              <div className="gallery-item__overlay">
                <h3 className="gallery-item__title">Alitas BBQ</h3>
                <p className="gallery-item__text">Con nuestra salsa barbacoa casera</p>
                <Link to="/carta" className="gallery-item__btn">
                  Ver en carta <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="gallery-item">
              <div className="gallery-item__image">
                <img 
                  src="https://lamarta.es/assets/gouda.png" 
                  alt="Gouda Rings" 
                  loading="lazy"
                />
              </div>
              <div className="gallery-item__overlay">
                <h3 className="gallery-item__title">Gouda Rings</h3>
                <p className="gallery-item__text">Anillos de queso gouda empanados</p>
                <Link to="/carta" className="gallery-item__btn">
                  Ver en carta <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="gallery__cta">
            <Link to="/carta" className="gallery__cta-btn">
              <i className="fa-solid fa-utensils"></i>
              Ver carta completa
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Inicio
