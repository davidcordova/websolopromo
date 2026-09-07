/**
 * Script de empaquetado para despliegue en cPanel
 * Ejecutar con: node scripts/build-cpanel.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');
const outputDir = path.join(rootDir, 'cpanel_deploy');

console.log('Iniciando compilacion y empaquetado para cPanel...\n');

// 1. Compilar frontend en React
console.log('[1/5] Compilando frontend React...');
execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

// 2. Preparar carpeta de salida cpanel_deploy
console.log('\n[2/5] Preparando carpeta cpanel_deploy...');
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// Función para copiar directorios recursivamente
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Copiar frontend compilado (dist) a la raiz de cpanel_deploy
console.log('[3/5] Copiando archivos del frontend (dist)...');
copyDir(path.join(frontendDir, 'dist'), outputDir);

// 4. Copiar backend (api, config, controllers, database)
console.log('[4/5] Copiando estructura del backend PHP...');
const backendTarget = path.join(outputDir, 'api');
fs.mkdirSync(backendTarget, { recursive: true });

// Copiar archivos de api
copyDir(path.join(backendDir, 'api'), backendTarget);
// Copiar config y controllers dentro de api/ para facil referencia en cPanel
copyDir(path.join(backendDir, 'config'), path.join(backendTarget, 'config'));
copyDir(path.join(backendDir, 'controllers'), path.join(backendTarget, 'controllers'));

// Copiar carpeta database para referencia de importacion
copyDir(path.join(backendDir, 'database'), path.join(outputDir, 'database'));

// Crear carpeta uploads y copiar .htaccess
const uploadsTarget = path.join(outputDir, 'uploads');
fs.mkdirSync(uploadsTarget, { recursive: true });
const uploadsHtaccess = path.join(backendDir, 'uploads', '.htaccess');
if (fs.existsSync(uploadsHtaccess)) {
  fs.copyFileSync(uploadsHtaccess, path.join(uploadsTarget, '.htaccess'));
}

// 5. Crear .htaccess principal para cPanel (soporte SPA React + API PHP + Uploads)
console.log('[5/5] Generando .htaccess para Apache / cPanel...');
const htaccessContent = `# ==============================================================================
# SoloPromo - Configuración Apache para cPanel (public_html)
# Soporte para React SPA + Backend RESTful PHP en /api/ + Uploads WebP
# ==============================================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Rutas de la API en PHP: delegar a api/index.php
  RewriteCond %{REQUEST_URI} ^/api [NC]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^api/(.*)$ api/index.php?route=$1 [QSA,L]

  # 2. Servir archivos estáticos directamente (js, css, uploads, webp, svg, etc.)
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # 3. Todo lo demás se envía al index.html de React (SPA Routing)
  RewriteRule ^ index.html [L]
</IfModule>

# Compresión GZIP para alta velocidad
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Seguridad y prevención de listado de directorios
Options -Indexes
`;

fs.writeFileSync(path.join(outputDir, '.htaccess'), htaccessContent, 'utf-8');

// 6. Generar archivo de instrucciones LEEME_CPANEL.txt
const readmeContent = `================================================================================
GUÍA DE DESPLIEGUE EN CPANEL - SOLOPROMO (SOPORTE PROMOCIONAL S.A.C.)
================================================================================

Todo el contenido de esta carpeta (cpanel_deploy) está 100% listo para subirse
directamente a la carpeta "public_html" de tu cuenta en cPanel.

PASO 1: SUBIR ARCHIVOS
--------------------------------------------------------------------------------
1. Comprime los archivos dentro de "cpanel_deploy" en un archivo ZIP.
2. Ingresa a cPanel -> Administrador de Archivos -> Ingresa a "public_html".
3. Carga el archivo ZIP y descomprímelo directamente en "public_html".
   Asegúrate de que el archivo .htaccess, index.html, la carpeta "api" y la
   carpeta "uploads" queden en la raíz de public_html.

PASO 2: CONFIGURAR BASE DE DATOS MYSQL EN CPANEL
--------------------------------------------------------------------------------
1. En cPanel, dirígete a "Bases de datos MySQL".
2. Crea una nueva base de datos (por ejemplo: usuario_solopromo).
3. Crea un nuevo usuario MySQL con contraseña segura.
4. Asocia el usuario a la base de datos con "TODOS LOS PRIVILEGIOS".
5. Ingresa a "phpMyAdmin" desde cPanel.
6. Selecciona tu base de datos y dirígete a la pestaña "Importar".
7. Importa primero: database/schema.sql
8. Luego importa: database/seed.sql

PASO 3: CONFIGURAR CREDENCIALES EN EL SERVIDOR
--------------------------------------------------------------------------------
En cPanel -> Administrador de Archivos -> public_html/api/config/:
Crea un archivo llamado "config.php" con tus datos de cPanel:

<?php
return [
    'host'   => 'localhost',
    'port'   => '3306',
    'dbname' => 'tu_usuario_solopromo',
    'user'   => 'tu_usuario_db',
    'pass'   => 'tu_password_segura'
];

PASO 4: ACCESO AL PANEL DE ADMINISTRACIÓN (CMS)
--------------------------------------------------------------------------------
- URL de acceso: https://tudominio.com/#admin
- Usuario: admin
- Contraseña: M1un1c4cl4v3

¡Listo! Tu sitio web en solopromo.net estará activo, rápido y conectado a MySQL.
================================================================================
`;

fs.writeFileSync(path.join(outputDir, 'LEEME_CPANEL.txt'), readmeContent, 'utf-8');

console.log('\nEMPAQUETADO COMPLETADO CON EXITO');
console.log(`Carpeta generada: ${outputDir}`);
console.log('Sube el contenido de esa carpeta a public_html en cPanel.');
