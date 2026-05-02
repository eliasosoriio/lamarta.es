<?php
/**
 * @file ProductoController.php
 * @description Gestiona los productos editables de la carta.
 */
include_once("Controller.php");
include_once(PATH_MODEL . "ProductoModel.php");

class ProductoController extends Controller
{
    public function get($id)
    {
        $model = new ProductoModel();
        $producto = $model->get((int) $id, $this->puedeVerTodo());

        if ($producto == null) {
            Controller::sendNotFound('El producto solicitado no existe.');
            die();
        }

        echo $producto->toJson();
    }

    public function getAll()
    {
        $model = new ProductoModel();
        echo json_encode($model->getAll($this->puedeVerTodo()), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    public function insert($object)
    {
        $model = new ProductoModel();
        $producto = Producto::fromJson($object);

        if ($model->insert($producto)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo crear el producto.']);
        exit;
    }

    public function delete($id)
    {
        $model = new ProductoModel();

        if ($model->delete((int) $id)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo eliminar el producto.']);
        exit;
    }

    public function update($id, $object)
    {
        $model = new ProductoModel();
        $producto = Producto::fromJson($object);

        if ($model->update($producto, (int) $id)) {
            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No se pudo actualizar el producto.']);
        exit;
    }

    private function puedeVerTodo(): bool
    {
        $token = $_SERVER['HTTP_X_API_KEY'] ?? '';
        return $token !== '' && TokenController::obtenerPermiso($token, 'GET', 'producto');
    }
}
