-- Lamarta CMS bootstrap schema
-- Mantiene solo el acceso administrador y sustituye el sistema de fidelizacion
-- por gestion editable de carta y blog.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Limpieza del esquema antiguo de fidelizacion.
DROP TABLE IF EXISTS transaccion;
DROP TABLE IF EXISTS recompensa;
DROP TABLE IF EXISTS afiliado;

-- Limpieza del esquema CMS actual o de intentos anteriores.
DROP TABLE IF EXISTS articulo_blog;
DROP TABLE IF EXISTS producto_carta;
DROP TABLE IF EXISTS seccion_carta;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS permiso;
DROP TABLE IF EXISTS administrador;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS tipo;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE tipo (
  id_tipo INT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  contrasenia VARCHAR(100) NOT NULL,
  id_tipo INT NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uk_usuario_correo (correo),
  KEY fk_usuario_tipo (id_tipo),
  CONSTRAINT fk_usuario_tipo FOREIGN KEY (id_tipo) REFERENCES tipo (id_tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE administrador (
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_usuario),
  CONSTRAINT fk_administrador_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE permiso (
  id_tipo INT NOT NULL,
  controlador VARCHAR(100) NOT NULL,
  metodos LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  KEY fk_permiso_tipo (id_tipo),
  CONSTRAINT fk_permiso_tipo FOREIGN KEY (id_tipo) REFERENCES tipo (id_tipo),
  CONSTRAINT chk_permiso_metodos CHECK (json_valid(metodos))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE token (
  id_usuario INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  validez TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  KEY fk_token_usuario (id_usuario),
  CONSTRAINT fk_token_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE seccion_carta (
  id_seccion INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  descripcion TEXT NULL,
  icono VARCHAR(255) NULL,
  tipo_vista VARCHAR(50) NOT NULL DEFAULT 'lista_simple',
  nota TEXT NULL,
  mostrar_precios TINYINT(1) NOT NULL DEFAULT 0,
  etiqueta_precio VARCHAR(50) NOT NULL DEFAULT 'BURGER',
  etiqueta_precio_secundario VARCHAR(50) NOT NULL DEFAULT 'MENU',
  orden INT NOT NULL DEFAULT 0,
  visible TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id_seccion),
  UNIQUE KEY uk_seccion_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE producto_carta (
  id_producto INT NOT NULL AUTO_INCREMENT,
  id_seccion INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  detalle VARCHAR(150) NULL,
  descripcion TEXT NULL,
  precio DECIMAL(8,2) NOT NULL,
  precio_secundario DECIMAL(8,2) NULL,
  destacado TINYINT(1) NOT NULL DEFAULT 0,
  orden INT NOT NULL DEFAULT 0,
  visible TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id_producto),
  KEY fk_producto_seccion (id_seccion),
  CONSTRAINT fk_producto_seccion FOREIGN KEY (id_seccion) REFERENCES seccion_carta (id_seccion) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE articulo_blog (
  id_articulo INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(180) NOT NULL,
  resumen TEXT NOT NULL,
  imagen VARCHAR(255) NULL,
  enlace VARCHAR(255) NOT NULL,
  tipo_enlace VARCHAR(20) NOT NULL DEFAULT 'externo',
  fecha_publicacion DATE NOT NULL,
  orden INT NOT NULL DEFAULT 0,
  publicado TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id_articulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO tipo (id_tipo, nombre) VALUES
  (1, 'admin');

INSERT INTO permiso (id_tipo, controlador, metodos) VALUES
  (1, 'admin', '["GET"]'),
  (1, 'seccion', '["GET", "POST", "PATCH", "DELETE"]'),
  (1, 'producto', '["GET", "POST", "PATCH", "DELETE"]'),
  (1, 'articulo', '["GET", "POST", "PATCH", "DELETE"]');

INSERT INTO seccion_carta (id_seccion, nombre, slug, descripcion, icono, tipo_vista, nota, mostrar_precios, etiqueta_precio, etiqueta_precio_secundario, orden, visible) VALUES
  (1, 'Entrantes', 'entrantes', 'Acompanamientos y entrantes clasicos.', 'https://lamarta.es/assets/papas.svg', 'lista_simple', NULL, 0, 'PRECIO', '', 10, 1),
  (2, 'Entrantes Veggie', 'entrantes-veggie', 'Opciones veggie para empezar.', 'https://lamarta.es/assets/vegan.png', 'lista_simple', NULL, 0, 'PRECIO', '', 20, 1),
  (3, 'Smashhhh', 'smash', 'Las burgers smash de Lamarta.', 'https://lamarta.es/assets/burguer.svg', 'lista_precio_doble', 'MENU = BURGER + PATATAS Y SALSA DE QUESO + BEBIDA', 1, 'BURGER', 'MENU', 30, 1),
  (4, 'Chicken', 'chicken', 'Burgers de pollo.', 'https://lamarta.es/assets/burguer.svg', 'lista_precio_doble', 'MENU = BURGER + PATATAS Y SALSA DE QUESO + BEBIDA', 1, 'BURGER', 'MENU', 40, 1),
  (5, 'Veggie', 'veggie', 'Opciones vegetarianas.', 'https://lamarta.es/assets/vegan.png', 'lista_precio_doble', 'MENU = BURGER + PATATAS Y SALSA DE QUESO + BEBIDA', 1, 'BURGER', 'MENU', 50, 1),
  (6, 'Sin Gluten', 'sin-gluten', 'Opciones sin gluten.', 'https://lamarta.es/assets/glutenfree.png', 'lista_precio_doble', 'MENU = BURGER + PATATAS Y SALSA DE QUESO + BEBIDA', 1, 'BURGER', 'MENU', 60, 1),
  (7, 'Mascotas', 'mascotas', 'Menu para mascotas.', 'https://lamarta.es/assets/dog.png', 'lista_precio_doble', 'MENU = BOWL + AGUA + CHURU LIQUIDO (ATUN), CHURU SOLIDO (POLLO) O GALLETAS CANAGAN', 1, 'BOWL', 'MENU', 70, 1);

INSERT INTO producto_carta (id_producto, id_seccion, nombre, detalle, descripcion, precio, precio_secundario, destacado, orden, visible) VALUES
  (1, 1, 'Patatas', NULL, NULL, 3.00, NULL, 0, 10, 1),
  (2, 1, 'Patatas con salsa de queso', NULL, NULL, 3.50, NULL, 0, 20, 1),
  (3, 1, 'Alitas BBQ (6ud.)', NULL, NULL, 4.50, NULL, 0, 30, 1),
  (4, 1, 'Alitas BBQ (12ud.)', NULL, NULL, 9.95, NULL, 0, 40, 1),
  (5, 1, 'Pops de pollo (12ud.)', NULL, NULL, 5.20, NULL, 0, 50, 1),
  (6, 1, 'Pops de pollo (18ud.)', NULL, NULL, 6.20, NULL, 0, 60, 1),
  (7, 1, 'Nuggets BBQ (6ud.)', NULL, NULL, 4.95, NULL, 0, 70, 1),
  (8, 1, 'Nuggets BBQ (12ud.)', NULL, NULL, 9.95, NULL, 0, 80, 1),
  (9, 1, 'Tequenos (6ud.)', NULL, NULL, 7.95, NULL, 0, 90, 1),
  (10, 1, 'Tequenos (12ud.)', NULL, NULL, 12.95, NULL, 0, 100, 1),
  (11, 2, 'Nuggets Veggie (6ud.)', NULL, NULL, 4.95, NULL, 0, 10, 1),
  (12, 3, 'LA BBB', 'SMASH BURGER (TERNERA 80 G)', 'Queso cheddar, pepinillo, ketchup y mostaza', 6.95, 8.95, 0, 10, 1),
  (13, 3, 'LA BBQ', 'SMASH BURGER (TERNERA 80 G)', 'Queso cheddar, bacon y salsa BBQ', 7.95, 9.95, 0, 20, 1),
  (14, 3, 'DOBLE BBB', 'DOBLE SMASH BURGER (TERNERA 160 G)', 'Queso cheddar, pepinillo, ketchup y mostaza', 7.95, 9.95, 0, 30, 1),
  (15, 3, 'DOBLE BBQ', 'DOBLE SMASH BURGER (TERNERA 160 G)', 'Queso cheddar, bacon y salsa BBQ', 8.95, 10.95, 0, 40, 1),
  (16, 3, 'PREMIUM BACON', 'DOBLE SMASH BURGER (VACA Y BUEY 200 G)', 'Queso cheddar, bacon y salsa bacon', 11.65, 13.65, 1, 50, 1),
  (17, 3, 'LA CLASSIC', 'SMASH BURGER (VACA Y BUEY 100 G)', 'Queso cheddar, aros de cebolla crujiente, lechuga, tomate y mayonesa', 10.95, 12.95, 0, 60, 1),
  (18, 3, 'LA QUEEN MARTA', 'SMASH BURGER (VACA Y BUEY 100 G)', 'Queso cheddar, cebolla, lechuga, pepinillos y salsa queen', 11.45, 13.45, 0, 70, 1),
  (19, 3, 'LAMARTA', 'DOBLE SMASH BURGER (VACA Y BUEY 200 G)', 'Queso cheddar, cochinita', 12.45, 14.45, 1, 80, 1),
  (20, 3, 'LA MB', 'DOBLE SMASH BURGER (VACA Y BUEY 200 G)', 'Crema de queso cabra y cebolla caramelizada', 12.45, 14.45, 0, 90, 1),
  (21, 3, 'ONION RING', 'DOBLE SMASH BURGER (VACA Y BUEY 200 G)', 'Cebolla al estilo Oklahoma, queso cheddar, pepinillos, queso camembert y salsa LAMARTA', 11.95, 13.95, 1, 100, 1),
  (22, 3, 'LA MOZZAPARMA', 'SMASH BURGER (VACA Y BUEY 100 G)', 'Pasta de tomate deshidratado, queso mozzarella, champinones, rucula y canonigos, lascas de queso parmesano y cebolla crispy', 12.45, 14.45, 0, 110, 1),
  (23, 4, 'LA CLASSIC CHICKEN', 'DISCO DE POLLO (100 G)', 'Queso cheddar, bacon, lechuga, tomate y mayonesa', 8.95, 10.65, 0, 10, 1),
  (24, 4, 'LA MOZZAPARMA', 'DISCO DE POLLO (100 G)', 'Pasta de tomate deshidratado, queso mozzarela, champinones, rucula y canonigos, lascas de queso parmesano y cebolla crispy', 11.95, 13.95, 0, 20, 1),
  (25, 5, 'LA CLASSIC VEGGIE', 'POLLO O CARNE VEGETAL (100 G)', 'Queso cheddar, aros de cebolla, lechuga, tomate y mayonesa', 11.45, 13.45, 0, 10, 1),
  (26, 5, 'LA MOZZAPARMA', 'POLLO O CARNE VEGETAL (100 G)', 'Pasta de tomate deshidratado, queso mozzarela, champinones, rucula y canonigos, lascas de queso parmesano y cebolla crispy', 11.45, 13.45, 0, 20, 1),
  (27, 5, 'LA MB', 'DOBLE CARNE VEGETAL (200 G)', 'Crema de queso cabra y cebolla caramelizada', 13.95, 15.95, 0, 30, 1),
  (28, 6, 'LA BBB', 'SMASH BURGER (TERNERA 80 G)', 'Queso cheddar, pepinillo, ketchup y mostaza', 8.45, 10.45, 0, 10, 1),
  (29, 6, 'DOBLE BBB', 'DOBLE SMASH BURGER (TERNERA 160 G)', 'Queso cheddar, pepinillo, ketchup y mostaza', 9.45, 11.45, 0, 20, 1),
  (30, 6, 'PREMIUM BACON', 'DOBLE SMASH BURGER (VACA Y BUEY 200 G)', 'Queso cheddar, bacon y salsa bacon', 12.65, 14.65, 0, 30, 1),
  (31, 6, 'LA CLASSIC', 'SMASH BURGER (VACA Y BUEY 100 G)', 'Queso cheddar, lechuga, tomate, bacon y mayonesa', 11.95, 13.95, 0, 40, 1),
  (32, 6, 'LA MB', 'DOBLE SMASH BURGER (VACA Y BUEY 200 G)', 'Crema de queso cabra y cebolla caramelizada', 12.95, 14.95, 0, 50, 1),
  (33, 7, 'MCADAMS LIOFILIZADO', 'LIBRE DE CEREALES (50 G)', 'Incluye el bowl de McAdams y un bowl de agua', 4.00, 4.50, 0, 10, 1);

INSERT INTO articulo_blog (id_articulo, titulo, resumen, imagen, enlace, tipo_enlace, fecha_publicacion, orden, publicado) VALUES
  (1, 'POV: Bienvenidos a Lamarta', 'Esto no es un video de hamburguesas cualquiera. Durante 11 minutos vas a ver todo lo que pasa cuando en Lamarta nos lo tomamos en serio.', 'https://vilagarciavirtual.com/uploads/imagenes-negocio/lamarta_02.jpg', 'https://www.youtube.com/watch?v=VtM4N8R3szc', 'externo', '2025-01-10', 10, 1),
  (2, 'La mejor hamburguesa de Galicia se prepara en Lamarta de Vilagarcia', 'Su Onion Ring mejorada competira con otras cinco burgers por el campeonato de Espana en el Salon Gourmets.', 'https://lamarta.es/assets/g3.jpg', 'https://www.lavozdegalicia.es/noticia/arousa/vilagarcia-de-arousa/2025/03/12/mejor-hamburguesa-galicia-prepara-lamarta-vilagarcia/0003_202503A12C4992.htm', 'externo', '2025-03-12', 20, 1),
  (3, 'POV: Parece tranquilo... Pero asi empieza TODO', 'No hay gritos, no hay prisas: solo plancha caliente, queso derritiendose y patatas esperando su destino.', 'https://vilagarciavirtual.com/uploads/imagenes-negocio/lamarta_01.jpg', 'https://www.youtube.com/watch?v=TTJGlW3XNv8', 'externo', '2025-03-20', 30, 1),
  (4, 'La tercera mejor hamburguesa de Espana esta en Vilagarcia', 'Jose Jamardo, chef del restaurante Lamarta, se colgo la medalla de bronce en el Burger Combat 2025.', 'https://estaticos-cdn.prensaiberica.es/clip/5429e09e-22c8-41eb-ada5-bf50cead3836_16-9-discover-aspect-ratio_default_0.webp', 'https://www.diariodearousa.com/articulo/vilagarcia/tercera-mejor-hamburguesa-espana-esta-vilagarcia-5247559', 'externo', '2025-04-01', 40, 1),
  (5, 'Onion Belly: una de las mejores hamburguesas de Espana', 'Jose Jamardo, de Lamarta, ha ganado el tercer premio en el Burger Combat nacional.', 'https://estaticos-cdn.prensaiberica.es/clip/afcad837-f356-4c6d-83e7-076b204b6ecf_original-libre-aspect-ratio_default_0.jpg', 'https://www.lavozdegalicia.es/noticia/arousa/vilagarcia-de-arousa/2025/04/08/hamburguesa-medalla-vilagarcia/0003_202504A8C5992.htm', 'externo', '2025-04-08', 50, 1),
  (6, 'POV: Esto se nos fue de las manos', 'Durante 11 minutos vas a ver todo lo que pasa cuando en Lamarta nos lo tomamos en serio.', 'https://i.ytimg.com/vi_webp/VtM4N8R3szc/maxresdefault.webp', 'https://www.youtube.com/watch?v=MOo3qj1dx8k&t=546s', 'externo', '2025-04-10', 60, 1);
