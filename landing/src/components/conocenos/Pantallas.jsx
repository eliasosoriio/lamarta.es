import React from 'react'
import { Link } from 'react-router-dom'
import Hamburguesa from './Hamburguesa'
import { Cocinero } from './Personajes'
import { DIAS, platoDeReceta, RECETAS } from './motor/datos'
import { estrellasDelDia, FASE } from './motor/reglas'

function Estrellas({ cantidad }) {
  return (
    <p className="arcade__estrellas" role="img" aria-label={`${cantidad} de 3 estrellas`}>
      {[1, 2, 3].map((n) => (
        <i key={n} className={`fa-solid fa-star ${n <= cantidad ? 'arcade__estrella--activa' : ''}`} aria-hidden="true"></i>
      ))}
    </p>
  )
}

function Cocinera() {
  return (
    <svg className="arcade__mascota" viewBox="-60 -110 120 130" aria-hidden="true" focusable="false">
      <Cocinero animo="feliz" celebra />
    </svg>
  )
}

function Panel({ children, etiquetaAria }) {
  return (
    <div className="arcade__pantalla" role="dialog" aria-modal="true" aria-label={etiquetaAria}>
      <div className="arcade__tarjeta">{children}</div>
    </div>
  )
}

function Menu({ despachar }) {
  return (
    <Panel etiquetaAria="¡Aplástala tú!, el juego de Lamarta">
      <Cocinera />
      <p className="conocenos--eyebrow">El juego de Lamarta</p>
      <h2 className="arcade__titulo">¡Aplástala tú!</h2>
      <p className="arcade__texto">
        Aplástala, cocínala y sírvela. Atiende a los clientes de la barra y monta cada burger. Tres días, tres hitos de Lamarta.
      </p>
      <ol className="arcade__pasos">
        <li>Pon el <strong>pan</strong> y una <strong>bola de carne</strong> en la plancha.</li>
        <li>Toca la bola para <strong>aplastarla</strong> y recógela cuando el anillo esté en verde.</li>
        <li>Añade lo que pide la <strong>comanda</strong>, tapa y <strong>sirve</strong>.</li>
      </ol>
      <button type="button" className="btn btn--primary" onClick={() => despachar({ tipo: 'empezar' })}>
        <i className="fa-solid fa-play" aria-hidden="true"></i>
        ¡A la plancha!
      </button>
    </Panel>
  )
}

function Historia({ estado, despachar }) {
  const dia = DIAS[estado.dia]
  return (
    <Panel etiquetaAria={`Día ${estado.dia + 1}: ${dia.titulo}`}>
      <p className="conocenos--eyebrow">Día {estado.dia + 1} · {dia.etiqueta}</p>
      <h2 className="arcade__titulo">{dia.titulo}</h2>
      <p className="arcade__texto">{dia.texto}</p>
      <ul className="arcade__recetas" aria-label="Recetas de hoy">
        {dia.recetas.map((id) => {
          const receta = RECETAS[id]
          return (
            <li key={id}>
              <Hamburguesa plato={platoDeReceta(receta)} etiqueta={receta.nombre} />
              <span>{receta.nombre}</span>
            </li>
          )
        })}
      </ul>
      <p className="arcade__objetivo">Objetivo del día: <strong>{dia.objetivo} €</strong></p>
      <button type="button" className="btn btn--primary" onClick={() => despachar({ tipo: 'jugarDia' })}>
        <i className="fa-solid fa-utensils" aria-hidden="true"></i>
        ¡A cocinar!
      </button>
    </Panel>
  )
}

