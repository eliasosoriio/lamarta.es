import { ASPECTOS, COCCION, DIAS, EXTRAS, FRASES_GENERALES, MAX_CARNES, MAX_COLA, MAX_EXTRAS, RECETAS, VIDAS } from './datos'

export const FASE = {
  MENU: 'menu',
  HISTORIA: 'historia',
  JUGANDO: 'jugando',
  PAUSA: 'pausa',
  FIN_DIA: 'fin-dia',
  PERDIDO: 'perdido',
  FINAL: 'final',
}

// El plato guarda las capas en el orden en que se ponen: { k: 'carne', calidad, cebolla } o { k: 'extra', id }.
export const PLATO_VACIO = { pan: false, capas: [], tapa: false }

export const carnesDe = (plato) => plato.capas.filter((c) => c.k === 'carne')
export const extrasDe = (plato) => plato.capas.filter((c) => c.k === 'extra').map((c) => c.id)
const SLOT_LIBRE = { estado: 'libre', cebolla: false, t: 0 }
let contador = 0
const nuevoId = () => {
  contador += 1
  return contador
}

export function estadoInicial() {
  return {
    fase: FASE.MENU,
    dia: 0,
    acumulado: 0,
    ...estadoDelDia(0),
  }
}

// Estado de una jornada recién empezada.
function estadoDelDia(indiceDia) {
  const dia = DIAS[indiceDia]
  return {
    tiempo: dia.duracion,
    dinero: 0,
    vidas: VIDAS,
    servidos: 0,
    perdidos: 0,
    racha: 0,
    cola: [],
    espera: 0.6,
    plancha: [SLOT_LIBRE, SLOT_LIBRE],
    plato: PLATO_VACIO,
    aviso: null,
    flotantes: [],
    temblor: 0,
  }
}

// ---------- Utilidades de la carne ----------

export function estadoCarne(t) {
  if (t >= COCCION.quemada) return 'quemada'
  if (t >= COCCION.perfecta) return 'pasada'
  if (t >= COCCION.lista) return 'lista'
  return 'cruda'
}

function avisar(estado, texto, tipo = 'info') {
  return { ...estado, aviso: { id: nuevoId(), texto, tipo, ttl: 2.2 } }
}

function flotar(estado, texto, tipo = 'bien') {
  return { ...estado, flotantes: [...estado.flotantes, { id: nuevoId(), texto, tipo, ttl: 1.4 }] }
}

// ---------- Clientes ----------

function crearCliente(estado) {
  const dia = DIAS[estado.dia]
  const receta = RECETAS[dia.recetas[Math.floor(Math.random() * dia.recetas.length)]]
  const frases = [...receta.frases, ...FRASES_GENERALES]
  return {
    id: nuevoId(),
    aspecto: ASPECTOS[Math.floor(Math.random() * ASPECTOS.length)],
    receta,
    frase: frases[Math.floor(Math.random() * frases.length)],
    paciencia: dia.paciencia,
    max: dia.paciencia,
  }
}

// ---------- Pedido ----------

export function evaluarPlato(plato, receta) {
  const carnes = carnesDe(plato)
  if (!plato.pan) return { ok: false, motivo: 'Falta el pan.' }
  if (carnes.length === 0) return { ok: false, motivo: 'Falta la carne.' }
  if (!plato.tapa) return { ok: false, motivo: 'Cierra la burger con el pan.' }
  if (carnes.length !== receta.carnes) {
    return { ok: false, motivo: receta.carnes === 2 ? 'Esta burger es doble: lleva dos carnes.' : 'Esta burger lleva una sola carne.' }
  }
  if (carnes.some((c) => Boolean(c.cebolla) !== Boolean(receta.oklahoma))) {
    return { ok: false, motivo: receta.oklahoma ? 'La Onion Ring lleva la cebolla dentro de cada carne.' : 'Este pedido no lleva cebolla en la carne.' }
  }
  const puestos = extrasDe(plato)
  const hecho = [...puestos].sort().join(',')
  const pedido = [...receta.extras].sort().join(',')
  if (hecho !== pedido) return { ok: false, motivo: 'Los ingredientes no coinciden con el pedido.' }
  return { ok: true, ordenExacto: puestos.join(',') === receta.extras.join(',') }
}

// ---------- Reductor ----------

export function reducir(estado, accion) {
  switch (accion.tipo) {
    case 'empezar':
      return { ...estado, fase: FASE.HISTORIA, dia: 0, acumulado: 0, ...estadoDelDia(0) }

    case 'jugarDia':
      return { ...estado, ...estadoDelDia(estado.dia), fase: FASE.JUGANDO }

    case 'pausa':
      return estado.fase === FASE.JUGANDO ? { ...estado, fase: FASE.PAUSA } : estado

    case 'reanudar':
      return estado.fase === FASE.PAUSA ? { ...estado, fase: FASE.JUGANDO } : estado

    case 'siguienteDia': {
      const siguiente = estado.dia + 1
      if (siguiente >= DIAS.length) return { ...estado, fase: FASE.FINAL }
      return { ...estado, dia: siguiente, ...estadoDelDia(siguiente), fase: FASE.HISTORIA }
    }

    case 'reintentar':
      return { ...estado, ...estadoDelDia(estado.dia), fase: FASE.HISTORIA }

    case 'reiniciar':
      return estadoInicial()

    case 'tick':
      return estado.fase === FASE.JUGANDO ? avanzar(estado, accion.dt) : estado

    default:
      return estado.fase === FASE.JUGANDO ? accionDeCocina(estado, accion) : estado
  }
}

