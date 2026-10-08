import React from 'react'
import Hamburguesa from './Hamburguesa'
import { Cliente, Cocinero } from './Personajes'
import { EXTRAS, platoDeReceta } from './motor/datos'

const POSICIONES = [
  { x: 112, escala: 1, opacidad: 1 },
  { x: 56, escala: 0.8, opacidad: 0.92 },
  { x: 14, escala: 0.62, opacidad: 0.8 },
]

function animoDe(cliente) {
  const ratio = cliente.paciencia / cliente.max
  if (ratio > 0.6) return 'feliz'
  if (ratio > 0.3) return 'normal'
  return 'enfadado'
}

function colorPaciencia(ratio) {
  if (ratio > 0.6) return '#4caf50'
  if (ratio > 0.3) return '#fece00'
  return '#e5483c'
}

// Comanda del cliente que está en la barra: nombre, vista previa y paciencia.
function Comanda({ cliente }) {
  const { receta } = cliente
  const ratio = Math.max(0, cliente.paciencia / cliente.max)
  const vistaPrevia = platoDeReceta(receta)

  return (
    <aside className={`arcade__comanda ${receta.extras.length >= 4 ? 'arcade__comanda--larga' : ''}`} aria-label={`Pedido: ${receta.nombre}`}>
      <p className="arcade__comanda-titulo">Comanda</p>
      <div className="arcade__comanda-cuerpo">
        <Hamburguesa plato={vistaPrevia} className="arcade__comanda-burger" etiqueta={`Vista previa de ${receta.nombre}`} />
        <div className="arcade__comanda-texto">
          <strong>{receta.nombre}</strong>
          <em className="arcade__comanda-carne">{receta.carne}</em>
          <ul>
            {receta.oklahoma && <li className="arcade__comanda-cebolla">Cebolla estilo Oklahoma</li>}
            {receta.extras.map((extra, i) => (
              <li key={`${extra}-${i}`}>{EXTRAS[extra].nombre}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="arcade__comanda-frase">“{cliente.frase}”</p>
      <div className="arcade__paciencia" role="img" aria-label={`Paciencia del cliente: ${Math.round(ratio * 100)}%`}>
        <span style={{ width: `${ratio * 100}%`, background: colorPaciencia(ratio) }}></span>
      </div>
    </aside>
  )
}

function Escena({ estado }) {
  const { cola, flotantes } = estado
  const visibles = cola.slice(0, 3)
  const celebra = flotantes.some((f) => f.tipo === 'bien' && f.ttl > 0.8)
  const frente = cola[0]

  return (
    <div className="arcade__escena">
      <svg className="arcade__lienzo" viewBox="0 0 360 250" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="arc-pared" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2f2c29" />
            <stop offset="1" stopColor="#1c1a18" />
          </linearGradient>
          <linearGradient id="arc-barra" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a5a2c" />
            <stop offset="0.12" stopColor="#6e4520" />
            <stop offset="1" stopColor="#3f2711" />
          </linearGradient>
          <filter id="arc-neon" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="brillo" />
            <feMerge>
              <feMergeNode in="brillo" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pared del local */}
        <rect x="-300" y="-300" width="960" height="550" fill="url(#arc-pared)" />
        <g stroke="#ffffff" strokeOpacity="0.045" strokeWidth="1.4">
          {[-120, -80, -40, 0, 40, 80, 120, 160].map((y) => (
            <path key={y} d={`M-300 ${y} H660`} />
          ))}
          {[-210, -150, -90, -30, 30, 90, 150, 210, 270, 330, 390, 450, 510, 570].map((x) => (
            <path key={x} d={`M${x} -300 V185`} />
          ))}
        </g>

        {/* Cartel de neón */}
        <g filter="url(#arc-neon)">
          <rect x="22" y="16" width="156" height="50" rx="10" fill="none" stroke="#fece00" strokeWidth="2.4" />
          <text x="100" y="47" textAnchor="middle" fontSize="27" fontFamily="'Chau Philomene One', sans-serif" fill="#fece00" letterSpacing="2">LAMARTA</text>
          <text x="100" y="61" textAnchor="middle" fontSize="8.4" fontFamily="'Chau Philomene One', sans-serif" fill="#fff3b0" letterSpacing="3">THE BBB POWER</text>
        </g>

        {/* Suelo */}
        <rect x="-300" y="186" width="960" height="12" fill="#151312" />

        {/* Clientes: el primero está en la barra y el resto hace cola detrás */}
        {[...visibles].reverse().map((cliente, indiceInverso) => {
          const posicion = POSICIONES[visibles.length - 1 - indiceInverso]
          const ratio = Math.max(0, cliente.paciencia / cliente.max)
          return (
            <g
              key={cliente.id}
              className="arcade__cliente"
              transform={`translate(${posicion.x} 192) scale(${posicion.escala})`}
              opacity={posicion.opacidad}
              style={{ transformBox: 'view-box', transformOrigin: '0 0' }}
            >
              <Cliente aspecto={cliente.aspecto} animo={animoDe(cliente)} />
              <g transform="translate(-20 -112)">
                <rect width="40" height="6" rx="3" fill="#000" opacity="0.55" />
                <rect width={40 * ratio} height="6" rx="3" fill={colorPaciencia(ratio)} />
              </g>
            </g>
          )
        })}
        {cola.length > 3 && (
          <g transform="translate(14 120)">
            <circle r="11" fill="#fece00" stroke="#2b2826" strokeWidth="2" />
            <text y="4.2" textAnchor="middle" fontSize="11" fontFamily="'Chau Philomene One', sans-serif" fill="#2b2826">+{cola.length - 3}</text>
          </g>
        )}

        {/* Cocinero detrás de la barra */}
        <g transform="translate(296 196) scale(0.98)" style={{ transformBox: 'view-box', transformOrigin: '0 0' }}>
          <Cocinero animo={estado.vidas > 1 ? 'feliz' : 'normal'} celebra={celebra} />
        </g>

        {/* Barra de madera */}
        <rect x="-300" y="192" width="960" height="120" fill="url(#arc-barra)" />
        <rect x="-300" y="192" width="960" height="6" fill="#b07a3f" />
        <path d="M-300 198 H660" stroke="#2b2826" strokeOpacity="0.5" strokeWidth="2" />
      </svg>

      {frente && <Comanda cliente={frente} />}

      <div className="arcade__flotantes" aria-hidden="true">
        {flotantes.map((flotante) => (
          <span key={flotante.id} className={`arcade__flotante arcade__flotante--${flotante.tipo}`}>
            {flotante.texto}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Escena
