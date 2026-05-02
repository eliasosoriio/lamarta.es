import {React, useState, useEffect} from 'react'
import { data, useParams } from 'react-router-dom';
import "../../styles/club/VentanaSecundaria.css";
import Campo from './Campo';
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
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

async function editarRecompensa(id, nombre, descripcion, precio, token) {
    try {
        const json = await ajax({
            url: `${urlRecompensa}/${id}`,
            method: "PATCH",
            data: [{
              id_recompensa: id,
              nombre: nombre,
              descripcion: descripcion,
              precio: precio
            }],
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
          notyf.error("Recompensa no editada.");
        }
    } catch (error) {
        console.error(error);
    }
}


function realizarAccion(ev, accion, id, nombre, descripcion, precio, recompensa) {
  ev.preventDefault();

  const notyf = new Notyf({
      position: {
          x: 'right',
          y: 'top'
      }
  });


  if(accion == "editar") {
    if(recompensa.nombre == nombre && recompensa.descripcion == descripcion && recompensa.precio == precio) {
      notyf.error("Debes editar algún campo de la recompensa.");
    } else {
      if(!nombre || !descripcion || isNaN(precio) || precio <= 0) {
        notyf.error("Alguno de los campos está vacío o no tiene un formato válido.");
      } else {
        editarRecompensa(id, nombre, descripcion, precio, sessionStorage.getItem('token'));
      }
    }
  } else {
    window.location.href = `/club/admin`;
  }
}

function EditarRecompensa() {
  const [recompensa, setRecompensa] = useState({});
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
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
          setNombre(json.nombre);
          setDescripcion(json.descripcion);
          setPrecio(Number(json.precio));
        } catch (error) {
          console.error(error);
        }
      }
  
      getRecompensa(id, sessionStorage.getItem('token'));
    }, [])

  if (!recompensa) return <p className="cargando d-flex-col">Cargando...</p>;

  return (
    <section className='ventana--secundaria d-flex-col'>
      <ScrollArriba />
      <PrivateRoute rolPermitido="admin">
        <form className='ventana--secundaria--form d-flex-col' onSubmit={(ev) => realizarAccion(ev, "editar", id, nombre, descripcion, precio, recompensa)}>
            <Campo 
              nombre="Nombre de la recompensa" 
              type={"text"} 
              placeholder={"Hamburguesa con patatas."} 
              onChange={(ev) => {
                setNombre(ev.target.value);
              }}
              defaultValue={recompensa.nombre}
            />
            <Campo 
              nombre="Descripción de la recompensa" 
              type={"text"} 
              placeholder={"No incluye bebida."} 
              onChange={(ev) => {
                setDescripcion(ev.target.value);
              }}
              defaultValue={recompensa.descripcion}
            />
            <Campo 
              nombre="Precio en puntos de la recompensa" 
              type={"number"} 
              placeholder={"1200"} 
              min={0}
              onChange={(ev) => {
                setPrecio(Number(ev.target.value));
              }}
              defaultValue={recompensa.precio}
            />
            <div className="d-flex d-flex-col ventana--secundaria--form--acciones">
              <BotonSubmit mensaje={"Editar Recompensa"} />
              <BotonSubmit mensaje={"Cancelar"}  button={true} onClick={(ev) => realizarAccion(ev, "cancelar", id, nombre, descripcion, precio)} />
            </div>
        </form>
      </PrivateRoute>
    </section>
  )
}

export default EditarRecompensa
