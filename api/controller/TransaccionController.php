<?php
/**
 * @file TransaccionController.php
 * @description Define la clase TransaccionController que maneja la entidad Transaccion.
 * @author Elías Osorio Pouseu
 */
include_once("Controller.php");
include_once(PATH_MODEL."TransaccionModel.php");

/**
 * Clase TransaccionController, contiene sus métodos CRUD.
 */
class TransaccionController extends Controller{

    /**
     * Método get que recupera un registro mediante id.
     * @param int $id
     * @return void
     */
    public function get($id){
        $model = new TransaccionModel();
        $transaccion = $model->get($id);
        
        //Se comprueba que llega un registro de Transaccion
        if($transaccion==null){
            Controller::sendNotFound("El id no se corresponde con ninguna transacción.");
            die();
        }

        echo $transaccion->toJson();
    }

    /**
     * Método getAll que recupera todos los registros de un usuario.
     * @param int|null $id_usuario
     * @return void
     */
    public function getAll($id_usuario=null){
        $model = new TransaccionModel();
        $transacciones = $model->getAll($id_usuario);

        //Se comprueba que llega un registro de Transaccion
        if($transacciones==null){
            Controller::sendNotFound("No se pudieron recuperar los transacciones.");
            die();
        }

        echo json_encode($transacciones, JSON_PRETTY_PRINT);
    }

    /**
     * Método insert que crea un nuevo registro.
     * @param object $object
     * @return void
     */
    public function insert($object){
        $model = new TransaccionModel();
        $transaccion = Transaccion::fromJson($object);

        //En función del resultado se manda una respuesta.
        if($model->insert($transaccion)){
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
        $model = new TransaccionModel();

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
     * Método update que actualiza un registro (No se utiliza aquí).
     * @param int $id
     * @param object $object
     * @return void
     */
    public function update($id, $object){}
}