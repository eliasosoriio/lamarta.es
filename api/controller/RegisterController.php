<?php
/**
 * @file RegisterController.php
 * @description Define la clase RegisterController que maneja el comprobarRegistro.
 * @author Elías Osorio Pouseu
 */
include_once("Controller.php");

define("CONTRASENIA_REGISTRO","Lamarta-Club-2026");

/**
 * Clase RegisterController, contiene el método de comprobarRegistro.
 */
class RegisterController {

    /**
     * Método comprobarRegistro que checkea si el usuario puede registrarse
     * @param mixed $object
     * @return void
     */
    public static function comprobarRegistro($object) {
        $data = json_decode($object, true);
        $contrasenia = $data[0]["contrasenia"];
        $puedeRegistrarse = $contrasenia == CONTRASENIA_REGISTRO;

        if($puedeRegistrarse){
            header('Content-Type: application/json');
            echo json_encode(["success" => true]);
            exit;
        }else{
           header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Contraseña de registro incorrecta."]);
            exit;
        }
    }

}