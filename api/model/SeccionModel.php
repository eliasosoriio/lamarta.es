<?php
/**
 * @file SeccionModel.php
 * @description Gestiona las secciones editables de la carta.
 */
include_once("Model.php");
include_once("ModelObject.php");

class Seccion extends ModelObject
{
    public int $id_seccion;
    public string $nombre = '';
    public string $slug = '';
    public ?string $descripcion = null;
    public ?string $icono = null;
    public string $tipo_vista = 'lista_simple';
    public ?string $nota = null;
    public int $mostrar_precios = 0;
    public string $etiqueta_precio = 'BURGER';
    public string $etiqueta_precio_secundario = 'MENU';
    public int $orden = 0;
    public int $visible = 1;

    public static function fromJson($json): ModelObject
    {
        $data = json_decode($json, true);
        if (isset($data[0]) && is_array($data[0])) {
            $data = $data[0];
        }

        $seccion = new Seccion();

        if (isset($data['id_seccion']) && filter_var((int) $data['id_seccion'], FILTER_VALIDATE_INT)) {
            $seccion->setId_seccion((int) $data['id_seccion']);
        }
        if (isset($data['nombre'])) {
            $seccion->setNombre(trim($data['nombre']));
        }
        if (isset($data['slug'])) {
            $seccion->setSlug(trim($data['slug']));
        }
        if (array_key_exists('descripcion', $data)) {
            $seccion->setDescripcion(trim((string) $data['descripcion']) ?: null);
        }
        if (array_key_exists('icono', $data)) {
            $seccion->setIcono(trim((string) $data['icono']) ?: null);
        }
        if (isset($data['tipo_vista'])) {
            $seccion->setTipo_vista(trim($data['tipo_vista']));
        }
        if (array_key_exists('nota', $data)) {
            $seccion->setNota(trim((string) $data['nota']) ?: null);
        }
        if (isset($data['mostrar_precios'])) {
            $seccion->setMostrar_precios((int) ((bool) $data['mostrar_precios']));
        }
        if (isset($data['etiqueta_precio'])) {
            $seccion->setEtiqueta_precio(trim($data['etiqueta_precio']));
        }
        if (isset($data['etiqueta_precio_secundario'])) {
            $seccion->setEtiqueta_precio_secundario(trim($data['etiqueta_precio_secundario']));
        }
        if (isset($data['orden'])) {
            $seccion->setOrden((int) $data['orden']);
        }
        if (isset($data['visible'])) {
            $seccion->setVisible((int) ((bool) $data['visible']));
        }

        return $seccion;
    }

