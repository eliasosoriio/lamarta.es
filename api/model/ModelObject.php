<?php
/**
 * @file ModelObject.php
 * @description Define la clase ModelObject de la que extenderán los modelos.
 * @author Elías Osorio Pouseu
 */

/**
 * Clase abstracta ModelObject que define que estructura tienen estos mismos.
 */
abstract class ModelObject
{

    /**
     * Método fromJson que convierte un json al objeto correspondiente.
     * @param string $json
     * @return ModelObject
     */
    abstract static  public function fromJson($json):ModelObject;

    /**
     * Método toJson que convierte el objeto en json
     * @return string
     */
    abstract public function toJson():String;
}