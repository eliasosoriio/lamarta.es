<?php
/**
 * @file route.php
 * @description Maneja las peticiones que entran a la API.
 * @author Elías Osorio Pouseu
 */

//Dominios permitidos para las peticiones
$permitidos = [
    "https://lamarta.es",
    "https://lamartaes.vercel.app",
  	"https://r11.es",
    "http://localhost:5173"
];

//Comprueba que el dominio tiene permiso
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $permitidos)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

//Métodos permitidos
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");

//Headers permitidos
header("Access-Control-Allow-Headers: Content-Type, X-API-KEY");

//Si es una preflight request, solo responde 200 y termina
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

//Ficheros que se utilizan
include_once("globals.php");
include_once("controller/Controller.php");
include_once("controller/LoginController.php");
include_once("controller/TokenController.php");
include_once("controller/AdminController.php");
include_once("controller/SeccionController.php");
include_once("controller/ProductoController.php");
include_once("controller/ArticuloController.php");

//Se parsea la uri para decidir el controlador y la acción que debemos ejecutar
$metodo = $_SERVER["REQUEST_METHOD"];
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$segmentos = array_values(array_filter(explode("/", $path), fn($segmento) => $segmento !== ''));
$posicionRuta = array_search('route.php', $segmentos, true);
$segmentosApi = $posicionRuta === false ? $segmentos : array_slice($segmentos, $posicionRuta + 1);
$elemento = $segmentosApi[0] ?? null;
$id = $segmentosApi[1] ?? null;

$controladoresPublicos = ['login', 'token'];
$lecturasPublicas = ['seccion', 'producto', 'articulo'];

if ($elemento === null) {
    Controller::sendNotFound("URI incompleta.");
    die();
}

try {
    //Se crea el controlador cuando aplica a una entidad de la API.
    if (!in_array($elemento, $controladoresPublicos, true)) {
        $controlador = Controller::getController($elemento);
    }
} catch (ControllerException $th) {
    Controller::sendNotFound("Error obteniendo el elemento " . $elemento);
    die();
}

//Si el controlador es login/token y el método no es POST, se rechaza
if (in_array($elemento, $controladoresPublicos, true) && $metodo != 'POST') {
    Controller::sendNotFound("Metodo no permitido.");
    die();
}

//Las lecturas públicas de carta/blog no requieren autenticación.
$esLecturaPublica = $metodo === 'GET' && in_array($elemento, $lecturasPublicas, true);

//El resto de operaciones requieren token válido y permiso explícito.
if (!in_array($elemento, $controladoresPublicos, true) && !$esLecturaPublica) {
    $token = $_SERVER["HTTP_X_API_KEY"] ?? '';
    if (!TokenController::obtenerPermiso($token, $_SERVER['REQUEST_METHOD'], $elemento)) {
        Controller::sendNotFound("No tienes permiso o necesitas volver a iniciar sesion.");
        die();
    }
}

//Se filtra la acción en función del método
switch ($metodo) {
    case 'POST':
        $json = file_get_contents('php://input');
        if($elemento == "login") {
            LoginController::singIn($json);
        } elseif($elemento == "token") {
            TokenController::comprobarValidez($json);
        } else {
            $controlador->insert($json);
        }
        break;
    case 'GET':
        if (isset($id)) {
            $controlador->get($id);
        } else {
            $controlador->getAll();
        }
        break;
    case 'DELETE':
        if (isset($id)) {
            $controlador->delete($id);
        } else {
            Controller::sendNotFound("Es necesario indicar el id correcto del registro a eliminar.");
        }
        break;
    case 'PATCH':
        if (isset($id)) {
            $json = file_get_contents('php://input');
            $controlador->update($id, $json);
        } else {
            Controller::sendNotFound("Es necesario indicar el id correcto del registro a actualizar.");
        }
        break;
    default:
        Controller::sendNotFound("Método HTTP no disponible.");
        break;
}