function FinDia({ estado, despachar }) {
  const dia = DIAS[estado.dia]
  const ultimo = estado.dia === DIAS.length - 1
  return (
    <Panel etiquetaAria="Día superado">
      <p className="conocenos--eyebrow">Día {estado.dia + 1} superado</p>
      <h2 className="arcade__titulo">¡Buen turno!</h2>
      <Estrellas cantidad={estrellasDelDia(estado.dinero, dia.objetivo)} />
      <p className="arcade__texto">
        Has ganado <strong>{estado.dinero} €</strong> (objetivo: {dia.objetivo} €). Servidos: {estado.servidos}. Clientes perdidos: {estado.perdidos}.
      </p>
      <button type="button" className="btn btn--primary" onClick={() => despachar({ tipo: 'siguienteDia' })}>
        {ultimo ? 'Ver resultado' : 'Siguiente día'}
        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>
    </Panel>
  )
}

function Perdido({ estado, despachar }) {
  const dia = DIAS[estado.dia]
  const motivo =
    estado.motivo === 'vidas'
      ? 'Se han ido demasiados clientes sin comer.'
      : `Te han faltado ${Math.max(0, dia.objetivo - estado.dinero)} € para el objetivo del día.`
  return (
    <Panel etiquetaAria="Turno terminado">
      <p className="conocenos--eyebrow">Día {estado.dia + 1}</p>
      <h2 className="arcade__titulo">Se acabó el turno</h2>
      <p className="arcade__texto">{motivo} Con un poco de práctica sale: la carne en su punto vale propina.</p>
      <div className="arcade__botonera">
        <button type="button" className="btn btn--primary" onClick={() => despachar({ tipo: 'reintentar' })}>
          <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
          Reintentar
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => despachar({ tipo: 'reiniciar' })}>
          Inicio
        </button>
      </div>
    </Panel>
  )
}

function Pausa({ despachar }) {
  return (
    <Panel etiquetaAria="Juego en pausa">
      <h2 className="arcade__titulo">Pausa</h2>
      <div className="arcade__botonera">
        <button type="button" className="btn btn--primary" onClick={() => despachar({ tipo: 'reanudar' })}>
          <i className="fa-solid fa-play" aria-hidden="true"></i>
          Seguir
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => despachar({ tipo: 'reiniciar' })}>
          Salir
        </button>
      </div>
    </Panel>
  )
}

function Final({ estado, despachar }) {
  const total = estado.acumulado
  const rango = total >= 340 ? 'Campeón de Galicia' : total >= 250 ? 'Smasher de la barra' : 'Aprendiz de Lamarta'
  return (
    <Panel etiquetaAria="Resultado final">
      <Cocinera />
      <p className="conocenos--eyebrow">Tres días en la barra</p>
      <h2 className="arcade__titulo">{rango}</h2>
      <p className="arcade__texto">
        Has facturado <strong>{total} €</strong>. Así trabajamos en Lamarta, en Vilagarcía de Arousa: smash burgers de ternera o de
        vaca y buey, pan brioche artesanal y ganas de ganar. Ven a probar las de verdad.
      </p>
      <div className="arcade__botonera">
        <Link to="/carta" className="btn btn--primary">
          <i className="fa-solid fa-utensils" aria-hidden="true"></i>
          Ver la carta
        </Link>
        <Link to="/contacto" className="btn btn--secondary">
          <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
          Cómo llegar
        </Link>
        <button type="button" className="btn btn--secondary" onClick={() => despachar({ tipo: 'reiniciar' })}>
          <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
          Jugar otra vez
        </button>
      </div>
      <p className="arcade__enlace-hitos">
        <Link to="/historia">Ver los hitos de Lamarta</Link>
      </p>
    </Panel>
  )
}

function Pantallas({ estado, despachar }) {
  switch (estado.fase) {
    case FASE.MENU:
      return <Menu despachar={despachar} />
    case FASE.HISTORIA:
      return <Historia estado={estado} despachar={despachar} />
    case FASE.FIN_DIA:
      return <FinDia estado={estado} despachar={despachar} />
    case FASE.PERDIDO:
      return <Perdido estado={estado} despachar={despachar} />
    case FASE.PAUSA:
      return <Pausa despachar={despachar} />
    case FASE.FINAL:
      return <Final estado={estado} despachar={despachar} />
    default:
      return null
  }
}

export default Pantallas
