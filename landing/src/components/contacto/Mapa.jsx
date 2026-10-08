import '../../styles/contacto/Mapa.css'
import React, { useState } from 'react'

const DIRECCION = "Rúa Arcebispo Xelmírez 7, 36600 Vilagarcía de Arousa";
const URL_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}&output=embed`;

// El mapa de Google solo se carga al pulsar: ahorra peso y evita cookies de terceros sin que el usuario lo pida.
function Mapa() {
  const [cargado, setCargado] = useState(false);

  return (
    <div className='mapa'>
      {cargado ? (
        <iframe
          className='mapa--iframe'
          title="Ubicación de Lamarta en Vilagarcía de Arousa"
          src={URL_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      ) : (
        <button type="button" className='mapa--boton' onClick={() => setCargado(true)}>
          <i className="fa-solid fa-map-location-dot"></i>
          <span className='mapa--titulo'>Ver mapa</span>
          <span className='mapa--direccion'>{DIRECCION}</span>
          <span className='mapa--aviso'>Al pulsar se carga Google Maps</span>
        </button>
      )}
    </div>
  )
}

export default Mapa
