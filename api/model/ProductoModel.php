<?php
/**
 * @file ProductoModel.php
 * @description Gestiona los productos editables de la carta.
 */
include_once("Model.php");
include_once("ModelObject.php");

class Producto extends ModelObject
{
    public int $id_producto;
    public int $id_seccion = 0;
    public string $nombre = '';
    public ?string $detalle = null;
    public ?string $descripcion = null;
    public float $precio = 0;
    public ?float $precio_secundario = null;
    public int $destacado = 0;
    public int $orden = 0;
    public int $visible = 1;

    public static function fromJson($json): ModelObject
    {
        $data = json_decode($json, true);
        if (isset($data[0]) && is_array($data[0])) {
            $data = $data[0];
        }

        $producto = new Producto();

        if (isset($data['id_producto']) && filter_var((int) $data['id_producto'], FILTER_VALIDATE_INT)) {
            $producto->setId_producto((int) $data['id_producto']);
        }
        if (isset($data['id_seccion'])) {
            $producto->setId_seccion((int) $data['id_seccion']);
        }
        if (isset($data['nombre'])) {
            $producto->setNombre(trim($data['nombre']));
        }
        if (array_key_exists('detalle', $data)) {
            $producto->setDetalle(trim((string) $data['detalle']) ?: null);
        }
        if (array_key_exists('descripcion', $data)) {
            $producto->setDescripcion(trim((string) $data['descripcion']) ?: null);
        }
        if (isset($data['precio'])) {
            $producto->setPrecio((float) $data['precio']);
        }
        if (array_key_exists('precio_secundario', $data) && $data['precio_secundario'] !== '' && $data['precio_secundario'] !== null) {
            $producto->setPrecio_secundario((float) $data['precio_secundario']);
        }
        if (isset($data['destacado'])) {
            $producto->setDestacado((int) ((bool) $data['destacado']));
        }
        if (isset($data['orden'])) {
            $producto->setOrden((int) $data['orden']);
        }
        if (isset($data['visible'])) {
            $producto->setVisible((int) ((bool) $data['visible']));
        }

        return $producto;
    }

    public function toJson(): String
    {
        return json_encode($this, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    public function getId_producto()
    {
        return $this->id_producto;
    }

    public function setId_producto($id_producto)
    {
        $this->id_producto = $id_producto;
        return $this;
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

    public function getDetalle()
    {
        return $this->detalle;
    }

    public function setDetalle($detalle)
    {
        $this->detalle = $detalle;
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

    public function getPrecio()
    {
        return $this->precio;
    }

    public function setPrecio($precio)
    {
        $this->precio = $precio;
        return $this;
    }

    public function getPrecio_secundario()
    {
        return $this->precio_secundario;
    }

    public function setPrecio_secundario($precio_secundario)
    {
        $this->precio_secundario = $precio_secundario;
        return $this;
    }

    public function getDestacado()
    {
        return $this->destacado;
    }

    public function setDestacado($destacado)
    {
        $this->destacado = $destacado;
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

class ProductoModel extends Model
{
    public function getAll(bool $includeHidden = false): array
    {
        $sql = 'SELECT * FROM producto_carta';
        if (!$includeHidden) {
            $sql .= ' WHERE visible = 1';
        }
        $sql .= ' ORDER BY id_seccion ASC, orden ASC, nombre ASC';

        $pdo = self::getConnection();
        $resultado = [];

        try {
            $stmt = $pdo->query($sql);
            foreach ($stmt as $fila) {
                $resultado[] = $this->mapRow($fila);
            }
        } catch (Throwable $th) {
            error_log('Error ProductoModel->getAll()');
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function get(int $id_producto, bool $includeHidden = false): Producto | null
    {
        $sql = 'SELECT * FROM producto_carta WHERE id_producto = ?';
        if (!$includeHidden) {
            $sql .= ' AND visible = 1';
        }
        $sql .= ' LIMIT 1';

        $pdo = self::getConnection();
        $resultado = null;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $id_producto, PDO::PARAM_INT);
            $stmt->execute();

            if ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $resultado = $this->mapRow($fila);
            }
        } catch (Throwable $th) {
            error_log("Error ProductoModel->get($id_producto)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function insert(Producto $producto): bool
    {
        $sql = 'INSERT INTO producto_carta (id_seccion, nombre, detalle, descripcion, precio, precio_secundario, destacado, orden, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $producto->getId_seccion(), PDO::PARAM_INT);
            $stmt->bindValue(2, $producto->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(3, $producto->getDetalle(), PDO::PARAM_STR);
            $stmt->bindValue(4, $producto->getDescripcion(), PDO::PARAM_STR);
            $stmt->bindValue(5, $producto->getPrecio());
            $stmt->bindValue(6, $producto->getPrecio_secundario());
            $stmt->bindValue(7, $producto->getDestacado(), PDO::PARAM_INT);
            $stmt->bindValue(8, $producto->getOrden(), PDO::PARAM_INT);
            $stmt->bindValue(9, $producto->getVisible(), PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log('Error ProductoModel->insert()');
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function update(Producto $producto, int $id_producto): bool
    {
        $sql = 'UPDATE producto_carta SET id_seccion = ?, nombre = ?, detalle = ?, descripcion = ?, precio = ?, precio_secundario = ?, destacado = ?, orden = ?, visible = ? WHERE id_producto = ?';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $producto->getId_seccion(), PDO::PARAM_INT);
            $stmt->bindValue(2, $producto->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(3, $producto->getDetalle(), PDO::PARAM_STR);
            $stmt->bindValue(4, $producto->getDescripcion(), PDO::PARAM_STR);
            $stmt->bindValue(5, $producto->getPrecio());
            $stmt->bindValue(6, $producto->getPrecio_secundario());
            $stmt->bindValue(7, $producto->getDestacado(), PDO::PARAM_INT);
            $stmt->bindValue(8, $producto->getOrden(), PDO::PARAM_INT);
            $stmt->bindValue(9, $producto->getVisible(), PDO::PARAM_INT);
            $stmt->bindValue(10, $id_producto, PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log("Error ProductoModel->update($id_producto)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    public function delete(int $id_producto): bool
    {
        $sql = 'DELETE FROM producto_carta WHERE id_producto = ?';
        $pdo = self::getConnection();
        $resultado = false;

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $id_producto, PDO::PARAM_INT);
            $resultado = $stmt->execute();
        } catch (Throwable $th) {
            error_log("Error ProductoModel->delete($id_producto)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    private function mapRow(array $fila): Producto
    {
        $producto = new Producto();
        $producto->setId_producto((int) $fila['id_producto']);
        $producto->setId_seccion((int) $fila['id_seccion']);
        $producto->setNombre($fila['nombre']);
        $producto->setDetalle($fila['detalle']);
        $producto->setDescripcion($fila['descripcion']);
        $producto->setPrecio((float) $fila['precio']);
        $producto->setPrecio_secundario($fila['precio_secundario'] !== null ? (float) $fila['precio_secundario'] : null);
        $producto->setDestacado((int) $fila['destacado']);
        $producto->setOrden((int) $fila['orden']);
        $producto->setVisible((int) $fila['visible']);

        return $producto;
    }
}
