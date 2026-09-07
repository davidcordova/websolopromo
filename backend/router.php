<?php
/**
 * Router para el servidor embebido local de PHP (php -S)
 * Emula el comportamiento del .htaccess de Apache y cPanel
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Si es un archivo físico estático existente, servirlo directamente
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Si la ruta comienza con /api, delegar al router central de la API
if (str_starts_with($uri, '/api')) {
    $_GET['route'] = preg_replace('#^/api/?#', '', $uri);
    require __DIR__ . '/api/index.php';
    return true;
}

// Fallback por defecto a la API
require __DIR__ . '/api/index.php';