// ---------- Paso del tiempo ----------

function avanzar(estado, dt) {
  const dia = DIAS[estado.dia]
  let siguiente = { ...estado, tiempo: estado.tiempo - dt }

  // La carne se hace en la plancha.
  siguiente.plancha = estado.plancha.map((slot) => (slot.estado === 'cocinando' ? { ...slot, t: slot.t + dt } : slot))

  // Avisos y textos flotantes.
  if (siguiente.aviso) {
    const ttl = siguiente.aviso.ttl - dt
    siguiente.aviso = ttl > 0 ? { ...siguiente.aviso, ttl } : null
  }
  siguiente.flotantes = siguiente.flotantes
    .map((f) => ({ ...f, ttl: f.ttl - dt }))
    .filter((f) => f.ttl > 0)

  // Los clientes pierden la paciencia; si se agota, se van enfadados.
  const quedan = []
  let enfadados = 0
  siguiente.cola.forEach((cliente) => {
    const paciencia = cliente.paciencia - dt
    if (paciencia <= 0) enfadados += 1
    else quedan.push({ ...cliente, paciencia })
  })
  siguiente.cola = quedan
  if (enfadados > 0) {
    siguiente.vidas = Math.max(0, siguiente.vidas - enfadados)
    siguiente.perdidos += enfadados
    siguiente.racha = 0
    siguiente = flotar(siguiente, 'Se fue sin comer', 'mal')
  }

  // Llegan clientes nuevos mientras quede tiempo.
  siguiente.espera -= dt
  if (siguiente.espera <= 0 && siguiente.cola.length < MAX_COLA && siguiente.tiempo > 6) {
    siguiente.cola = [...siguiente.cola, crearCliente(siguiente)]
    siguiente.espera = dia.intervalo * (0.8 + Math.random() * 0.4)
  }

  // Final de la jornada.
  if (siguiente.vidas <= 0) return { ...siguiente, fase: FASE.PERDIDO, motivo: 'vidas' }
  if (siguiente.tiempo <= 0) {
    siguiente.tiempo = 0
    if (siguiente.dinero >= dia.objetivo) {
      return { ...siguiente, fase: FASE.FIN_DIA, acumulado: estado.acumulado + siguiente.dinero }
    }
    return { ...siguiente, fase: FASE.PERDIDO, motivo: 'objetivo' }
  }
  return siguiente
}

// ---------- Acciones en la cocina ----------

function accionDeCocina(estado, accion) {
  switch (accion.tipo) {
    case 'pan': {
      const { plato } = estado
      if (!plato.pan) return { ...estado, plato: { ...plato, pan: true } }
      if (carnesDe(plato).length > 0 && !plato.tapa) return { ...estado, plato: { ...plato, tapa: true } }
      if (plato.tapa) return avisar(estado, 'Ya está cerrada: sírvela o tírala.', 'mal')
      return avisar(estado, 'Antes pon la carne sobre el pan.', 'mal')
    }

    case 'carne': {
      const libre = estado.plancha.findIndex((slot) => slot.estado === 'libre')
      if (libre === -1) return avisar(estado, 'La plancha está llena.', 'mal')
      const plancha = estado.plancha.map((slot, i) => (i === libre ? { estado: 'bola', cebolla: false, t: 0 } : slot))
      return { ...estado, plancha }
    }

    case 'cebolla': {
      // La cebolla se mete en la bola antes de aplastarla (estilo Oklahoma).
      let indice = -1
      estado.plancha.forEach((slot, i) => {
        if (slot.estado === 'bola' && !slot.cebolla) indice = i
      })
      if (indice === -1) return avisar(estado, 'Pon una bola de carne y métele la cebolla antes de aplastarla.', 'mal')
      const plancha = estado.plancha.map((slot, i) => (i === indice ? { ...slot, cebolla: true } : slot))
      return { ...estado, plancha }
    }

    case 'aplastar': {
      const slot = estado.plancha[accion.indice]
      if (!slot || slot.estado !== 'bola') return estado
      const plancha = estado.plancha.map((s, i) => (i === accion.indice ? { ...s, estado: 'cocinando', t: 0 } : s))
      return { ...estado, plancha, temblor: estado.temblor + 1 }
    }

    case 'recoger': {
      const slot = estado.plancha[accion.indice]
      if (!slot || slot.estado !== 'cocinando') return estado
      const fase = estadoCarne(slot.t)
      if (fase === 'cruda') return avisar(estado, '¡Aún está cruda!', 'mal')
      if (fase === 'quemada') return avisar(estado, 'Está quemada: tírala.', 'mal')
      if (!estado.plato.pan) return avisar(estado, 'Primero pon el pan en el plato.', 'mal')
      if (estado.plato.tapa) return avisar(estado, 'La burger ya está cerrada.', 'mal')
      if (carnesDe(estado.plato).length >= MAX_CARNES) return avisar(estado, 'Ya tiene dos carnes.', 'mal')
      const plancha = estado.plancha.map((s, i) => (i === accion.indice ? SLOT_LIBRE : s))
      const carne = { k: 'carne', calidad: fase === 'lista' ? 'perfecta' : 'pasada', cebolla: slot.cebolla }
      return { ...estado, plancha, plato: { ...estado.plato, capas: [...estado.plato.capas, carne] } }
    }

    case 'tirarSlot': {
      const plancha = estado.plancha.map((s, i) => (i === accion.indice ? SLOT_LIBRE : s))
      return { ...estado, plancha }
    }

    case 'extra': {
      const { plato } = estado
      if (!plato.pan || carnesDe(plato).length === 0) return avisar(estado, 'Primero el pan y la carne.', 'mal')
      if (plato.tapa) return avisar(estado, 'Ya está cerrada.', 'mal')
      if (extrasDe(plato).length >= MAX_EXTRAS) return avisar(estado, '¡No cabe más!', 'mal')
      return { ...estado, plato: { ...plato, capas: [...plato.capas, { k: 'extra', id: accion.id }] } }
    }

    case 'tirarPlato':
      return { ...estado, plato: PLATO_VACIO }

    case 'servir':
      return servir(estado)

    default:
      return estado
  }
}

