// Horario único de Lamarta. Lo usan el pie de página y la página de contacto.
// Los miércoles el local está cerrado (tramos vacíos y cerrado: true).
// dias: 0 = domingo ... 6 = sábado. Un cierre a las 00:00 o 01:00 cuenta como fin de ese mismo servicio.
export const HORARIOS = [
  { etiqueta: "Lunes y martes", dias: [1, 2], tramos: [["13:00", "16:00"], ["20:00", "23:00"]] },
  { etiqueta: "Miércoles", dias: [3], tramos: [], cerrado: true },
  { etiqueta: "Jueves", dias: [4], tramos: [["20:00", "23:00"]] },
  { etiqueta: "Viernes", dias: [5], tramos: [["13:00", "16:00"], ["20:00", "00:00"]] },
  { etiqueta: "Sábado", dias: [6], tramos: [["13:00", "16:00"], ["20:00", "01:00"]] },
  { etiqueta: "Domingo", dias: [0], tramos: [["20:00", "00:00"]] },
];

const ZONA_HORARIA = "Europe/Madrid";
const DIAS_EN = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const MIN_DIA = 24 * 60;
const NOMBRES_DIA = ["el domingo", "el lunes", "el martes", "el miércoles", "el jueves", "el viernes", "el sábado"];

function aMinutos(hora, esFin = false) {
  const [h, m] = hora.split(":").map(Number);
  const minutos = h * 60 + m;
  // Un fin a las 00:00 o 01:00 es ya del día siguiente.
  return esFin && minutos <= 6 * 60 ? minutos + MIN_DIA : minutos;
}

function tramosDelDia(dia) {
  const grupo = HORARIOS.find((h) => h.dias.includes(dia));
  return grupo ? grupo.tramos.map(([ini, fin]) => [aMinutos(ini), aMinutos(fin, true)]) : [];
}

function ahoraEnMadrid(fecha = new Date()) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONA_HORARIA,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(fecha);
  const valor = (tipo) => partes.find((p) => p.type === tipo)?.value;

  return {
    dia: DIAS_EN[valor("weekday")],
    minutos: Number(valor("hour")) * 60 + Number(valor("minute")),
  };
}

/** Día de la semana actual en Madrid (0 = domingo ... 6 = sábado). */
export function diaActual(fecha = new Date()) {
  return ahoraEnMadrid(fecha).dia;
}

function formatearHora(minutos) {
  const m = minutos % MIN_DIA;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/**
 * Devuelve si el local está abierto y un texto corto para mostrar.
 * @returns {{ abierto: boolean, texto: string }}
 */
export function estadoActual(fecha = new Date()) {
  const { dia, minutos } = ahoraEnMadrid(fecha);

  // Servicio de hoy o que viene de ayer (cierres pasada la medianoche).
  const ayer = (dia + 6) % 7;
  const candidatos = [
    ...tramosDelDia(dia).map(([ini, fin]) => [ini, fin, minutos]),
    ...tramosDelDia(ayer).map(([ini, fin]) => [ini, fin, minutos + MIN_DIA]),
  ];

  for (const [ini, fin, ahora] of candidatos) {
    if (ahora >= ini && ahora < fin) {
      return { abierto: true, texto: `Abierto ahora · cierra a las ${formatearHora(fin)}` };
    }
  }

  // Próxima apertura: hoy o en los siguientes días.
  for (let salto = 0; salto < 7; salto += 1) {
    const diaSalto = (dia + salto) % 7;
    const siguiente = tramosDelDia(diaSalto).find(([ini]) => salto > 0 || ini > minutos);

    if (siguiente) {
      const cuando = salto === 0 ? "hoy" : salto === 1 ? "mañana" : NOMBRES_DIA[diaSalto];
      const cerradoHoy = tramosDelDia(dia).length === 0;
      return { abierto: false, texto: `Cerrado${cerradoHoy ? " hoy" : ""} · abrimos ${cuando} a las ${formatearHora(siguiente[0])}` };
    }
  }

  return { abierto: false, texto: "Cerrado" };
}
