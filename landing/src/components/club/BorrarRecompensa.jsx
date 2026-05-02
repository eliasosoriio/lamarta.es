import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "../../styles/club/VentanaSecundaria.css";
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
import CampoPanel from './CampoPanel';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import PrivateRoute from '../general/PrivateRoute';

const urlRecompensa = "https://lamarta.es/api/route.php/recompensa";

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

async function borrarRecompensa(id, token) {
    try {
        const json = await ajax({
            url: `${urlRecompensa}/${id}`,
            method: "DELETE",
            headers: {
              "x-api-key": token
            }
        });

        const notyf = new Notyf({
            position: {
                x: 'right',
                y: 'top'
            }
        });

        if (!json.error) {
          window.location.href = `/club/admin`;
        } else {
          notyf.error('Recompensa no eliminada.');
        }
    } catch (error) {
        console.error(error);
    }
}

function realizarAccion(ev, accion, id) {
  ev.preventDefault();
  if(accion == "eliminar") {
    borrarRecompensa(id, sessionStorage.getItem('token'));
  } else {
    window.location.href = `/club/admin`;
  }
}

function BorrarRecompensa() {
  const [recompensa, setRecompensa] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getRecompensa(id, token) {
      try {
        const json = await ajax({
          url:urlRecompensa.concat("/").concat(parseInt(id)),
          headers: {
            "x-api-key": token
          }
        });
        setRecompensa(json);
      } catch (error) {
        console.error(error);
      }
    }

    getRecompensa(id, sessionStorage.getItem('token'));
  }, [])
  
  return (
    <section className='ventana--secundaria d-flex-col'>
      <ScrollArriba />
      <PrivateRoute rolPermitido="admin">
        <h1 className="ventana--secundaria--titulo">¿Estás seguro de que quieres borrar esta recompensa?</h1>
        <form className='ventana--secundaria--form d-flex-col'>
          <CampoPanel nombre={recompensa.nombre} descripcion={recompensa.descripcion} puntos={recompensa.precio} />
          <BotonSubmit mensaje={"Eliminar"} button={true} onClick={(ev) => realizarAccion(ev, "eliminar", id)} />
          <BotonSubmit mensaje={"Cancelar"} button={true} onClick={(ev) => realizarAccion(ev, "cancelar", id)} />
        </form>
      </PrivateRoute>
    </section>
  )
}

export default BorrarRecompensa