function servir(estado) {
  const cliente = estado.cola[0]
  if (!cliente) return avisar(estado, 'No hay nadie esperando.', 'mal')

  const resultado = evaluarPlato(estado.plato, cliente.receta)
  if (!resultado.ok) {
    // Pedido mal montado: el cliente pierde paciencia y el plato se devuelve.
    const cola = estado.cola.map((c, i) => (i === 0 ? { ...c, paciencia: Math.max(1, c.paciencia - c.max * 0.3) } : c))
    return avisar({ ...estado, cola, racha: 0, plato: PLATO_VACIO }, resultado.motivo, 'mal')
  }

  const propina = Math.round((cliente.paciencia / cliente.max) * 4)
  const perfecta = carnesDe(estado.plato).every((c) => c.calidad === 'perfecta') ? 2 : 0
  const orden = resultado.ordenExacto ? 1 : 0
  const racha = estado.racha + 1
  const combo = racha >= 3 ? 2 : 0
  const ganado = cliente.receta.precio + propina + perfecta + orden + combo

  let siguiente = {
    ...estado,
    dinero: estado.dinero + ganado,
    servidos: estado.servidos + 1,
    racha,
    cola: estado.cola.slice(1),
    plato: PLATO_VACIO,
  }
  siguiente = flotar(siguiente, `+${ganado} €`, 'bien')
  const textos = []
  if (perfecta) textos.push('Carne en su punto')
  if (combo) textos.push(`¡Racha x${racha}!`)
  return avisar(siguiente, textos.length ? textos.join(' · ') : '¡Gracias!', 'bien')
}

// ---------- Pista para el jugador ----------

export function pista(estado) {
  const cliente = estado.cola[0]
  if (!cliente) return 'Esperando al primer cliente…'
  const { plato, plancha } = estado
  const receta = cliente.receta
  const carnes = carnesDe(plato)

  if (!plato.pan) return 'Pon el pan en el plato.'

  if (carnes.length < receta.carnes) {
    const cocinando = plancha.find((s) => s.estado === 'cocinando')
    const bola = plancha.find((s) => s.estado === 'bola')
    const otra = carnes.length > 0 ? ' otra' : ''
    if (cocinando) {
      const fase = estadoCarne(cocinando.t)
      if (fase === 'cruda') return 'Espera a que la carne esté lista…'
      if (fase === 'lista') return '¡Ya está! Toca la carne para ponerla en el plato.'
      if (fase === 'pasada') return '¡Se pasa! Recógela ya.'
      return 'Está quemada: tócala para tirarla.'
    }
    if (bola) {
      if (receta.oklahoma && !bola.cebolla) return 'Mete la cebolla en la bola y aplástala.'
      return 'Toca la bola para aplastarla contra la plancha.'
    }
    if (receta.carnes === 2 && carnes.length === 0) return 'Es doble: pon dos bolas de carne a la vez.'
    return receta.oklahoma ? `Pon${otra} bola de carne y métele la cebolla.` : `Pon${otra} bola de carne en la plancha.`
  }

  if (!plato.tapa) {
    const pendientes = [...receta.extras]
    extrasDe(plato).forEach((e) => {
      const i = pendientes.indexOf(e)
      if (i !== -1) pendientes.splice(i, 1)
    })
    if (pendientes.length) return `Falta: ${pendientes.map((id) => EXTRAS[id].nombre.toLowerCase()).join(', ')}.`
    return 'Tapa la burger con el pan.'
  }
  return '¡Sírvela al cliente!'
}

export function estrellasDelDia(dinero, objetivo) {
  if (dinero >= objetivo * 1.8) return 3
  if (dinero >= objetivo * 1.4) return 2
  return 1
}
