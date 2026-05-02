import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "../../styles/club/CanjearRecompensa.css";
import Campo from './Campo';
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import PrivateRoute from '../general/PrivateRoute';

const urlRecompensas = "https://lamarta.es/api/route.php/recompensa";
const urlTransacciones = "https://lamarta.es/api/route.php/transaccion";

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

async function canjearRecompensa(id, concepto, importe) {
    try {
        const json = await ajax({
            url: urlTransacciones,
            method: "POST",
            data: [{
              id_usuario_admin: sessionStorage.getItem('id_usuario'),
              id_usuario_afiliado: id,
              concepto: concepto,
              importe: importe
            }],
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

        if (!json.error) {
          window.location.href = `/usuario/perfil/${id}`;
        } else {
          notyf.error('Ha ocurrido un error o el saldo es insuficiente.');
        }
    } catch (error) {
        console.error(error);
    }
}

function realizarAccion(ev, accion, id, concepto, importe) {
  ev.preventDefault();
  if(accion == "cancelar" ) {
    window.location.href = `/usuario/perfil/${id}`;
  } else {
    canjearRecompensa(id, concepto, -(importe));
  }
}

function CanjearRecompensa() {
  const [recompensas, setRecompensas] = useState([]);
  const [recompensa, setRecompensa] = useState(null);
  const { id } = useParams();
    
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
    <section className='canjear--recompensa d-flex-col'>
      <ScrollArriba />
      <PrivateRoute rolPermitido="admin">
        <form className='canjear--recompensa--form d-flex-col'>
            <label className='campo--label' htmlFor="recompensas">Selecciona la recompensa a canjear:</label>
            <select className='campo--input' name="recompensas" id="recompensas" onChange={(ev) => setRecompensa(recompensas[ev.target.value])}>
              <option value={-1} defaultValue >Selecciona una recompensa.</option>
              {[...recompensas].map((r, i)  => (
                  <option key={i} value={i}>{r.nombre + ' - ' + r.precio}</option>
              ))}
            </select>
            <div className="d-flex d-flex-col ventana--secundaria--form--acciones">
              <BotonSubmit mensaje={"Canjear Recompensa"} button={true} onClick={(ev) => {
                ev.preventDefault();
                const notyf = new Notyf({
                    position: {
                        x: 'right',
                        y: 'top'
                    }
                });
                if (recompensa && recompensa.nombre && recompensa.precio) {
                  realizarAccion(ev, "canjear", id, 'Canjeo: ' + recompensa.nombre + ' - ' + recompensa.precio, recompensa.precio);
                } else {
                  notyf.error('Selecciona una recompensa válida.');
                }
              }} />
              <BotonSubmit mensaje={"Cancelar"}  button={true} onClick={(ev) => realizarAccion(ev, "cancelar", id)} />
            </div>
        </form>
      </PrivateRoute>
    </section>
  )
}

export default CanjearRecompensa
