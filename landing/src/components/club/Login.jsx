import { React, useEffect, useState } from 'react'
import "../../styles/club/Form.css";
import Campo from './Campo';
import HeaderSeccion from '../general/HeaderSeccion'
import BotonSubmit from './BotonSubmit';
import ScrollArriba from '../general/ScrollArriba'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { apiFetch, destroySession } from '../../utils/api';

async function singIn(usuario, contrasenia) {
    try {
        const json = await apiFetch('login', {
            method: 'POST',
            data: [{
              usuario,
              contrasenia
            }]
        });

        const notyf = new Notyf({
            position: {
                x: 'right',
                y: 'top'
            }
        });

        if (json.token) {
            sessionStorage.setItem('token', json.token);
            sessionStorage.setItem('tipo', json.tipo);
            sessionStorage.setItem('id_usuario', json.id);

            if (json.tipo === 'admin') {
                window.location.href = '/dashboard';
            } else {
            destroySession();
            notyf.error('Este acceso esta reservado para administracion.');
            }
        } else {
            notyf.error('El usuario o la contraseña son incorrectos.');
        }
    } catch (error) {
        console.error(error);
    }
}

async function comprobarValidez(id_usuario, token, tipo) {
    try {
    const json = await apiFetch('token', {
      method: 'POST',
            data: [{
              token: token,
              id_usuario: id_usuario,
              tipo: tipo
            }]
        });
        return json == 1 || false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function hacerLogin(ev, correo, password) {
  ev.preventDefault();
  const notyf = new Notyf({
      position: {
          x: 'right',
          y: 'top'
      }
  });
  const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
  if(regexEmail.test(correo)) {
    if(password.length > 0) {
      singIn(correo, password);
    } else {
      notyf.error('Debes introducir una contraseña para iniciar sesión.');
    }
  } else {
    notyf.error('El email no tiene un formato válido.');
  }
}


function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const tipo = sessionStorage.getItem('tipo');
    const id_usuario = sessionStorage.getItem('id_usuario');

    if (token && tipo) {
      comprobarValidez(id_usuario, token, tipo).then((esValido) => {
        if (esValido) {
          if (tipo === 'admin') {
            window.location.href = '/dashboard';
          }
        }
      });
    }
  }, []);

  return (
    <>
      <ScrollArriba />
        <HeaderSeccion nombre="PANEL LAMARTA" />
      <section className='form d-flex-col'>
          <form className='form--campos d-flex-col' onSubmit={(ev) => hacerLogin(ev, correo, password)}>
              <Campo
                id="correo"
                nombre="Correo electrónico"
                type={"email"}
                placeholder={"tucorreo@ejemplo.com"}
                onChange={(ev) => setCorreo(ev.target.value)}
              />
              <Campo
                id="password"
                nombre="Contraseña"
                type={"password"}
                placeholder={"Introduce tu contraseña"}
                onChange={(ev) => setPassword(ev.target.value)}
              />

              <div className="d-flex d-flex-col form--acciones">
                <BotonSubmit mensaje={"Iniciar Sesión"} />
              </div>
          </form>
      </section>
    </>
  )
}

export default Login
