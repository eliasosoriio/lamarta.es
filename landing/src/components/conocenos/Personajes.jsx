import React from 'react'

const TINTA = '#2b2826'

// Los personajes se dibujan "de la barra para arriba": el origen (0,0) está en la línea de la barra.

function Pelo({ estilo, color }) {
  switch (estilo) {
    case 'rizado':
      return (
        <g fill={color} stroke={TINTA} strokeWidth="2">
          {[-18, -9, 0, 9, 18].map((x) => (
            <circle key={x} cx={x} cy={-82 - Math.abs(x) * 0.15} r="9.5" />
          ))}
        </g>
      )
    case 'largo':
      return (
        <path
          d="M-25 -62 Q-28 -92 0 -92 Q28 -92 25 -62 L25 -38 Q18 -42 17 -62 Q0 -74 -17 -62 Q-18 -42 -25 -38 Z"
          fill={color}
          stroke={TINTA}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )
    case 'calvo':
      return null
    default:
      return <path d="M-24 -66 Q-26 -90 0 -90 Q26 -90 24 -66 Q12 -80 -24 -66 Z" fill={color} stroke={TINTA} strokeWidth="2" strokeLinejoin="round" />
  }
}

function Extra({ tipo }) {
  if (tipo === 'gafas') {
    return (
      <g fill="rgba(255,255,255,0.35)" stroke={TINTA} strokeWidth="2">
        <circle cx="-9" cy="-63" r="6.4" />
        <circle cx="9" cy="-63" r="6.4" />
        <path d="M-2.6 -63 H2.6" fill="none" />
      </g>
    )
  }
  if (tipo === 'gorra') {
    return (
      <g fill="#d6453d" stroke={TINTA} strokeWidth="2" strokeLinejoin="round">
        <path d="M-25 -72 Q-24 -92 0 -92 Q24 -92 25 -72 Z" />
        <path d="M-2 -72 H34 Q34 -66 24 -66 H-2 Z" />
      </g>
    )
  }
  return null
}

function Cara({ animo }) {
  return (
    <g fill={TINTA} stroke={TINTA} strokeWidth="2" strokeLinecap="round">
      <circle cx="-9" cy="-63" r="2.6" stroke="none" />
      <circle cx="9" cy="-63" r="2.6" stroke="none" />
      {animo === 'enfadado' && (
        <g fill="none">
          <path d="M-15 -71 L-5 -68" />
          <path d="M15 -71 L5 -68" />
        </g>
      )}
      <path
        d={animo === 'feliz' ? 'M-8 -52 Q0 -44 8 -52' : animo === 'enfadado' ? 'M-8 -48 Q0 -55 8 -48' : 'M-7 -50 H7'}
        fill="none"
      />
    </g>
  )
}

// Cliente: `animo` es "feliz", "normal" o "enfadado" según su paciencia.
export function Cliente({ aspecto, animo }) {
  return (
    <g className="personaje personaje--cliente">
      <path d="M-36 0 Q-36 -34 0 -34 Q36 -34 36 0 Z" fill={aspecto.camisa} stroke={TINTA} strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="-7" y="-42" width="14" height="12" fill={aspecto.piel} stroke={TINTA} strokeWidth="2" />
      <circle cx="0" cy="-62" r="24" fill={aspecto.piel} stroke={TINTA} strokeWidth="2.4" />
      <Pelo estilo={aspecto.estilo} color={aspecto.pelo} />
      <Cara animo={animo} />
      <Extra tipo={aspecto.extra} />
    </g>
  )
}

// Cocinero con la gorra amarilla de Lamarta. `animo` cambia la cara; `celebra` levanta los brazos.
export function Cocinero({ animo = 'feliz', celebra = false }) {
  return (
    <g className={`personaje personaje--cocinero ${celebra ? 'personaje--celebra' : ''}`}>
      {celebra && (
        <g fill="#f1c9a0" stroke={TINTA} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-30 -20 L-46 -58" fill="none" strokeWidth="9" stroke={TINTA} />
          <path d="M-30 -20 L-46 -58" fill="none" strokeWidth="5.6" stroke="#f1f1f1" />
          <path d="M30 -20 L46 -58" fill="none" strokeWidth="9" stroke={TINTA} />
          <path d="M30 -20 L46 -58" fill="none" strokeWidth="5.6" stroke="#f1f1f1" />
          <circle cx="-47" cy="-62" r="6" />
          <circle cx="47" cy="-62" r="6" />
        </g>
      )}
      <path d="M-38 0 Q-38 -36 0 -36 Q38 -36 38 0 Z" fill="#f1f1f1" stroke={TINTA} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M-26 0 L-22 -30 H22 L26 0 Z" fill="#3c3935" stroke={TINTA} strokeWidth="2" strokeLinejoin="round" />
      <rect x="-9" y="-18" width="18" height="10" rx="2" fill="#fece00" stroke={TINTA} strokeWidth="1.6" />
      <rect x="-7" y="-44" width="14" height="12" fill="#f1c9a0" stroke={TINTA} strokeWidth="2" />
      <circle cx="0" cy="-64" r="24" fill="#f1c9a0" stroke={TINTA} strokeWidth="2.4" />
      {/* Gorra amarilla */}
      <path d="M-26 -72 Q-24 -96 0 -96 Q24 -96 26 -72 Z" fill="#fece00" stroke={TINTA} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M-4 -74 H36 Q36 -67 26 -67 H-4 Z" fill="#fece00" stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round" />
      <text x="-6" y="-80" fontSize="14" fontFamily="'Chau Philomene One', sans-serif" fill="#2b2826" textAnchor="middle">L</text>
      <g fill={TINTA} stroke={TINTA} strokeWidth="2" strokeLinecap="round">
        <circle cx="-9" cy="-64" r="2.6" stroke="none" />
        <circle cx="9" cy="-64" r="2.6" stroke="none" />
        <path d={animo === 'feliz' ? 'M-8 -53 Q0 -45 8 -53' : 'M-7 -51 H7'} fill="none" />
      </g>
    </g>
  )
}
