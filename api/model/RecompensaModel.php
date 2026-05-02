<?php
/**
 * @file RecompensaModel.php
 * @description Define la clase RecompensaModel que maneja la entidad Recompensa.
 * @author Elías Osorio Pouseu
 */
include_once("Model.php");
include_once("ModelObject.php");

/**
 * Clase Recompensa, que define las variables, el método fromJson, el método toJson, getters y setters.
 */
class Recompensa extends ModelObject
{

    public int $id_recompensa;
    public string $nombre;
    public string $descripcion;
    public int $precio;

    /**
     * Método fromJson que convierte un json al objeto correspondiente.
     * @param string $json
     * @return Recompensa
     */
    public static function fromJson($json): ModelObject 
    {
        $data = json_decode($json, true)[0];
        $recompensa = new Recompensa();

        if(isset($data['id_recompensa']) && filter_var((int) $data['id_recompensa'], FILTER_VALIDATE_INT)) {
            $recompensa->setId_recompensa((int) $data['id_recompensa']);
        }
        if(isset($data['nombre'])) {
            $nombre = trim($data['nombre']);
            $recompensa->setNombre($nombre);
        }
        if(isset($data['descripcion'])) {
            $descripcion = trim($data['descripcion']);
            $recompensa->setDescripcion($descripcion);
        }
        if(isset($data['precio']) && filter_var((int) $data['precio'], FILTER_VALIDATE_INT)) {
            $recompensa->setPrecio((int) $data['precio']);
        }

        return $recompensa;
    }

    /**
     * Método toJson que convierte el objeto en json
     * @return string
     */
    public function toJson():String
    {
        return json_encode($this,JSON_PRETTY_PRINT);
    }

     /**
     * Obtiene el valor de id_recompensa
     */ 
    public function getId_recompensa()
    {
        return $this->id_recompensa;
    }

    /**
     * Establece el valor de id_recompensa
     *
     * @return  self
     */ 
    public function setId_recompensa($id_recompensa)
    {
        $this->id_recompensa = $id_recompensa;

        return $this;
    }

    /**
     * Obtiene el valor de nombre
     */ 
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Establece el valor de nombre
     *
     * @return  self
     */ 
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Obtiene el valor de descripcion
     */ 
    public function getDescripcion()
    {
            return $this->descripcion;
    }

    /**
     * Establece el valor de descripcion
     *
     * @return  self
     */ 
    public function setDescripcion($descripcion)
    {
            $this->descripcion = $descripcion;

            return $this;
    }

    /**
     * Obtiene el valor de precio
     */ 
    public function getPrecio()
    {
        return $this->precio;
    }

    /**
     * Establece el valor de precio
     *
     * @return  self
     */ 
    public function setPrecio($precio)
    {
        $this->precio = $precio;

        return $this;
    }
}

/**
 * Clase RecompensaModel, contiene sus métodos CRUD que conectan con la base de datos.
 */
class RecompensaModel extends Model
{

    /**
     * Método getAll que recupera todos los registros.
     * @return Recompensa[]
     */
    public function getAll()
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT * FROM recompensa ORDER BY precio ASC";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = [];
        try {
            //Se realiza la búsqueda fija.
            $stmt = $pdo->query($sql);
            $resultado = array();

            //Por cada recompensa, se genera su objeto recompensa y se asigna al array de recompensas.
            foreach($stmt as $r){
                $recompensa = new Recompensa();

                $recompensa->setId_recompensa($r['id_recompensa']);
                $recompensa->setNombre($r['nombre']);
                $recompensa->setDescripcion($r['descripcion']);
                $recompensa->setPrecio($r['precio']);

                $resultado[] = $recompensa;
            }
        } catch (PDOException $th) {
            error_log("Error RecompensaModel->getAll()");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método get que recupera un registro mediante id.
     * @param int $id_recompensa
     * @return Recompensa|null
     */
    public function get($id_recompensa) : Recompensa | null
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT * FROM recompensa WHERE id_recompensa=?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = null;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asigna el parámetro.
            $stmt->bindValue(1, $id_recompensa, PDO::PARAM_INT);

            //Se ejecuta.
            $stmt->execute();

            //En caso de encontrar una recompensa, crea el objeto y se asigna al resultado.
            if($r = $stmt->fetch()){
                $recompensa = new Recompensa();

                $recompensa->setId_recompensa($r['id_recompensa']);
                $recompensa->setNombre($r['nombre']);
                $recompensa->setDescripcion($r['descripcion']);
                $recompensa->setPrecio($r['precio']);

                $resultado = $recompensa;
            }
            
        } catch (Throwable $th) {
            error_log("Error RecompensaModel->get($id_recompensa)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método insert que crea un nuevo registro.
     * @param object $recompensa
     * @return bool
     */
    public function insert($recompensa)
    {
        //Defino la sentencia a utilizar.
        $sql = "INSERT INTO recompensa (nombre, descripcion, precio) VALUES (:nombre, :descripcion, :precio)";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asignan los parámetros.
            $stmt->bindValue(":nombre", $recompensa->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(":descripcion", $recompensa->getDescripcion(), PDO::PARAM_STR);
            $stmt->bindValue(":precio", $recompensa->getPrecio(), PDO::PARAM_INT);
            
            //Se ejecuta y asigna true si todo salió bien.
            $resultado = $stmt->execute();
        } catch (PDOException $th) {
            error_log("Error RecompensaModel->insert(" . $recompensa->toJson. ")");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método update que actualiza un registro.
     * @param object $recompensa
     * @param int $id_recompensa
     * @return bool
     */
    public function update($recompensa, $id_recompensa)
    {
        //Defino la sentencia a utilizar.
        $sql = "UPDATE recompensa SET nombre = :nombre, descripcion = :descripcion, precio = :precio WHERE id_recompensa = :id_recompensa";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
             //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            $stmt->bindValue(":id_recompensa", $id_recompensa, PDO::PARAM_INT);
            $stmt->bindValue(":nombre", $recompensa->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(":descripcion", $recompensa->getDescripcion(), PDO::PARAM_STR);
            $stmt->bindValue(":precio", $recompensa->getPrecio(), PDO::PARAM_INT);

            //Se ejecuta.
            $resultado = $stmt->execute();

            //Si tras ejecutar exitosamente solo hay una fila se devuelve true.
            $resultado = $stmt->rowCount() == 1;
        } catch (PDOException $th) {
            error_log("Error RecompensaModel->update(" . $recompensa->getNombre() . ", $id_recompensa)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método delete que elimina un registro mediante su id.
     * @param int $id_recompensa
     * @return bool
     */
    public function delete($id_recompensa)
    {
        //Defino la sentencia a utilizar.
        $sql = "DELETE FROM recompensa WHERE id_recompensa = ?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asigna el parámetro.
            $stmt->bindValue(1, $id_recompensa, PDO::PARAM_INT);

            //Se ejecuta y asigna true si todo salió bien.
            $resultado = $stmt->execute();
        } catch (PDOException $th) {
            error_log("Error RecompensaModel->delete($id_recompensa)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

   
}