import { React, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { apiFetch, destroySession } from '../../utils/api';

async function comprobarValidez(idUsuario, token, tipo) {
    try {
        const json = await apiFetch('token', {
            method: 'POST',
            data: [{
                token,
                id_usuario: idUsuario,
                tipo,
            }],
        });
        return json == 1 || false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function PrivateRoute({ children, rolPermitido }) {
    const token = sessionStorage.getItem('token');
    const tipo = sessionStorage.getItem('tipo');
    const id_usuario = sessionStorage.getItem('id_usuario');

    const [valido, setValido] = useState(null);

    useEffect(() => {
        async function validar() {
            if (!token) {
                setValido(false);
                return;
            }
            const esValido = await comprobarValidez(id_usuario, token, tipo);
            setValido(esValido);
        }

        validar();
    }, [id_usuario, tipo, token]);

    if (valido === null) {
        return <h1 className="cargando d-flex-col">Cargando...</h1>;
    }

    if (!token || !valido) {
        destroySession();
        return <Navigate to="/club/login" replace />;
    }

    if (rolPermitido && tipo !== rolPermitido) {
        destroySession();
        return <Navigate to="/club/login" replace />;
    }

    return children;
}

export default PrivateRoute;
