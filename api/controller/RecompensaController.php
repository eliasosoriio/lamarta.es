<?php
/**
 * @file RecompensaController.php
 * @description Define la clase RecompensaController que maneja la entidad Recompensa.
 * @author Elías Osorio Pouseu
 */
include_once("Controller.php");
include_once(PATH_MODEL."RecompensaModel.php");

/**
 * Clase RecompensaController, contiene sus métodos CRUD.
 */
class RecompensaController extends Controller{

    /**
     * Método get que recupera un registro mediante id.
     * @param int $id
     * @return void
     */
    public function get($id){
        $model = new RecompensaModel();
        $recompensa = $model->get($id);
        
        //Se comprueba que llega un registro de Recompensa
        if($recompensa==null){
            Controller::sendNotFound("El id no se corresponde con ninguna recompensa.");
            die();
        }

        echo $recompensa->toJson();
    }

    /**
     * Método getAll que recupera todos los registros.
     * @return void
     */
    public function getAll(){
        $model = new RecompensaModel();
        $recompensas = $model->getAll();

        //Se comprueba que llegan todos los registros de Recompensa
        if($recompensas==null){
            Controller::sendNotFound("No se pudieron recuperar las recompensas.");
            die();
        }

        echo json_encode($recompensas, JSON_PRETTY_PRINT);
    }

    /**
     * Método insert que crea un nuevo registro.
     * @param object $object
     * @return void
     */
    public function insert($object){
        $model = new RecompensaModel();
        $recompensa = Recompensa::fromJson($object);

        //En función del resultado se manda una respuesta.
        if($model->insert($recompensa)){
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
        $model = new RecompensaModel();

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
        $model = new RecompensaModel();
        $recompensa = Recompensa::fromJson($object);

        //En función del resultado se manda una respuesta.
        if($model->update($recompensa,$id)){
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