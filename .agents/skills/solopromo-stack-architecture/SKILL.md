---
name: solopromo-stack-architecture
description: >-
  Estándares de arquitectura técnica, desarrollo y despliegue del proyecto SoloPromo (Soporte Promocional S.A.C.).
  Define la estructura de backend en PHP RESTful, frontend en React con Vite, base de datos MySQL,
  configuración de desarrollo local con XAMPP y empaquetado/despliegue en hosting cPanel (Apache).
---

# Guía de Arquitectura y Stack Técnico: SoloPromo

Esta habilidad define las directrices y estándares obligatorios para el desarrollo, mantenimiento y despliegue de la plataforma web de **Soporte Promocional S.A.C. (`solopromo.net`)**.

---

## 1. Stack Tecnológico

| Capa | Tecnología | Justificación y Rol |
| :--- | :--- | :--- |
| **Frontend** | React 18+ (Vite) + Tailwind CSS + Lucide Icons | Rápido, reactivo, interfaz dinámica con micro-animaciones y soporte para SPA moderna. |
| **Backend** | PHP 8.x (RESTful API sin frameworks pesados) | Máxima compatibilidad con cPanel, ultra-ligero, ejecutable en Apache sin dependencias de Node en el servidor de producción. |
| **Base de Datos** | MySQL 5.7+ / 8.0+ | Compatible con MariaDB / MySQL de cPanel (phpMyAdmin) y XAMPP local. |
| **Servidor Local** | XAMPP (Apache en puerto 80, MySQL en puerto 3306) | Entorno local estándar para pruebas de backend y base de datos. |
| **Producción** | Hosting cPanel / Apache (`public_html`) | Despliegue mediante archivos estáticos (`dist/`) + API PHP en `/api/` gobernada por `.htaccess`. |

---

## 2. Estructura de Directorios del Proyecto

```text
paginaweb/
├── .agents/
│   └── skills/
│       ├── solopromo-stack-architecture/
│       │   └── SKILL.md
│       └── solopromo-branding-design/
│           └── SKILL.md
├── backend/
│   ├── config/
│   │   ├── database.php        # Conexión PDO con detección automática (XAMPP vs cPanel)
│   │   └── cors.php            # Headers CORS y manejo de métodos pre-flight OPTIONS
│   ├── controllers/
│   │   ├── ContactController.php   # Manejo de leads y cotizaciones
│   │   ├── ServicesController.php  # Consulta dinámica de servicios
│   │   └── PortfolioController.php # Consulta de proyectos y casos de éxito
│   ├── database/
│   │   ├── schema.sql          # DDL de tablas en MySQL
│   │   └── seed.sql            # Datos precargados
│   ├── api/
│   │   └── index.php           # Punto de entrada / router REST
│   └── .htaccess               # Configuración Apache para endpoints
├── frontend/
│   ├── public/                 # Favicon, robots.txt, assets estáticos
│   ├── src/
│   │   ├── components/         # Componentes UI organizados por sección
│   │   ├── services/           # Cliente HTTP / API service
│   │   ├── data/               # Catálogos estáticos y fallbacks offline
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── scripts/
    └── build-cpanel.js         # Script para unificar frontend compilado y backend en carpeta cpanel/
```

---

## 3. Estándares de Backend (PHP)

1. **Uso estricto de PDO**:
   - Todas las consultas deben usar `PDO::prepare()` con parámetros nombrados o posicionales para evitar inyecciones SQL.
   - Manejo de excepciones con bloques `try / catch` retornando JSON con código HTTP correspondiente (200, 201, 400, 500).

2. **Detección de Entorno (`database.php`)**:
   - En local (`127.0.0.1` o `localhost`): Conecta por defecto a usuario `root`, contraseña vacía o según variables de entorno.
   - En producción (cPanel): Lee variables de entorno o archivo de configuración protegido para credenciales de cPanel.

3. **Estructura Estándar de Respuestas JSON**:
   ```json
   {
     "success": true,
     "data": { ... },
     "message": "Operación exitosa"
   }
   ```
   En caso de error:
   ```json
   {
     "success": false,
     "error": "Mensaje descriptivo del error"
   }
   ```

4. **Sanitización y Validación**:
   - Validar campos requeridos antes de cualquier operación en base de datos.
   - Limpiar cadenas con `trim()`, `htmlspecialchars()` o `filter_var()`.

---

## 4. Estándares de Frontend (React)

1. **Estilo y Diseño**:
   - Usar Tailwind CSS con clases de diseño coherentes con la paleta de SoloPromo.
   - Utilizar componentes limpios, accesibles y con respuesta táctil inmediata.
   - Iconografía unificada mediante `lucide-react`.

2. **Consumo de la API**:
   - La URL base de la API debe ser configurable mediante variable de entorno `VITE_API_BASE_URL`.
   - En desarrollo apunta a `http://localhost:8000/api` o al host de XAMPP `http://localhost/solopromo/backend/api`.
   - En producción en cPanel, la API se ubica en el mismo dominio bajo `/api`.

3. **Fallback Offline**:
   - Si la base de datos o el backend no responden, el frontend debe mostrar los datos corporativos precargados desde `src/data/` para garantizar 100% de disponibilidad de la información a los clientes visitantes.

---

## 5. Protocolo de Pruebas en Local con XAMPP

1. Iniciar Apache y MySQL desde el panel de control de XAMPP (o verificar puertos 80 y 3306).
2. Crear la base de datos `solopromo_db` en phpMyAdmin (`http://localhost/phpmyadmin`).
3. Ejecutar el script `schema.sql` y luego `seed.sql`.
4. El backend se puede probar directamente en Apache de XAMPP o levantando el servidor embebido de PHP:
   ```bash
   php -S localhost:8000 -t backend
   ```
5. En el frontend:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 6. Procedimiento de Despliegue en cPanel

1. **Compilación del Frontend**:
   ```bash
   cd frontend
   npm run build
   ```
2. **Estructura para `public_html` en cPanel**:
   - El contenido de `frontend/dist/` (`index.html`, `assets/`, etc.) se coloca en la raíz de `public_html`.
   - La carpeta `backend/api/`, `backend/config/` y `backend/controllers/` se colocan en `public_html/api/` (o fuera de `public_html` con symlink por seguridad).
3. **Archivo `.htaccess` en la raíz de `public_html`**:
   Permite que las peticiones a `/api/*` sean procesadas por PHP y que el resto de rutas sean dirigidas al `index.html` de React (soporte SPA):
   ```apache
   RewriteEngine On

   # Permitir acceso directo a la API de PHP
   RewriteRule ^api/(.*)$ api/index.php [QSA,L]

   # Redirigir el resto al index.html de React
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^ index.html [L]
   ```
4. **Base de Datos en cPanel**:
   - Crear base de datos en cPanel -> *Bases de datos MySQL*.
   - Crear usuario con permisos completos.
   - Importar `backend/database/schema.sql` y `seed.sql` desde phpMyAdmin de cPanel.
   - Configurar credenciales en `backend/config/database.php`.
