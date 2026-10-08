import React from 'react'
import Hamburguesa from './Hamburguesa'
import Icono from './Iconos'
import { BOTONES, COCCION, DIAS, EXTRAS } from './motor/datos'
import { carnesDe, estadoCarne } from './motor/reglas'

const CIRCUNFERENCIA = 2 * Math.PI * 44
const COLOR_CARNE = { cruda: '#c0574c', lista: '#8a5224', pasada: '#5a3315', quemada: '#1d1410' }
const TEXTO_FASE = { cruda: 'Cruda…', lista: '¡Recoger!', pasada: '¡Ya!', quemada: 'Tirar' }

// Un hueco de la plancha: bola → aplastar → cocinar → recoger.
function Hueco({ slot, indice, despachar }) {
  const cocinando = slot.estado === 'cocinando'
  const fase = cocinando ? estadoCarne(slot.t) : null
  const progreso = cocinando ? Math.min(1, slot.t / COCCION.quemada) : 0

  const accion = () => {
    if (slot.estado === 'bola') despachar({ tipo: 'aplastar', indice })
    else if (cocinando) despachar({ tipo: fase === 'quemada' ? 'tirarSlot' : 'recoger', indice })
  }

  const texto = slot.estado === 'libre' ? 'Libre' : slot.estado === 'bola' ? '¡Aplasta!' : TEXTO_FASE[fase]
  const inicioZona = (COCCION.lista / COCCION.quemada) * CIRCUNFERENCIA
  const largoZona = ((COCCION.perfecta - COCCION.lista) / COCCION.quemada) * CIRCUNFERENCIA

  return (
    <button
      type="button"
      className={`arcade__hueco arcade__hueco--${slot.estado} ${fase ? `arcade__hueco--${fase}` : ''}`}
      onClick={accion}
      disabled={slot.estado === 'libre'}
      aria-label={`Hueco ${indice + 1} de la plancha: ${texto}`}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        {slot.estado === 'libre' && <circle cx="50" cy="50" r="30" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" strokeDasharray="6 6" />}

        {slot.estado === 'bola' && (
          <g>
            <circle cx="50" cy="52" r="24" fill="#b3382d" stroke="#2b2826" strokeWidth="3" />
            <circle cx="42" cy="44" r="3" fill="#e9b4a4" />
            <circle cx="58" cy="58" r="2.6" fill="#e9b4a4" />
            <circle cx="56" cy="42" r="2.2" fill="#7a1c15" />
            {slot.cebolla && (
              <g fill="none" stroke="#f2e8cf" strokeWidth="3" strokeLinecap="round">
                <path d="M32 46 Q40 32 52 36" />
                <path d="M46 34 Q60 28 68 42" />
                <path d="M62 36 Q72 44 66 56" />
              </g>
            )}
          </g>
        )}

        {cocinando && (
          <g>
            <circle cx="50" cy="50" r="44" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="7" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#4caf50"
              strokeOpacity="0.55"
              strokeWidth="7"
              strokeDasharray={`${largoZona} ${CIRCUNFERENCIA}`}
              strokeDashoffset={-inicioZona}
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#fece00"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${progreso * CIRCUNFERENCIA} ${CIRCUNFERENCIA}`}
              transform="rotate(-90 50 50)"
            />
            <ellipse cx="50" cy="52" rx="30" ry="24" fill={COLOR_CARNE[fase]} stroke="#2b2826" strokeWidth="3" />
            <path d="M32 46 Q42 40 52 42" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
            {slot.cebolla && (
              <g fill="none" stroke={fase === 'cruda' ? '#f2e8cf' : '#d9a03d'} strokeWidth="2.6" strokeLinecap="round">
                <path d="M30 52 Q38 44 46 50" />
                <path d="M52 56 Q62 48 70 56" />
                <path d="M40 60 Q50 66 60 62" />
              </g>
            )}
          </g>
        )}
      </svg>
      {(fase === 'pasada' || fase === 'quemada') && (
        <span className="arcade__humo" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
      )}
      <span className="arcade__hueco-texto">{texto}</span>
    </button>
  )
}

function Cocina({ estado, despachar }) {
  const dia = DIAS[estado.dia]
  const { plancha, plato } = estado
  const vacio = !plato.pan

  const pulsar = (boton) => {
    if (boton === 'pan' || boton === 'carne' || boton === 'cebolla') despachar({ tipo: boton })
    else despachar({ tipo: 'extra', id: boton })
  }

  const hayCarne = carnesDe(plato).length > 0
  const etiquetaDe = (id) => {
    if (id === 'pan') return plato.pan && hayCarne && !plato.tapa ? 'Tapar' : BOTONES.pan.nombre
    return BOTONES[id] ? BOTONES[id].nombre : EXTRAS[id].etiqueta
  }

  return (
    <div className="arcade__cocina">
      <div className="arcade__estaciones">
        <div className="arcade__plancha" aria-label="Plancha">
          <Hueco slot={plancha[0]} indice={0} despachar={despachar} />
          <Hueco slot={plancha[1]} indice={1} despachar={despachar} />
        </div>

        <div className="arcade__servicio">
          <div className="arcade__plato">
            <span className="arcade__plato-base" aria-hidden="true"></span>
            <Hamburguesa plato={plato} className="arcade__plato-burger" etiqueta="Burger en el plato" />
            {vacio && <span className="arcade__plato-vacio">Plato vacío</span>}
          </div>
          <div className="arcade__acciones">
            <button type="button" className="arcade__servir" onClick={() => despachar({ tipo: 'servir' })} disabled={!plato.tapa}>
              <Icono nombre="campana" tam={26} />
              Servir
            </button>
            <button type="button" className="arcade__tirar" onClick={() => despachar({ tipo: 'tirarPlato' })} disabled={vacio} aria-label="Tirar el plato">
              <Icono nombre="basura" tam={26} />
            </button>
          </div>
        </div>
      </div>

      <div className={`arcade__botones ${dia.botones.length > 12 ? 'arcade__botones--compacto' : ''}`} role="group" aria-label="Ingredientes">
        {dia.botones.map((id) => (
          <button key={id} type="button" className={`arcade__boton arcade__boton--${id}`} onClick={() => pulsar(id)}>
            <Icono nombre={id} tam={dia.botones.length > 12 ? 28 : 34} />
            <span>{etiquetaDe(id)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Cocina
