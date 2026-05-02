<?php

function lamartaGetDbConfig(): array
{
    $config = [];
    $localConfigPath = __DIR__ . "/config.local.php";

    if (is_file($localConfigPath)) {
        $localConfig = require $localConfigPath;
        if (is_array($localConfig)) {
            $config = $localConfig;
        }
    }

    $envConfig = [
        "dsn" => getenv("LAMARTA_DB_DSN") ?: null,
        "user" => getenv("LAMARTA_DB_USER") ?: null,
        "pass" => getenv("LAMARTA_DB_PASS") ?: null,
    ];

    foreach ($envConfig as $key => $value) {
        if (is_string($value) && $value !== "") {
            $config[$key] = $value;
        }
    }

    $missing = [];
    foreach (["dsn", "user", "pass"] as $key) {
        if (!isset($config[$key]) || !is_string($config[$key]) || trim($config[$key]) === "") {
            $missing[] = $key;
        }
    }

    if ($missing !== []) {
        throw new RuntimeException(
            "Database configuration is missing. Copy api/config.example.php to api/config.local.php " .
            "or define LAMARTA_DB_DSN, LAMARTA_DB_USER and LAMARTA_DB_PASS."
        );
    }

    return $config;
}
