<?php
/**
 * Conexión a Base de Datos MySQL con PDO
 * Compatible con XAMPP local y servidores cPanel
 */

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            // Detección de configuración por variables de entorno o archivo de configuración
            $configFile = __DIR__ . '/config.php';
            $config = [];
            if (file_exists($configFile)) {
                $config = include $configFile;
            }

            $host = getenv('DB_HOST') ?: ($config['host'] ?? '127.0.0.1');
            $port = getenv('DB_PORT') ?: ($config['port'] ?? '3306');
            $db   = getenv('DB_NAME') ?: ($config['dbname'] ?? 'solopromo_db');
            $user = getenv('DB_USER') ?: ($config['user'] ?? 'root');
            $pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : ($config['pass'] ?? '');

            $dsn = "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4";
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'error'   => 'Error de conexión a la base de datos: ' . $e->getMessage()
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }
        }

        return self::$instance;
    }
}
