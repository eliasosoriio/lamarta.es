<?php
require_once __DIR__ . '/config.php';

try {
    $config = lamartaGetDbConfig();
    $pdo = new PDO($config['dsn'], $config['user'], $config['pass']);

    echo "<h2 style='color: green'>✅ Conexión exitosa a la base de datos.</h2>";

    // Consulta de prueba opcional
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll();

    if (count($tables)) {
        echo "<p>Tablas encontradas:</p><ul>";
        foreach ($tables as $t) {
            echo "<li>" . array_values($t)[0] . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No se encontraron tablas en la base de datos.</p>";
    }

} catch (PDOException $e) {
    echo "<h2 style='color: red'>❌ Error de conexión: " . $e->getMessage() . "</h2>";
} catch (RuntimeException $e) {
    echo "<h2 style='color: red'>❌ Configuración incompleta: " . $e->getMessage() . "</h2>";
}
?>
