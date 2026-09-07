-- ==============================================================================
-- SoloPromo (Soporte Promocional S.A.C.) - Initial Seeds
-- Extraído del PDF oficial y brochure corporativo
-- ==============================================================================

USE `solopromo_db`;

-- Limpiar tablas
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `services`;
TRUNCATE TABLE `clients`;
TRUNCATE TABLE `portfolio_projects`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Los 8 Servicios Oficiales
INSERT INTO `services` (`slug`, `title`, `subtitle`, `short_desc`, `description`, `icon`, `accent_color`, `features`, `order_num`) VALUES
(
  'trade-marketing',
  'Trade Marketing',
  'Promotoría / Canal Tradicional / Canal Moderno',
  'Gestión integral de promotores calificados en puntos de venta para maximizar la rotación y preferencia de marca.',
  'Contamos con un equipo altamente capacitado y supervisado para representar a tu marca en tiendas por departamento, cadenas especializadas y canal tradicional. Aseguramos cumplimiento de metas, reporte en tiempo real y asesoría técnica directa al comprador.',
  'ShoppingBag',
  '#00A8E8',
  '["Promotores y anfitrionas con capacitación continua", "Supervisión de campo con métricas y KPIs", "Presencia en retail moderno y canal tradicional", "Gestión de inventarios y control de quiebres de stock"]',
  1
),
(
  'eventos-corporativos',
  'Eventos Corporativos',
  'Lanzamientos / Eventos Empresariales',
  'Producción y ejecución de eventos corporativos de alto nivel que fortalecen la identidad de tu empresa.',
  'Planificamos y producimos eventos memorables: lanzamientos oficiales de producto, conferencias anuales, reuniones con canales de distribución y cócteles ejecutivos. Cuidamos cada detalle desde la escenografía, iluminación y sonido hasta el protocolo de atención.',
  'Users',
  '#0066CC',
  '["Lanzamientos de productos y marcas de escala global", "Conferencias, plenarias y asambleas corporativas", "Producción audiovisual, iluminación y pantallas LED", "Protocolo, acreditación y atención a invitados VIP"]',
  2
),
(
  'btl',
  'BTL (Activaciones)',
  'Activaciones en Punto de Venta',
  'Experiencias interactivas y dinámicas de gamificación que conectan de forma emocional con el consumidor.',
  'Diseñamos activaciones de alto impacto sensorial en centros comerciales, plazas y puntos estratégicos. Incorporamos ruletas de premios, photobooths temáticos, sampling y concursos interactivos para generar engagement genuino y fidelización inmediata.',
  'Radio',
  '#FF7A00',
  '["Activaciones in-store y plazas de alta afluencia", "Dinámicas de gamificación: ruletas, photobooths y premios", "Sampling experiencial de productos", "Captura de leads y registro de participantes"]',
  3
),
(
  'diseno-grafico',
  'Diseño Gráfico',
  'Diseño para Puntos Definidos por el Cliente',
  'Creatividad visual orientada a la conversión y alineada a las rigurosas guías de marcas internacionales.',
  'Desarrollamos piezas gráficas de alto impacto: material publicitario para PDV, catálogos de premios, adaptaciones de campañas globales, packaging y señalética comercial con riguroso apego al manual de marca de cada cliente.',
  'PenTool',
  '#00C49F',
  '["Diseño publicitario adaptado a punto de venta", "Catálogos de productos y folletería de alto nivel", "Adaptación de campañas internacionales a mercado local", "Artes finales para impresión offset y digital"]',
  4
),
(
  'indoor',
  'Indoor (Módulos)',
  'Módulos y Exhibición en Retail',
  'Estructuras y corners de exhibición diseñados para destacar tu producto en el entorno competitivo del retail.',
  'Creamos e implementamos módulos de exhibición de alta gama para tiendas departamentales (Saga Falabella, Ripley, Oechsle) y tiendas de tecnología. Incluyen iluminación LED integrada, cableado oculto, seguridad anti-hurto y acabados de primera calidad.',
  'LayoutGrid',
  '#00A8E8',
  '["Corners y cabeceras de góndola a medida", "Módulos iluminados con tecnología LED", "Sistemas integrados de seguridad para equipos en demo", "Mantenimiento preventivo y correctivo en PDV"]',
  5
),
(
  'merchandising',
  'Merchandising',
  'Mercadería de Respaldo y Apoyo Visual',
  'Artículos promocionales corporativos de excelente factura que extienden el alcance y recuerdo de tu marca.',
  'Producimos y personalizamos artículos de merchandising corporativo: papelería ejecutiva, agendas corporativas, libretas de notas, lapiceros ecológicos, bolsos de tela reutilizables, credenciales y kits de bienvenida para colaboradores y clientes clave.',
  'Gift',
  '#FF7A00',
  '["Kits de bienvenida y regalos corporativos premium", "Papelería personalizada: agendas, libretas y calendarios", "Artículos eco-amigables y material promocional sostenible", "Control de calidad riguroso en acabados y estampados"]',
  6
),
(
  'branding',
  'Branding',
  'Espacios de Implementación y Rotulación',
  'Transformación de espacios comerciales con alto valor estético, señalética y cajas de luz de gran formato.',
  'Intervenimos fachadas, pasillos comerciales, escaleras mecánicas, vitrinas y áreas estratégicas mediante cajas de luz backlight, viniles de alta durabilidad, señalética arquitectónica y ambientación de tiendas.',
  'Sparkles',
  '#0066CC',
  '["Cajas de luz LED de gran formato (Backlight y Frontlight)", "Implementación de vitrinas y arcos de acceso", "Branding en escaleras mecánicas y zonas de alto tránsito", "Rotulación vehicular y fachadas comerciales"]',
  7
),
(
  'modulos-experiencia',
  'Módulos de Experiencia',
  'Más Dinamismo en los Puntos de Venta',
  'Islas interactivas y espacios inmersivos donde el cliente prueba, experimenta y se enamora del producto.',
  'Desarrollamos islas comerciales que invitan a la interacción directa. Conectamos pantallas táctiles, audio de alta fidelidad, zonas de demostración para cámaras fotográficas, laptops gaming y smartphones, transformando la compra en una experiencia memorable.',
  'MonitorPlay',
  '#00C49F',
  '["Islas comerciales con tecnología interactiva y táctil", "Mesas de demostración en vivo (hands-on experience)", "Integración de sonido, imagen y conectividad", "Mobiliario ergonómico de alta resistencia para alto flujo"]',
  8
);