    public function toJson(): String
    {
        return json_encode($this, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    public function getId_seccion()
    {
        return $this->id_seccion;
    }

    public function setId_seccion($id_seccion)
    {
        $this->id_seccion = $id_seccion;
        return $this;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
        return $this;
    }

    public function getSlug()
    {
        return $this->slug;
    }

    public function setSlug($slug)
    {
        $this->slug = $slug;
        return $this;
    }

    public function getDescripcion()
    {
        return $this->descripcion;
    }

    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;
        return $this;
    }

    public function getIcono()
    {
        return $this->icono;
    }

    public function setIcono($icono)
    {
        $this->icono = $icono;
        return $this;
    }

    public function getTipo_vista()
    {
        return $this->tipo_vista;
    }

    public function setTipo_vista($tipo_vista)
    {
        $this->tipo_vista = $tipo_vista ?: 'lista_simple';
        return $this;
    }

    public function getNota()
    {
        return $this->nota;
    }

    public function setNota($nota)
    {
        $this->nota = $nota;
        return $this;
    }

    public function getMostrar_precios()
    {
        return $this->mostrar_precios;
    }

    public function setMostrar_precios($mostrar_precios)
    {
        $this->mostrar_precios = $mostrar_precios;
        return $this;
    }

    public function getEtiqueta_precio()
    {
        return $this->etiqueta_precio;
    }

    public function setEtiqueta_precio($etiqueta_precio)
    {
        $this->etiqueta_precio = $etiqueta_precio ?: 'BURGER';
        return $this;
    }

    public function getEtiqueta_precio_secundario()
    {
        return $this->etiqueta_precio_secundario;
    }

    public function setEtiqueta_precio_secundario($etiqueta_precio_secundario)
    {
        $this->etiqueta_precio_secundario = $etiqueta_precio_secundario ?: 'MENU';
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

    public function getVisible()
    {
        return $this->visible;
    }

    public function setVisible($visible)
    {
        $this->visible = $visible;
        return $this;
    }
}

class SeccionModel extends Model
{
    public function getAll(bool $includeHidden = false): array
    {
        $sql = 'SELECT * FROM seccion_carta';
        if (!$includeHidden) {
            $sql .= ' WHERE visible = 1';
        }
        $sql .= ' ORDER BY orden ASC, nombre ASC';

        $pdo = self::getConnection();
        $resultado = [];

        try {
            $stmt = $pdo->query($sql);
            foreach ($stmt as $fila) {
                $resultado[] = $this->mapRow($fila);
            }
        } catch (Throwable $th) {
            error_log('Error SeccionModel->getAll()');
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function get(int $id_seccion, bool $includeHidden = false): Seccion | null
    {
        $sql = 'SELECT * FROM seccion_carta WHERE id_seccion = ?';
        if (!$includeHidden) {
            $sql .= ' AND visible = 1';
        }
        $sql .= ' LIMIT 1';

        $pdo = self::getConnection();
        $resultado = null;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $id_seccion, PDO::PARAM_INT);
            $stmt->execute();

            if ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $resultado = $this->mapRow($fila);
            }
        } catch (Throwable $th) {
            error_log("Error SeccionModel->get($id_seccion)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function insert(Seccion $seccion): bool
    {
        $sql = 'INSERT INTO seccion_carta (nombre, slug, descripcion, icono, tipo_vista, nota, mostrar_precios, etiqueta_precio, etiqueta_precio_secundario, orden, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $seccion->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(2, $seccion->getSlug(), PDO::PARAM_STR);
            $stmt->bindValue(3, $seccion->getDescripcion(), PDO::PARAM_STR);
            $stmt->bindValue(4, $seccion->getIcono(), PDO::PARAM_STR);
            $stmt->bindValue(5, $seccion->getTipo_vista(), PDO::PARAM_STR);
            $stmt->bindValue(6, $seccion->getNota(), PDO::PARAM_STR);
            $stmt->bindValue(7, $seccion->getMostrar_precios(), PDO::PARAM_INT);
            $stmt->bindValue(8, $seccion->getEtiqueta_precio(), PDO::PARAM_STR);
            $stmt->bindValue(9, $seccion->getEtiqueta_precio_secundario(), PDO::PARAM_STR);
            $stmt->bindValue(10, $seccion->getOrden(), PDO::PARAM_INT);
            $stmt->bindValue(11, $seccion->getVisible(), PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log('Error SeccionModel->insert()');
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function update(Seccion $seccion, int $id_seccion): bool
    {
        $sql = 'UPDATE seccion_carta SET nombre = ?, slug = ?, descripcion = ?, icono = ?, tipo_vista = ?, nota = ?, mostrar_precios = ?, etiqueta_precio = ?, etiqueta_precio_secundario = ?, orden = ?, visible = ? WHERE id_seccion = ?';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $seccion->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(2, $seccion->getSlug(), PDO::PARAM_STR);
            $stmt->bindValue(3, $seccion->getDescripcion(), PDO::PARAM_STR);
            $stmt->bindValue(4, $seccion->getIcono(), PDO::PARAM_STR);
            $stmt->bindValue(5, $seccion->getTipo_vista(), PDO::PARAM_STR);
            $stmt->bindValue(6, $seccion->getNota(), PDO::PARAM_STR);
            $stmt->bindValue(7, $seccion->getMostrar_precios(), PDO::PARAM_INT);
            $stmt->bindValue(8, $seccion->getEtiqueta_precio(), PDO::PARAM_STR);
            $stmt->bindValue(9, $seccion->getEtiqueta_precio_secundario(), PDO::PARAM_STR);
            $stmt->bindValue(10, $seccion->getOrden(), PDO::PARAM_INT);
            $stmt->bindValue(11, $seccion->getVisible(), PDO::PARAM_INT);
            $stmt->bindValue(12, $id_seccion, PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log("Error SeccionModel->update($id_seccion)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function delete(int $id_seccion): bool
    {
        $sql = 'DELETE FROM seccion_carta WHERE id_seccion = ?';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $id_seccion, PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log("Error SeccionModel->delete($id_seccion)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    private function mapRow(array $fila): Seccion
    {
        $seccion = new Seccion();
        $seccion->setId_seccion((int) $fila['id_seccion']);
        $seccion->setNombre($fila['nombre']);
        $seccion->setSlug($fila['slug']);
        $seccion->setDescripcion($fila['descripcion']);
        $seccion->setIcono($fila['icono']);
        $seccion->setTipo_vista($fila['tipo_vista']);
        $seccion->setNota($fila['nota']);
        $seccion->setMostrar_precios((int) $fila['mostrar_precios']);
        $seccion->setEtiqueta_precio($fila['etiqueta_precio']);
        $seccion->setEtiqueta_precio_secundario($fila['etiqueta_precio_secundario']);
        $seccion->setOrden((int) $fila['orden']);
        $seccion->setVisible((int) $fila['visible']);

        return $seccion;
    }
}
