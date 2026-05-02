import {React, useState, useEffect} from 'react'
import "../../styles/club/Form.css";
import Campo from './Campo';
import HeaderSeccion from '../general/HeaderSeccion'
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link } from "react-router-dom";

const urlAfiliado = "https://lamarta.es/api/route.php/afiliado";
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
          notyf.success('¡Gana 500 puntos de bienvenida si te registras ahora!')
          return true;
        } else {
            window.location.href = '/club/registro/acceso';
        }
    } catch (error) {
        console.error(error);
    }
}

async function register(nombre, apellidos, correo, contrasenia) {
    try {
        const json = await ajax({
            url: urlAfiliado,
            method: "POST",
            data: [{
              nombre: nombre,
              apellidos: apellidos,
              correo: correo,
              contrasenia: contrasenia
            }]
        });

        const notyf = new Notyf({
            position: {
                x: 'right',
                y: 'top'
            }
        });

        if(json.email) {
          notyf.error('Este email ya está registrado.');
        } else {
          if (json.success) {
            window.location.href = '/club/login';
          } else {
            notyf.error('Ha ocurrido un error en el registro.');
          }
        }
    } catch (error) {
        console.error(error);
    }
}

async function hacerRegister(ev, nombre, apellidos, correo, password, password2, privacidad) {
  ev.preventDefault();

  const notyf = new Notyf({
      position: {
          x: 'right',
          y: 'top'
      }
  });

  const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
  if(privacidad) {
    if(nombre && apellidos && password) {
      if(regexEmail.test(correo)) {
        if(password.length > 8 && regexPass.test(password)) {
          if(password == password2) {
            register(nombre, apellidos, correo, password);
          } else {
            notyf.error('Las contraseñas no coinciden.');
          }
        } else {
          notyf.error('El campo contraseña debe tener al menos entre 8 y 16 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
        }
      } else {
        notyf.error('El email no tiene un formato válido o está vacío.');
      }
    } else {
      notyf.error('Un campo está vacío o no tiene el formato adecuado.');
    }
  } else {
    notyf.error('Debes aceptar las políticas de privacidad.');
  }
}


function Register() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [privacidad, setPrivacidad] = useState(false);

  useEffect(() => {
    comprobarRegistro(sessionStorage.getItem('contraseniaRegistro'));
  }, []);
  
  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre="LAMARTA CLUB" />
      <section className='form d-flex-col'>
          <form className='form--campos d-flex-col' onSubmit={(ev) => hacerRegister(ev, nombre, apellidos, correo, password, password2, privacidad)}>

              <Campo 
                id="nombre" 
                nombre="* Nombre" 
                type={"text"} 
                placeholder={"Pablo"} 
                onChange={(ev) => setNombre(ev.target.value)}
              />
              <Campo 
                id="apellidos" 
                nombre="* Apellidos" 
                type={"text"} 
                placeholder={"Gómez Sandoval"} 
                onChange={(ev) => setApellidos(ev.target.value)}
              />
              <Campo 
                id="correo" 
                nombre="* Correo electrónico" 
                type={"email"} 
                placeholder={"tucorreo@ejemplo.com"} 
                onChange={(ev) => setCorreo(ev.target.value)}
              />
              <Campo 
                id="password" 
                nombre="* Contraseña" 
                type={"password"} 
                placeholder={"Introduce tu contraseña"} 
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <Campo 
                id="password2" 
                nombre="* Confirma tu contraseña" 
                type={"password"} 
                placeholder={"Repite tu contraseña"} 
                onChange={(ev) => setPassword2(ev.target.value)}
              />

              <section className="register--politicas d-flex-row">
                <label className='register--privacidad' htmlFor="privacidad"><a href="https://lamarta.es/privacidad">* Acepta la política de privacidad:</a></label>
                <input type="checkbox" name="privacidad" id="privacidad" onChange={() => setPrivacidad(!privacidad)} />
              </section>

              <BotonSubmit mensaje={"Registrarse"} />
          </form>
      </section>
    </>
  )
}

export default Register
