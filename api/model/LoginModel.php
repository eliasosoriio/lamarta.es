<?php
/**
 * @file LoginModel.php
 * @description Define la clase LoginModel que maneja la entidad Login.
 * @author Elías Osorio Pouseu
 */
include_once("Model.php");
include_once("ModelObject.php");

/**
 * Clase Login, que define las variables, el método fromJson, el método toJson, getters y setters.
 */
class Login extends ModelObject
{

    public int $id_usuario;
    public string $usuario = '';
    public string $contrasenia;
    public int $id_tipo = 0;
    public string $tipo = '';
    public string $token;

    /**
     * Método fromJson que convierte un json al objeto correspondiente.
     * @param string $json
     * @return Login
     */
    public static function fromJson($json): ModelObject 
    {
        $data = json_decode($json, true);
        $login = new Login();

        if (isset($data["usuario"])) {
            $usuario = trim($data["usuario"]);
            $login->setUsuario($usuario);
        }
        if (isset($data["contrasenia"])) {
            $contrasenia = $data["contrasenia"];
            $login->setContrasenia($contrasenia);
        }

        return $login;
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
     * Obtiene el valor de usuario
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * Establece el valor de usuario
     *
     * @return  self
     */
    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * Obtiene el valor de contrasenia
     */
    public function getContrasenia()
    {
        return $this->contrasenia;
    }

    /**
     * Establece el valor de contrasenia
     *
     * @return  self
     */
    public function setContrasenia($contrasenia)
    {
        $this->contrasenia = $contrasenia;

        return $this;
    }

     /**
     * Obtiene el valor de id_tipo
     */
    public function getId_tipo()
    {
        return $this->id_tipo;
    }

    /**
     * Establece el valor de id_tipo
     *
     * @return  self
     */
    public function setId_tipo($id_tipo)
    {
        $this->id_tipo = $id_tipo;

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
     * Obtiene el valor de tipo
     */ 
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Establece el valor de tipo
     *
     * @return  self
     */ 
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;

        return $this;
    }
}

/**
 * Clase LoginModel, contiene el método signIn que conecta con la base de datos.
 */
class LoginModel extends Model
{

    /**
     * Método signIn que se encarga se realizar el inicio de sesión.
     * @param object $login
     * @return Login|null
     */
    public function singIn($login): Login | null
    {
        //Defino la sentencia a utilizar.
        $sql = " SELECT usuario.id_usuario, usuario.correo, usuario.contrasenia, usuario.id_tipo, tipo.nombre AS tipo FROM usuario JOIN tipo ON usuario.id_tipo = tipo.id_tipo WHERE usuario.correo = ? ";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = null;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Se asigna el parámetro.
            $stmt->bindValue(1, $login->getUsuario(), PDO::PARAM_STR);

            //Se ejecuta.
            $stmt->execute();

            //En caso de encontrar un usuario con ese correo y contraseña, crea el objeto y se asigna al resultado.
            if($u = $stmt->fetch()){
                if (password_verify($login->getContrasenia(), $u["contrasenia"])) {
                    $resultado = new Login();
                    $resultado->setId_usuario($u["id_usuario"]);
                    $resultado->setUsuario($u["correo"]);
                    $resultado->setTipo($u["tipo"]);
                }
            }

        } catch (Throwable $th) {
            error_log("Error LoginModel->singIn(".$login->getUsuario().")");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }
}