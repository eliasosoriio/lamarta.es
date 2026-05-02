<?php
/**
 * @file AdminController.php
 * @description Define la clase AdminController que maneja la entidad Administrador.
 * @author Elías Osorio Pouseu
 */
include_once("Controller.php");
include_once(PATH_MODEL."AdminModel.php");

/**
 * Clase AdminController, contiene sus métodos CRUD.
 */
class AdminController extends Controller{

    /**
     * Método get que recupera un registro mediante id.
     * @param int $id
     * @return void
     */
    public function get($id){
        $model = new AdminModel();
        $id = (int)$id;
        $usuario = $model->get($id);
        
        //Se comprueba que llega un registro de Administrador
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
        $model = new AdminModel();
        $usuarios = $model->getAll();
    
        //Se comprueba que llegan todos los registros de Administrador
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
        $model = new AdminModel();
        $usuario = Admin::fromJson($object);

        //En función del resultado se manda una respuesta.
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
        $model = new AdminModel();

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
        $model = new AdminModel();
        $usuario = Admin::fromJson($object);

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