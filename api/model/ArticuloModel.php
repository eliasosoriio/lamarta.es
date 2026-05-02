<?php
/**
 * @file ArticuloModel.php
 * @description Gestiona los articulos editables del blog.
 */
include_once("Model.php");
include_once("ModelObject.php");

class Articulo extends ModelObject
{
    public int $id_articulo;
    public string $titulo = '';
    public string $resumen = '';
    public ?string $imagen = null;
    public string $enlace = '';
    public string $tipo_enlace = 'externo';
    public string $fecha_publicacion = '';
    public int $orden = 0;
    public int $publicado = 1;

    public static function fromJson($json): ModelObject
    {
        $data = json_decode($json, true);
        if (isset($data[0]) && is_array($data[0])) {
            $data = $data[0];
        }

        $articulo = new Articulo();

        if (isset($data['id_articulo']) && filter_var((int) $data['id_articulo'], FILTER_VALIDATE_INT)) {
            $articulo->setId_articulo((int) $data['id_articulo']);
        }
        if (isset($data['titulo'])) {
            $articulo->setTitulo(trim($data['titulo']));
        }
        if (isset($data['resumen'])) {
            $articulo->setResumen(trim($data['resumen']));
        }
        if (array_key_exists('imagen', $data)) {
            $articulo->setImagen(trim((string) $data['imagen']) ?: null);
        }
        if (isset($data['enlace'])) {
            $articulo->setEnlace(trim($data['enlace']));
        }
        if (isset($data['tipo_enlace'])) {
            $articulo->setTipo_enlace(trim($data['tipo_enlace']));
        }
        if (isset($data['fecha_publicacion'])) {
            $articulo->setFecha_publicacion($data['fecha_publicacion']);
        }
        if (isset($data['orden'])) {
            $articulo->setOrden((int) $data['orden']);
        }
        if (isset($data['publicado'])) {
            $articulo->setPublicado((int) ((bool) $data['publicado']));
        }

        return $articulo;
    }

