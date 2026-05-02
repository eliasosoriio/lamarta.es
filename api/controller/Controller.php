<?php
/**
 * @file Controller.php
 * @description Define la clase Controller de la que extenderán los controladores.
 * @author Elías Osorio Pouseu
 */

include_once("TokenController.php");
include_once("AdminController.php");
include_once("SeccionController.php");
include_once("ProductoController.php");
include_once("ArticuloController.php");


/**
 * Se definen como constantes los nombres de los controladores disponibles.
 */
define("CONTROLLER_TOKEN", "token");
define("CONTROLLER_ADMIN", "admin");
define("CONTROLLER_SECCION", "seccion");
define("CONTROLLER_PRODUCTO", "producto");
define("CONTROLLER_ARTICULO", "articulo");


/**
 * Clase ControllerException para manejar excepciones.
 */
class ControllerException extends Exception{
    function __construct()
    {
        parent::__construct("Error obteniendo el controlador solicitado.");
    }
}

/**
 * Clase abstracta Controller que define que estructura tienen estos mismos.
 */
abstract class Controller
{
    /**
     * Método sendNotFound para los errores 404 cuando algo no se encuentra.
     * @param string $mensaje
     * @return void
     */
    public static function sendNotFound($mensaje)
    {
        error_log($mensaje);
        header("HTTP/1.1 404 Not Found");
        $mensaje = ["error" => $mensaje];
        echo json_encode($mensaje, JSON_PRETTY_PRINT);
    }

    /**
     * Método getController que se encarga de definir el controlador.
     * @param string $nombre
     * @throws \ControllerException
     * @return Controller
     */
    public static function getController($nombre): Controller
    {
        $controller = null;
        switch ($nombre) {
            case CONTROLLER_TOKEN:
                $controller = new TokenController();
                break;
            case CONTROLLER_ADMIN:
                $controller = new AdminController();
                break;
            case CONTROLLER_SECCION:
                $controller = new SeccionController();
                break;
            case CONTROLLER_PRODUCTO:
                $controller = new ProductoController();
                break;
            case CONTROLLER_ARTICULO:
                $controller = new ArticuloController();
                break;
            default:
                throw new ControllerException();
        }
        return $controller;
    }

    /**
     * Método get que recupera un registro en concreto de una entidad mediante un id.
     * @param int $id
     * @return void
     */
    public abstract function get($id);

    /**
     * Método getAll que recupera todos los registros de una entidad o todos los de un usuario.
     * @return void
     */
    public abstract function getAll();

    /**
     * Método delete que borra un registro mediante id.
     * @param int $id
     * @return void
     */
    public abstract function delete($id);

    /**
     * Método update que actualiza un registro.
     * @param int $id
     * @param object $object
     * @return void
     */
    public abstract function update($id, $object);

    /**
     * Método insert que crea un nuevo registro en una entidad.
     * @param object $object
     * @return void
     */
    public abstract function insert($object);
}
