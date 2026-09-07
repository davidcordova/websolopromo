<?php
/**
 * Script de inicialización / migración de base de datos
 * Ejecutable desde terminal con: php backend/database/migrate.php
 */

$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = getenv('DB_PORT') ?: '3306';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';

echo "=== Conectando a MySQL en {$host}:{$port} con usuario '{$user}' ===\n";

try {
    $pdo = new PDO("mysql:host={$host};port={$port};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo "✔ Conexión establecida con éxito.\n";

    // 1. Ejecutar schema.sql
    $schemaFile = __DIR__ . '/schema.sql';
    if (file_exists($schemaFile)) {
        echo "--> Ejecutando schema.sql...\n";
        $schemaSql = file_get_contents($schemaFile);
        $pdo->exec($schemaSql);
        echo "✔ Base de datos y tablas creadas exitosamente.\n";
    }

    // 2. Ejecutar seed.sql
    $seedFile = __DIR__ . '/seed.sql';
    if (file_exists($seedFile)) {
        echo "--> Ejecutando seed.sql...\n";
        $seedSql = file_get_contents($seedFile);
        $pdo->exec($seedSql);
        echo "✔ Datos semilla insertados exitosamente.\n";
    }

    echo "\n=== MIGRACIÓN COMPLETADA SATISFACTORIAMENTE ===\n";
} catch (PDOException $e) {
    echo "❌ Error en migración: " . $e->getMessage() . "\n";
    exit(1);
}
