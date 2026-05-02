<?php
/**
 * @file AdminModel.php
 * @description Define la clase AdminModel que maneja la entidad Administrador.
 * @author Elías Osorio Pouseu
 */
include_once("Model.php");
include_once("ModelObject.php");

/**
 * Clase Admin, que define las variables, el método fromJson, el método toJson, getters y setters.
 */
class Admin extends ModelObject
{

    public int $id_usuario;
    public string $nombre;
    public string $apellidos;
    public string $correo;
    public string $contrasenia;
    public int $id_tipo = 2;

    /**
     * Método fromJson que convierte un json al objeto correspondiente.
     * @param string $json
     * @return Admin
     */
    public static function fromJson($json): ModelObject 
    {
        $data = json_decode($json, true)[0];
        $usuario = new Admin();

        if(isset($data['id_usuario']) && filter_var((int) $data['id_usuario'], FILTER_VALIDATE_INT)) {
            $usuario->setId_usuario((int) $data['id_usuario']);
        }
        if(isset($data['nombre'])) {
            $nombre = trim($data['nombre']);
            $usuario->setNombre($nombre);
        }
        if(isset($data['apellidos'])) {
            $apellidos = trim($data['apellidos']);
            $usuario->setApellidos($apellidos);
        }
        if(isset($data['correo'])) {
            $correo = trim($data['correo']);
            if ($correo && filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                $usuario->setCorreo($correo);
            }
        }
        if(isset($data['contrasenia'])) {
            $contrasenia = trim($data['contrasenia']);
            $usuario->setContrasenia(password_hash($contrasenia, PASSWORD_DEFAULT));
        }

        return $usuario;
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
     * Obtiene el valor de apellidos
     */ 
    public function getApellidos()
    {
            return $this->apellidos;
    }

    /**
     * Establece el valor de apellidos
     *
     * @return  self
     */ 
    public function setApellidos($apellidos)
    {
            $this->apellidos = $apellidos;

            return $this;
    }

    /**
     * Obtiene el valor de correo
     */ 
    public function getCorreo()
    {
        return $this->correo;
    }

    /**
     * Establece el valor de correo
     *
     * @return  self
     */ 
    public function setCorreo($correo)
    {
        $this->correo = $correo;

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
}

/**
 * Clase AdminModel, contiene sus métodos CRUD que conectan con la base de datos.
 */
class AdminModel extends Model
{

    /**
     * Método getAll que recupera todos los registros.
     * @return Admin[]
     */
    public function getAll()
    {   
        //Defino la sentencia a utilizar.
        $sql = "SELECT u.* FROM usuario u INNER JOIN administrador a ON u.id_usuario = a.id_usuario WHERE id_tipo = 1";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = [];
        try {
            //Se realiza la búsqueda fija.
            $stmt = $pdo->query($sql);
            $resultado = array();

            //Por cada usuario, se genera su objeto usuario y se asigna al array de usuarios.
            foreach($stmt as $u){
                $usuario = new Admin();

                $usuario->setId_usuario($u['id_usuario']);
                $usuario->setNombre($u['nombre']);
                $usuario->setApellidos($u['apellidos']);
                $usuario->setCorreo($u['correo']);
                $usuario->setId_tipo($u['id_tipo']);

                $resultado[] = $usuario;
            }
        } catch (PDOException $th) {
            error_log("Error AdminModel->getAll()");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método get que recupera un registro mediante id.
     * @param int $id_usuario
     * @return Admin|null
     */
    public function get($id_usuario) : Admin | null
    {
        //Defino la sentencia a utilizar.
        $sql = "SELECT u.* FROM usuario u INNER JOIN administrador a ON u.id_usuario = a.id_usuario WHERE u.id_usuario=?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = null;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);
            
            //Se asigna el parámetro.
            $stmt->bindValue(1, $id_usuario, PDO::PARAM_INT);

            //Se ejecuta.
            $stmt->execute();

            //En caso de encontrar un usuario, crea el objeto y se asigna al resultado.
            if($u = $stmt->fetch()){
                $usuario = new Admin();

                $usuario->setId_usuario($u['id_usuario']);
                $usuario->setNombre($u['nombre']);
                $usuario->setApellidos($u['apellidos']);
                $usuario->setCorreo($u['correo']);
                $usuario->setId_tipo($u['id_tipo']);

                $resultado = $usuario;
            }
        } catch (Throwable $th) {
            error_log("Error AdminModel->get($id_usuario)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método insert que crea un nuevo registro.
     * @param object $usuario
     * @return bool
     */
    public function insert($usuario)
    {
        //Defino las sentencias a utilizar.
        $sql = "INSERT INTO usuario (nombre, apellidos, correo, contrasenia, id_tipo) VALUES (:nombre, :apellidos, :correo, :contrasenia, :id_tipo)";
        $sql2 = "INSERT INTO administrador (id_usuario) VALUES (:id_usuario)";
        $sql3 = "INSERT INTO token (id_usuario, token) VALUES (:id_usuario, :token)";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se realiza un beginTransaction ya que se insertan diferentes registros.
            $pdo->beginTransaction();
            
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);
            
            //Primero se registra el usuario.
            $stmt->bindValue(":nombre", $usuario->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(":apellidos", $usuario->getApellidos(), PDO::PARAM_STR);
            $stmt->bindValue(":correo", $usuario->getCorreo(), PDO::PARAM_STR);
            $stmt->bindValue(":contrasenia", $usuario->getContrasenia(), PDO::PARAM_STR);
            $stmt->bindValue(":id_tipo", $usuario->getId_tipo(), PDO::PARAM_INT);

            //Se ejecuta.
            $stmt->execute();

            //Se recoge el id del admin recién creado.
            $idAdmin = $pdo->lastInsertId();

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt2 = $pdo->prepare($sql2);
            
            //Después, se inserta en la tabla Administrador
            $stmt2->bindValue(":id_usuario", $idAdmin, PDO::PARAM_INT);

            //Se ejecuta.
            $stmt2->execute();

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt3 = $pdo->prepare($sql3);
            
            //Por último, se genera su fila en la tabla para el token.
            $stmt3->bindValue(":id_usuario", $idAdmin, PDO::PARAM_INT);
            $stmt3->bindValue(":token", bin2hex(random_bytes(16)), PDO::PARAM_STR);

            //Se ejecuta.
            $stmt3->execute();

            //Si ha llegado todo hasta aquí y no a saltado ningún error. Se confirma la transacción.
            $pdo->commit();
            $resultado = true;
        } catch (PDOException $th) {
            //Si hubise saltado algún error no hubiese aplicado ninguna acción de dentro de la transacción.
            $pdo->rollBack();
            error_log("Error AdminModel->insert(" . $usuario->toJson. ")");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $stmt2 = null;
            $stmt3 = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método update que actualiza un registro.
     * @param object $usuario
     * @param int $id_usuario
     * @return bool
     */
    public function update($usuario, $id_usuario)
    {
        //Defino la sentencia a utilizar.
        $sql = "UPDATE usuario SET nombre = :nombre, apellidos = :apellidos, correo = :correo";
        
        //Si viene una contraseña se añade para actualizarla.
        if (!empty($usuario->getContrasenia())) {
            $sql .= ", contrasenia = :contrasenia";
        }
       
        $sql .= " WHERE id_usuario = :id_usuario";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        try {
            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            $stmt->bindValue(":id_usuario", $usuario->getId_usuario(), PDO::PARAM_INT);
            $stmt->bindValue(":nombre", $usuario->getNombre(), PDO::PARAM_STR);
            $stmt->bindValue(":apellidos", $usuario->getApellidos(), PDO::PARAM_STR);
            $stmt->bindValue(":correo", $usuario->getCorreo(), PDO::PARAM_STR);
            
            //En caso de que haya contraseña a actualizar se asigan el parámetro también.
            if (!empty($usuario->getContrasenia())) {
                $stmt->bindValue(":contrasenia", $usuario->getContrasenia(), PDO::PARAM_STR);
            }

            //Se ejecuta.
            $resultado = $stmt->execute();

            //Si tras ejecutar exitosamente solo hay una fila se devuelve true.
            $resultado = $stmt->rowCount() == 1;
        } catch (PDOException $th) {
            error_log("Error AdminModel->update(" . $usuario->getNombre() . ", $id_usuario)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $pdo = null;
        }

        return $resultado;
    }

    /**
     * Método delete que elimina un registro mediante su id.
     * @param int $id_usuario
     * @return bool
     */
    public function delete($id_usuario)
    {
        //Defino las sentencias a utilizar.
        $sql = "DELETE FROM token WHERE id_usuario = ?";
        $sql2 = "DELETE FROM afiliado WHERE id_usuario = ?";
        $sql3 = "DELETE FROM usuario WHERE id_usuario = ?";

        //La conexión se abre.
        $pdo = self::getConnection();
        $resultado = false;
        
        try {
            //Se realiza un beginTransaction ya que se insertan diferentes registros.
            $pdo->beginTransaction();

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt = $pdo->prepare($sql);

            //Primero, borra su fila en la tabla token.
            $stmt->bindValue(1, $id_usuario, PDO::PARAM_INT);
            $stmt->execute();

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt2 = $pdo->prepare($sql2);

            //Segundo, se borra de su tabla de rol.
            $stmt2->bindValue(1, $id_usuario, PDO::PARAM_INT);
            $stmt2->execute();

            //Se hace un prepare para evitar inyecciones SQL por el parámetro.
            $stmt3 = $pdo->prepare($sql3);

            //Por último, se borra al usuario.
            $stmt3->bindValue(1, $id_usuario, PDO::PARAM_INT);
            $stmt3->execute();

            //Si ha llegado todo hasta aquí y no a saltado ningún error. Se confirma la transacción.
            $pdo->commit();
            $resultado = true;
        } catch (PDOException $th) {
            //Si hubise saltado algún error no hubiese aplicado ninguna acción de dentro de la transacción.
            $pdo->rollBack();
            error_log("Error AdminModel->delete($id_usuario)");
            error_log($th->getMessage());
        } finally {
            $stmt = null;
            $stmt2 = null;
            $stmt3 = null;
            $pdo = null;
        }

        return $resultado;
    }

}