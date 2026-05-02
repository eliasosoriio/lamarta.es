import React, { useState, useEffect } from 'react'
import "../../styles/club/PanelLista.css";
import CampoPanel from './CampoPanel';

const urlUsuarios = "https://lamarta.es/api/route.php/afiliado";

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

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function getUsuarios(token) {
      try {
        const json = await ajax({
          url:urlUsuarios,
          headers: {
            "x-api-key": token
          }
        });
        setUsuarios(json);
      } catch (error) {
        console.error(error);
      }
    }

    getUsuarios(sessionStorage.getItem('token'));
  }, [])

  return (
    <section className='panel panel--lista d-flex-col'>
        <header>
            <h2 className='panel--lista--titulo'>Usuarios</h2>
            <p className='panel--lista--desc'>LOS 10 CON MÁS PUNTOS</p>
        </header>
        
        <ul className="panel--lista--campo d-flex-col"  aria-label="Lista de usuarios" role='list'>
            {[...usuarios].map((u, i)  => (
                <CampoPanel 
                key={i}
                nombre={'Nº ' + u.id_usuario + ' - ' + u.nombre}
                descripcion={u.apellidos}
                puntos={u.puntos}
                puedePerfil={true}
                id={u.id_usuario}
                />
            ))}
        </ul>
    </section>
  )
}

export default Usuarios
