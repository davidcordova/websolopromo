<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/AuthController.php';

class CoverageController {
    /**
     * Listar todas las zonas activas de cobertura con sus ciudades
     * GET /api/coverage
     */
    public static function getZones(): void {
        header('Content-Type: application/json; charset=utf-8');
        try {
            $db = Database::getConnection();
            $stmt = $db->query("
                SELECT id, slug, name, badge_color, description, cities, order_num, is_active 
                FROM coverage_zones 
                WHERE is_active = 1 
                ORDER BY order_num ASC, id ASC
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Decodificar JSON de ciudades
            $zones = array_map(function ($row) {
                if (is_string($row['cities'])) {
                    $decoded = json_decode($row['cities'], true);
                    $row['cities'] = is_array($decoded) ? $decoded : [];
                }
                $row['order_num'] = (int) $row['order_num'];
                $row['is_active'] = (int) $row['is_active'];
                return $row;
            }, $rows);

            echo json_encode([
                'success' => true,
                'data'    => $zones
            ], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error al cargar zonas de cobertura: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Crear una nueva zona de cobertura (Admin)
     * POST /api/coverage
     */
    public static function createZone(): void {
        header('Content-Type: application/json; charset=utf-8');
        AuthController::requireAuth();

        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $name        = trim($data['name'] ?? '');
        $slug        = trim($data['slug'] ?? '');
        $badgeColor  = trim($data['badge_color'] ?? '#55A2DC');
        $description = trim($data['description'] ?? '');
        $cities      = $data['cities'] ?? [];
        $orderNum    = (int) ($data['order_num'] ?? 0);

        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'El nombre de la zona es obligatorio.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        if (empty($slug)) {
            $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $name));
        }

        $citiesJson = is_array($cities) ? json_encode($cities, JSON_UNESCAPED_UNICODE) : (string)$cities;

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("
                INSERT INTO coverage_zones (slug, name, badge_color, description, cities, order_num, is_active)
                VALUES (:slug, :name, :badge_color, :description, :cities, :order_num, 1)
            ");
            $stmt->execute([
                ':slug'        => $slug,
                ':name'        => $name,
                ':badge_color' => $badgeColor,
                ':description' => $description,
                ':cities'      => $citiesJson,
                ':order_num'   => $orderNum
            ]);

            $newId = (int) $db->lastInsertId();

            echo json_encode([
                'success' => true,
                'message' => 'Zona de cobertura creada exitosamente.',
                'id'      => $newId
            ], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error al crear zona: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Actualizar una zona existente (Admin)
     * PUT /api/coverage/:id
     */
    public static function updateZone(int $id): void {
        header('Content-Type: application/json; charset=utf-8');
        AuthController::requireAuth();

        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $name        = trim($data['name'] ?? '');
        $badgeColor  = trim($data['badge_color'] ?? '');
        $description = trim($data['description'] ?? '');
        $cities      = $data['cities'] ?? null;
        $orderNum    = isset($data['order_num']) ? (int) $data['order_num'] : null;
        $isActive    = isset($data['is_active']) ? (int) $data['is_active'] : null;

        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'El nombre de la zona es obligatorio.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        try {
            $db = Database::getConnection();

            $updateFields = [
                'name = :name',
                'description = :description'
            ];
            $params = [
                ':name'        => $name,
                ':description' => $description,
                ':id'          => $id
            ];

            if ($badgeColor !== '') {
                $updateFields[] = 'badge_color = :badge_color';
                $params[':badge_color'] = $badgeColor;
            }

            if ($cities !== null) {
                $updateFields[] = 'cities = :cities';
                $params[':cities'] = is_array($cities) ? json_encode($cities, JSON_UNESCAPED_UNICODE) : (string)$cities;
            }

            if ($orderNum !== null) {
                $updateFields[] = 'order_num = :order_num';
                $params[':order_num'] = $orderNum;
            }

            if ($isActive !== null) {
                $updateFields[] = 'is_active = :is_active';
                $params[':is_active'] = $isActive;
            }

            $sql = "UPDATE coverage_zones SET " . implode(', ', $updateFields) . " WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);

            echo json_encode([
                'success' => true,
                'message' => 'Zona de cobertura actualizada correctamente.'
            ], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error al actualizar zona: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Eliminar zona de cobertura (Admin)
     * DELETE /api/coverage/:id
     */
    public static function deleteZone(int $id): void {
        header('Content-Type: application/json; charset=utf-8');
        AuthController::requireAuth();

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("DELETE FROM coverage_zones WHERE id = :id");
            $stmt->execute([':id' => $id]);

            echo json_encode([
                'success' => true,
                'message' => 'Zona de cobertura eliminada exitosamente.'
            ], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error al eliminar zona: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}
