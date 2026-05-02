import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "../../styles/club/VentanaSecundaria.css";
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
import CampoPanel from './CampoPanel';
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

function realizarAccion(ev, accion, id) {
  ev.preventDefault();
  if(accion == "cancelar") {
    window.location.href = `/club/admin`;
  } else {
    window.location.href = `/usuario/${accion}/${id}`;
  }
}

function Perfil() {
  const [usuario, setUsuario] = useState({});
  const { id } = useParams();

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

    getUsuario(id, sessionStorage.getItem('token'));
  }, [])

  return (
    <section className='ventana--secundaria d-flex-col'>
      <ScrollArriba />
      <PrivateRoute rolPermitido="admin">
        <form className='ventana--secundaria--form d-flex-col ventana--secundaria--form--acciones'>
          <CampoPanel nombre={'Nº ' + usuario.id_usuario + ' - ' + usuario.nombre + ' ' + usuario.apellidos} descripcion={usuario.correo} puntos={usuario.puntos} />
          <BotonSubmit mensaje={"Añadir Puntos"} button={true} onClick={(ev) => realizarAccion(ev, "anadir", id)} />
          <BotonSubmit mensaje={"Canjear Recompensa"} button={true} onClick={(ev) => realizarAccion(ev, "canjear", id)} />
          <BotonSubmit mensaje={"Cancelar"} button={true} onClick={(ev) => realizarAccion(ev, "cancelar", id)} />
        </form>
      </PrivateRoute>
    </section>
  )
}

export default Perfil
