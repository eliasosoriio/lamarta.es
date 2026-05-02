<?php
/**
 * @file TokenModel.php
 * @description Define la clase TokenModel que maneja la entidad Token.
 * @author Elías Osorio Pouseu
 */
include_once("Model.php");
include_once("ModelObject.php");

/**
 * Clase Token, que define las variables, el método fromJson, el método toJson, getters y setters.
 */
class Token extends ModelObject
{

    public int $id_usuario;
    public string $token = '';
    public string $validez;

    /**
     * Método fromJson que convierte un json al objeto correspondiente.
     * @param string $json
     * @return Token
     */
    public static function fromJson($json): ModelObject 
    {
        $data = json_decode($json, true);
        $token = new Token();

        if (isset($data['id_usuario']) && filter_var((int) $data['id_usuario'], FILTER_VALIDATE_INT)) {
            $token->setId_usuario((int) $data['id_usuario']);
        }

        if (isset($data['token'])) {
            $tokenStr = trim($data['token']);
            $token->setToken($tokenStr);
        }

        if (isset($data['validez']) && strtotime($data['validez']) !== false) {
            $token->setValidez($data['validez']);
        }

        return $token;
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
     * Obtiene el valor de id_usuario
     */ 
    public function getId_usuario()
    {
        return $this->id_usuario;
    }

    /**
     * Establece el valor de id_usuario
     *
     * @return  self
     */ 
    public function setId_usuario($id_usuario)
    {
        $this->id_usuario = $id_usuario;

        return $this;
    }

    /**
     * Obtiene el valor de token
     */ 
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Establece el valor de token
     *
     * @return  self
     */ 
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Obtiene el valor de validez
     */ 
    public function getValidez()
    {
        return $this->validez;
    }

    /**
     * Establece el valor de validez
     *
     * @return  self
     */ 
    public function setValidez($validez)
    {
        $this->validez = $validez;

        return $this;
    }
}

/**
 * Clase TokenModel, contiene sus métodos CRUD y de validación que conectan con la base de datos.
 */
class TokenModel extends Model
{   
    /**
     * Método existe que comprueba que un usuario tiene fila en la tabla token.
     * @param int $id_usuario
     * @return bool
     */
    public function existe($id_usuario): bool 
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT * FROM token WHERE id_usuario = ? LIMIT 1";

        //La conexión se abre.
        $pdo = self::getConnection();
        $existe = false;

        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asigna el parámetro.
            $stmt->bindValue(1, $id_usuario, PDO::PARAM_INT);

            //Se ejecuta.
            $stmt->execute();

