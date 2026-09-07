<?php
require_once __DIR__ . '/../config/database.php';

class AuthController {
    /**
     * Iniciar sesión administrativa
     * POST /api/auth/login
     * Body: { username: "admin", password: "..." }
     */
    public static function login(): void {
        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $username = trim($data['username'] ?? '');
        $password = trim($data['password'] ?? '');

        if (empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error'   => 'Debe ingresar usuario y contraseña'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                SELECT id, username, email, password_hash, name, role 
                FROM users 
                WHERE username = :user1 OR email = :user2 
                LIMIT 1
            ");
            $stmt->execute([':user1' => $username, ':user2' => $username]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password_hash'])) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'error'   => 'Credenciales inválidas. Verifique su usuario y contraseña.'
                ], JSON_UNESCAPED_UNICODE);
                return;
            }

            // Generar token seguro
            $token = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', strtotime('+7 days'));

            $updateStmt = $db->prepare("
                UPDATE users 
                SET token = :token, token_expires_at = :expires 
                WHERE id = :id
            ");
            $updateStmt->execute([
                ':token'   => $token,
                ':expires' => $expiresAt,
                ':id'      => $user['id']
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'token'   => $token,
                'expires' => $expiresAt,
                'user'    => [
                    'id'       => (int)$user['id'],
                    'username' => $user['username'],
                    'email'    => $user['email'],
                    'name'     => $user['name'],
                    'role'     => $user['role']
                ]
            ], JSON_UNESCAPED_UNICODE);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error de autenticación: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Obtener perfil del usuario autenticado
     * GET /api/auth/me
     */
    public static function me(): void {
        $user = self::requireAuth();
        echo json_encode([
            'success' => true,
            'user'    => $user
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Cerrar sesión
     * POST /api/auth/logout
     */
    public static function logout(): void {
        $token = self::getBearerToken();
        if ($token) {
            try {
                $db = Database::getConnection();
                $stmt = $db->prepare("UPDATE users SET token = NULL, token_expires_at = NULL WHERE token = :token");
                $stmt->execute([':token' => $token]);
            } catch (Exception $e) {
                // Ignore logout db error
            }
        }

        echo json_encode([
            'success' => true,
            'message' => 'Sesión finalizada correctamente'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Middleware de autorización estricto
     * Retorna array del usuario si es válido, de lo contrario termina la petición con HTTP 401
     */
    public static function requireAuth(): array {
        $token = self::getBearerToken();

        if (empty($token)) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'error'   => 'Acceso no autorizado. Se requiere token de sesión.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                SELECT id, username, email, name, role, token_expires_at 
                FROM users 
                WHERE token = :token 
                LIMIT 1
            ");
            $stmt->execute([':token' => $token]);
            $user = $stmt->fetch();

            if (!$user) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'error'   => 'Sesión inválida o expirada'
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            if (!empty($user['token_expires_at']) && strtotime($user['token_expires_at']) < time()) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'error'   => 'La sesión ha expirado. Inicie sesión nuevamente.'
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            return [
                'id'       => (int)$user['id'],
                'username' => $user['username'],
                'email'    => $user['email'],
                'name'     => $user['name'],
                'role'     => $user['role']
            ];

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error al verificar autorización: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    /**
     * Extraer Bearer token de encabezados HTTP
     */
    public static function getBearerToken(): ?string {
        $headers = [];
        if (function_exists('getallheaders')) {
            $headers = getallheaders();
        }

        // Normalizar claves de encabezados a minúsculas
        $normalizedHeaders = [];
        foreach ($headers as $key => $value) {
            $normalizedHeaders[strtolower($key)] = $value;
        }

        $authHeader = $normalizedHeaders['authorization'] 
            ?? $_SERVER['HTTP_AUTHORIZATION'] 
            ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] 
            ?? null;

        if (!empty($authHeader) && preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
            return $matches[1];
        }

        // Fallback por query param o cookie
        return $_GET['auth_token'] ?? $_COOKIE['solopromo_token'] ?? null;
    }
}
