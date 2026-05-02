<?php
/**
 * @file TransaccionModel.php
 * @description Define la clase TransaccionModel que maneja la entidad Transaccion.
 * @author Elías Osorio Pouseu
 */
include_once("Model.php");
include_once("ModelObject.php");

/**
 * Clase Transaccion, que define las variables, el método fromJson, el método toJson, getters y setters.
 */
class Transaccion extends ModelObject
{

    public int $id_transaccion;
    public int $id_usuario_admin;
    public int $id_usuario_afiliado;
    public string $concepto;
    public int $importe;
    public string $fecha;

    /**
     * Constructor de Transaccion que se usa para instanciar una.
     * @param int $id_usuario_admin
     * @param int $id_usuario_afiliado
     * @param string $concepto
     * @param int $importe
     * @param string $fecha
     * @param int $id_transaccion
     */
    function __construct($id_usuario_admin, $id_usuario_afiliado, $concepto, $importe, $fecha = null, $id_transaccion = 0)
    {
        $this->id_usuario_admin = $id_usuario_admin;
        $this->id_usuario_afiliado = $id_usuario_afiliado;
        $this->concepto = $concepto;
        $this->importe = $importe;
        $this->fecha = $fecha ?? date('Y-m-d');
        $this->id_transaccion = $id_transaccion;
    }

    /**
     * Método fromJson que convierte un json al objeto correspondiente.
     * @param string $json
     * @return Transaccion
     */
    public static function fromJson($json): ModelObject 
    {
        $data = json_decode($json, true)[0];
    
        $id_admin = isset($data['id_usuario_admin']) && filter_var((int) $data['id_usuario_admin'], FILTER_VALIDATE_INT) ? (int) $data['id_usuario_admin'] : null;

        $id_afiliado = isset($data['id_usuario_afiliado']) && filter_var((int) $data['id_usuario_afiliado'], FILTER_VALIDATE_INT) ? (int) $data['id_usuario_afiliado'] : null;

        $concepto = isset($data['concepto']) ? trim($data['concepto']) : null;

        $importe = isset($data['importe']) && filter_var((int) $data['importe'], FILTER_VALIDATE_INT) ? (int) $data['importe'] : null;

        return new Transaccion($id_admin, $id_afiliado, $concepto, $importe);
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
     * Obtiene el valor de id_transaccion
     */ 
    public function getId_transaccion()
    {
        return $this->id_transaccion;
    }

    /**
     * Establece el valor de id_transaccion
     *
     * @return  self
     */ 
    public function setId_transaccion($id_transaccion)
    {
        $this->id_transaccion = $id_transaccion;

        return $this;
    }

    /**
     * Obtiene el valor de id_usuario_admin
     */ 
    public function getId_usuario_admin()
    {
        return $this->id_usuario_admin;
    }

    /**
     * Establece el valor de id_usuario_admin
     *
     * @return  self
     */ 
    public function setId_usuario_admin($id_usuario_admin)
    {
        $this->id_usuario_admin = $id_usuario_admin;

        return $this;
    }

    /**
     * Obtiene el valor de id_usuario_afiliado
     */ 
    public function getId_usuario_afiliado()
    {
        return $this->id_usuario_afiliado;
    }

    /**
     * Establece el valor de id_usuario_afiliado
     *
     * @return  self
     */ 
    public function setId_usuario_afiliado($id_usuario_afiliado)
    {
        $this->id_usuario_afiliado = $id_usuario_afiliado;

        return $this;
    }

    /**
     * Obtiene el valor de concepto
     */ 
    public function getConcepto()
    {
        return $this->concepto;
    }

    /**
     * Establece el valor de concepto
     *
     * @return  self
     */ 
    public function setConcepto($concepto)
    {
        $this->concepto = $concepto;

        return $this;
    }

    /**
     * Obtiene el valor de importe
     */ 
    public function getImporte()
    {
        return $this->importe;
    }

    /**
     * Establece el valor de importe
     *
     * @return  self
     */ 
    public function setImporte($importe)
    {
        $this->importe = $importe;

        return $this;
    }

    /**
     * Obtiene el valor de fecha
     */ 
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Establece el valor de fecha
     *
     * @return  self
     */ 
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;

        return $this;
    }

}

/**
 * Clase TransaccionModel, contiene sus métodos CRUD que conectan con la base de datos.
 */
class TransaccionModel extends Model
{

    /**
     * Método getAll que recupera todos los registros.
     * @return Transaccion[]
     */
    public function getAll($id_usuario)
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT * FROM transaccion";

        //Si viene un $id_usuario se buscan todas las de él.
        if($id_usuario != null) {
            $sql.= " WHERE id_usuario_afiliado = ?";
        }

