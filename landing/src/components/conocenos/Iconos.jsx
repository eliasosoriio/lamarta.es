import React from 'react'

const TINTA = '#2b2826'

// Botella de salsa de un color y con su tapón.
function botella(cuerpo, tapon, etiqueta) {
  return (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M16 7 H24 V13 Q30 16 30 24 V32 Q30 35 27 35 H13 Q10 35 10 32 V24 Q10 16 16 13 Z" fill={cuerpo} />
      <rect x="15" y="3" width="10" height="5" rx="1.5" fill={tapon} />
      <circle cx="20" cy="25" r="4" fill={etiqueta} stroke="none" />
    </g>
  )
}

// Iconos planos de los botones de la cocina (lienzo de 40 x 40).
const ICONOS = {
  pan: (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M7 22 Q7 8 20 8 Q33 8 33 22 Z" fill="#e3a244" />
      <rect x="7" y="25" width="26" height="7" rx="3" fill="#d58b30" />
      <path d="M12 16 Q15 12 20 12" fill="none" stroke="#fbe2a6" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  ),
  carne: (
    <g stroke={TINTA} strokeWidth="2.2">
      <circle cx="20" cy="21" r="12" fill="#b3382d" />
      <circle cx="15" cy="17" r="2" fill="#e9b4a4" stroke="none" />
      <circle cx="24" cy="24" r="1.8" fill="#e9b4a4" stroke="none" />
      <circle cx="22" cy="15" r="1.6" fill="#7a1c15" stroke="none" />
    </g>
  ),
  cebolla: (
    <g fill="none" stroke={TINTA} strokeWidth="2.2">
      <ellipse cx="20" cy="21" rx="13" ry="11" fill="#f2e8cf" />
      <ellipse cx="20" cy="21" rx="7" ry="5.6" fill="#e6d8b4" />
    </g>
  ),
  bacon: (
    <g fill="none" strokeLinecap="round">
      <path d="M6 14 q 7 -6 14 0 t 14 0" stroke={TINTA} strokeWidth="8" />
      <path d="M6 14 q 7 -6 14 0 t 14 0" stroke="#c4452f" strokeWidth="5" />
      <path d="M6 27 q 7 -6 14 0 t 14 0" stroke={TINTA} strokeWidth="8" />
      <path d="M6 27 q 7 -6 14 0 t 14 0" stroke="#c4452f" strokeWidth="5" />
    </g>
  ),
  pepinillos: (
    <g stroke={TINTA} strokeWidth="2.2">
      <ellipse cx="14" cy="17" rx="8" ry="8" fill="#7a9a2a" />
      <ellipse cx="26" cy="25" rx="8" ry="8" fill="#8fb034" />
      <circle cx="14" cy="17" r="3" fill="none" stroke="#c4d86a" strokeWidth="1.6" />
      <circle cx="26" cy="25" r="3" fill="none" stroke="#c4d86a" strokeWidth="1.6" />
    </g>
  ),
  cheddar: (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M6 28 L34 28 L34 18 L6 12 Z" fill="#fece00" />
      <circle cx="14" cy="22" r="2.2" fill="#e0a800" />
      <circle cx="25" cy="23" r="1.8" fill="#e0a800" />
    </g>
  ),
  camembert: (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M6 27 Q6 12 20 10 Q34 12 34 27 Z" fill="#f7efd3" />
      <path d="M6 27 H34" fill="none" />
      <path d="M14 22 Q20 16 26 22" fill="none" stroke="#e6d9a8" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  aros: (
    <g stroke={TINTA} strokeWidth="2.2" fill="#e0a23a">
      <ellipse cx="14" cy="16" rx="8" ry="6" />
      <ellipse cx="14" cy="16" rx="3.4" ry="2.4" fill="#fbe0a6" />
      <ellipse cx="26" cy="26" rx="9" ry="6.6" />
      <ellipse cx="26" cy="26" rx="4" ry="2.6" fill="#fbe0a6" />
    </g>
  ),
  lechuga: (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M6 24 Q4 10 14 10 Q18 6 24 10 Q36 10 34 24 Q30 32 20 30 Q10 32 6 24 Z" fill="#5fa83a" />
      <path d="M14 24 Q20 16 28 22" fill="none" stroke="#a6d680" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  tomate: (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round">
      <circle cx="20" cy="22" r="13" fill="#d6453d" />
      <path d="M20 22 V11 M20 22 L29 27 M20 22 L11 27" fill="none" stroke="#f08a80" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 9 Q20 5 26 9 Q20 12 14 9 Z" fill="#5fa83a" />
    </g>
  ),
  ketchup: botella('#d2301f', '#f1f1f1', '#fbd2cc'),
  mostaza: botella('#e3b100', '#6e4a10', '#fff0a8'),
  mayonesa: botella('#f6f2e3', '#d6453d', '#ffffff'),
  bbq: botella('#6a3414', '#2b2826', '#c98a4e'),
  salsabacon: botella('#b5532a', '#2b2826', '#f0b690'),
  lamarta: botella('#e08a2e', '#fece00', '#fbd9a6'),
  campana: (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M7 28 Q7 12 20 12 Q33 12 33 28 Z" fill="#fece00" />
      <path d="M4 30 H36" fill="none" />
      <circle cx="20" cy="9" r="2.4" fill="#fece00" />
    </g>
  ),
  basura: (
    <g stroke={TINTA} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" fill="none">
      <path d="M9 12 H31" />
      <path d="M16 12 V8 H24 V12" />
      <path d="M11 12 L13 33 H27 L29 12 Z" fill="#9a968f" />
      <path d="M18 17 V28 M22 17 V28" />
    </g>
  ),
  pausa: (
    <g fill={TINTA}>
      <rect x="11" y="9" width="6" height="22" rx="2" />
      <rect x="23" y="9" width="6" height="22" rx="2" />
    </g>
  ),
  menu: (
    <g stroke={TINTA} strokeWidth="3.4" strokeLinecap="round">
      <path d="M9 12 H31 M9 20 H31 M9 28 H31" />
    </g>
  ),
}

function Icono({ nombre, tam = 40, className = '' }) {
  return (
    <svg className={`icono ${className}`} width={tam} height={tam} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      {ICONOS[nombre]}
    </svg>
  )
}

export default Icono
