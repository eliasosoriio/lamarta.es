<?php
/**
 * @file SeccionController.php
 * @description Gestiona las secciones editables de la carta.
 */
include_once("Controller.php");
include_once(PATH_MODEL . "SeccionModel.php");

class SeccionController extends Controller
{
    public function get($id)
    {
        $model = new SeccionModel();
        $seccion = $model->get((int) $id, $this->puedeVerTodo());

        if ($seccion == null) {
            Controller::sendNotFound('La seccion solicitada no existe.');
            die();
        }

        echo $seccion->toJson();
    }

    public function getAll()
    {
        $model = new SeccionModel();
        echo json_encode($model->getAll($this->puedeVerTodo()), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    public function insert($object)
    {
        $model = new SeccionModel();
        $seccion = Seccion::fromJson($object);

        if ($model->insert($seccion)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo crear la seccion.']);
        exit;
    }

    public function delete($id)
    {
        $model = new SeccionModel();

        if ($model->delete((int) $id)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo eliminar la seccion.']);
        exit;
    }

    public function update($id, $object)
    {
        $model = new SeccionModel();
        $seccion = Seccion::fromJson($object);

        if ($model->update($seccion, (int) $id)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo actualizar la seccion.']);
        exit;
    }

    private function puedeVerTodo(): bool
    {
        $token = $_SERVER['HTTP_X_API_KEY'] ?? '';
        return $token !== '' && TokenController::obtenerPermiso($token, 'GET', 'seccion');
    }
}