    public function toJson(): String
    {
        return json_encode($this, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    public function getId_articulo()
    {
        return $this->id_articulo;
    }

    public function setId_articulo($id_articulo)
    {
        $this->id_articulo = $id_articulo;
        return $this;
    }

    public function getTitulo()
    {
        return $this->titulo;
    }

    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;
        return $this;
    }

    public function getResumen()
    {
        return $this->resumen;
    }

    public function setResumen($resumen)
    {
        $this->resumen = $resumen;
        return $this;
    }

    public function getImagen()
    {
        return $this->imagen;
    }

    public function setImagen($imagen)
    {
        $this->imagen = $imagen;
        return $this;
    }

    public function getEnlace()
    {
        return $this->enlace;
    }

    public function setEnlace($enlace)
    {
        $this->enlace = $enlace;
        return $this;
    }

    public function getTipo_enlace()
    {
        return $this->tipo_enlace;
    }

    public function setTipo_enlace($tipo_enlace)
    {
        $this->tipo_enlace = $tipo_enlace ?: 'externo';
        return $this;
    }

    public function getFecha_publicacion()
    {
        return $this->fecha_publicacion;
    }

    public function setFecha_publicacion($fecha_publicacion)
    {
        $this->fecha_publicacion = $fecha_publicacion;
        return $this;
    }

    public function getOrden()
    {
        return $this->orden;
    }

    public function setOrden($orden)
    {
        $this->orden = $orden;
        return $this;
    }

    public function getPublicado()
    {
        return $this->publicado;
    }

    public function setPublicado($publicado)
    {
        $this->publicado = $publicado;
        return $this;
    }
}

class ArticuloModel extends Model
{
    public function getAll(bool $includeHidden = false): array
    {
        $sql = 'SELECT * FROM articulo_blog';
        if (!$includeHidden) {
            $sql .= ' WHERE publicado = 1';
        }
        $sql .= ' ORDER BY fecha_publicacion DESC, orden DESC, id_articulo DESC';

        $pdo = self::getConnection();
        $resultado = [];

        try {
            $stmt = $pdo->query($sql);
            foreach ($stmt as $fila) {
                $resultado[] = $this->mapRow($fila);
            }
        } catch (Throwable $th) {
            error_log('Error ArticuloModel->getAll()');
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function get(int $id_articulo, bool $includeHidden = false): Articulo | null
    {
        $sql = 'SELECT * FROM articulo_blog WHERE id_articulo = ?';
        if (!$includeHidden) {
            $sql .= ' AND publicado = 1';
        }
        $sql .= ' LIMIT 1';

        $pdo = self::getConnection();
        $resultado = null;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $id_articulo, PDO::PARAM_INT);
            $stmt->execute();

            if ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $resultado = $this->mapRow($fila);
            }
        } catch (Throwable $th) {
            error_log("Error ArticuloModel->get($id_articulo)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function insert(Articulo $articulo): bool
    {
        $sql = 'INSERT INTO articulo_blog (titulo, resumen, imagen, enlace, tipo_enlace, fecha_publicacion, orden, publicado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $articulo->getTitulo(), PDO::PARAM_STR);
            $stmt->bindValue(2, $articulo->getResumen(), PDO::PARAM_STR);
            $stmt->bindValue(3, $articulo->getImagen(), PDO::PARAM_STR);
            $stmt->bindValue(4, $articulo->getEnlace(), PDO::PARAM_STR);
            $stmt->bindValue(5, $articulo->getTipo_enlace(), PDO::PARAM_STR);
            $stmt->bindValue(6, $articulo->getFecha_publicacion(), PDO::PARAM_STR);
            $stmt->bindValue(7, $articulo->getOrden(), PDO::PARAM_INT);
            $stmt->bindValue(8, $articulo->getPublicado(), PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log('Error ArticuloModel->insert()');
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function update(Articulo $articulo, int $id_articulo): bool
    {
        $sql = 'UPDATE articulo_blog SET titulo = ?, resumen = ?, imagen = ?, enlace = ?, tipo_enlace = ?, fecha_publicacion = ?, orden = ?, publicado = ? WHERE id_articulo = ?';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $articulo->getTitulo(), PDO::PARAM_STR);
            $stmt->bindValue(2, $articulo->getResumen(), PDO::PARAM_STR);
            $stmt->bindValue(3, $articulo->getImagen(), PDO::PARAM_STR);
            $stmt->bindValue(4, $articulo->getEnlace(), PDO::PARAM_STR);
            $stmt->bindValue(5, $articulo->getTipo_enlace(), PDO::PARAM_STR);
            $stmt->bindValue(6, $articulo->getFecha_publicacion(), PDO::PARAM_STR);
            $stmt->bindValue(7, $articulo->getOrden(), PDO::PARAM_INT);
            $stmt->bindValue(8, $articulo->getPublicado(), PDO::PARAM_INT);
            $stmt->bindValue(9, $id_articulo, PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log("Error ArticuloModel->update($id_articulo)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function delete(int $id_articulo): bool
    {
        $sql = 'DELETE FROM articulo_blog WHERE id_articulo = ?';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $id_articulo, PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log("Error ArticuloModel->delete($id_articulo)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    private function mapRow(array $fila): Articulo
    {
        $articulo = new Articulo();
        $articulo->setId_articulo((int) $fila['id_articulo']);
        $articulo->setTitulo($fila['titulo']);
        $articulo->setResumen($fila['resumen']);
        $articulo->setImagen($fila['imagen']);
        $articulo->setEnlace($fila['enlace']);
        $articulo->setTipo_enlace($fila['tipo_enlace']);
        $articulo->setFecha_publicacion($fila['fecha_publicacion']);
        $articulo->setOrden((int) $fila['orden']);
        $articulo->setPublicado((int) $fila['publicado']);

        return $articulo;
    }
}
