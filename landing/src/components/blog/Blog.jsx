import '../../styles/blog/Blog.css';
import React, { useEffect, useState } from 'react';
import HeaderSeccion from '../general/HeaderSeccion';
import Articulo from './Articulo';
import ScrollArriba from '../general/ScrollArriba';
import { apiFetch } from '../../utils/api';

function Blog() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarArticulos() {
      setLoading(true);

      try {
        const articulosData = await apiFetch('articulo');
        setArticulos(articulosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    cargarArticulos();
  }, []);

  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre="Blog" />

      <h2 className='blog--titulo'>PULSA EN UN ARTICULO O VIDEO</h2>
      {loading ? (
        <p className='blog--titulo'>Cargando publicaciones...</p>
      ) : (
        <section className="blog--secciones d-flex-col" aria-label="Articulos y videos del blog">
          {articulos.map((articulo) => (
            <Articulo
              key={articulo.id_articulo}
              imagen={articulo.imagen}
              titulo={articulo.titulo}
              descripcion={articulo.resumen}
              href={articulo.enlace}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Blog;