        $sql .= " ORDER BY id_transaccion DESC LIMIT 10";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = [];
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Si viene el $id_usuario se asigna el parámetro.
            if($id_usuario != null) {
                $stmt->bindValue(1, $id_usuario, PDO::PARAM_INT);
            }
                 
            //Se ejecuta.
            $stmt->execute();

            //Por cada transaccion, se genera su objeto transaccion y se asigna al array de transacciones.
            $resultado = array();
            foreach($stmt as $t){
                $transaccion = new Transaccion($t['id_usuario_admin'],$t['id_usuario_afiliado'],$t['concepto'],$t['importe'], $t['fecha'], $t['id_transaccion']);
                $resultado[] = $transaccion;
            }
        } catch (PDOException $th) {
            error_log("Error TransaccionModel->getAll()");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método get que recupera un registro mediante id.
     * @param int $id_transaccion
     * @return Recompensa|null
     */
    public function get($id_transaccion) : Transaccion | null
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT * FROM transaccion WHERE id_transaccion=?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = null;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asigna el parámetro.
            $stmt->bindValue(1, $id_transaccion, PDO::PARAM_INT);

            //Se ejecuta.
            $stmt->execute();

            //En caso de encontrar una transaccion, crea el objeto y se asigna al resultado.
            if($t = $stmt->fetch()){
                $resultado = new Transaccion($t['id_usuario_admin'],$t['id_usuario_afiliado'],$t['concepto'],$t['importe'], $t['fecha'], $t['id_transaccion']);
            }
            
        } catch (Throwable $th) {
            error_log("Error TransaccionModel->get($id_transaccion)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método insert que crea un nuevo registro.
     * @param object $transaccion
     * @return bool
     */
    public function insert($transaccion)
    {
        //Defino las sentencias a utilizar.
        $sql = "INSERT INTO transaccion(id_usuario_admin, id_usuario_afiliado, concepto, importe, fecha) VALUES (:id_usuario_admin, :id_usuario_afiliado, :concepto, :importe, :fecha)";
        $sql2 = "SELECT puntos FROM afiliado WHERE id_usuario = ?";
        $sql3 = "UPDATE afiliado SET puntos = puntos + ? WHERE id_usuario = ?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se realiza un beginTransaction ya que se insertan diferentes registros.
            $pdo->beginTransaction();

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Primero se registra la transaccion.
            $stmt->bindValue(":id_usuario_admin", $transaccion->getId_usuario_admin(), PDO::PARAM_INT);
            $stmt->bindValue(":id_usuario_afiliado", $transaccion->getId_usuario_afiliado(), PDO::PARAM_INT);
            $stmt->bindValue(":concepto", $transaccion->getConcepto(), PDO::PARAM_STR);
            $stmt->bindValue(":importe", $transaccion->getImporte(), PDO::PARAM_INT);
            $stmt->bindValue(":fecha", $transaccion->getFecha() ?? date("Y-m-d H:i:s"), PDO::PARAM_STR);

            //Se ejecuta
            $stmt->execute();

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt2 = $pdo->prepare($sql2);

            //Después, se obtiene el saldo.
            $stmt2->bindValue(1, $transaccion->getId_usuario_afiliado(), PDO::PARAM_INT);

            //Se ejecuta y se coge el saldo.
            $stmt2->execute();
            $saldo = $stmt2->fetchColumn();

            //Se comprueba que en función del saldo la transacción es viable.
            if ($saldo + $transaccion->getImporte() < 0) {
                throw new PDOException("Saldo insuficiente para canjear esta recompensa.");
            }

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt3 = $pdo->prepare($sql3);

            //Por último, se realiza la transacción y se actualiza el saldo.
            $stmt3->bindValue(1, $transaccion->getImporte(), PDO::PARAM_INT);
            $stmt3->bindValue(2, $transaccion->getId_usuario_afiliado(), PDO::PARAM_INT);

            //Se ejecuta
            $stmt3->execute();

            //Si ha llegado todo hasta aquí y no a saltado ningún error. Se confirma la transacción.
            $pdo->commit();
            $resultado = true;
        } catch (PDOException $th) {
            //Si hubise saltado algún error no hubiese aplicado ninguna acción de dentro de la transacción.
            $pdo->rollBack();
            error_log("Error TransaccionModel->insert(" . $transaccion->toJson. ")");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método delete que elimina un registro mediante su id.
     * @param int $id_transaccion
     * @return bool
     */
    public function delete($id_transaccion)
    {
        //Defino la sentencia a utilizar.
        $sql = "DELETE FROM transaccion WHERE id_transaccion = ?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asigna el parámetro.
            $stmt->bindValue(1, $id_transaccion, PDO::PARAM_INT);

            //Se ejecuta y asigna true si todo salió bien.
            $resultado = $stmt->execute();
        } catch (PDOException $th) {
            error_log("Error TransaccionModel->delete($id_transaccion)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }
}