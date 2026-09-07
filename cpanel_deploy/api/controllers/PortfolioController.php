<?php
require_once __DIR__ . '/../config/database.php';

class PortfolioController {
    public static function getClients(): void {
        try {
            $db = Database::getConnection();
            $stmt = $db->query("
                SELECT id, name, category, tagline, logo_url, featured, order_num 
                FROM clients 
                WHERE featured = 1 
                ORDER BY order_num ASC
            ");
            $clients = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'data'    => $clients
            ], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public static function getProjects(): void {
        try {
            $db = Database::getConnection();
            $stmt = $db->query("
                SELECT id, title, client_name, category, scope, description, image_url, order_num 
                FROM portfolio_projects 
                ORDER BY order_num ASC
            ");
            $projects = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'data'    => $projects
            ], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Crear proyecto en portafolio (Admin)
     * POST /api/portfolio
     */
    public static function createProject(): void {
        AuthController::requireAuth();
        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $title       = trim($data['title'] ?? '');
        $clientName  = trim($data['client_name'] ?? '');
        $category    = trim($data['category'] ?? 'trade-marketing');
        $scope       = trim($data['scope'] ?? '');
        $description = trim($data['description'] ?? '');
        $imageUrl    = trim($data['image_url'] ?? '');
        $featured    = isset($data['featured']) ? (int)$data['featured'] : 1;
        $orderNum    = (int)($data['order_num'] ?? 0);

        if (empty($title) || empty($clientName)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Título y cliente son obligatorios']);
            return;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                INSERT INTO portfolio_projects (title, client_name, category, scope, description, image_url, featured, order_num)
                VALUES (:title, :client, :cat, :scope, :desc, :img, :feat, :order)
            ");
            $stmt->execute([
                ':title'  => $title,
                ':client' => $clientName,
                ':cat'    => $category,
                ':scope'  => $scope,
                ':desc'   => $description,
                ':img'    => $imageUrl,
                ':feat'   => $featured,
                ':order'  => $orderNum
            ]);

            $newId = (int)$db->lastInsertId();
            echo json_encode(['success' => true, 'message' => 'Proyecto creado exitosamente', 'id' => $newId], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Actualizar proyecto en portafolio (Admin)
     * PUT /api/portfolio/{id}
     */
    public static function updateProject(int $id): void {
        AuthController::requireAuth();
        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $title       = trim($data['title'] ?? '');
        $clientName  = trim($data['client_name'] ?? '');
        $category    = trim($data['category'] ?? 'trade-marketing');
        $scope       = trim($data['scope'] ?? '');
        $description = trim($data['description'] ?? '');
        $imageUrl    = trim($data['image_url'] ?? '');
        $featured    = isset($data['featured']) ? (int)$data['featured'] : 1;
        $orderNum    = (int)($data['order_num'] ?? 0);

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                UPDATE portfolio_projects 
                SET title = :title, client_name = :client, category = :cat, scope = :scope,
                    description = :desc, image_url = :img, featured = :feat, order_num = :order
                WHERE id = :id
            ");
            $stmt->execute([
                ':title'  => $title,
                ':client' => $clientName,
                ':cat'    => $category,
                ':scope'  => $scope,
                ':desc'   => $description,
                ':img'    => $imageUrl,
                ':feat'   => $featured,
                ':order'  => $orderNum,
                ':id'     => $id
            ]);

            echo json_encode(['success' => true, 'message' => 'Proyecto actualizado correctamente'], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Eliminar proyecto (Admin)
     * DELETE /api/portfolio/{id}
     */
    public static function deleteProject(int $id): void {
        AuthController::requireAuth();
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("DELETE FROM portfolio_projects WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Proyecto eliminado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Crear cliente / marca aliada (Admin)
     * POST /api/clients
     */
    public static function createClient(): void {
        AuthController::requireAuth();
        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $name     = trim($data['name'] ?? '');
        $category = trim($data['category'] ?? '');
        $tagline  = trim($data['tagline'] ?? '');
        $logoUrl  = trim($data['logo_url'] ?? '');
        $featured = isset($data['featured']) ? (int)$data['featured'] : 1;
        $orderNum = (int)($data['order_num'] ?? 0);

        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Nombre del cliente es obligatorio']);
            return;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                INSERT INTO clients (name, category, tagline, logo_url, featured, order_num)
                VALUES (:name, :cat, :tagline, :logo, :feat, :order)
            ");
            $stmt->execute([
                ':name'    => $name,
                ':cat'     => $category,
                ':tagline' => $tagline,
                ':logo'    => $logoUrl,
                ':feat'    => $featured,
                ':order'   => $orderNum
            ]);

            $newId = (int)$db->lastInsertId();
            echo json_encode(['success' => true, 'message' => 'Cliente agregado con éxito', 'id' => $newId]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Eliminar cliente (Admin)
     * DELETE /api/clients/{id}
     */
    public static function deleteClient(int $id): void {
        AuthController::requireAuth();
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("DELETE FROM clients WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Cliente eliminado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
