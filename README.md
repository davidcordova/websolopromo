# SoloPromo (Soporte Promocional S.A.C.) - Plataforma Web Corporativa

Plataforma web moderna y de alto impacto para **Soporte Promocional S.A.C. (`solopromo.net`)**, desarrollada con **React (Frontend)**, **PHP RESTful (Backend)** y **MySQL (Base de Datos)**, diseñada para entornos de hosting **cPanel** y desarrollo local con **XAMPP**.

---

## 📌 1. Stack Tecnológico

| Componente | Tecnología | Rol |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite + Tailwind CSS + Lucide Icons | SPA interactiva, responsiva, con tipografía moderna (Outfit & Inter) y efectos glassmorphism. |
| **Backend** | PHP 8.x (POO + PDO) | API RESTful liviana, segura y sin dependencias externas pesadas, 100% compatible con cPanel y XAMPP. |
| **Base de Datos** | MySQL / MariaDB | Almacenamiento de leads/cotizaciones, catálogo de los 8 servicios, clientes y proyectos. |
| **Servidor Local** | XAMPP (Apache en puerto 80, MySQL en puerto 3306) | Entorno local para pruebas y administración con phpMyAdmin. |
| **Producción** | Hosting cPanel / Apache (`public_html`) | Despliegue con soporte SPA mediante reglas `.htaccess`. |

---

## 🧠 2. Habilidades Personalizadas para Antigravity (.agents/skills)

El proyecto cuenta con dos habilidades creadas para mantener la consistencia en el desarrollo presente y futuro:

1. **`solopromo-stack-architecture`** ([`.agents/skills/solopromo-stack-architecture/SKILL.md`](.agents/skills/solopromo-stack-architecture/SKILL.md)):
   - Arquitectura del backend PHP y frontend React.
   - Normativa de conexión PDO y respuestas JSON.
   - Guía de desarrollo en XAMPP y empaquetado para cPanel.

2. **`solopromo-branding-design`** ([`.agents/skills/solopromo-branding-design/SKILL.md`](.agents/skills/solopromo-branding-design/SKILL.md)):
   - Identidad visual oficial: colores corporativos (Cyan `#00A8E8`, Azul `#0066CC`, Naranja `#FF7A00`, Slate `#0B132B`).
   - Los 4 isotipos de color representativos del logo.
   - Los 8 pilares de servicio oficiales y cobertura nacional (4 zonas del Perú).
   - Teléfono y WhatsApp oficial (`+51 949 705 664`).

---

## 🚀 3. Puesta en Marcha en Local (XAMPP)

### Prerrequisitos
- **XAMPP** instalado y en ejecución con módulos de **Apache** y **MySQL** activos.
- **Node.js** v18+ y **npm**.
- **PHP** 8.x en el PATH del sistema.

### Pasos de Instalación

1. **Instalar dependencias del frontend**:
   ```bash
   cd frontend
   npm install
   ```

2. **Inicializar y migrar la base de datos MySQL**:
   Desde la raíz del proyecto, ejecuta:
   ```bash
   npm run db:migrate
   ```
   *(Crea la base de datos `solopromo_db`, las tablas `contacts`, `services`, `clients`, `portfolio_projects` y precarga los datos semilla).*

3. **Iniciar el Backend PHP**:
   ```bash
   npm run dev:api
   ```
   *(Inicia el servidor local de la API en `http://127.0.0.1:8000/api`)*

4. **Iniciar el Frontend React**:
   En otra terminal:
   ```bash
   npm run dev
   ```
   *(Abre la web en `http://localhost:5175`)*

---

## 📦 4. Despliegue en Producción (cPanel)

Para generar la versión lista para subir a cPanel:

```bash
npm run build:cpanel
```

Este comando genera la carpeta **`cpanel_deploy/`** con la siguiente estructura:
- `.htaccess` optimizado para SPA de React y redirección de `/api/*` a PHP.
- `index.html` y carpeta `assets/` con el código compilado de React.
- Carpeta `api/` con los controladores, configuración y endpoints PHP.
- Carpeta `database/` con los scripts SQL (`schema.sql` y `seed.sql`) listos para importar en el phpMyAdmin de cPanel.
- `LEEME_CPANEL.txt` con instrucciones paso a paso.

### Pasos en cPanel:
1. Sube todo el contenido de `cpanel_deploy/` a la carpeta `public_html/` de tu hosting.
2. Crea tu base de datos MySQL en cPanel e importa los archivos de `database/`.
3. Crea o edita `public_html/api/config/config.php` con las credenciales de tu base de datos en cPanel:
   ```php
   <?php
   return [
       'host'   => 'localhost',
       'port'   => '3306',
       'dbname' => 'tu_usuario_solopromo',
       'user'   => 'tu_usuario_db',
       'pass'   => 'tu_password_segura'
   ];
   ```

---

## 📱 5. Canales de Contacto Oficiales

- **WhatsApp / Central Móvil**: +51 949 705 664
- **Web Oficial**: [solopromo.net](https://solopromo.net)
- **Redes Sociales**: @soporte.promocional.sac (Facebook, Instagram, LinkedIn)
