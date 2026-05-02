import {React, useState, useEffect} from 'react'
import "../../styles/club/VentanaSecundaria.css";
import Campo from './Campo';
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import PrivateRoute from '../general/PrivateRoute';

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

async function getUsuario(id) {
    try {
        const json = await ajax({ 
            url: urlUsuarios.concat("/").concat(parseInt(id)),
            headers: {
                "x-api-key": sessionStorage.getItem('token')
            }
        });

        const notyf = new Notyf({
            position: {
                x: 'right',
                y: 'top'
            }
        });

        if (json.id_usuario) {
            window.location.href = `/usuario/perfil/${id}`;
        } else {
            notyf.error('Afiliado no encontrado.');
        }
    } catch (error) {
      console.error(error);
    }
}

function realizarAccion(ev, accion, id) {
  ev.preventDefault();

  const notyf = new Notyf({
      position: {
          x: 'right',
          y: 'top'
      }
  });

  if(accion == "cancelar") {
    window.location.href = `/club/admin`;
  } else {
    if(isNaN(id)) {
      notyf.error('Debes introducir un número.');
    } else {
      getUsuario(id);
    }
  }
}

function BuscarUsuario() {
  const [id, setId] = useState();

  return (
    <section className='ventana--secundaria d-flex-col'>
      <ScrollArriba />
      <PrivateRoute rolPermitido="admin">
        <form className='ventana--secundaria--form d-flex-col' onSubmit={(ev) => realizarAccion(ev, "buscar", id)}>
            <Campo 
              id="usuario" 
              nombre="Nº de Afiliado" 
              type={"number"} 
              placeholder={"465"} 
              min={0}
              onChange={(ev) => {
                setId(ev.target.value);
              }}
              />
            <BotonSubmit mensaje={"Buscar Afiliado"} />
            <BotonSubmit mensaje={"Cancelar"} button={true} onClick={(ev) => realizarAccion(ev, "cancelar", id)} />
        </form>
      </PrivateRoute>
    </section>
  )
}

export default BuscarUsuario
