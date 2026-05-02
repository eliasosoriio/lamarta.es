import {React, useState, useEffect} from 'react'
import "../../styles/club/Form.css";
import Campo from './Campo';
import HeaderSeccion from '../general/HeaderSeccion'
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const urlRegistro = "https://lamarta.es/api/route.php/register";


async function ajax(options) {
    const {url, method, data} = options;

    try {
        const resp = await fetch(url, {
            method: method || "GET",
            headers: {
                "Content-type":"application/json; charset=utf-8"
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

async function comprobarRegistro(contrasenia) {
    try {
        const json = await ajax({
            url: urlRegistro,
            method: "POST",
            data: [{
              contrasenia: contrasenia
            }]
        });

        const notyf = new Notyf({
            position: {
                x: 'right',
                y: 'top'
            }
        });

        if (json.success) {
            sessionStorage.setItem('contraseniaRegistro', contrasenia);
            window.location.href = '/club/registro';
        } else {
            notyf.error('La contraseña es incorrecta.');
        }
    } catch (error) {
        console.error(error);
    }
}

async function hacerRegistro(ev) {
  ev.preventDefault();

  const notyf = new Notyf({
      position: {
          x: 'right',
          y: 'top'
      }
  });

  if(password.value.length) {
    comprobarRegistro(password.value);
  } else {
    notyf.error('El campo contraseña está vacío o no tiene el formato correcto.');
  }
}


function AccesoRegistro() {
  const [password, setPassword] = useState('');

  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre="LAMARTA CLUB" />
      <section className='form d-flex-col'>
          <form className='form--campos d-flex-col' onSubmit={(ev) => hacerRegistro(ev, password)}>
              <h2 className='form--titulo--h2'>INVITACIÓN NECESARIA</h2>
              <Campo 
                id="password" 
                nombre="Desbloquea el registro" 
                type={"text"} 
                placeholder={"Introduce la contraseña"} 
                onChange={(ev) => setPassword(ev.target.value)}
              />

              <BotonSubmit mensaje={"Acceder a Registro"} />
          </form>
      </section>
    </>
  )
}

export default AccesoRegistro
