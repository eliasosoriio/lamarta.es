import {React, useState, useEffect} from 'react'
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

async function anadirRecompensa(nombre, descripcion, precio) {
    try {
      const json = await ajax({ 
        url: urlRecompensa,
        method: 'POST',
        data: [{
          nombre: nombre,
          descripcion: descripcion,
          precio: precio
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
        window.location.href = `/club/admin`;
      } else {
        notyf.error('Recompensa no insertada.');
      }
    } catch (error) {
      console.error('Error al insertar la recompensa.');
    }
}

function realizarAccion(ev, accion, nombre, descripcion, precio) {
  ev.preventDefault();

  const notyf = new Notyf({
      position: {
          x: 'right',
          y: 'top'
      }
  });

  if(accion == "anadir") {
      if(!nombre || !descripcion || isNaN(precio) || precio <= 0) {
        notyf.error("Alguno de los campos está vacío o no tiene un formato válido.");
      } else {
        anadirRecompensa(nombre, descripcion, precio);
      }
    } else {
      window.location.href = `/club/admin`;
    }
}

function AnadirRecompensa() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);

  return (
    <section className='ventana--secundaria d-flex-col'>
      <ScrollArriba />
      <PrivateRoute rolPermitido="admin">
        <form className='ventana--secundaria--form d-flex-col' onSubmit={(ev) => realizarAccion(ev, "anadir", nombre, descripcion, precio)}>
            <Campo 
              nombre="Nombre de la recompensa" 
              type={"text"} 
              placeholder={"Hamburguesa con patatas."} 
              onChange={(ev) => {
                setNombre(ev.target.value);
              }}
            />
            <Campo 
              nombre="Descripción de la recompensa" 
              type={"text"} 
              placeholder={"No incluye bebida."} 
              onChange={(ev) => {
                setDescripcion(ev.target.value);
              }}
            />
            <Campo 
              nombre="Precio en puntos de la recompensa" 
              type={"number"} 
              placeholder={"1200"} 
              min={0}
              onChange={(ev) => {
                setPrecio(ev.target.value);
              }}
            />
            <div className="d-flex d-flex-col ventana--secundaria--form--accione">
              <BotonSubmit mensaje={"Añadir Recompensa"} />
              <BotonSubmit mensaje={"Cancelar"}  button={true} onClick={(ev) => realizarAccion(ev, "cancelar", nombre, descripcion, precio)} />
            </div>
        </form>
      </PrivateRoute>
    </section>
  )
}

export default AnadirRecompensa
