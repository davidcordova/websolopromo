<?php
require_once __DIR__ . '/AuthController.php';

class UploadController {
    /**
     * Directorio de almacenamiento de imágenes (Compatible con XAMPP local y cPanel public_html)
     */
    private static function getUploadDir(): string {
        $parentDirName = basename(dirname(__DIR__));
        if ($parentDirName === 'api') {
            // Estructura cPanel: public_html/api/controllers -> public_html/uploads
            $dir = dirname(dirname(__DIR__)) . '/uploads';
        } else {
            // Estructura local: backend/controllers -> backend/uploads
            $dir = dirname(__DIR__) . '/uploads';
        }

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        return $dir;
    }

    /**
     * Subir y optimizar imagen a WebP de alta fidelidad
     * POST /api/upload
     * FormData: file o image
     */
    public static function upload(): void {
        // Verificar autenticación
        $user = AuthController::requireAuth();

        $file = $_FILES['image'] ?? $_FILES['file'] ?? null;

        if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error'   => 'No se recibió ningún archivo válido o hubo un error en la subida.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $tmpName = $file['tmp_name'];
        $origName = $file['name'];
        $originalSize = (int)$file['size'];

        // Validar tipo MIME
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $tmpName);
        finfo_close($finfo);

        $allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'image/bmp'
        ];

        if (!in_array($mime, $allowedMimes)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error'   => 'Formato no soportado. Formatos admitidos: JPG, PNG, WEBP, GIF, BMP.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Cargar imagen con PHP GD según su formato
        $sourceImg = null;
        switch ($mime) {
            case 'image/jpeg':
                $sourceImg = @imagecreatefromjpeg($tmpName);
                break;
            case 'image/png':
                $sourceImg = @imagecreatefrompng($tmpName);
                break;
            case 'image/webp':
                $sourceImg = @imagecreatefromwebp($tmpName);
                break;
            case 'image/gif':
                $sourceImg = @imagecreatefromgif($tmpName);
                break;
            case 'image/bmp':
                $sourceImg = @imagecreatefrombmp($tmpName);
                break;
        }

        if (!$sourceImg) {
            http_response_code(422);
            echo json_encode([
                'success' => false,
                'error'   => 'No se pudo decodificar el archivo de imagen.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $origW = imagesx($sourceImg);
        $origH = imagesy($sourceImg);

        // Limitar resolución máxima para evitar imágenes descomunales (> 2400px)
        $maxDimension = 2400;
        $targetW = $origW;
        $targetH = $origH;

        if ($origW > $maxDimension || $origH > $maxDimension) {
            if ($origW >= $origH) {
                $targetW = $maxDimension;
                $targetH = (int)round(($origH * $maxDimension) / $origW);
            } else {
                $targetH = $maxDimension;
                $targetW = (int)round(($origW * $maxDimension) / $origH);
            }
        }

        // Crear lienzo de destino con soporte para transparencias
        $targetImg = imagecreatetruecolor($targetW, $targetH);
        imagealphablending($targetImg, false);
        imagesavealpha($targetImg, true);

        // Rellenar con fondo transparente
        $transparent = imagecolorallocatealpha($targetImg, 0, 0, 0, 127);
        imagefill($targetImg, 0, 0, $transparent);

        // Remuestreo de alta calidad
        imagecopyresampled(
            $targetImg,
            $sourceImg,
            0, 0, 0, 0,
            $targetW, $targetH,
            $origW, $origH
        );

        // Si se redujo de tamaño, aplicar una máscara sutil de nitidez (unsharp mask)
        if ($targetW < $origW) {
            $sharpenMatrix = [
                [-0.05, -0.05, -0.05],
                [-0.05,  1.40, -0.05],
                [-0.05, -0.05, -0.05]
            ];
            $divisor = 1.0;
            $offset = 0.0;
            if (function_exists('imageconvolution')) {
                @imageconvolution($targetImg, $sharpenMatrix, $divisor, $offset);
            }
        }

        // Generar nombre de archivo único
        $uploadDir = self::getUploadDir();
        $cleanBaseName = preg_replace('/[^a-zA-Z0-9_\-]/', '_', pathinfo($origName, PATHINFO_FILENAME));
        $cleanBaseName = substr($cleanBaseName, 0, 30);
        $fileName = 'sp_' . date('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 6) . '.webp';
        $destPath = $uploadDir . '/' . $fileName;

        // Guardar en formato WebP con calidad 90 (balance óptimo nitidez/peso)
        $saved = imagewebp($targetImg, $destPath, 90);

        // Liberar memoria GD
        imagedestroy($sourceImg);
        imagedestroy($targetImg);

        if (!$saved || !file_exists($destPath)) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Error al guardar la imagen optimizada en el servidor.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $optimizedSize = (int)filesize($destPath);
        $savingsBytes = max(0, $originalSize - $optimizedSize);
        $savingsPercent = $originalSize > 0 
            ? round(($savingsBytes / $originalSize) * 100, 1) 
            : 0;

        // Retornar información completa y URL pública
        echo json_encode([
            'success'            => true,
            'message'            => 'Imagen subida y optimizada a WebP con éxito',
            'url'                => '/uploads/' . $fileName,
            'filename'           => $fileName,
            'original_name'      => $origName,
            'original_size'      => $originalSize,
            'optimized_size'     => $optimizedSize,
            'savings_bytes'      => $savingsBytes,
            'savings_percentage' => $savingsPercent,
            'width'              => $targetW,
            'height'             => $targetH,
            'format'             => 'webp'
        ], JSON_UNESCAPED_UNICODE);
    }
}
