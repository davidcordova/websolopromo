<?php
require_once __DIR__ . '/../config/database.php';

class ContactController {
    public static function create(): void {
        $rawInput = file_get_contents('php://input');
        // Remover UTF-8 BOM si está presente
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $input = json_decode($rawInput, true);

        if (!is_array($input) || empty($input)) {
            // Permitir también soporte para multipart/form-data o x-www-form-urlencoded
            $input = $_POST;
        }

        $name    = trim($input['name'] ?? '');
        $email   = trim($input['email'] ?? '');
        $phone   = trim($input['phone'] ?? '');
        $message = trim($input['message'] ?? '');
        $company = trim($input['company'] ?? '');
        $service = trim($input['service'] ?? '');
        $city    = trim($input['city'] ?? '');

        // Validaciones obligatorias
        $errors = [];
        if (empty($name)) {
            $errors[] = 'El nombre es obligatorio.';
        }
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Debe ingresar un correo electrónico válido.';
        }
        if (empty($phone)) {
            $errors[] = 'El número de teléfono o WhatsApp es obligatorio.';
        }
        if (empty($message)) {
            $errors[] = 'El mensaje o detalle del proyecto es obligatorio.';
        }

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode([
                'success' => false,
                'errors'  => $errors,
                'message' => 'Por favor complete todos los campos requeridos.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        try {
            $db = Database::getConnection();
            $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
            $userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 250);

            $stmt = $db->prepare("
                INSERT INTO contacts (name, company, email, phone, service, city, message, ip_address, user_agent)
                VALUES (:name, :company, :email, :phone, :service, :city, :message, :ip, :ua)
            ");

            $stmt->execute([
                ':name'    => $name,
                ':company' => $company,
                ':email'   => $email,
                ':phone'   => $phone,
                ':service' => $service,
                ':city'    => $city,
                ':message' => $message,
                ':ip'      => $ipAddress,
                ':ua'      => $userAgent
            ]);

            $newId = (int)$db->lastInsertId();

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => '¡Gracias por contactarnos! Tu solicitud ha sido registrada correctamente. Un asesor de SoloPromo te contactará a la brevedad.',
                'data'    => [
                    'id'      => $newId,
                    'name'    => $name,
                    'email'   => $email,
                    'service' => $service
                ]
            ], JSON_UNESCAPED_UNICODE);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'No se pudo guardar la solicitud en la base de datos: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    public static function getAll(): void {
        try {
            $db = Database::getConnection();
            $stmt = $db->query("SELECT id, name, company, email, phone, service, city, message, status, ip_address, created_at FROM contacts ORDER BY id DESC");
            $leads = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'count'   => count($leads),
                'data'    => $leads
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
     * Actualizar estado de una solicitud (Admin)
     * PUT /api/contact/{id}
     */
    public static function updateStatus(int $id): void {
        AuthController::requireAuth();
        $rawInput = file_get_contents('php://input');
        $rawInput = preg_replace('/^\xEF\xBB\xBF/', '', $rawInput);
        $data = json_decode($rawInput, true) ?: $_POST;

        $status = trim($data['status'] ?? 'new');
        $allowed = ['new', 'in_review', 'contacted', 'closed'];

        if (!in_array($status, $allowed)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Estado no válido']);
            return;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("UPDATE contacts SET status = :status WHERE id = :id");
            $stmt->execute([':status' => $status, ':id' => $id]);

            echo json_encode(['success' => true, 'message' => 'Estado actualizado a: ' . $status]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Eliminar solicitud (Admin)
     * DELETE /api/contact/{id}
     */
    public static function delete(int $id): void {
        AuthController::requireAuth();
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("DELETE FROM contacts WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Contacto eliminado']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
