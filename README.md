# Lamarta.es

Aplicación web corporativa de Lamarta con frontend en React, API en PHP y CMS propio para gestionar carta y blog.

[![Estado](https://img.shields.io/badge/estado-operativo-2d9d78?style=for-the-badge)](https://lamarta.es)
[![Frontend](https://img.shields.io/badge/frontend-React_19-61dafb?style=for-the-badge&logo=react&logoColor=000000)](landing/package.json)
[![Vite](https://img.shields.io/badge/build-Vite_6.3.1-646cff?style=for-the-badge&logo=vite&logoColor=ffffff)](landing/package.json)
[![Router](https://img.shields.io/badge/router-React_Router_7.5.2-ca4245?style=for-the-badge&logo=reactrouter&logoColor=ffffff)](landing/package.json)
[![Animaciones](https://img.shields.io/badge/animaciones-Framer_Motion_12.23.22-ff4f87?style=for-the-badge)](landing/package.json)
[![Backend](https://img.shields.io/badge/backend-PHP_8+-777bb4?style=for-the-badge&logo=php&logoColor=ffffff)](api)
[![Base de datos](https://img.shields.io/badge/base_de_datos-MySQL%20%2F%20MariaDB-00758f?style=for-the-badge&logo=mysql&logoColor=ffffff)](api/database/lamarta_cms.sql)

**Stack principal:** React, Vite, React Router, PHP, PDO MySQL y SQL.

**Objetivo del proyecto:** centralizar la web pública de Lamarta y el panel de administración del contenido en un único repositorio mantenible y seguro.

- [Lamarta.es](#lamartaes)
  - [Estado del proyecto](#estado-del-proyecto)
  - [Descripción](#descripción)
  - [Instalación / Puesta en marcha](#instalación--puesta-en-marcha)
  - [Uso](#uso)
  - [Sobre el autor](#sobre-el-autor)
  - [Licencia](#licencia)
  - [Índice](#índice)
  - [Guía de contribución](#guía-de-contribución)
  - [Enlaces](#enlaces)

## Estado del proyecto

Actualmente *Lamarta.es* se encuentra operativo como web corporativa y carta digital del negocio, con un CMS propio para la gestión de secciones, productos y artículos del blog. El repositorio se ha saneado para poder mantenerse y publicarse sin credenciales embebidas ni volcados de producción.

## Descripción

*Lamarta.es* es la aplicación web de Lamarta. Reúne en un mismo proyecto la parte visual de la marca y el panel interno desde el que se administra la carta y el contenido editorial del negocio.

La parte pública está desarrollada con React y Vite, y se centra en transmitir la identidad visual del local, mostrar la carta de forma clara y mantener una experiencia cuidada en móvil y escritorio. La parte de servidor está desarrollada en PHP y expone una API que permite consultar y gestionar secciones, productos, artículos y autenticación para el panel de administración.

El objetivo del proyecto es que Lamarta pueda mantener su web sin depender de contenido estático ni de cambios manuales en código para actualizar productos o publicaciones. A nivel técnico, el proyecto queda dividido en dos bloques claros: el frontend en [landing](landing) y la API en [api](api).

## Instalación / Puesta en marcha

Lo primero es clonar o descargar el repositorio. Una vez hecho, la puesta en marcha se divide en frontend y backend.

Para el frontend, entra en la carpeta `landing`, instala dependencias con `npm install` y arranca el entorno local con `npm run dev`. Si necesitas generar la versión de producción, usa `npm run build`.

Para el backend, sirve la carpeta `api` desde un entorno con PHP 8 y PDO MySQL. La configuración de base de datos no se guarda en git, por lo que debes copiar `api/config.example.php` como `api/config.local.php` y definir tus credenciales locales, o bien establecer las variables de entorno `LAMARTA_DB_DSN`, `LAMARTA_DB_USER` y `LAMARTA_DB_PASS`.

Después, importa el esquema base desde [api/database/lamarta_cms.sql](api/database/lamarta_cms.sql). Ese archivo contiene la estructura principal del CMS y los permisos iniciales, pero no incorpora usuarios reales ni tokens. Tras la importación, debes crear manualmente el primer usuario administrador en tu entorno.

Si necesitas comprobar la conexión de base de datos en local, puedes abrir [api/test.php](api/test.php) una vez configurado `api/config.local.php`.

## Uso

La parte pública permite navegar por la carta, conocer la marca, revisar contenido del blog y consultar la información de contacto del negocio.

La parte privada está orientada a administración. Desde el panel se pueden gestionar secciones de carta, productos y artículos del blog mediante la API PHP. El acceso al CMS utiliza autenticación por token y las operaciones de escritura quedan restringidas al perfil administrador.

La estructura general del proyecto queda organizada de la siguiente manera:

```text
lamarta.es/
├── api/                    # API PHP, controladores, modelos y SQL base
├── landing/                # Frontend React + Vite
│   ├── src/components/     # Componentes por secciones
│   ├── src/styles/         # Estilos organizados por módulos
│   ├── src/utils/          # Utilidades comunes, incluida la capa de API
│   └── public/             # Recursos públicos
└── README.md
```

## Sobre el autor

Soy Elías Osorio Pouseu, desarrollador del proyecto y responsable tanto del diseño visual como de la implementación técnica del frontend y del backend.

La intención principal del proyecto es que la presencia digital de Lamarta mantenga personalidad propia y, al mismo tiempo, que el negocio pueda gestionar su contenido con autonomía desde una base técnica simple y mantenible.

## Licencia

Este repositorio no define actualmente un fichero de licencia específico. Antes de abrir el código a terceros o permitir reutilización externa, conviene añadir una licencia explícita en la raíz del proyecto.

## Índice

1. [Frontend React/Vite](landing)
2. [API PHP](api)
3. [Esquema base del CMS](api/database/lamarta_cms.sql)
4. [Configuración de ejemplo](api/config.example.php)

## Guía de contribución

Puedes contribuir a este proyecto de varias formas:

- Corrigiendo errores.
- Mejorando la estructura del código.
- Refinando el panel CMS o la experiencia visual del frontend.
- Añadiendo documentación técnica útil para despliegue y mantenimiento.

Si haces cambios, trabaja sobre una rama separada, valida que no introduces credenciales ni datos reales en el repositorio y revisa que el proyecto siga funcionando tanto en frontend como en backend antes de abrir una pull request.

## Enlaces

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [PHP](https://www.php.net/manual/es/)
- [PDO](https://www.php.net/manual/es/book.pdo.php)
- [MySQL](https://dev.mysql.com/doc/)
- [MDN Web Docs](https://developer.mozilla.org/es/)
- [Vercel](https://vercel.com/)

Estos enlaces corresponden a las tecnologías principales utilizadas actualmente en el proyecto.
