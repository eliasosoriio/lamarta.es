<?php
/**
 * @file TokenController.php
 * @description Define la clase TokenController que maneja la seguridad y permisos.
 * @author Elías Osorio Pouseu
 */
include_once("Controller.php");
include_once(PATH_MODEL."TokenModel.php");

/**
 * Clase TokenController, contiene sus métodos de seguridad y permisos.
 */
class TokenController extends Controller{
    
    /**
     * Método obtenerPermiso que el usuario puede acceder.
     * @param string $token
     * @param string $metodoHTTP
     * @param string $controlador
     * @return bool
     */
    public static function obtenerPermiso($token, $metodoHTTP, $controlador): bool {
        $permiso = false;

        $model = new TokenModel();
        //Se obtiene el usuario mediante el token
        $id_usuario = $model->obtenerUsuarioPorToken($token);
        
        //Si se ha recuperado un usuario se comprueba que su token es válido y no ha caducado
        $validez = false;
        if ($id_usuario) {
            $validez = $model->comprobarValidez($id_usuario, $token);
        }

        //Se comprueba que ese usuario tiene permiso para realizar la acción 
        if ($validez) {
            $permiso = $model->comprobarPermiso($id_usuario, $metodoHTTP, $controlador);
        }
        
        return $permiso;
    }

    /**
     * Método generarToken que se encarga de crear el token de cada usuario al iniciar sesión.
     * @param int $id_usuario
     * @return string
     */
    public static function generarToken($id_usuario) {
        $model = new TokenModel();
        $token = new Token();

        //Se genera el token
        $tokenCadena = bin2hex(random_bytes(16));
        $tokenCadena = base64_encode($tokenCadena);

        $token->setId_usuario($id_usuario);
        $token->setToken($tokenCadena);
        $token->setValidez(time());
        
        //Si el usuario ya tenía token se actualiza, si no, se inserta.
        try {
            if ($model->existe($id_usuario)) {
                $model->update($token);
            } else {
                $model->insert($token);
            }
        } catch (Exception $e) {
            Controller::sendNotFound("No se ha podido insertar/actualizar el token.");
        }

        return $tokenCadena;
    }

     /**
      * Método comprobarValidez que comprueba todos los datos del usuario.
      * @param mixed $object
      * @return void
      */
     public static function comprobarValidez($object) {
        $data = json_decode($object, true);
        $token = $data[0]['token'];
        $id_usuario = (int) $data[0]['id_usuario'];
        $tipo = $data[0]['tipo'];
        $model = new TokenModel();

        //Si alguno de estos 3 parámetros no cuadra le hará logout
        echo $model->comprobarValidez($id_usuario, $token, $tipo);
     }

    public function get($id){}
    public function getAll(){}
    public function delete($id){}
    public function update($id, $object){}
    public function insert($object){}
}
