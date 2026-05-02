<?php
/**
 * @file ArticuloController.php
 * @description Gestiona los articulos editables del blog.
 */
include_once("Controller.php");
include_once(PATH_MODEL . "ArticuloModel.php");

class ArticuloController extends Controller
{
    public function get($id)
    {
        $model = new ArticuloModel();
        $articulo = $model->get((int) $id, $this->puedeVerTodo());

        if ($articulo == null) {
            Controller::sendNotFound('El articulo solicitado no existe.');
            die();
        }

        echo $articulo->toJson();
    }

    public function getAll()
    {
        $model = new ArticuloModel();
        echo json_encode($model->getAll($this->puedeVerTodo()), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    public function insert($object)
    {
        $model = new ArticuloModel();
        $articulo = Articulo::fromJson($object);

        if ($model->insert($articulo)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo crear el articulo.']);
        exit;
    }

    public function delete($id)
    {
        $model = new ArticuloModel();

        if ($model->delete((int) $id)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo eliminar el articulo.']);
        exit;
    }

    public function update($id, $object)
    {
        $model = new ArticuloModel();
        $articulo = Articulo::fromJson($object);

        if ($model->update($articulo, (int) $id)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo actualizar el articulo.']);
        exit;
    }

    private function puedeVerTodo(): bool
    {
        $token = $_SERVER['HTTP_X_API_KEY'] ?? '';
        return $token !== '' && TokenController::obtenerPermiso($token, 'GET', 'articulo');
    }
}
