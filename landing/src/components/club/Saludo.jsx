import React, { useState, useEffect } from 'react'
import "../../styles/club/Saludo.css";
import "../../styles/club/BotonSubmit.css";

const tipo = sessionStorage.getItem('tipo');
const urlUsuarios = "https://lamarta.es/api/route.php/"+tipo;

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

function hacerLogout(ev) {
  ev.preventDefault();
  sessionStorage.removeItem('token');
  window.location.href = "/club/login";
}

function Saludo() {
  const [usuario, setUsuario] = useState({});
  
    useEffect(() => {
      async function getUsuario(id, token) {
        try {
          const json = await ajax({
            url:urlUsuarios.concat("/").concat(parseInt(id)),
            headers: {
              "x-api-key": token
            }
          });
          setUsuario(json);
        } catch (error) {
          console.error(error);
        }
      }
  
      getUsuario(sessionStorage.getItem('id_usuario'), sessionStorage.getItem('token'));
    }, [])

  return (
    <section className='panel saludo d-flex-col'>
        <img src="https://lamarta.es/assets/favicon-lamarta.png" alt="Corona Lamarta en el saludo." />
        <p>¡Bienvenido/a</p>
        <p>{usuario.nombre}!</p>
        <img src="https://lamarta.es/assets/logo-lamarta-2.svg" alt="Logo Lamarta" />
        <button type='submit' className='button--submit' onClick={hacerLogout}>Cerrar sesión</button>
    </section>
  )
}

export default Saludo