-- 2. Clientes Globales
INSERT INTO `clients` (`name`, `category`, `tagline`, `logo_url`, `featured`, `order_num`) VALUES
('Canon', 'Tecnología e Imagen', 'Cámaras, Lentes y Soluciones de Impresión', '/images/clients/logo_canon.webp', 1, 1),
('ASUS', 'Cómputo & Gaming', 'Laptops, Tarjetas Gráficas y ROG', '/images/clients/logo_asus.webp', 1, 2),
('TCL', 'Electrónica de Consumo', 'Televisores QD-MiniLED y Audio', '/images/clients/logo_tcl.webp', 1, 3),
('Microsoft', 'Software & Hardware', 'Surface, Windows y Ecosistema Cloud', '/images/clients/logo_microsoft.webp', 1, 4),
('JBL', 'Audio Profesional & Lifestyle', 'Parlantes Waterproof y Auriculares', '/images/clients/logo_jbl.webp', 1, 5),
('Nexxt Solutions', 'Conectividad & Smart Home', 'Routers, Domótica y Redes', '/images/clients/logo_nexxt.webp', 1, 6),
('ViewSonic', 'Displays & Monitores', 'Monitores Profesionales y Proyectores', '/images/clients/logo_viewsonic.webp', 1, 7),
('Klip Xtreme', 'Accesorios & Movilidad', 'Mochilas, Auriculares y Gadgets', '/images/clients/logo_klipxtreme.webp', 1, 8),
('Accvent', 'Distribución Mayorista', 'Infraestructura Tecnológica', '/images/clients/logo_accvent.webp', 1, 9),
('Belkin', 'Carga & Conectividad', 'Cargadores GaN y Accesorios Certificados', '/images/clients/logo_belkin.webp', 1, 10);

-- 3. Proyectos Destacados del Portafolio
INSERT INTO `portfolio_projects` (`title`, `client_name`, `category`, `scope`, `description`, `featured`, `order_num`) VALUES
('Promotoría Integral Canon EOS R50', 'Canon', 'trade-marketing', 'Retail Moderno Nacional', 'Despliegue de promotores especializados en tecnología fotográfica en las principales tiendas departamentales a nivel nacional.', 1, 1),
('Lanzamiento Exclusivo TCL QD-MiniLED', 'TCL', 'eventos-corporativos', 'Evento VIP & Retail', 'Módulos de exhibición y presentación de la nueva línea de pantallas MiniLED con experiencia inmersiva para clientes clave.', 1, 2),
('Activaciones BTL Canon Gift Card & Photobooth', 'Canon', 'btl', 'Puntos de Venta & Centros Comerciales', 'Dinámicas de activación con cabinas fotográficas instantáneas e incentivos de compra para el consumidor final.', 1, 3),
('Corners Gamer ASUS ROG Zephyrus G16', 'ASUS', 'indoor', 'Tiendas Departamentales & Especializadas', 'Diseño y fabricación de muebles modulares con iluminación RGB, seguridad de producto y exhibición dinámica de laptops.', 1, 4),
('Kits Ejecutivos Merchandising Motorola', 'Motorola', 'merchandising', 'Corporativo & Canales', 'Diseño y producción de agendas de cuero ecológico, lapiceros ejecutivos y libretas premium para socios de negocio.', 1, 5),
('Módulos de Experiencia de Audio JBL PartyBox', 'JBL', 'modulos-experiencia', 'Retail & Eventos', 'Islas interactivas a prueba de agua con demostración de sonido en vivo e iluminación rítmica.', 1, 6),
('Branding y Cajas de Luz ASUS ROG en Escaleras Mecánicas', 'ASUS', 'branding', 'Mall Aventura & Jockey Plaza', 'Implementación de señalética de gran escala y visuales de alta resolución en zonas de alto tránsito peatonal.', 1, 7),
('Catálogo de Premios & Publicidad Canon', 'Canon', 'diseno-grafico', 'Marketing Directo & PDV', 'Diseño gráfico editorial de catálogos promocionales, folletería de productos y adaptaciones visuales.', 1, 8);

