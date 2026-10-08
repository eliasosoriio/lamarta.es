import '../../styles/conocenos/Juego.css'
import React, { useEffect, useState } from 'react'
import Cocina from './Cocina'
import Escena from './Escena'
import Icono from './Iconos'
import Pantallas from './Pantallas'
import useJuego from './motor/useJuego'
import { DIAS, VIDAS } from './motor/datos'
import { FASE, pista } from './motor/reglas'

function formatearTiempo(segundos) {
  const total = Math.max(0, Math.ceil(segundos))
  const minutos = Math.floor(total / 60)
  const resto = String(total % 60).padStart(2, '0')
  return `${minutos}:${resto}`
}

// Abre el menú de navegación del sitio (el botón flotante está oculto durante el juego).
function abrirMenuDelSitio() {
  document.querySelector('.movil--boton')?.click()
}

function Hud({ estado, despachar }) {
  const dia = DIAS[estado.dia]
  const enJuego = estado.fase === FASE.JUGANDO || estado.fase === FASE.PAUSA
  return (
    <header className="arcade__hud">
      <button type="button" className="arcade__hud-boton arcade__hud-menu" onClick={() => { despachar({ tipo: 'pausa' }); abrirMenuDelSitio() }} aria-label="Abrir el menú de la web">
        <Icono nombre="menu" tam={26} />
      </button>

      <div className="arcade__datos" aria-live="off">
        <span className="arcade__dato arcade__dato--dia">Día {estado.dia + 1}</span>
        <span className="arcade__dato arcade__dato--tiempo">{formatearTiempo(estado.tiempo)}</span>
        <span className="arcade__dato arcade__dato--dinero">
          {estado.dinero}
          <small>/{dia.objetivo} €</small>
        </span>
        <span className="arcade__vidas" role="img" aria-label={`Vidas: ${estado.vidas} de ${VIDAS}`}>
          {Array.from({ length: VIDAS }, (_, i) => (
            <i key={i} className={`fa-solid fa-heart ${i < estado.vidas ? '' : 'arcade__vida--perdida'}`} aria-hidden="true"></i>
          ))}
        </span>
      </div>

      <button
        type="button"
        className="arcade__hud-boton"
        onClick={() => despachar({ tipo: 'pausa' })}
        disabled={!enJuego || estado.fase === FASE.PAUSA}
        aria-label="Pausar el juego"
      >
        <Icono nombre="pausa" tam={26} />
      </button>
    </header>
  )
}

function Juego() {
  const [estado, despacharBase] = useJuego()

  // Pequeña vibración al tocar (donde el dispositivo la soporte).
  const despachar = (accion) => {
    if (accion.tipo !== 'tick') navigator.vibrate?.(8)
    despacharBase(accion)
  }

  // Sacudida breve de la mesa cada vez que se aplasta una bola.
  const [temblando, setTemblando] = useState(false)
  useEffect(() => {
    if (!estado.temblor) return undefined
    setTemblando(true)
    const id = setTimeout(() => setTemblando(false), 260)
    return () => clearTimeout(id)
  }, [estado.temblor])

  const jugando = estado.fase === FASE.JUGANDO
  const mensaje = estado.aviso ? estado.aviso.texto : jugando ? pista(estado) : ''
  const tipoMensaje = estado.aviso ? estado.aviso.tipo : 'pista'

  return (
    <section className="juego arcade" aria-label="Juego: la barra de Lamarta">
      <Hud estado={estado} despachar={despachar} />

      <div className={`arcade__mesa ${jugando ? '' : 'arcade__mesa--parada'} ${temblando ? 'arcade__mesa--temblor' : ''}`}>
        <Escena estado={estado} />
        <p className={`arcade__pista arcade__pista--${tipoMensaje}`} role="status">
          {mensaje}
        </p>
        <Cocina estado={estado} despachar={despachar} />
      </div>

      <Pantallas estado={estado} despachar={despachar} />
    </section>
  )
}

export default Juego
