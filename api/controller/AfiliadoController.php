<?php
/**
 * @file AfiliadoController.php
 * @description Define la clase AfiliadoController que maneja la entidad Afiliado.
 * @author Elías Osorio Pouseu
 */
include_once("Controller.php");
include_once(PATH_MODEL."AfiliadoModel.php");

/**
 * Clase AfiliadoController, contiene sus métodos CRUD.
 */
class AfiliadoController extends Controller{

    /**
     * Método get que recupera un registro mediante id.
     * @param int $id
     * @return void
     */
    public function get($id){
        $model = new AfiliadoModel();
        $id = (int)$id;
        $usuario = $model->get($id);
        
        //Se comprueba que llega un registro de Afiliado
        if($usuario==null){
            Controller::sendNotFound("El id no se corresponde con ningún usuario.");
            die();
        }

        echo $usuario->toJson();
    }

    /**
     * Método getAll que recupera todos los registros.
     * @return void
     */
    public function getAll(){
        $model = new AfiliadoModel();
        $usuarios = $model->getAll();

        //Se comprueba que llegan todos los registros de Afiliado
        if($usuarios==null){
            Controller::sendNotFound("No se pudieron recuperar los usuarios.");
            die();
        }

        echo json_encode($usuarios, JSON_PRETTY_PRINT);
    }

    /**
     * Método insert que crea un nuevo registro.
     * @param object $object
     * @return void
     */
    public function insert($object){
        $model = new AfiliadoModel();
        $usuario = Afiliado::fromJson($object);

        //En función del resultado se manda una respuesta.
      	$existe = $model->getByCorreo($usuario->getCorreo());
        if ($existe) {
            echo json_encode(["success" => false, "email" => "El correo ya existe."]);
            exit;
        }
        
        if($model->insert($usuario)){
            header('Content-Type: application/json');
            echo json_encode(["success" => true]);
            exit;
        }else{
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "No se pudo insertar."]);
            exit;
        }
    }
    
    /**
     * Método delete que elimina un registro mediante id.
     * @param int $id
     * @return void
     */
    public function delete($id) {
        $model = new AfiliadoModel();

        //En función del resultado se manda una respuesta.
        if($model->delete($id)){
            header('Content-Type: application/json');
            echo json_encode(["success" => true]);
            exit;
        }else{
           header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "No se pudo eliminar."]);
            exit;
        }
    }

    /**
     * Método update que actualiza un registro.
     * @param int $id
     * @param object $object
     * @return void
     */
    public function update($id, $object){
        $model = new AfiliadoModel();
        $usuario = Afiliado::fromJson($object);

        //En función del resultado se manda una respuesta.
        if($model->update($usuario,$id)){
            header('Content-Type: application/json');
            echo json_encode(["success" => true]);
            exit;
        }else{
           header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "No se pudo actualizar."]);
            exit;
        }
    }
}