<?php
/**
 * Configuración de Headers CORS y Content-Type
 * Permite peticiones seguras desde el frontend React (Vite en puerto 5173 o dominio de producción)
 */

function handleCors(): void {
    // Permitir orígenes (desarrollo local Vite y cualquier subdominio o cPanel)
    $allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://localhost',
        'https://solopromo.net',
        'https://www.solopromo.net'
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowedOrigins) || empty($origin)) {
        header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
    } else {
        header('Access-Control-Allow-Origin: *');
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=UTF-8');

    // Responder de inmediato a peticiones pre-flight OPTIONS del navegador
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit(0);
    }
}
