// Datos del juego: ingredientes, recetas (exactas de la carta de Lamarta), días (hitos reales) y clientes.

// Tiempos de la carne en la plancha, en segundos desde que se aplasta.
export const COCCION = { lista: 3, perfecta: 6.5, quemada: 10 };

export const MAX_COLA = 4;
export const VIDAS = 3;
export const MAX_CARNES = 2;
export const MAX_EXTRAS = 8;

// Ingredientes que se añaden a la burger. `etiqueta` es el texto corto del botón.
export const EXTRAS = {
  cheddar: { nombre: 'Queso cheddar', etiqueta: 'Cheddar' },
  camembert: { nombre: 'Queso camembert', etiqueta: 'Camembert' },
  bacon: { nombre: 'Bacon', etiqueta: 'Bacon' },
  pepinillos: { nombre: 'Pepinillos', etiqueta: 'Pepinillos' },
  lechuga: { nombre: 'Lechuga', etiqueta: 'Lechuga' },
  tomate: { nombre: 'Tomate', etiqueta: 'Tomate' },
  aros: { nombre: 'Aros de cebolla crujiente', etiqueta: 'Aros' },
  ketchup: { nombre: 'Ketchup', etiqueta: 'Ketchup' },
  mostaza: { nombre: 'Mostaza', etiqueta: 'Mostaza' },
  mayonesa: { nombre: 'Mayonesa', etiqueta: 'Mayonesa' },
  bbq: { nombre: 'Salsa BBQ', etiqueta: 'BBQ' },
  salsabacon: { nombre: 'Salsa bacon', etiqueta: 'S. bacon' },
  lamarta: { nombre: 'Salsa LAMARTA', etiqueta: 'Lamarta' },
}

// Altura de cada capa al dibujar la burger.
export const ALTURA_CAPA = {
  cheddar: 6,
  camembert: 6,
  bacon: 5,
  pepinillos: 6,
  lechuga: 8,
  tomate: 6,
  aros: 7,
  ketchup: 4,
  mostaza: 4,
  mayonesa: 4,
  bbq: 5,
  salsabacon: 5,
  lamarta: 5,
}

// Recetas tal cual figuran en la carta (carne, nº de carnes e ingredientes en su orden).
// "oklahoma": la cebolla va dentro de la bola de carne, en cada carne.
export const RECETAS = {
  bbb: {
    id: 'bbb',
    nombre: 'La BBB',
    carne: 'Smash de ternera · 80 g',
    carnes: 1,
    oklahoma: false,
    extras: ['cheddar', 'pepinillos', 'ketchup', 'mostaza'],
    precio: 7,
    frases: ['¡Una BBB, por favor!', 'Pónmela rapidita, que tengo prisa.'],
  },
  bbq: {
    id: 'bbq',
    nombre: 'La BBQ',
    carne: 'Smash de ternera · 80 g',
    carnes: 1,
    oklahoma: false,
    extras: ['cheddar', 'bacon', 'bbq'],
    precio: 8,
    frases: ['Hoy me apetece una BBQ.', 'Con bacon, que no falte.'],
  },
  classic: {
    id: 'classic',
    nombre: 'La Classic',
    carne: 'Smash de vaca y buey · 100 g',
    carnes: 1,
    oklahoma: false,
    extras: ['cheddar', 'aros', 'lechuga', 'tomate', 'mayonesa'],
    precio: 11,
    frases: ['Una Classic, de las de siempre.', 'Con sus aros de cebolla crujiente.'],
  },
  onionring: {
    id: 'onionring',
    nombre: 'Onion Ring',
    carne: 'Doble smash de vaca y buey · 200 g',
    carnes: 2,
    oklahoma: true,
    extras: ['cheddar', 'pepinillos', 'camembert', 'lamarta'],
    precio: 12,
    frases: ['¿Esa es la campeona de Galicia? ¡Quiero una!', 'Me han hablado de la Onion Ring.'],
  },
  premium: {
    id: 'premium',
    nombre: 'Premium Bacon',
    carne: 'Doble smash de vaca y buey · 200 g',
    carnes: 2,
    oklahoma: false,
    extras: ['cheddar', 'bacon', 'salsabacon'],
    precio: 12,
    frases: ['Una Premium Bacon, doble de carne.', 'Que sea de las que quedaron terceras de España.'],
  },
}

