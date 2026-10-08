import { useEffect, useReducer } from 'react'
import { estadoInicial, FASE, reducir } from './reglas'

const PASO_MS = 100

// Estado del juego + reloj. Se pausa solo si la pestaña pasa a segundo plano.
export default function useJuego() {
  const [estado, despachar] = useReducer(reducir, undefined, estadoInicial)
  const jugando = estado.fase === FASE.JUGANDO

  useEffect(() => {
    if (!jugando) return undefined

    let ultimo = performance.now()
    const id = setInterval(() => {
      const ahora = performance.now()
      const dt = Math.min(0.25, (ahora - ultimo) / 1000)
      ultimo = ahora
      despachar({ tipo: 'tick', dt })
    }, PASO_MS)

    const alCambiarVisibilidad = () => {
      if (document.hidden) despachar({ tipo: 'pausa' })
    }
    document.addEventListener('visibilitychange', alCambiarVisibilidad)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
    }
  }, [jugando])

  return [estado, despachar]
}
