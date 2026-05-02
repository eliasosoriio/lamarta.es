<?php
/**
 * @file Model.php
 * @description Define la clase Model de la que extenderán los modelos.
 * @author Elías Osorio Pouseu
 */

require_once dirname(__DIR__) . "/config.php";

/**
 * Clase Model que define la conexión que utilizarán estos mismos.
 */
class Model
{
    /**
     * Método getConnection que devuelve la conexión con la base de datos.
     * @return PDO|void
     */
    protected function getConnection()
    {
        try {
            $config = lamartaGetDbConfig();
            return new PDO($config["dsn"], $config["user"], $config["pass"]);
        } catch (PDOException $e) {
            error_log("Error en la conexión con la Base de Datos: " . $e->getMessage());
        } catch (RuntimeException $e) {
            error_log($e->getMessage());
        }
    }
}