-- 4. Usuario Administrador CMS (Clave: M1un1c4cl4v3)
INSERT INTO `users` (`username`, `email`, `password_hash`, `name`, `role`) VALUES
('admin', 'admin@solopromo.net', '$2y$10$SiZae4EVpdHtLhF.k2KK4.Oj1FcLrporo/y8d2ih3CvVqxgFFc0QS', 'Administrador SoloPromo', 'superadmin')
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`);

-- 5. Zonas de Cobertura Nacional y Coordenadas de Ciudades
INSERT INTO `coverage_zones` (`slug`, `name`, `badge_color`, `description`, `cities`, `order_num`) VALUES
(
  'centro',
  'Zona Centro',
  '#55A2DC',
  'Sede central de operaciones, almacenes de abastecimiento y cobertura directa en toda la capital y costa/sierra central.',
  '[
    {"name": "Lima y Callao", "dept": "Lima", "x": 39, "y": 55, "is_hq": true, "staff": "+40 Promotores"},
    {"name": "Huacho", "dept": "Lima Provincias", "x": 36, "y": 49, "is_hq": false, "staff": "+8 Promotores"},
    {"name": "Huancayo", "dept": "Junín", "x": 49, "y": 54, "is_hq": false, "staff": "+12 Promotores"},
    {"name": "Ica", "dept": "Ica", "x": 48, "y": 66, "is_hq": false, "staff": "+10 Promotores"}
  ]',
  1
),
(
  'norte',
  'Zona Norte',
  '#4878AC',
  'Presencia continua en las principales plazas comerciales del norte peruano con supervisión regional descentralizada.',
  '[
    {"name": "Piura", "dept": "Piura", "x": 18, "y": 16, "is_hq": false, "staff": "+15 Promotores"},
    {"name": "Chiclayo", "dept": "Lambayeque", "x": 22, "y": 24, "is_hq": false, "staff": "+14 Promotores"},
    {"name": "Trujillo", "dept": "La Libertad", "x": 27, "y": 31, "is_hq": false, "staff": "+18 Promotores"},
    {"name": "Cajamarca", "dept": "Cajamarca", "x": 31, "y": 25, "is_hq": false, "staff": "+8 Promotores"},
    {"name": "Chimbote", "dept": "Áncash", "x": 30, "y": 38, "is_hq": false, "staff": "+10 Promotores"}
  ]',
  2
),
(
  'sur',
  'Zona Sur',
  '#B56635',
  'Operatividad integral en el eje comercial del sur, abarcando centros comerciales de alta gama y canal tradicional.',
  '[
    {"name": "Arequipa", "dept": "Arequipa", "x": 65, "y": 77, "is_hq": false, "staff": "+20 Promotores"},
    {"name": "Cusco", "dept": "Cusco", "x": 67, "y": 64, "is_hq": false, "staff": "+12 Promotores"},
    {"name": "Puno", "dept": "Puno", "x": 78, "y": 72, "is_hq": false, "staff": "+8 Promotores"},
    {"name": "Tacna", "dept": "Tacna", "x": 75, "y": 87, "is_hq": false, "staff": "+10 Promotores"}
  ]',
  3
),
(
  'oriente',
  'Zona Oriente',
  '#83A33C',
  'Cobertura estratégica en las principales urbes de la amazonía peruana, asegurando logística y trade marketing en tiempo récord.',
  '[
    {"name": "Iquitos", "dept": "Loreto", "x": 62, "y": 14, "is_hq": false, "staff": "+10 Promotores"},
    {"name": "Tarapoto", "dept": "San Martín", "x": 46, "y": 27, "is_hq": false, "staff": "+12 Promotores"},
    {"name": "Pucallpa", "dept": "Ucayali", "x": 55, "y": 42, "is_hq": false, "staff": "+8 Promotores"}
  ]',
  4
)
ON DUPLICATE KEY UPDATE `cities` = VALUES(`cities`), `description` = VALUES(`description`);

