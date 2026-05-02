import React, { useState, useEffect } from 'react'
import "../../styles/club/PanelLista.css";
import CampoPanel from './CampoPanel';

const urlRecompensas = "https://lamarta.es/api/route.php/recompensa";

async function ajax(options) {
    const {url, method, data, headers} = options;

    try {
        const resp = await fetch(url, {
            method: method || "GET",
            headers: {
                "Content-type":"application/json; charset=utf-8",
                ...headers
            },
            body: JSON.stringify(data)
        });

        if (!resp.ok) throw new Error(`HTTP error! Status: ${resp.status}`);

        const json = await resp.json();

        return json;

    } catch (error) {
        return {
            error: true,
            status: error.status,
            statusText: error.statusText || "Algo ha ocurrido"
        };
    }
}

function Recompensas() {

  const [recompensas, setRecompensas] = useState([]);
  
    useEffect(() => {
      async function getRecompensas(token) {
        try {
          const json = await ajax({
            url:urlRecompensas,
            headers: {
              "x-api-key": token
            }
          });
          setRecompensas(json);
        } catch (error) {
          console.error(error);
        }
      }
  
      getRecompensas(sessionStorage.getItem('token'));
    }, [])

  return (
    <section className='panel panel--lista d-flex-col'>
        <header>
            <h2 className='panel--lista--titulo'>Recompensas</h2>
            <p className='panel--lista--desc'>CANJEA TU FAVORITA ANTES DE PAGAR</p>
        </header>

        <section className="panel--lista--campo d-flex-col" aria-label="Lista de recompensas" role='list'>
            {[...recompensas].map((r, i)  => (
                <CampoPanel 
                  key={i}
                  nombre={r.nombre}
                  descripcion={r.descripcion}
                  puntos={r.precio}
                  puedeBorrar={true} 
                  puedeEditar={true}
                  id={r.id_recompensa}
                />
            ))}
        </section>
    </section>
  )
}

export default Recompensas
