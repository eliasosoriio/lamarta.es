import React, { useState, useEffect } from 'react'
import "../../styles/club/Puntos.css";

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

function Puntos() {
  const [usuario, setUsuario] = useState({});
    
    useEffect(() => {
      async function getUsuario(id) {
        try {
          const json = await ajax({
            url:urlUsuarios.concat("/").concat(parseInt(id)),
            headers: {
              "x-api-key": sessionStorage.getItem('token')
            }
          });
          setUsuario(json);
        } catch (error) {
          console.error(error);
        }
      }
  
      getUsuario(sessionStorage.getItem('id_usuario'));
    }, [])

  return (
    <section className='panel puntos d-flex-col'>
        <p>1€ = 100 puntos</p>
        <img src="https://lamarta.es/assets/favicon-lamarta.png" alt="Corona Lamarta en los puntos." />
        <p>Eres el afiliado</p>
        <p className='puntos--orange'> Nº {usuario.id_usuario}</p>
        <img src="https://lamarta.es/assets/logo-lamarta-2.svg" alt="Logo Lamarta" />
        <p>Tienes</p>
        <p className='puntos--orange'>{usuario.puntos}</p>
        <p>puntos!</p>
    </section>
  )
}

export default Puntos
