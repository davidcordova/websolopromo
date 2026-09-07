<?php
require_once __DIR__ . '/../config/database.php';

class ServicesController {
    public static function getAll(): void {
        try {
            $db = Database::getConnection();
            $stmt = $db->query("
                SELECT id, slug, title, subtitle, short_desc, description, icon, accent_color, features, image_url, order_num
                FROM services
                WHERE is_active = 1
                ORDER BY order_num ASC
            ");
            $services = $stmt->fetchAll();

            // Decodificar el campo JSON features
            foreach ($services as &$service) {
                if (!empty($service['features'])) {
                    $decoded = json_decode($service['features'], true);
                    $service['features'] = is_array($decoded) ? $decoded : [];
                } else {
                    $service['features'] = [];
                }
            }

            echo json_encode([
                'success' => true,
                'data'    => $services
            ], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error al obtener servicios: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public static function getBySlug(string $slug): void {
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                SELECT id, slug, title, subtitle, short_desc, description, icon, accent_color, features, image_url
                FROM services
                WHERE slug = :slug AND is_active = 1
                LIMIT 1
            ");
            $stmt->execute([':slug' => $slug]);
            $service = $stmt->fetch();

            if (!$service) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Servicio no encontrado'], JSON_UNESCAPED_UNICODE);
                return;
            }

            if (!empty($service['features'])) {
                $service['features'] = json_decode($service['features'], true) ?: [];
            }

            echo json_encode(['success' => true, 'data' => $service], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Crear servicio (Admin)
     * POST /api/services
     */
    public static function create(): void {
        AuthController::requireAuth();
        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $title       = trim($data['title'] ?? '');
        $slug        = trim($data['slug'] ?? '') ?: preg_replace('/[^a-z0-9\-]/', '', strtolower(str_replace(' ', '-', $title)));
        $subtitle    = trim($data['subtitle'] ?? '');
        $shortDesc   = trim($data['short_desc'] ?? '');
        $description = trim($data['description'] ?? '');
        $icon        = trim($data['icon'] ?? 'Sparkles');
        $accentColor = trim($data['accent_color'] ?? '#55A2DC');
        $features    = isset($data['features']) && is_array($data['features']) ? json_encode($data['features'], JSON_UNESCAPED_UNICODE) : null;
        $imageUrl    = trim($data['image_url'] ?? '');
        $orderNum    = (int)($data['order_num'] ?? 0);

        if (empty($title) || empty($shortDesc)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Título y descripción corta son obligatorios']);
            return;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                INSERT INTO services (slug, title, subtitle, short_desc, description, icon, accent_color, features, image_url, order_num)
                VALUES (:slug, :title, :subtitle, :short_desc, :description, :icon, :accent, :features, :image_url, :order_num)
            ");
            $stmt->execute([
                ':slug'       => $slug,
                ':title'      => $title,
                ':subtitle'   => $subtitle,
                ':short_desc' => $shortDesc,
                ':description'=> $description,
                ':icon'       => $icon,
                ':accent'     => $accentColor,
                ':features'   => $features,
                ':image_url'  => $imageUrl,
                ':order_num'  => $orderNum
            ]);

            $newId = (int)$db->lastInsertId();
            echo json_encode(['success' => true, 'message' => 'Servicio creado exitosamente', 'id' => $newId], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Actualizar servicio (Admin)
     * PUT /api/services/{id}
     */
    public static function update(int $id): void {
        AuthController::requireAuth();
        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $title       = trim($data['title'] ?? '');
        $subtitle    = trim($data['subtitle'] ?? '');
        $shortDesc   = trim($data['short_desc'] ?? '');
        $description = trim($data['description'] ?? '');
        $icon        = trim($data['icon'] ?? 'Sparkles');
        $accentColor = trim($data['accent_color'] ?? '#55A2DC');
        $features    = isset($data['features']) && is_array($data['features']) ? json_encode($data['features'], JSON_UNESCAPED_UNICODE) : null;
        $imageUrl    = trim($data['image_url'] ?? '');
        $orderNum    = (int)($data['order_num'] ?? 0);
        $isActive    = isset($data['is_active']) ? (int)$data['is_active'] : 1;

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                UPDATE services 
                SET title = :title, subtitle = :subtitle, short_desc = :short_desc, description = :description,
                    icon = :icon, accent_color = :accent, features = :features, image_url = :image_url,
                    order_num = :order_num, is_active = :is_active
                WHERE id = :id
            ");
            $stmt->execute([
                ':title'      => $title,
                ':subtitle'   => $subtitle,
                ':short_desc' => $shortDesc,
                ':description'=> $description,
                ':icon'       => $icon,
                ':accent'     => $accentColor,
                ':features'   => $features,
                ':image_url'  => $imageUrl,
                ':order_num'  => $orderNum,
                ':is_active'  => $isActive,
                ':id'         => $id
            ]);

            echo json_encode(['success' => true, 'message' => 'Servicio actualizado correctamente'], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Eliminar servicio (Admin)
     * DELETE /api/services/{id}
     */
    public static function delete(int $id): void {
        AuthController::requireAuth();
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("DELETE FROM services WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Servicio eliminado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
