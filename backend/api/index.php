<?php
/**
 * SoloPromo API - Router Centralizado RESTful
 * Compatible con cPanel / Apache mod_rewrite y servidor PHP local
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/UploadController.php';
require_once __DIR__ . '/../controllers/ContactController.php';
require_once __DIR__ . '/../controllers/ServicesController.php';
require_once __DIR__ . '/../controllers/PortfolioController.php';
require_once __DIR__ . '/../controllers/CoverageController.php';

// Aplicar encabezados CORS y manejar OPTIONS
handleCors();

// Obtener ruta solicitada
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$parsedUrl = parse_url($requestUri);
$path = $parsedUrl['path'] ?? '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Normalizar la ruta para eliminar prefijos como /solopromo/backend/api o /api
$route = $_GET['route'] ?? '';
if (empty($route)) {
    // Si no viene por query string, extraer del path
    $basePatterns = [
        '#^.*?/backend/api/?#i',
        '#^.*?/api/?#i',
    ];
    $cleanPath = $path;
    foreach ($basePatterns as $pattern) {
        if (preg_match($pattern, $path)) {
            $cleanPath = preg_replace($pattern, '', $path);
            break;
        }
    }
    $route = trim($cleanPath, '/');
}

// Router
$segments = explode('/', $route);
$resource = $segments[0] ?? '';
$param = $segments[1] ?? null;

switch ($resource) {
    case '':
    case 'health':
        try {
            $db = Database::getConnection();
            $dbStatus = 'connected';
        } catch (Exception $e) {
            $dbStatus = 'error: ' . $e->getMessage();
        }

        echo json_encode([
            'success'   => true,
            'message'   => 'SoloPromo API v2.0 activa con CMS y Optimizador WebP',
            'timestamp' => date('c'),
            'php'       => PHP_VERSION,
            'database'  => $dbStatus
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'auth':
        if ($param === 'login' && $method === 'POST') {
            AuthController::login();
        } elseif ($param === 'me' && $method === 'GET') {
            AuthController::me();
        } elseif ($param === 'logout' && $method === 'POST') {
            AuthController::logout();
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Ruta de autenticación no encontrada']);
        }
        break;

    case 'upload':
        if ($method === 'POST') {
            UploadController::upload();
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Método no permitido. Use POST para subir imágenes.']);
        }
        break;

    case 'services':
        if ($method === 'GET') {
            if ($param && !is_numeric($param)) {
                ServicesController::getBySlug($param);
            } else {
                ServicesController::getAll();
            }
        } elseif ($method === 'POST') {
            ServicesController::create();
        } elseif ($method === 'PUT' && $param) {
            ServicesController::update((int)$param);
        } elseif ($method === 'DELETE' && $param) {
            ServicesController::delete((int)$param);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        }
        break;

    case 'clients':
        if ($method === 'GET') {
            PortfolioController::getClients();
        } elseif ($method === 'POST') {
            PortfolioController::createClient();
        } elseif ($method === 'DELETE' && $param) {
            PortfolioController::deleteClient((int)$param);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        }
        break;

    case 'portfolio':
        if ($method === 'GET') {
            PortfolioController::getProjects();
        } elseif ($method === 'POST') {
            PortfolioController::createProject();
        } elseif ($method === 'PUT' && $param) {
            PortfolioController::updateProject((int)$param);
        } elseif ($method === 'DELETE' && $param) {
            PortfolioController::deleteProject((int)$param);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        }
        break;

    case 'contact':
        if ($method === 'POST') {
            ContactController::create();
        } elseif ($method === 'GET') {
            ContactController::getAll();
        } elseif ($method === 'PUT' && $param) {
            ContactController::updateStatus((int)$param);
        } elseif ($method === 'DELETE' && $param) {
            ContactController::delete((int)$param);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        }
        break;

    case 'coverage':
        if ($method === 'GET') {
            CoverageController::getZones();
        } elseif ($method === 'POST') {
            CoverageController::createZone();
        } elseif ($method === 'PUT' && $param) {
            CoverageController::updateZone((int)$param);
        } elseif ($method === 'DELETE' && $param) {
            CoverageController::deleteZone((int)$param);
        } else {
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Método no permitido']);
        }
        break;


    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error'   => 'Ruta no encontrada',
            'requested_route' => $route
        ], JSON_UNESCAPED_UNICODE);
        break;
}