            //Si hay resultado es porque existe
            if ($stmt->fetch()) {
                $existe = true;
            }
        } catch (Throwable $th) {
            error_log("Error TokenModel->existe($id_usuario)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $existe;
    }


    /**
     * Método insert que crea un nuevo registro.
     * @param object $token
     * @return bool
     */
    public function insert($token): bool
    {
        //Defino la sentencia a utilizar.
        $sql = "INSERT INTO token (id_usuario, token) VALUES (?, ?)";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asignan los parámetros.
            $stmt->bindValue(1, $token->getId_usuario(), PDO::PARAM_INT);
            $stmt->bindValue(2, $token->getToken(), PDO::PARAM_STR);

            //Si se ejecuta bien se devuelve true
            if($stmt->execute()){
                $resultado = true;
            }
        } catch (Throwable $th) {
            error_log("Error TokenModel->insert(".$token->getId_usuario().")");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método update que actualiza un registro.
     * @param object $token
     * @return bool
     */
    public function update($token): bool 
    {
        //Defino la sentencia a utilizar.
        $sql = "UPDATE token SET token = ?, validez = CURRENT_TIMESTAMP WHERE id_usuario = ?";
        
        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $token->getToken(), PDO::PARAM_STR);
            $stmt->bindValue(2, $token->getId_usuario(), PDO::PARAM_INT);
            
            //Si se ejecuta bien se devuelve true
            if ($stmt->execute()) {
                $resultado = true;
            }
        } catch (Throwable $th) {
            error_log("Error TokenModel->update(" . $token->getId_usuario() . ")");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método obtenerUsuarioPorToken que devuelve un usuario si existe.
     * @param string $token
     * @return int|null
     */
    public function obtenerUsuarioPorToken(string $token): int | null 
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT id_usuario FROM token WHERE token = ? LIMIT 1";

        //La conexión se abre.
        $pdo = self::getConnection();
        $id_usuario = null;

        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asigna el parámetro.
            $stmt->bindValue(1, $token, PDO::PARAM_STR);

            //Se ejecuta.
            $stmt->execute();

            //Si exitse se obtiene el id.
            $u = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($u) {
                //Me aseguro de que el id se asigan como int.
                $id_usuario = (int) $u['id_usuario'];
            }
        } catch (Throwable $th) {
            error_log("Error TokenModel->obtenerUsuarioPorToken('$token')");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $id_usuario;
    }

    /**
     * Método comprobarValidez que comprueba que el idm token y tipo del usuario es correcto
     * @param int $id_usuario
     * @param string $token
     * @param string $tipo
     * @return bool
     */
    public function comprobarValidez($id_usuario, $token, $tipo = null): bool 
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT t.id_usuario, t.validez FROM token t INNER JOIN usuario u ON u.id_usuario = t.id_usuario INNER JOIN tipo ti ON ti.id_tipo = u.id_tipo WHERE t.token = ? AND t.id_usuario = ? ";

        //Si viene el tipo se añade.
        if ($tipo != null) {
            $sql .= "AND ti.nombre = ? ";
        }

        $sql .= "LIMIT 1";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;

        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asignan los parámetros.
            $stmt->bindValue(1, $token, PDO::PARAM_STR);
            $stmt->bindValue(2, $id_usuario, PDO::PARAM_INT);
            
            //En caso de que hubiese venido el tipo se asigna también.
            if ($tipo != null) {
                $stmt->bindValue(3, $tipo, PDO::PARAM_STR);
            }

            //Se ejecuta. 
            $stmt->execute();

            //Si exitse se obtiene la validez y se comprueba que es válido.
            $t = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($t) {
                $validez = strtotime($t['validez']);
                $ahora = time();

                if (($validez + 1800) > $ahora) {
                    $resultado = true;
                }
            }
        } catch (Throwable $th) {
            error_log("Error TokenModel->comprobarValidez('$id_usuario')");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método comprobarPermiso que comprueba si el usuario tiene acceso a ese controlador y métodoHTTP.
     * @param int $id_usuario
     * @param string $metodoHTTP
     * @param string $controlador
     * @return bool
     */
    public function comprobarPermiso($id_usuario, $metodoHTTP, $controlador): bool 
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT p.metodos FROM usuario u JOIN permiso p ON u.id_tipo = p.id_tipo WHERE u.id_usuario = ? AND p.controlador = ?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $tienePermiso = false;

        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asignan los parámetros.
            $stmt->bindValue(1, $id_usuario, PDO::PARAM_INT);
            $stmt->bindValue(2, $controlador, PDO::PARAM_STR);

            //Se ejecuta.
            $stmt->execute();

            //Se busca si tiene acceso al controlado para después comprobar que puede realizar el método.
            $p = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($p) {
                $metodos = json_decode($p['metodos'], true);

                if (is_array($metodos)) {
                    $metodosMayus = [];
                    foreach ($metodos as $m) {
                        $metodosMayus[] = strtoupper($m);
                    }

                    $metodoMayus = strtoupper($metodoHTTP);

                    //Si tiene el método se devuelve true
                    if (in_array($metodoMayus, $metodosMayus)) {
                        $tienePermiso = true;
                    }
                }
            }
        } catch (Throwable $th) {
            error_log("Error en TokenModel->comprobarPermiso");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $tienePermiso;
    }

}