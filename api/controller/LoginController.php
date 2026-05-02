<?php
/**
 * @file LoginController.php
 * @description Define la clase LoginController que maneja el inicio de sesión.
 * @author Elías Osorio Pouseu
 */
include_once("Controller.php");
include_once("TokenController.php");
include_once(PATH_MODEL."LoginModel.php");

/**
 * Clase LoginController, contiene el método de iniciar sesión.
 */
class LoginController {

    /**
     * Método signIn que inicia sesión en el sistema.
     * @param mixed $object
     * @return void
     */
    public static function singIn($object) {

        $model = new LoginModel();
        $data = json_decode($object, true);

        $login = $model->singIn(Login::fromJson(json_encode($data[0])));
        
        //Comprueba que login no devuelve null
        if ($login == null) {
            Controller::sendNotFound("El usuario y/o la contraseña es incorrecto.");
            die();
        } else {
            $id_usuario = $login->getId_usuario();
            $tipo = $login->getTipo();
            $token = TokenController::generarToken($id_usuario);
            
            //Se genera la respuesta que va a almacenar el usuario
            $respuesta = [
                "token" => $token,
                "tipo" => $tipo,
                "id" => $id_usuario
            ];

            //Devuelve la respuesta
            echo json_encode($respuesta);
        }
    }
}