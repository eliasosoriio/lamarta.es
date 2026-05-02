import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import '../../styles/club/Panel.css';
import CustomSelect from './CustomSelect';
import HeaderSeccion from '../general/HeaderSeccion';
import ScrollArriba from '../general/ScrollArriba';
import {
  apiFetch,
  destroySession,
  formatEuro,
  getSession,
  toBooleanNumber,
} from '../../utils/api';

const notyf = new Notyf({
  position: {
    x: 'right',
    y: 'top',
  },
});

const sectionTypes = [
  { value: 'lista_simple', label: 'Lista simple' },
  { value: 'lista_precio_doble', label: 'Lista con doble precio' },
];

const booleanOptions = [
  { value: true, label: 'Si' },
  { value: false, label: 'No' },
];

const initialSectionForm = {
  nombre: '',
  slug: '',
  descripcion: '',
  icono: '',
  tipo_vista: 'lista_simple',
  nota: '',
  mostrar_precios: false,
  etiqueta_precio: 'BURGER',
  etiqueta_precio_secundario: 'MENU',
  orden: 0,
  visible: true,
};

const initialProductForm = {
  id_seccion: '',
  nombre: '',
  detalle: '',
  descripcion: '',
  precio: '',
  precio_secundario: '',
  destacado: false,
  orden: 0,
  visible: true,
};

const initialArticleForm = {
  titulo: '',
  resumen: '',
  imagen: '',
  enlace: '',
  tipo_enlace: 'externo',
  fecha_publicacion: new Date().toISOString().slice(0, 10),
  orden: 0,
  publicado: true,
};

const moduleConfig = {
  home: {
    title: 'Dashboard',
    eyebrow: 'Resumen',
  },
  secciones: {
    title: 'Secciones de carta',
    eyebrow: 'Carta',
    createLabel: 'Nueva seccion',
    editLabel: 'Editar seccion',
  },
  productos: {
    title: 'Productos',
    eyebrow: 'Carta',
    createLabel: 'Nuevo producto',
    editLabel: 'Editar producto',
  },
  articulos: {
    title: 'Articulos del blog',
    eyebrow: 'Blog',
    createLabel: 'Nuevo articulo',
    editLabel: 'Editar articulo',
  },
};

const moduleRoutes = {
  secciones: '/secciones',
  productos: '/productos',
  articulos: '/articulos',
};

function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function sortByOrder(items, idKey) {
  return [...items].sort((left, right) => {
    const byOrder = Number(left.orden) - Number(right.orden);
    if (byOrder !== 0) {
      return byOrder;
    }

    return Number(left[idKey]) - Number(right[idKey]);
  });
}

function usesSimpleProductLayout(section) {
  if (!section) {
    return false;
  }

  return section.tipo_vista === 'lista_simple' && Number(section.mostrar_precios) !== 1;
}

function getNextProductOrder(products, sectionId, excludedProductId = null) {
  const sectionProducts = products.filter((product) => {
    if (String(product.id_seccion) !== String(sectionId)) {
      return false;
    }

    if (excludedProductId !== null && Number(product.id_producto) === Number(excludedProductId)) {
      return false;
    }

    return true;
  });

  if (sectionProducts.length === 0) {
    return 1;
  }

  return Math.max(...sectionProducts.map((product) => Number(product.orden) || 0)) + 1;
}

function getAdminScreen(pathname) {
  if (pathname === '/dashboard') {
    return { module: 'home', mode: 'dashboard', entityId: null };
  }

  const sectionMatch = pathname.match(/^\/secciones(?:\/(new|([^/]+)\/edit))?$/);
  if (sectionMatch) {
    if (sectionMatch[1] === 'new') {
      return { module: 'secciones', mode: 'new', entityId: null };
    }

    return {
      module: 'secciones',
      mode: sectionMatch[2] ? 'edit' : 'list',
      entityId: sectionMatch[2] ? Number(sectionMatch[2]) : null,
    };
  }

  const productMatch = pathname.match(/^\/productos(?:\/(new|([^/]+)\/edit))?$/);
  if (productMatch) {
    if (productMatch[1] === 'new') {
      return { module: 'productos', mode: 'new', entityId: null };
    }

    return {
      module: 'productos',
      mode: productMatch[2] ? 'edit' : 'list',
      entityId: productMatch[2] ? Number(productMatch[2]) : null,
    };
  }

  const articleMatch = pathname.match(/^\/articulos(?:\/(new|([^/]+)\/edit))?$/);
  if (articleMatch) {
    if (articleMatch[1] === 'new') {
      return { module: 'articulos', mode: 'new', entityId: null };
    }

    return {
      module: 'articulos',
      mode: articleMatch[2] ? 'edit' : 'list',
      entityId: articleMatch[2] ? Number(articleMatch[2]) : null,
    };
  }

  return { module: 'home', mode: 'dashboard', entityId: null };
}

function PanelAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, idUsuario } = getSession();
  const screen = getAdminScreen(location.pathname);
  const [admin, setAdmin] = useState({});
  const [secciones, setSecciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [sectionForm, setSectionForm] = useState(initialSectionForm);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [articleForm, setArticleForm] = useState(initialArticleForm);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [draggedProductId, setDraggedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token || !idUsuario) {
      return;
    }

    cargarPanel();
  }, [idUsuario, token]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (screen.module === 'secciones') {
      if (screen.mode === 'new') {
        setEditingSectionId(null);
        setSectionForm(initialSectionForm);
      }

      if (screen.mode === 'edit') {
        const section = secciones.find((item) => Number(item.id_seccion) === screen.entityId);

        if (!section) {
          navigate(moduleRoutes.secciones, { replace: true });
          return;
        }

        setEditingSectionId(section.id_seccion);
        setSectionForm({
          nombre: section.nombre ?? '',
          slug: section.slug ?? '',
          descripcion: section.descripcion ?? '',
          icono: section.icono ?? '',
          tipo_vista: section.tipo_vista ?? 'lista_simple',
          nota: section.nota ?? '',
          mostrar_precios: Number(section.mostrar_precios) === 1,
          etiqueta_precio: section.etiqueta_precio ?? 'BURGER',
          etiqueta_precio_secundario: section.etiqueta_precio_secundario ?? 'MENU',
          orden: Number(section.orden ?? 0),
          visible: Number(section.visible) === 1,
        });
      }
    }

    if (screen.module === 'productos') {
      if (screen.mode === 'new') {
        const defaultSectionId = secciones[0]?.id_seccion ?? '';
        setEditingProductId(null);
        setProductForm({
          ...initialProductForm,
          id_seccion: defaultSectionId,
          orden: defaultSectionId ? getNextProductOrder(productos, defaultSectionId) : 1,
        });
      }

      if (screen.mode === 'edit') {
        const product = productos.find((item) => Number(item.id_producto) === screen.entityId);

        if (!product) {
          navigate(moduleRoutes.productos, { replace: true });
          return;
        }

        setEditingProductId(product.id_producto);
        setProductForm({
          id_seccion: String(product.id_seccion ?? ''),
          nombre: product.nombre ?? '',
          detalle: product.detalle ?? '',
          descripcion: product.descripcion ?? '',
          precio: product.precio ?? '',
          precio_secundario: product.precio_secundario ?? '',
          destacado: Number(product.destacado) === 1,
          orden: Number(product.orden ?? 0),
          visible: Number(product.visible) === 1,
        });
      }
    }

    if (screen.module === 'articulos') {
      if (screen.mode === 'new') {
        setEditingArticleId(null);
        setArticleForm({
          ...initialArticleForm,
          fecha_publicacion: new Date().toISOString().slice(0, 10),
        });
      }

      if (screen.mode === 'edit') {
        const article = articulos.find((item) => Number(item.id_articulo) === screen.entityId);

        if (!article) {
          navigate(moduleRoutes.articulos, { replace: true });
          return;
        }

        setEditingArticleId(article.id_articulo);
        setArticleForm({
          titulo: article.titulo ?? '',
          resumen: article.resumen ?? '',
          imagen: article.imagen ?? '',
          enlace: article.enlace ?? '',
          tipo_enlace: article.tipo_enlace ?? 'externo',
          fecha_publicacion: article.fecha_publicacion ?? new Date().toISOString().slice(0, 10),
          orden: Number(article.orden ?? 0),
          publicado: Number(article.publicado) === 1,
        });
      }
    }
  }, [articulos, loading, navigate, productos, screen.entityId, screen.mode, screen.module, secciones]);

  async function cargarPanel() {
    setLoading(true);

    try {
      const [adminData, seccionesData, productosData, articulosData] = await Promise.all([
        apiFetch(`admin/${idUsuario}`, { token }),
        apiFetch('seccion', { token }),
        apiFetch('producto', { token }),
        apiFetch('articulo', { token }),
      ]);

      setAdmin(adminData);
      setSecciones(sortByOrder(seccionesData, 'id_seccion'));
      setProductos(sortByOrder(productosData, 'id_producto'));
      setArticulos(sortByOrder(articulosData, 'id_articulo'));
    } catch (error) {
      console.error(error);
      notyf.error('No se pudo cargar el panel de administracion.');
    } finally {
      setLoading(false);
    }
  }

  function hacerLogout(event) {
    event.preventDefault();
    destroySession();
    window.location.href = '/club/login';
  }

  function resetSectionEditor() {
    setEditingSectionId(null);
    setSectionForm(initialSectionForm);
    navigate(moduleRoutes.secciones);
  }

  function resetProductEditor() {
    const defaultSectionId = secciones[0]?.id_seccion ?? '';
    setEditingProductId(null);
    setProductForm({
      ...initialProductForm,
      id_seccion: defaultSectionId,
      orden: defaultSectionId ? getNextProductOrder(productos, defaultSectionId) : 1,
    });
    navigate(moduleRoutes.productos);
  }

  function resetArticleEditor() {
    setEditingArticleId(null);
    setArticleForm({
      ...initialArticleForm,
      fecha_publicacion: new Date().toISOString().slice(0, 10),
    });
    navigate(moduleRoutes.articulos);
  }

  function openCreateSection() {
    navigate('/secciones/new');
  }

  function openCreateProduct() {
    navigate('/productos/new');
  }

  function openCreateArticle() {
    navigate('/articulos/new');
  }

  function startEditingSection(section) {
    navigate(`/secciones/${section.id_seccion}/edit`);
  }

  function startEditingProduct(product) {
    navigate(`/productos/${product.id_producto}/edit`);
  }

  function startEditingArticle(article) {
    navigate(`/articulos/${article.id_articulo}/edit`);
  }

  function buildSectionPayload(section) {
    return {
      nombre: section.nombre ?? '',
      slug: section.slug ? slugify(section.slug) : slugify(section.nombre ?? ''),
      descripcion: section.descripcion ?? '',
      icono: section.icono ?? '',
      tipo_vista: section.tipo_vista ?? 'lista_simple',
      nota: section.nota ?? '',
      mostrar_precios: toBooleanNumber(Number(section.mostrar_precios) === 1 || section.mostrar_precios === true),
      etiqueta_precio: section.etiqueta_precio ?? 'BURGER',
      etiqueta_precio_secundario: section.etiqueta_precio_secundario ?? 'MENU',
      orden: Number(section.orden || 0),
      visible: toBooleanNumber(Number(section.visible) === 1 || section.visible === true),
    };
  }

  function buildProductPayload(product) {
    const selectedSection = secciones.find(
      (section) => String(section.id_seccion) === String(product.id_seccion)
    );
    const isSimpleLayout = usesSimpleProductLayout(selectedSection);

    return {
      id_seccion: Number(product.id_seccion),
      nombre: product.nombre ?? '',
      detalle: isSimpleLayout ? '' : product.detalle ?? '',
      descripcion: isSimpleLayout ? '' : product.descripcion ?? '',
      precio: Number(product.precio || 0),
      precio_secundario: isSimpleLayout || product.precio_secundario === '' || product.precio_secundario === null ? null : Number(product.precio_secundario),
      destacado: toBooleanNumber(Number(product.destacado) === 1 || product.destacado === true),
      orden: Number(product.orden || 0),
      visible: toBooleanNumber(Number(product.visible) === 1 || product.visible === true),
    };
  }

  function buildArticlePayload(article) {
    return {
      titulo: article.titulo ?? '',
      resumen: article.resumen ?? '',
      imagen: article.imagen ?? '',
      enlace: article.enlace ?? '',
      tipo_enlace: article.tipo_enlace ?? 'externo',
      fecha_publicacion: article.fecha_publicacion,
      orden: Number(article.orden || 0),
      publicado: toBooleanNumber(Number(article.publicado) === 1 || article.publicado === true),
    };
  }

  async function submitSection(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await apiFetch(editingSectionId ? `seccion/${editingSectionId}` : 'seccion', {
        method: editingSectionId ? 'PATCH' : 'POST',
        data: buildSectionPayload(sectionForm),
        token,
      });

      notyf.success(editingSectionId ? 'Seccion actualizada.' : 'Seccion creada.');
      await cargarPanel();
      navigate(moduleRoutes.secciones);
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo guardar la seccion.');
    } finally {
      setSaving(false);
    }
  }

  async function submitProduct(event) {
    event.preventDefault();

    if (!productForm.id_seccion) {
      notyf.error('Selecciona una seccion antes de guardar un producto.');
      return;
    }

    setSaving(true);

    try {
      await apiFetch(editingProductId ? `producto/${editingProductId}` : 'producto', {
        method: editingProductId ? 'PATCH' : 'POST',
        data: buildProductPayload(productForm),
        token,
      });

      notyf.success(editingProductId ? 'Producto actualizado.' : 'Producto creado.');
      await cargarPanel();
      navigate(moduleRoutes.productos);
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo guardar el producto.');
    } finally {
      setSaving(false);
    }
  }

  async function submitArticle(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await apiFetch(editingArticleId ? `articulo/${editingArticleId}` : 'articulo', {
        method: editingArticleId ? 'PATCH' : 'POST',
        data: buildArticlePayload(articleForm),
        token,
      });

      notyf.success(editingArticleId ? 'Articulo actualizado.' : 'Articulo creado.');
      await cargarPanel();
      navigate(moduleRoutes.articulos);
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo guardar el articulo.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleSectionVisibility(section) {
    try {
      await apiFetch(`seccion/${section.id_seccion}`, {
        method: 'PATCH',
        data: buildSectionPayload({
          ...section,
          visible: Number(section.visible) === 1 ? 0 : 1,
        }),
        token,
      });
      notyf.success(Number(section.visible) === 1 ? 'Seccion desactivada.' : 'Seccion activada.');
      await cargarPanel();
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo cambiar el estado de la seccion.');
    }
  }

  async function toggleProductVisibility(product) {
    try {
      await apiFetch(`producto/${product.id_producto}`, {
        method: 'PATCH',
        data: buildProductPayload({
          ...product,
          visible: Number(product.visible) === 1 ? 0 : 1,
        }),
        token,
      });
      notyf.success(Number(product.visible) === 1 ? 'Producto desactivado.' : 'Producto activado.');
      await cargarPanel();
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo cambiar el estado del producto.');
    }
  }

  async function toggleArticleVisibility(article) {
    try {
      await apiFetch(`articulo/${article.id_articulo}`, {
        method: 'PATCH',
        data: buildArticlePayload({
          ...article,
          publicado: Number(article.publicado) === 1 ? 0 : 1,
        }),
        token,
      });
      notyf.success(Number(article.publicado) === 1 ? 'Articulo despublicado.' : 'Articulo publicado.');
      await cargarPanel();
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo cambiar el estado del articulo.');
    }
  }

  async function removeSection(sectionId) {
    if (!window.confirm('Esta accion eliminara tambien los productos de la seccion.')) {
      return;
    }

    try {
      await apiFetch(`seccion/${sectionId}`, { method: 'DELETE', token });
      notyf.success('Seccion eliminada.');
      if (editingSectionId === sectionId) {
        navigate(moduleRoutes.secciones);
      }
      await cargarPanel();
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo eliminar la seccion.');
    }
  }

  async function removeProduct(productId) {
    if (!window.confirm('Se eliminara este producto de la carta.')) {
      return;
    }

    try {
      await apiFetch(`producto/${productId}`, { method: 'DELETE', token });
      notyf.success('Producto eliminado.');
      if (editingProductId === productId) {
        navigate(moduleRoutes.productos);
      }
      await cargarPanel();
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo eliminar el producto.');
    }
  }

  async function removeArticle(articleId) {
    if (!window.confirm('Se eliminara este articulo del blog.')) {
      return;
    }

    try {
      await apiFetch(`articulo/${articleId}`, { method: 'DELETE', token });
      notyf.success('Articulo eliminado.');
      if (editingArticleId === articleId) {
        navigate(moduleRoutes.articulos);
      }
      await cargarPanel();
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo eliminar el articulo.');
    }
  }

  async function reorderProducts(draggedId, targetId) {
    if (!draggedId || !targetId || Number(draggedId) === Number(targetId)) {
      return;
    }

    const draggedProduct = productos.find((product) => Number(product.id_producto) === Number(draggedId));
    const targetProduct = productos.find((product) => Number(product.id_producto) === Number(targetId));

    if (!draggedProduct || !targetProduct || Number(draggedProduct.id_seccion) !== Number(targetProduct.id_seccion)) {
      return;
    }

    const sectionId = draggedProduct.id_seccion;
    const sectionProducts = productos
      .filter((product) => Number(product.id_seccion) === Number(sectionId))
      .sort((left, right) => {
        const byOrder = Number(left.orden) - Number(right.orden);
        if (byOrder !== 0) {
          return byOrder;
        }

        return Number(left.id_producto) - Number(right.id_producto);
      });

    const draggedIndex = sectionProducts.findIndex((product) => Number(product.id_producto) === Number(draggedId));
    const targetIndex = sectionProducts.findIndex((product) => Number(product.id_producto) === Number(targetId));

    if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
      return;
    }

    const reorderedSectionProducts = [...sectionProducts];
    const [draggedItem] = reorderedSectionProducts.splice(draggedIndex, 1);
    reorderedSectionProducts.splice(targetIndex, 0, draggedItem);

    const updatedSectionProducts = reorderedSectionProducts.map((product, index) => ({
      ...product,
      orden: index + 1,
    }));

    const changedProducts = updatedSectionProducts.filter(
      (updatedProduct) => Number(updatedProduct.orden) !== Number(sectionProducts.find((product) => Number(product.id_producto) === Number(updatedProduct.id_producto))?.orden)
    );

    setProductos((currentProducts) => {
      const updates = new Map(updatedSectionProducts.map((product) => [Number(product.id_producto), product]));
      return currentProducts.map((product) => updates.get(Number(product.id_producto)) ?? product);
    });

    try {
      await Promise.all(
        changedProducts.map((product) => apiFetch(`producto/${product.id_producto}`, {
          method: 'PATCH',
          data: buildProductPayload(product),
          token,
        }))
      );

      notyf.success('Orden de productos actualizado.');
    } catch (error) {
      console.error(error);
      notyf.error(error.message || 'No se pudo reordenar la seccion.');
      await cargarPanel();
    }
  }

  const seccionesOrdenadas = sortByOrder(secciones, 'id_seccion');
  const productosOrdenados = [...productos].sort((left, right) => {
    const leftSection = seccionesOrdenadas.find((section) => Number(section.id_seccion) === Number(left.id_seccion));
    const rightSection = seccionesOrdenadas.find((section) => Number(section.id_seccion) === Number(right.id_seccion));
    const bySection = Number(leftSection?.orden ?? 0) - Number(rightSection?.orden ?? 0);

    if (bySection !== 0) {
      return bySection;
    }

    const byOrder = Number(left.orden) - Number(right.orden);
    if (byOrder !== 0) {
      return byOrder;
    }

    return Number(left.id_producto) - Number(right.id_producto);
  });
  const articulosOrdenados = [...articulos].sort((left, right) => {
    const byDate = String(right.fecha_publicacion).localeCompare(String(left.fecha_publicacion));
    if (byDate !== 0) {
      return byDate;
    }

    return Number(right.id_articulo) - Number(left.id_articulo);
  });

  const sectionLabels = Object.fromEntries(
    seccionesOrdenadas.map((section) => [section.id_seccion, section.nombre])
  );
  const selectedProductSection = seccionesOrdenadas.find(
    (section) => String(section.id_seccion) === String(productForm.id_seccion)
  );
  const productUsesSimpleLayout = usesSimpleProductLayout(selectedProductSection);
  const groupedProducts = seccionesOrdenadas
    .map((section) => ({
      section,
      items: productosOrdenados.filter((product) => Number(product.id_seccion) === Number(section.id_seccion)),
    }))
    .filter((group) => group.items.length > 0);

  function renderHome() {
    return (
      <section className="panel-dashboard panel-dashboard--products-only">
        <div className="panel-resumen">
          <article className="panel-resumen__card">
            <span>Productos</span>
            <strong>{productos.length}</strong>
          </article>
        </div>

        <div className="panel-modules">
          <button className="panel-module" type="button" onClick={() => navigate(moduleRoutes.productos)}>
            <p className="panel-cms__eyebrow">Carta</p>
            <h2>Productos</h2>
            <p>Gestiona precios, descripciones, destacados y activacion.</p>
            <span>{productos.length} registros</span>
          </button>
        </div>
      </section>
    );
  }

  function renderSectionEditor() {
    if (screen.module !== 'secciones' || screen.mode === 'list') {
      return null;
    }

    return (
      <form className="panel-form panel-editor" onSubmit={submitSection}>
        <label>
          Nombre
          <input
            value={sectionForm.nombre}
            onChange={(event) => setSectionForm((current) => ({ ...current, nombre: event.target.value }))}
            required
          />
        </label>
        <label>
          Slug
          <input
            value={sectionForm.slug}
            onChange={(event) => setSectionForm((current) => ({ ...current, slug: event.target.value }))}
            placeholder="se-genera-si-lo-dejas-vacio"
          />
        </label>
        <label>
          Descripcion interna
          <textarea
            rows="2"
            value={sectionForm.descripcion}
            onChange={(event) => setSectionForm((current) => ({ ...current, descripcion: event.target.value }))}
          />
        </label>
        <label>
          Icono o imagen de cabecera
          <input
            value={sectionForm.icono}
            onChange={(event) => setSectionForm((current) => ({ ...current, icono: event.target.value }))}
            placeholder="https://..."
          />
        </label>
        <label>
          Tipo de vista
          <CustomSelect
            value={sectionForm.tipo_vista}
            options={sectionTypes}
            onChange={(nextValue) => setSectionForm((current) => ({ ...current, tipo_vista: nextValue }))}
          />
        </label>
        <label>
          Texto auxiliar
          <textarea
            rows="3"
            value={sectionForm.nota}
            onChange={(event) => setSectionForm((current) => ({ ...current, nota: event.target.value }))}
            placeholder="Explicacion del menu o aclaracion de precios"
          />
        </label>
        <div className="panel-form__row">
          <label>
            Etiqueta precio 1
            <input
              value={sectionForm.etiqueta_precio}
              onChange={(event) => setSectionForm((current) => ({ ...current, etiqueta_precio: event.target.value }))}
            />
          </label>
          <label>
            Etiqueta precio 2
            <input
              value={sectionForm.etiqueta_precio_secundario}
              onChange={(event) => setSectionForm((current) => ({ ...current, etiqueta_precio_secundario: event.target.value }))}
            />
          </label>
        </div>
        <div className="panel-form__row panel-form__row--compact">
          <label>
            Orden
            <input
              type="number"
              value={sectionForm.orden}
              onChange={(event) => setSectionForm((current) => ({ ...current, orden: event.target.value }))}
            />
          </label>
          <label>
            Mostrar doble precio
            <CustomSelect
              value={sectionForm.mostrar_precios}
              options={booleanOptions}
              onChange={(nextValue) => setSectionForm((current) => ({ ...current, mostrar_precios: nextValue }))}
            />
          </label>
        </div>
        <div className="panel-form__actions">
          <button className="panel-cms__ghost panel-form__cancel" type="button" onClick={resetSectionEditor}>
            Cancelar
          </button>
          <button className="button--submit" type="submit" disabled={saving}>
            {screen.mode === 'edit' ? 'Guardar seccion' : 'Crear seccion'}
          </button>
        </div>
      </form>
    );
  }

  function renderProductEditor() {
    if (screen.module !== 'productos' || screen.mode === 'list') {
      return null;
    }

    return (
      <form className="panel-form panel-editor" onSubmit={submitProduct}>
        <label>
          Seccion
          <CustomSelect
            value={productForm.id_seccion}
            placeholder="Selecciona una seccion"
            options={seccionesOrdenadas.map((section) => ({
              value: section.id_seccion,
              label: section.nombre,
            }))}
            onChange={(nextValue) => {
              const nextSection = seccionesOrdenadas.find(
                (section) => String(section.id_seccion) === String(nextValue)
              );
              const isSimpleLayout = usesSimpleProductLayout(nextSection);
              const nextOrder = getNextProductOrder(productos, nextValue, editingProductId);

              setProductForm((current) => ({
                ...current,
                id_seccion: String(nextValue),
                orden: nextOrder,
                detalle: isSimpleLayout ? '' : current.detalle,
                descripcion: isSimpleLayout ? '' : current.descripcion,
                precio_secundario: isSimpleLayout ? '' : current.precio_secundario,
              }));
            }}
          />
        </label>
        <label>
          Nombre
          <input
            value={productForm.nombre}
            onChange={(event) => setProductForm((current) => ({ ...current, nombre: event.target.value }))}
            required
          />
        </label>
        {!productUsesSimpleLayout && (
          <>
            <label>
              Detalle corto
              <input
                value={productForm.detalle}
                onChange={(event) => setProductForm((current) => ({ ...current, detalle: event.target.value }))}
                placeholder="Ej. SMASH BURGER (TERNERA 80 G)"
              />
            </label>
            <label>
              Descripcion
              <textarea
                rows="3"
                value={productForm.descripcion}
                onChange={(event) => setProductForm((current) => ({ ...current, descripcion: event.target.value }))}
              />
            </label>
          </>
        )}
        <div className="panel-form__row">
          <label>
            Precio principal
            <input
              type="number"
              step="0.01"
              min="0"
              value={productForm.precio}
              onChange={(event) => setProductForm((current) => ({ ...current, precio: event.target.value }))}
              required
            />
          </label>
          {!productUsesSimpleLayout && (
            <label>
              Precio secundario
              <input
                type="number"
                step="0.01"
                min="0"
                value={productForm.precio_secundario}
                onChange={(event) => setProductForm((current) => ({ ...current, precio_secundario: event.target.value }))}
              />
            </label>
          )}
        </div>
        <div className="panel-form__actions">
          <button className="panel-cms__ghost panel-form__cancel" type="button" onClick={resetProductEditor}>
            Cancelar
          </button>
          <button className="button--submit" type="submit" disabled={saving}>
            {screen.mode === 'edit' ? 'Guardar producto' : 'Crear producto'}
          </button>
        </div>
      </form>
    );
  }

  function renderArticleEditor() {
    if (screen.module !== 'articulos' || screen.mode === 'list') {
      return null;
    }

    return (
      <form className="panel-form panel-editor" onSubmit={submitArticle}>
        <label>
          Titulo
          <input
            value={articleForm.titulo}
            onChange={(event) => setArticleForm((current) => ({ ...current, titulo: event.target.value }))}
            required
          />
        </label>
        <label>
          Resumen
          <textarea
            rows="3"
            value={articleForm.resumen}
            onChange={(event) => setArticleForm((current) => ({ ...current, resumen: event.target.value }))}
            required
          />
        </label>
        <div className="panel-form__row">
          <label>
            Imagen
            <input
              value={articleForm.imagen}
              onChange={(event) => setArticleForm((current) => ({ ...current, imagen: event.target.value }))}
              placeholder="https://..."
            />
          </label>
          <label>
            Enlace
            <input
              value={articleForm.enlace}
              onChange={(event) => setArticleForm((current) => ({ ...current, enlace: event.target.value }))}
              required
            />
          </label>
        </div>
        <div className="panel-form__row panel-form__row--compact">
          <label>
            Tipo de enlace
            <CustomSelect
              value={articleForm.tipo_enlace}
              options={[{ value: 'externo', label: 'Externo' }]}
              onChange={(nextValue) => setArticleForm((current) => ({ ...current, tipo_enlace: nextValue }))}
            />
          </label>
          <label>
            Fecha
            <input
              type="date"
              value={articleForm.fecha_publicacion}
              onChange={(event) => setArticleForm((current) => ({ ...current, fecha_publicacion: event.target.value }))}
              required
            />
          </label>
          <label>
            Orden
            <input
              type="number"
              value={articleForm.orden}
              onChange={(event) => setArticleForm((current) => ({ ...current, orden: event.target.value }))}
            />
          </label>
        </div>
        <div className="panel-form__actions">
          <button className="panel-cms__ghost panel-form__cancel" type="button" onClick={resetArticleEditor}>
            Cancelar
          </button>
          <button className="button--submit" type="submit" disabled={saving}>
            {screen.mode === 'edit' ? 'Guardar articulo' : 'Crear articulo'}
          </button>
        </div>
      </form>
    );
  }

  function renderSectionList() {
    return (
      <div className="panel-crud">
        <div className="panel-crud__toolbar">
          <button className="panel-icon-button panel-icon-button--back" type="button" title="Volver al dashboard" aria-label="Volver al dashboard" onClick={() => navigate('/dashboard')}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="button--submit panel-crud__create" type="button" onClick={openCreateSection}>
            Nueva seccion
          </button>
        </div>
        <div className="panel-list panel-list--table">
          {seccionesOrdenadas.map((section) => (
            <article className="panel-item" key={section.id_seccion}>
              <div>
                <h3>{section.nombre}</h3>
                <p>{section.slug} · Orden {section.orden}</p>
              </div>
              <div className="panel-item__meta">
                <span className={`panel-status-indicator ${Number(section.visible) === 1 ? 'is-active' : 'is-inactive'}`} title={Number(section.visible) === 1 ? 'Seccion activa' : 'Seccion desactivada'} aria-label={Number(section.visible) === 1 ? 'Seccion activa' : 'Seccion desactivada'}>
                  <span className="panel-status-indicator__dot"></span>
                </span>
                <button type="button" className="panel-icon-button" title="Editar seccion" aria-label="Editar seccion" onClick={() => startEditingSection(section)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  type="button"
                  className="panel-icon-button panel-icon-button--toggle"
                  title={Number(section.visible) === 1 ? 'Desactivar seccion' : 'Activar seccion'}
                  aria-label={Number(section.visible) === 1 ? 'Desactivar seccion' : 'Activar seccion'}
                  onClick={() => toggleSectionVisibility(section)}
                >
                  <i className={`fa-solid ${Number(section.visible) === 1 ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <button type="button" className="panel-icon-button panel-icon-button--danger" title="Borrar seccion" aria-label="Borrar seccion" onClick={() => removeSection(section.id_seccion)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  function renderProductList() {
    return (
      <div className="panel-crud">
        <div className="panel-crud__toolbar">
          <button className="panel-icon-button panel-icon-button--back" type="button" title="Volver al dashboard" aria-label="Volver al dashboard" onClick={() => navigate('/dashboard')}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="button--submit panel-crud__create" type="button" onClick={openCreateProduct}>
            Nuevo producto
          </button>
        </div>
        <div className="panel-list panel-list--table">
          {groupedProducts.map(({ section, items }) => (
            <section className="panel-product-group" key={section.id_seccion}>
              <header className="panel-product-group__header">
                <h3>{section.nombre}</h3>
                <p>{items.length} productos</p>
              </header>
              <div className="panel-product-group__list">
                {items.map((product) => (
                  <article
                    className={`panel-item panel-item--draggable ${Number(draggedProductId) === Number(product.id_producto) ? 'is-dragging' : ''}`}
                    key={product.id_producto}
                    draggable
                    onDragStart={() => setDraggedProductId(product.id_producto)}
                    onDragEnd={() => setDraggedProductId(null)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={async () => {
                      const currentDraggedId = draggedProductId;
                      setDraggedProductId(null);
                      await reorderProducts(currentDraggedId, product.id_producto);
                    }}
                  >
                    <div className="panel-item__main">
                      <span className="panel-drag-handle" aria-hidden="true">
                        <i className="fa-solid fa-grip-vertical"></i>
                      </span>
                      <div>
                        <h3>{product.nombre}</h3>
                        <p>
                          Orden {product.orden} · {formatEuro(product.precio)}
                          {product.precio_secundario ? ` / ${formatEuro(product.precio_secundario)}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="panel-item__meta">
                      <span className={`panel-status-indicator ${Number(product.visible) === 1 ? 'is-active' : 'is-inactive'}`} title={Number(product.visible) === 1 ? 'Producto activo' : 'Producto desactivado'} aria-label={Number(product.visible) === 1 ? 'Producto activo' : 'Producto desactivado'}>
                        <span className="panel-status-indicator__dot"></span>
                      </span>
                      <button type="button" className="panel-icon-button" title="Editar producto" aria-label="Editar producto" onClick={() => startEditingProduct(product)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        type="button"
                        className="panel-icon-button panel-icon-button--toggle"
                        title={Number(product.visible) === 1 ? 'Desactivar producto' : 'Activar producto'}
                        aria-label={Number(product.visible) === 1 ? 'Desactivar producto' : 'Activar producto'}
                        onClick={() => toggleProductVisibility(product)}
                      >
                        <i className={`fa-solid ${Number(product.visible) === 1 ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                      <button type="button" className="panel-icon-button panel-icon-button--danger" title="Borrar producto" aria-label="Borrar producto" onClick={() => removeProduct(product.id_producto)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  function renderArticleList() {
    return (
      <div className="panel-crud">
        <div className="panel-crud__toolbar">
          <button className="panel-icon-button panel-icon-button--back" type="button" title="Volver al dashboard" aria-label="Volver al dashboard" onClick={() => navigate('/dashboard')}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="button--submit panel-crud__create" type="button" onClick={openCreateArticle}>
            Nuevo articulo
          </button>
        </div>
        <div className="panel-list panel-list--table">
          {articulosOrdenados.map((article) => (
            <article className="panel-item" key={article.id_articulo}>
              <div>
                <h3>{article.titulo}</h3>
                <p>{article.fecha_publicacion}</p>
              </div>
              <div className="panel-item__meta">
                <span className={`panel-status-indicator ${Number(article.publicado) === 1 ? 'is-active' : 'is-inactive'}`} title={Number(article.publicado) === 1 ? 'Articulo publicado' : 'Articulo desactivado'} aria-label={Number(article.publicado) === 1 ? 'Articulo publicado' : 'Articulo desactivado'}>
                  <span className="panel-status-indicator__dot"></span>
                </span>
                <button type="button" className="panel-icon-button" title="Editar articulo" aria-label="Editar articulo" onClick={() => startEditingArticle(article)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  type="button"
                  className="panel-icon-button panel-icon-button--toggle"
                  title={Number(article.publicado) === 1 ? 'Desactivar articulo' : 'Publicar articulo'}
                  aria-label={Number(article.publicado) === 1 ? 'Desactivar articulo' : 'Publicar articulo'}
                  onClick={() => toggleArticleVisibility(article)}
                >
                  <i className={`fa-solid ${Number(article.publicado) === 1 ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <button type="button" className="panel-icon-button panel-icon-button--danger" title="Borrar articulo" aria-label="Borrar articulo" onClick={() => removeArticle(article.id_articulo)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  function renderActiveView() {
    if (loading) {
      return (
        <section className="panel panel-loading">
          <p>Cargando configuracion del sitio...</p>
        </section>
      );
    }

    if (screen.mode === 'new' || screen.mode === 'edit') {
      switch (screen.module) {
        case 'secciones':
          return renderSectionEditor();
        case 'productos':
          return renderProductEditor();
        case 'articulos':
          return renderArticleEditor();
        default:
          return renderHome();
      }
    }

    switch (screen.module) {
      case 'secciones':
        return renderSectionList();
      case 'productos':
        return renderProductList();
      case 'articulos':
        return renderArticleList();
      default:
        return renderHome();
    }
  }

  const headerConfig = {
    title:
      screen.module === 'home'
        ? moduleConfig.home.title
        : screen.mode === 'new'
          ? moduleConfig[screen.module].createLabel
          : screen.mode === 'edit'
            ? moduleConfig[screen.module].editLabel
            : moduleConfig[screen.module].title,
    eyebrow: screen.module === 'home' ? moduleConfig.home.eyebrow : moduleConfig[screen.module].eyebrow,
  };

  return (
    <>
      <ScrollArriba />
      <HeaderSeccion nombre={headerConfig.title} />

      <section className="paneles--container panel-cms">
        {renderActiveView()}

        <section className="paneles--footer">
          <button type="submit" className="button--submit button--logout" onClick={hacerLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Cerrar sesion
          </button>
        </section>
      </section>
    </>
  );
}

export default PanelAdmin;
