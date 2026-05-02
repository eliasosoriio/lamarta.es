import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderSeccion from '../general/HeaderSeccion';
import '../../styles/carta/Carta.css';
import Entrante from './Entrante';
import HeaderSeccionCarta from './HeaderSeccionCarta';
import ExplicacionMenu from './ExplicacionMenu';
import Hamburguesa from './Hamburguesa';
import ExplicacionPrecios from './ExplicacionPrecios';
import ScrollArriba from '../general/ScrollArriba';
import FiltroCarta from './FiltroCarta';
import { apiFetch, formatEuro } from '../../utils/api';

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

  const seccionesOrdenadas = [...secciones].sort((left, right) => Number(left.orden) - Number(right.orden));

  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre={'Carta'}></HeaderSeccion>

      <ul className='filtros d-flex-row'>
        <AnimatePresence mode="wait">
          {categoria !== 'Todos' && (
            <motion.li
              key="limpiar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <FiltroCarta
                mensaje={'✕ Limpiar filtro'}
                onClick={() => setCategoria('Todos')}
                className='limpiar-filtro'
              />
            </motion.li>
          )}

          {seccionesOrdenadas.map((seccion) => (
            <motion.li
              key={seccion.id_seccion}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <FiltroCarta
                mensaje={seccion.nombre}
                onClick={() => setCategoria(seccion.slug)}
                className={categoria === seccion.slug ? 'activo' : ''}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {loading && <p className='blog--titulo'>Cargando carta...</p>}

      {!loading && seccionesOrdenadas.length === 0 && (
        <p className='blog--titulo'>No hay secciones publicadas todavia.</p>
      )}

      {!loading && seccionesOrdenadas.map((seccion) => {
        if (categoria !== 'Todos' && categoria !== seccion.slug) {
          return null;
        }

        const items = productos
          .filter((producto) => Number(producto.id_seccion) === Number(seccion.id_seccion))
          .sort((left, right) => Number(left.orden) - Number(right.orden));

        if (items.length === 0) {
          return null;
        }

        const usaDoblePrecio = seccion.tipo_vista === 'lista_precio_doble' || Number(seccion.mostrar_precios) === 1;

        return (
          <React.Fragment key={seccion.id_seccion}>
            <HeaderSeccionCarta titulo={seccion.nombre.toUpperCase()} imagen={seccion.icono} />
            {seccion.nota && <ExplicacionMenu explicacion={seccion.nota} />}
            {usaDoblePrecio && (
              <ExplicacionPrecios
                primario={seccion.etiqueta_precio || 'BURGER'}
                secundario={seccion.etiqueta_precio_secundario || 'MENU'}
              />
            )}
            <ul className={usaDoblePrecio ? 'hamburguesas d-flex-col' : 'entrantes d-flex-col'} role='list'>
              {items.map((item) => (
                usaDoblePrecio ? (
                  <Hamburguesa
                    key={item.id_producto}
                    nombre={item.nombre}
                    carne={item.detalle}
                    ingredientes={item.descripcion}
                    precio={formatEuro(item.precio)}
                    precioMenu={item.precio_secundario ? formatEuro(item.precio_secundario) : '-'}
                  />
                ) : (
                  <Entrante
                    key={item.id_producto}
                    nombre={item.nombre}
                    precio={formatEuro(item.precio)}
                  />
                )
              ))}
            </ul>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Carta;
