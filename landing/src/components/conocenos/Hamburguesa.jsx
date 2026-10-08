import React from 'react'
import { ALTURA_CAPA } from './motor/datos'

const TINTA = '#2b2826'

// Capas de la burger, dibujadas de abajo arriba en un lienzo de 120 x 128.
function PanBajo({ y }) {
  return (
    <g>
      <path d={`M14 ${y} H106 V${y + 9} Q106 ${y + 14} 98 ${y + 14} H22 Q14 ${y + 14} 14 ${y + 9} Z`} fill="#e3a244" stroke={TINTA} strokeWidth="2" strokeLinejoin="round" />
      <path d={`M20 ${y + 4} H100`} stroke="#f6cf86" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  )
}

function Carne({ y, carne }) {
  const oscura = carne.calidad === 'pasada'
  return (
    <g>
      <rect x="12" y={y} width="96" height="11" rx="5" fill={oscura ? '#43220f' : '#6b3a1a'} stroke={TINTA} strokeWidth="2" />
      <path d={`M20 ${y + 3.5} H100`} stroke={oscura ? '#6a3a1c' : '#9a5a2c'} strokeWidth="2" strokeLinecap="round" />
      {carne.cebolla && (
        <g fill="none" stroke="#e8b455" strokeWidth="2" strokeLinecap="round">
          <path d={`M26 ${y + 8} q 4 -3 8 0`} />
          <path d={`M50 ${y + 7} q 5 3 10 0`} />
          <path d={`M74 ${y + 8} q 4 -3 9 0`} />
          <path d={`M92 ${y + 7} q 3 3 7 0`} />
        </g>
      )}
    </g>
  )
}

// Lonchas de queso con las puntas colgando.
function Queso({ y, color, borde = TINTA }) {
  return (
    <path
      d={`M10 ${y} H110 V${y + 3} Q107 ${y + 9} 103 ${y + 3} H88 Q84 ${y + 10} 80 ${y + 3} H22 Q18 ${y + 6} 10 ${y + 3} Z`}
      fill={color}
      stroke={borde}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  )
}

function Bacon({ y }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={`M10 ${y + 2.5} q 8 -5 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0`} stroke={TINTA} strokeWidth="6.4" />
      <path d={`M10 ${y + 2.5} q 8 -5 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0`} stroke="#c4452f" strokeWidth="4" />
    </g>
  )
}

function Pepinillos({ y }) {
  return (
    <g fill="#7a9a2a" stroke={TINTA} strokeWidth="1.8">
      <ellipse cx="32" cy={y + 3} rx="14" ry="3.6" />
      <ellipse cx="60" cy={y + 3} rx="14" ry="3.6" />
      <ellipse cx="88" cy={y + 3} rx="14" ry="3.6" />
    </g>
  )
}

function Lechuga({ y }) {
  return (
    <g>
      <path d={`M10 ${y + 5} q 7 -9 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0`} fill="none" stroke={TINTA} strokeWidth="9" strokeLinecap="round" />
      <path d={`M10 ${y + 5} q 7 -9 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0`} fill="none" stroke="#5fa83a" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Tomate({ y }) {
  return (
    <g fill="#d6453d" stroke={TINTA} strokeWidth="1.8">
      <ellipse cx="34" cy={y + 3} rx="17" ry="3.4" />
      <ellipse cx="72" cy={y + 3} rx="17" ry="3.4" />
      <path d={`M24 ${y + 2.4} H44 M62 ${y + 2.4} H82`} stroke="#f08a80" strokeWidth="1.4" fill="none" />
    </g>
  )
}

// Aros de cebolla rebozados y fritos.
function Aros({ y }) {
  return (
    <g fill="#e0a23a" stroke={TINTA} strokeWidth="1.8">
      {[26, 52, 78].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={y + 3.5} rx="13" ry="4" />
          <ellipse cx={x} cy={y + 3.5} rx="6.5" ry="1.8" fill="#fbe0a6" />
        </g>
      ))}
    </g>
  )
}

// Salsa en zigzag. Cada una con su color.
function Salsa({ y, color }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={`M16 ${y + 2} q 9 -5 18 0 t 18 0 t 18 0 t 18 0`} stroke={TINTA} strokeWidth="5.2" />
      <path d={`M16 ${y + 2} q 9 -5 18 0 t 18 0 t 18 0 t 18 0`} stroke={color} strokeWidth="3" />
    </g>
  )
}

function Tapa({ y }) {
  return (
    <g>
      <path d={`M12 ${y + 26} Q12 ${y} 60 ${y} Q108 ${y} 108 ${y + 26} Q108 ${y + 30} 100 ${y + 30} H20 Q12 ${y + 30} 12 ${y + 26} Z`} fill="#e3a244" stroke={TINTA} strokeWidth="2" strokeLinejoin="round" />
      <path d={`M26 ${y + 14} Q34 ${y + 6} 50 ${y + 5}`} fill="none" stroke="#fbe2a6" strokeWidth="3.4" strokeLinecap="round" />
    </g>
  )
}

const DIBUJOS = {
  cheddar: (y) => <Queso y={y} color="#fece00" />,
  camembert: (y) => <Queso y={y} color="#f7efd3" />,
  bacon: (y) => <Bacon y={y} />,
  pepinillos: (y) => <Pepinillos y={y} />,
  lechuga: (y) => <Lechuga y={y} />,
  tomate: (y) => <Tomate y={y} />,
  aros: (y) => <Aros y={y} />,
  ketchup: (y) => <Salsa y={y} color="#d2301f" />,
  mostaza: (y) => <Salsa y={y} color="#e3b100" />,
  mayonesa: (y) => <Salsa y={y} color="#f6f2e3" />,
  bbq: (y) => <Salsa y={y} color="#6a3414" />,
  salsabacon: (y) => <Salsa y={y} color="#b5532a" />,
  lamarta: (y) => <Salsa y={y} color="#e08a2e" />,
}

// Burger completa o a medio montar. `plato`: { pan, capas, tapa }.
function Hamburguesa({ plato, className = '', etiqueta = 'Burger' }) {
  const dibujo = []
  let y = 122

  if (plato.pan) {
    y -= 14
    dibujo.push(<PanBajo key="pan" y={y} />)
  }
  plato.capas.forEach((capa, i) => {
    if (capa.k === 'carne') {
      y -= 11
      dibujo.push(<Carne key={`carne-${i}`} y={y} carne={capa} />)
    } else {
      y -= ALTURA_CAPA[capa.id]
      dibujo.push(<g key={`${capa.id}-${i}`}>{DIBUJOS[capa.id](y)}</g>)
    }
  })
  if (plato.tapa) {
    y -= 26
    dibujo.push(<Tapa key="tapa" y={y} />)
  }

  return (
    <svg className={`hamburguesa ${className}`} viewBox="0 0 120 128" role="img" aria-label={etiqueta}>
      {dibujo}
    </svg>
  )
}

export default Hamburguesa