// Botones de la cocina. Pan, carne y cebolla tienen mecánica propia; el resto son EXTRAS.
export const BOTONES = {
  pan: { nombre: 'Pan' },
  carne: { nombre: 'Carne' },
  cebolla: { nombre: 'Cebolla' },
}

// Cada día es un hito real de Lamarta.
export const DIAS = [
  {
    etiqueta: 'Enero de 2024',
    titulo: 'Abrimos en Vilagarcía',
    texto:
      'Lamarta abre sus puertas en Vilagarcía de Arousa con una idea clara: hamburguesas artesanales de máxima calidad, sin atajos. Hoy abres tú la barra. Usamos carne de ternera o de vaca y buey, y pan brioche artesanal.',
    objetivo: 45,
    duracion: 70,
    intervalo: 11,
    paciencia: 46,
    recetas: ['bbb', 'bbq'],
    botones: ['pan', 'carne', 'cheddar', 'bacon', 'pepinillos', 'ketchup', 'mostaza', 'bbq'],
  },
  {
    etiqueta: '2024 · Campeones de Galicia',
    titulo: 'La Onion Ring',
    texto:
      'Ganamos el campeonato gallego de hamburguesas con la Onion Ring: doble smash con cebolla al estilo Oklahoma metida dentro de la carne, cheddar y camembert, pepinillos nuestros y salsa LAMARTA. Hoy llegan clientes por ella.',
    objetivo: 85,
    duracion: 80,
    intervalo: 9,
    paciencia: 40,
    recetas: ['bbb', 'bbq', 'onionring'],
    botones: ['pan', 'carne', 'cebolla', 'cheddar', 'camembert', 'bacon', 'pepinillos', 'ketchup', 'mostaza', 'bbq', 'lamarta'],
  },
  {
    etiqueta: '2025 · Burger Combat',
    titulo: 'Terceros de España',
    texto:
      'Seis cocinas de toda España compiten en el Salón Gourmets de Madrid y Lamarta queda tercera mejor hamburguesa del país. Vuelve la hora punta con toda la carta: ¡cocina como un campeón!',
    objetivo: 130,
    duracion: 90,
    intervalo: 7.5,
    paciencia: 34,
    recetas: ['bbb', 'bbq', 'classic', 'onionring', 'premium'],
    botones: [
      'pan',
      'carne',
      'cebolla',
      'cheddar',
      'camembert',
      'bacon',
      'pepinillos',
      'lechuga',
      'tomate',
      'aros',
      'ketchup',
      'mostaza',
      'mayonesa',
      'bbq',
      'salsabacon',
      'lamarta',
    ],
  },
]

// Aspecto de los clientes (piel, pelo, camisa y complemento).
export const ASPECTOS = [
  { piel: '#f1c9a0', pelo: '#3b2a1e', estilo: 'corto', camisa: '#3a7bd5', extra: 'gafas' },
  { piel: '#c98d62', pelo: '#1d1612', estilo: 'rizado', camisa: '#d6453d', extra: 'ninguno' },
  { piel: '#f5d7b8', pelo: '#c9822b', estilo: 'largo', camisa: '#5fa83a', extra: 'ninguno' },
  { piel: '#8d5a3b', pelo: '#120d0a', estilo: 'corto', camisa: '#8a4fc7', extra: 'gorra' },
  { piel: '#f1c9a0', pelo: '#9a9a9a', estilo: 'calvo', camisa: '#e08a2e', extra: 'gafas' },
  { piel: '#e0ac84', pelo: '#2b1d16', estilo: 'largo', camisa: '#2aa198', extra: 'gorra' },
]

export const FRASES_GENERALES = [
  '¡Qué hambre tengo!',
  'Huele de maravilla aquí.',
  'Me han hablado de vuestras smash.',
  'Voy con un poco de prisa…',
]

// Plato ya montado de una receta (para la comanda y las tarjetas): carnes primero y después los ingredientes.
export function platoDeReceta(receta) {
  const carnes = Array.from({ length: receta.carnes }, () => ({ k: 'carne', calidad: 'perfecta', cebolla: receta.oklahoma }))
  const extras = receta.extras.map((id) => ({ k: 'extra', id }))
  return { pan: true, capas: [...carnes, ...extras], tapa: true }
}
