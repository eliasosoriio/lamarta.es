import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderSeccion from '../general/HeaderSeccion';
import '../../styles/carta/Carta.css';
import Entrante from './Entrante';
import HeaderSeccionCarta from './HeaderSeccionCarta';
import ExplicacionMenu from './ExplicacionMenu';
import Hamburguesa from './Hamburguesa';
import ScrollArriba from '../general/ScrollArriba';
import FiltroCarta from './FiltroCarta';
import { apiFetch, formatEuro } from '../../utils/api';

const URL_RECOGER = 'https://r.qamarero.com/lamarta?mode=PICKUP';
const URL_DOMICILIO = 'https://r.qamarero.com/lamarta?mode=DELIVERY';

const animacionFiltro = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.2 },
};

// "Alitas BBQ (6ud.)" y "Alitas BBQ (12ud.)" se muestran como un solo plato con dos precios.
const PATRON_UNIDADES = /^(.*?)\s*\((\d+)\s*ud\.?\)\s*$/i;

function agruparVariantes(productos) {
  const platos = new Map();

  productos.forEach((producto) => {
    const coincidencia = PATRON_UNIDADES.exec(producto.nombre);
    const nombre = coincidencia ? coincidencia[1].trim() : producto.nombre;
    const clave = nombre.toLowerCase();
    const opcion = {
      etiqueta: coincidencia ? `${coincidencia[2]} ud.` : null,
      precio: formatEuro(producto.precio),
    };

    if (platos.has(clave)) {
      platos.get(clave).opciones.push(opcion);
    } else {
      platos.set(clave, { id: producto.id_producto, nombre, opciones: [opcion] });
    }
  });

  return [...platos.values()];
}

function Carta() {
  const [categoria, setCategoria] = useState('Todos');
  const [secciones, setSecciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarCarta() {
      setLoading(true);

      try {
        const [seccionesData, productosData] = await Promise.all([
          apiFetch('seccion'),
          apiFetch('producto'),
        ]);

        setSecciones(seccionesData);
        setProductos(productosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    cargarCarta();
  }, []);

  const seccionesOrdenadas = useMemo(
    () => [...secciones].sort((left, right) => Number(left.orden) - Number(right.orden)),
    [secciones],
  );

  // Con un filtro activo solo se muestra la sección elegida; el resto sale con animación.
  const seccionesVisibles = useMemo(
    () => (categoria === 'Todos'
      ? seccionesOrdenadas
      : seccionesOrdenadas.filter((seccion) => seccion.slug === categoria)),
    [seccionesOrdenadas, categoria],
  );

  const productosPorSeccion = useMemo(() => {
    const grupos = new Map();
    [...productos]
      .sort((left, right) => Number(left.orden) - Number(right.orden))
      .forEach((producto) => {
        const clave = Number(producto.id_seccion);
        if (!grupos.has(clave)) grupos.set(clave, []);
        grupos.get(clave).push(producto);
      });
    return grupos;
  }, [productos]);

  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre={'Carta'}></HeaderSeccion>

      <aside className='carta--pedir' aria-label="Pedir online">
        <p>¿Con hambre? Recoge tu pedido o te lo llevamos a casa. Los miércoles cerramos.</p>
        <div className='carta--pedir__acciones'>
          <a href={URL_RECOGER} target="_blank" rel="noopener noreferrer" className='btn btn--primary'>
            <i className="fa-solid fa-bag-shopping"></i>
            Para recoger
          </a>
          <a href={URL_DOMICILIO} target="_blank" rel="noopener noreferrer" className='btn btn--secondary'>
            <i className="fa-solid fa-motorcycle"></i>
            A domicilio
          </a>
        </div>
      </aside>

      <ul className='filtros d-flex-row'>
        <AnimatePresence mode="popLayout" initial={false}>
          {categoria !== 'Todos' && (
            <motion.li key="limpiar" layout {...animacionFiltro}>
              <FiltroCarta
                mensaje={'✕ Limpiar filtro'}
                onClick={() => setCategoria('Todos')}
                className='limpiar-filtro'
              />
            </motion.li>
          )}

          {seccionesVisibles.map((seccion) => (
            <motion.li key={seccion.id_seccion} layout {...animacionFiltro}>
              <FiltroCarta
                mensaje={seccion.nombre}
                onClick={() => setCategoria(categoria === seccion.slug ? 'Todos' : seccion.slug)}
                className={categoria === seccion.slug ? 'activo' : ''}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {loading && <p className='carta--aviso'>Cargando carta...</p>}

      {!loading && seccionesOrdenadas.length === 0 && (
        <p className='carta--aviso'>No hay secciones publicadas todavia.</p>
      )}

      <div className='carta--contenido'>
        {!loading && seccionesVisibles.map((seccion) => {
          const items = productosPorSeccion.get(Number(seccion.id_seccion)) || [];

          if (items.length === 0) {
            return null;
          }

          const usaDoblePrecio = seccion.tipo_vista === 'lista_precio_doble' || Number(seccion.mostrar_precios) === 1;

          return (
            <section key={seccion.id_seccion} className='carta--seccion' aria-label={seccion.nombre}>
              <HeaderSeccionCarta titulo={seccion.nombre.toUpperCase()} imagen={seccion.icono} />
              {seccion.nota && <ExplicacionMenu explicacion={seccion.nota} />}
              {usaDoblePrecio ? (
                <ul className='hamburguesas d-flex-col' role='list'>
                  {items.map((item) => (
                    <Hamburguesa
                      key={item.id_producto}
                      nombre={item.nombre}
                      carne={item.detalle}
                      ingredientes={item.descripcion}
                      destacado={Number(item.destacado) === 1}
                      etiqueta={seccion.etiqueta_precio || 'BURGER'}
                      precio={formatEuro(item.precio)}
                      etiquetaMenu={seccion.etiqueta_precio_secundario || 'MENU'}
                      precioMenu={item.precio_secundario ? formatEuro(item.precio_secundario) : null}
                    />
                  ))}
                </ul>
              ) : (
                <ul className='entrantes' role='list'>
                  {agruparVariantes(items).map((plato) => (
                    <Entrante key={plato.id} nombre={plato.nombre} opciones={plato.opciones} />
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}

export default Carta;
