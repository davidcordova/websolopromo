/**
 * Datos oficiales de Soporte Promocional S.A.C. (SoloPromo)
 * Extraídos directamente de la presentación corporativa y manual oficial (17 páginas)
 * Con imágenes de Ultra-Alta Definición (WebP) y colores de marca calibrados
 */

export const BRAND_COLORS = {
  soporteBlue: "#55A2DC",      // Azul cielo de 'SOPORTE'
  promocionalGrey: "#545456",  // Gris carbón de 'PROMOCIONAL'
  dots: {
    grey: "#676767",           // Punto 1
    blue: "#4878AC",           // Punto 2
    green: "#83A33C",          // Punto 3
    orange: "#B56635"          // Punto 4
  }
};

export const COMPANY_INFO = {
  name: "SOPORTE PROMOCIONAL S.A.C.",
  shortName: "SoloPromo",
  tagline: "12 Años de experiencia siendo socios estratégicos de nuestros clientes",
  subtagline: "Expertos en Trade Marketing, Eventos Corporativos, BTL e Infraestructura Retail",
  description: "Somos una empresa flexible que se adapta según el tipo de proyecto a realizar. Nuestro staff puede ampliarse o reducirse a la medida y necesidad de cada cliente. Cubrimos todos los aspectos en el campo de acción, asesoramos a las empresas en su imagen corporativa y los ayudamos a invertir adecuadamente para obtener un resultado óptimo.",
  philosophy: "Trabajamos para que puedan dar a conocer sus productos y servicios con un presupuesto adaptado a cada situación y realizamos una propuesta a medida cuidando el capital disponible asignado.",
  consulting: "Brindamos asesoramiento y asistencia técnica personalizada a agencias y estudios.",
  yearsExperience: 12,
  phone: "+51 949 705 664",
  phoneClean: "51949705664",
  email: "contacto@solopromo.net",
  website: "https://solopromo.net",
  socials: {
    instagram: "https://instagram.com/soportepromocionalsac",
    facebook: "https://facebook.com/soportepromocionalsac",
    linkedin: "https://linkedin.com/company/soporte-promocional-sac",
    whatsapp: "https://wa.me/51949705664?text=Hola%20SoloPromo%2C%20quisiera%20solicitar%20una%20cotizaci%C3%B3n%20para%20un%20proyecto"
  },
  metrics: [
    { value: "+12", label: "Años de Experiencia", detail: "Socios estratégicos líderes" },
    { value: "+150k", label: "Horas de Promotoría", detail: "En canal moderno y tradicional" },
    { value: "100%", label: "Cobertura Nacional", detail: "4 macro-regiones del Perú" },
    { value: "+25", label: "Marcas Globales", detail: "Confían en nuestro trabajo" }
  ]
};

export const SERVICES = [
  {
    id: "trade-marketing",
    title: "Trade Marketing",
    subtitle: "Promotoría / Canal Tradicional / Canal Moderno",
    shortDesc: "Gestión y despliegue de promotores especializados en retail moderno y canal tradicional para acelerar la rotación del producto.",
    description: "Cubrimos las necesidades de staffing y fuerza de ventas en campo con personal rigurosamente seleccionado, capacitado en producto y supervisado continuamente. Reportamos métricas de ventas, quiebres de stock y visibilidad en tiempo real.",
    color: "#55A2DC",
    badge: "Alta Demanda",
    icon: "ShoppingBag",
    image: "/images/assets/trade_marketing_canon.webp",
    imageJpg: "/images/assets/trade_marketing_canon.jpg",
    gallery: [
      "/images/assets/trade_marketing_canon.webp",
      "/images/assets/trade_marketing_tcl.webp",
      "/images/assets/trade_marketing_asus.webp",
      "/images/assets/trade_marketing_jbl.webp"
    ],
    highlights: [
      "Promotores y promotoras con perfil técnico y comercial",
      "Presencia en Falabella, Ripley, Oechsle, Sodimac, Hiraoka y canal tradicional",
      "Supervisión presencial continua con reportes digitales",
      "Gestión de inventarios, reposición y control de exhibición"
    ]
  },
  {
    id: "eventos-corporativos",
    title: "Eventos Corporativos",
    subtitle: "Lanzamientos / Eventos Empresariales",
    shortDesc: "Producción integral de lanzamientos de producto, congresos y celebraciones de marca con tecnología de vanguardia.",
    description: "Conceptualizamos y ejecutamos eventos que dejan huella. Desde la escenografía, pantallas LED de última generación y sonido envolvente hasta el registro digital, protocolo de anfitrionaje y catering ejecutivo.",
    color: "#4878AC",
    badge: "Producción Integral",
    icon: "Users",
    image: "/images/assets/eventos_escenario.webp",
    imageJpg: "/images/assets/eventos_escenario.jpg",
    gallery: [
      "/images/assets/eventos_escenario.webp",
      "/images/assets/eventos_convencion.webp",
      "/images/assets/eventos_coctel.webp"
    ],
    highlights: [
      "Lanzamientos de tecnología y nuevas líneas de producto",
      "Conferencias anuales para distribuidores y canales KAM",
      "Escenografía a medida, iluminación arquitectónica y sonido",
      "Gestión de convocatoria, acreditación y registro de invitados"
    ]
  },
  {
    id: "btl",
    title: "BTL (Activaciones)",
    subtitle: "Activaciones en Punto de Venta",
    shortDesc: "Experiencias interactivas memorables, dinámicas de gamificación, ruletas y photobooths que conectan al consumidor con la marca.",
    description: "Diseñamos activaciones de alto impacto en centros comerciales y puntos de gran concurrencia. Rompemos la rutina con dinámicas lúdicas que incrementan el recuerdo de marca y generan ventas inmediatas.",
    color: "#B56635",
    badge: "Engagement Directo",
    icon: "Radio",
    image: "/images/assets/btl_photobooth.webp",
    imageJpg: "/images/assets/btl_photobooth.jpg",
    gallery: [
      "/images/assets/btl_photobooth.webp",
      "/images/assets/btl_ruleta.webp",
      "/images/assets/btl_sampling.webp"
    ],
    highlights: [
      "Cabinas de fotos instantáneas (Photobooth) brandeadas",
      "Ruletas de premios interactivos y dinámicas con animadores",
      "Sampling experiencial con protocolo de bioseguridad",
      "Generación de base de datos de clientes potenciales"
    ]
  },
  {
    id: "diseno-grafico",
    title: "Diseño Gráfico",
    subtitle: "Diseño para Puntos Definidos por el Cliente",
    shortDesc: "Creatividad visual publicitaria orientada a la venta, manuales de marca, catálogos y material POP de calidad fotográfica.",
    description: "Traducimos los lineamientos de marcas internacionales a piezas de alto rendimiento publicitario. Creamos catálogos de premios, artes para medios digitales, packaging y material gráfico para PDV listo para producción.",
    color: "#83A33C",
    badge: "Creatividad & Conversión",
    icon: "PenTool",
    image: "/images/assets/diseno_canon_r50.webp",
    imageJpg: "/images/assets/diseno_canon_r50.jpg",
    gallery: [
      "/images/assets/diseno_canon_r50.webp",
      "/images/assets/diseno_jbl.webp",
      "/images/assets/diseno_catalogo.webp"
    ],
    highlights: [
      "Diseño de material POP para PDV (cenefas, danglers, stoppers)",
      "Catálogos comerciales de productos y folletería de lujo",
      "Adaptación de campañas globales a formatos locales",
      "Artes finales con control de color y perfiles de impresión"
    ]
  },
  {
    id: "indoor",
    title: "Indoor (Módulos)",
    subtitle: "Módulos y Exhibición en Retail",
    shortDesc: "Estructuras comerciales y esquinas de exhibición construidas con acabados de primera calidad y seguridad integrada.",
    description: "Diseñamos y fabricamos módulos de exhibición de alto estándar para tiendas departamentales y cadenas tecnológicas. Incorporamos retroiluminación LED, cableado invisible y sistemas mecánicos o electrónicos anti-hurto.",
    color: "#55A2DC",
    badge: "Retail Arquitectónico",
    icon: "LayoutGrid",
    image: "/images/assets/indoor_tcl.webp",
    imageJpg: "/images/assets/indoor_tcl.jpg",
    gallery: [
      "/images/assets/indoor_tcl.webp",
      "/images/assets/indoor_canon.webp",
      "/images/assets/indoor_asus.webp"
    ],
    highlights: [
      "Corners y cabeceras de góndola a medida en MDF y acrílico",
      "Iluminación LED perimétrica de bajo consumo y alto brillo",
      "Sistemas de anclaje de seguridad para laptops, TVs y cámaras",
      "Instalación nocturna en tiendas comerciales con homologación"
    ]
  },
  {
    id: "merchandising",
    title: "Merchandising",
    subtitle: "Mercadería de Respaldo y Apoyo Visual",
    shortDesc: "Artículos promocionales corporativos de excelente confección que potencian la fidelidad de clientes y colaboradores.",
    description: "Fabricamos y personalizamos material de merchandising corporativo: agendas de cuero PU, libretas institucionales, lapiceros ejecutivos y ecológicos, bolsos de tela reutilizables y kits de bienvenida para marcas líderes.",
    color: "#B56635",
    badge: "Calidad Premium",
    icon: "Gift",
    image: "/images/assets/merch_motorola.webp",
    imageJpg: "/images/assets/merch_motorola.jpg",
    gallery: [
      "/images/assets/merch_motorola.webp",
      "/images/assets/merch_canon.webp",
      "/images/assets/merch_lapiceros.webp"
    ],
    highlights: [
      "Kits de bienvenida ejecutivos con empaques personalizados",
      "Papelería corporativa fina: agendas, blocs y calendarios",
      "Línea eco-responsable (bambú, cartón reciclado, tela tocuyo)",
      "Estampados en serigrafía, grabado láser y hot stamping"
    ]
  },
  {
    id: "branding",
    title: "Branding de Espacios",
    subtitle: "Espacios de Implementación y Rotulación",
    shortDesc: "Transformación de fachadas, pasillos de centros comerciales, vitrinas y escaleras mecánicas con señalética de gran escala.",
    description: "Maximizamos la presencia visual de las marcas en los puntos de mayor tránsito peatonal. Implementamos cajas de luz backlight, viniles ultra-adhesivos para piso y paredes, arcos de ingreso y rotulación de impacto.",
    color: "#4878AC",
    badge: "Alto Tránsito",
    icon: "Sparkles",
    image: "/images/assets/branding_escaleras.webp",
    imageJpg: "/images/assets/branding_escaleras.jpg",
    gallery: [
      "/images/assets/branding_escaleras.webp",
      "/images/assets/branding_vitrina.webp",
      "/images/assets/branding_rog.webp"
    ],
    highlights: [
      "Cajas de luz LED ultradelgadas backlight y frontlight",
      "Intervención de escaleras mecánicas en centros comerciales",
      "Branding integral de vitrinas exteriores y fachadas",
      "Materiales con laminado protector UV de larga duración"
    ]
  },
  {
    id: "modulos-experiencia",
    title: "Módulos de Experiencia",
    subtitle: "Más Dinamismo en los Puntos de Venta",
    shortDesc: "Islas interactivas donde el cliente interactúa con la tecnología, probando el producto en un entorno interactivo.",
    description: "Espacios comerciales inmersivos que permiten al cliente experimentar de primera mano las funciones de televisores MiniLED, laptops gaming de alta gama y sistemas de audio profesional antes de concretar la compra.",
    color: "#83A33C",
    badge: "Tecnología Interactiva",
    icon: "MonitorPlay",
    image: "/images/assets/experiencia_asus.webp",
    imageJpg: "/images/assets/experiencia_asus.jpg",
    gallery: [
      "/images/assets/experiencia_asus.webp",
      "/images/assets/experiencia_canon.webp",
      "/images/assets/experiencia_tcl.webp"
    ],
    highlights: [
      "Islas circulares e interactivas para centros comerciales",
      "Mesas de prueba en vivo (Live Demo) con conectividad",
      "Sistemas integrados de audio envolvente y pantallas táctiles",
      "Estructuras modulares de fácil mantenimiento y reconfiguración"
    ]
  }
];

export const CLIENTS = [
  { 
    id: "canon",
    name: "Canon", 
    category: "Tecnología e Imagen", 
    tagline: "Líder Global en Fotografía Profesional & Soluciones de Impresión",
    badge: "Líder Global",
    logo: "/images/clients/logo_canon.webp",
    logoPng: "/images/clients/logo_canon.png",
    realPhoto: "/images/assets/trade_marketing_canon.webp",
    storeLocation: "Saga Falabella Jockey Plaza & Hiraoka Miraflores",
    summary: "Gestión integral de promotores especializados en cámaras mirrorless EOS R e impresoras MegaTank, módulos táctiles de prueba y auditoría de góndola a nivel nacional.",
    retailChannels: ["Falabella", "Ripley", "Hiraoka", "Coolbox", "Plaza Vea"],
    servicesDeployed: ["Trade Marketing Especializado", "Módulos Indoor a Medida", "Promotores Homologados 24/7", "Diseño de Catálogos PDV"],
    metrics: { pdv: "+45 PDV", coverage: "Nacional (15 ciudades)", impact: "+38% Sell-Out" }
  },
  { 
    id: "asus",
    name: "ASUS", 
    category: "Laptops & ROG Gaming", 
    tagline: "Ecosistema Gamer de Alto Rendimiento & Laptops Zenbook",
    badge: "Alta Gama",
    logo: "/images/clients/logo_asus.webp",
    logoPng: "/images/clients/logo_asus.png",
    realPhoto: "/images/assets/indoor_asus.webp",
    storeLocation: "Corners Especializados de Cómputo & Tiendas de Retail",
    summary: "Diseño y fabricación de módulos arquitectónicos con iluminación LED gamer, cableado invisible y promotores certificados en especificaciones ROG y procesadores de última generación.",
    retailChannels: ["Falabella", "Ripley", "Hiraoka", "Curacao", "Ciberplaza"],
    servicesDeployed: ["Módulos Indoor ROG", "Promotores Tech Certificados", "Branding en Centros Comerciales", "Activaciones Gamificadas"],
    metrics: { pdv: "+35 Corners", coverage: "Lima y Provincias Clave", impact: "+42% Conversión" }
  },
  { 
    id: "tcl",
    name: "TCL", 
    category: "Smart TVs & MiniLED", 
    tagline: "Innovación Visual de Gran Formato y Pantallas Inteligentes",
    badge: "Electrónica",
    logo: "/images/clients/logo_tcl.webp",
    logoPng: "/images/clients/logo_tcl.png",
    realPhoto: "/images/assets/indoor_tcl.webp",
    storeLocation: "Cadenas Departamentales & Retail Electro",
    summary: "Montaje de cabeceras de góndola para pantallas MiniLED, demostraciones audiovisuales en vivo y despliegue de fuerza de ventas con metas agresivas de rotación de producto.",
    retailChannels: ["Ripley", "Metro", "Plaza Vea", "Tottus", "Hiraoka"],
    servicesDeployed: ["Exhibición Gran Formato", "Promotoría de Piso", "Lanzamientos de Temporada", "Monitoreo de Quiebre de Stock"],
    metrics: { pdv: "+50 Puntos", coverage: "100% Costa y Sierra", impact: "+29% Rotación" }
  },
  { 
    id: "microsoft",
    name: "Microsoft", 
    category: "Software & Hardware", 
    tagline: "Ecosistema de Productividad, Windows 11 & Dispositivos Surface",
    badge: "Tecnología",
    logo: "/images/clients/logo_microsoft.webp",
    logoPng: "/images/clients/logo_microsoft.png",
    realPhoto: "/images/assets/diseno_catalogo.webp",
    storeLocation: "Tiendas Departamentales & Distribuidores Oficiales",
    summary: "Auditoría de cumplimiento de exhibición de software original y laptops con Windows preinstalado, capacitación continua a personal de canal y distribución de material POP.",
    retailChannels: ["Falabella", "Ripley", "Hiraoka", "Office Depot", "Coolbox"],
    servicesDeployed: ["Auditoría de Góndola", "Material Gráfico POP", "Capacitación a Vendedores", "Supervisión Comercial"],
    metrics: { pdv: "+60 PDV", coverage: "Supervisión 24/7", impact: "99.2% Cumplimiento" }
  },
  { 
    id: "jbl",
    name: "JBL", 
    category: "Audio Profesional", 
    tagline: "Sonido Legendario en Altavoces Portátiles y Auriculares",
    badge: "Sonido Premium",
    logo: "/images/clients/logo_jbl.webp",
    logoPng: "/images/clients/logo_jbl.png",
    realPhoto: "/images/assets/trade_marketing_jbl.webp",
    storeLocation: "Módulos de Sonido en Centros Comerciales & Tiendas Clave",
    summary: "Implementación de estaciones interactivas de audio con prueba musical en vivo, dinámicas de fidelización de marca y personal promotor apasionado por la acústica.",
    retailChannels: ["Falabella", "Ripley", "Coolbox", "iShop", "Phantom"],
    servicesDeployed: ["Estaciones Live Listening", "Promotores Especialistas de Audio", "Activaciones BTL", "Material POP Luminoso"],
    metrics: { pdv: "+40 Módulos", coverage: "Nacional Estratégico", impact: "+35% Prueba en Vivo" }
  },
  { 
    id: "nexxt",
    name: "Nexxt Solutions", 
    category: "Smart Home & Redes", 
    tagline: "Domótica Accesible, Cámaras de Seguridad y Conectividad Mesh",
    badge: "Conectividad",
    logo: "/images/clients/logo_nexxt.webp",
    logoPng: "/images/clients/logo_nexxt.png",
    realPhoto: "/images/assets/branding_vitrina.webp",
    storeLocation: "Retail Moderno & Tiendas de Mejoramiento del Hogar",
    summary: "Islas interactivas de 'Hogar Conectado' donde el consumidor controla luminarias y cámaras desde la aplicación móvil, logrando desmitificar la instalación domótica.",
    retailChannels: ["Sodimac", "Promart", "Coolbox", "Falabella", "Ripley"],
    servicesDeployed: ["Islas Smart Home", "Demostraciones en Vivo", "Promotoría Especializada", "Material Explicativo PDV"],
    metrics: { pdv: "+30 Tiendas", coverage: "Lima y Provincias", impact: "+45% Engagement" }
  },
  { 
    id: "viewsonic",
    name: "ViewSonic", 
    category: "Monitores & Proyectores", 
    tagline: "Soluciones de Visualización Profesional, Educación y Gaming",
    badge: "Visual Displays",
    logo: "/images/clients/logo_viewsonic.webp",
    logoPng: "/images/clients/logo_viewsonic.png",
    realPhoto: "/images/assets/branding_escaleras.webp",
    storeLocation: "Centros Tecnológicos & Retail Especializado",
    summary: "Exhibidores ergonómicos para monitores ColorPro y pantallas interactivas para aulas híbridas, con soporte técnico en punto de venta y señalética de impacto.",
    retailChannels: ["Ciberplaza", "Compupalace", "Hiraoka", "Falabella"],
    servicesDeployed: ["Stands Arquitectónicos", "Promotores B2B/B2C", "Branding de Fachada", "Trade Marketing"],
    metrics: { pdv: "+25 Puntos", coverage: "Canal Especializado", impact: "100% Disponibilidad" }
  },
  { 
    id: "klipxtreme",
    name: "Klip Xtreme", 
    category: "Audio & Movilidad", 
    tagline: "Accesorios de Vanguardia para Estilo de Vida y Negocios",
    badge: "Accesorios",
    logo: "/images/clients/logo_klipxtreme.webp",
    logoPng: "/images/clients/logo_klipxtreme.png",
    realPhoto: "/images/assets/btl_photobooth.webp",
    storeLocation: "Cadenas Retail & Aeropuertos",
    summary: "Vitrinas de seguridad y probadores táctiles para mochilas ejecutivas, audífonos con cancelación de ruido y periféricos de alto tráfico.",
    retailChannels: ["Coolbox", "Falabella", "Ripley", "Plaza Vea"],
    servicesDeployed: ["Vitrinas de Seguridad", "Merchandising Corporativo", "Activaciones BTL", "Promotoría"],
    metrics: { pdv: "+35 Puntos", coverage: "Puntos de Alto Tránsito", impact: "+30% Venta Cruzada" }
  },
  { 
    id: "accvent",
    name: "Accvent", 
    category: "Infraestructura & Mayorista", 
    tagline: "Holding Tecnológico y Cadena de Suministro Mayorista",
    badge: "Distribución",
    logo: "/images/clients/logo_accvent.webp",
    logoPng: "/images/clients/logo_accvent.png",
    realPhoto: "/images/assets/eventos_convencion.webp",
    storeLocation: "Convenciones de Canal & Lanzamientos KAM",
    summary: "Organización de congresos anuales para socios de canal, escenografías corporativas personalizadas y logística de merchandising para eventos VIP.",
    retailChannels: ["Canal Mayorista", "Distribuidores Oficiales", "Convenciones Anuales"],
    servicesDeployed: ["Eventos Corporativos", "Escenografías a Medida", "Kits de Merchandising", "Gestión de Invitados"],
    metrics: { pdv: "+500 Asistentes", coverage: "Evento Anual Líder", impact: "100% Satisfacción" }
  },
  { 
    id: "belkin",
    name: "Belkin", 
    category: "Conectividad & Accesorios", 
    tagline: "Accesorios de Carga Certificada, Audio y Protección Premium",
    badge: "Certificado",
    logo: "/images/clients/logo_belkin.webp",
    logoPng: "/images/clients/logo_belkin.png",
    realPhoto: "/images/assets/experiencia_canon.webp",
    storeLocation: "Tiendas Apple Premium Reseller & Retail de Lujo",
    summary: "Expositores de alta estética con cables certificados MFi, cargadores inalámbricos MagSafe y protectores de pantalla con máquina de aplicación precisa.",
    retailChannels: ["iShop", "Mac Center", "Falabella", "Ripley"],
    servicesDeployed: ["Módulos de Precisión", "Promotoría Homologada", "Trade Marketing de Lujo", "Supervisión Diaria"],
    metrics: { pdv: "+28 PDV Premium", coverage: "Centros Comerciales A+", impact: "+40% Ticket Promedio" }
  }
];

export const COVERAGE_ZONES = [
  {
    id: "centro",
    slug: "centro",
    name: "Zona Centro",
    badgeColor: "#55A2DC",
    description: "Sede central de operaciones, almacenes de abastecimiento y cobertura directa en toda la capital y costa/sierra central.",
    cities: [
      { name: "Lima y Callao", dept: "Lima", x: 39, y: 55, is_hq: true, staff: "+40 Promotores" },
      { name: "Huacho", dept: "Lima Provincias", x: 36, y: 49, is_hq: false, staff: "+8 Promotores" },
      { name: "Huancayo", dept: "Junín", x: 49, y: 54, is_hq: false, staff: "+12 Promotores" },
      { name: "Ica", dept: "Ica", x: 48, y: 66, is_hq: false, staff: "+10 Promotores" }
    ]
  },
  {
    id: "norte",
    slug: "norte",
    name: "Zona Norte",
    badgeColor: "#4878AC",
    description: "Presencia continua en las principales plazas comerciales del norte peruano con supervisión regional descentralizada.",
    cities: [
      { name: "Piura", dept: "Piura", x: 18, y: 16, is_hq: false, staff: "+15 Promotores" },
      { name: "Chiclayo", dept: "Lambayeque", x: 22, y: 24, is_hq: false, staff: "+14 Promotores" },
      { name: "Trujillo", dept: "La Libertad", x: 27, y: 31, is_hq: false, staff: "+18 Promotores" },
      { name: "Cajamarca", dept: "Cajamarca", x: 31, y: 25, is_hq: false, staff: "+8 Promotores" },
      { name: "Chimbote", dept: "Áncash", x: 30, y: 38, is_hq: false, staff: "+10 Promotores" }
    ]
  },
  {
    id: "sur",
    slug: "sur",
    name: "Zona Sur",
    badgeColor: "#B56635",
    description: "Operatividad integral en el eje comercial del sur, abarcando centros comerciales de alta gama y canal tradicional.",
    cities: [
      { name: "Arequipa", dept: "Arequipa", x: 65, y: 77, is_hq: false, staff: "+20 Promotores" },
      { name: "Cusco", dept: "Cusco", x: 67, y: 64, is_hq: false, staff: "+12 Promotores" },
      { name: "Puno", dept: "Puno", x: 78, y: 72, is_hq: false, staff: "+8 Promotores" },
      { name: "Tacna", dept: "Tacna", x: 75, y: 87, is_hq: false, staff: "+10 Promotores" }
    ]
  },
  {
    id: "oriente",
    slug: "oriente",
    name: "Zona Oriente",
    badgeColor: "#83A33C",
    description: "Cobertura estratégica en las principales urbes de la amazonía peruana, asegurando logística y trade marketing en tiempo récord.",
    cities: [
      { name: "Iquitos", dept: "Loreto", x: 62, y: 14, is_hq: false, staff: "+10 Promotores" },
      { name: "Tarapoto", dept: "San Martín", x: 46, y: 27, is_hq: false, staff: "+12 Promotores" },
      { name: "Pucallpa", dept: "Ucayali", x: 55, y: 42, is_hq: false, staff: "+8 Promotores" }
    ]
  }
];

export const INFRASTRUCTURE_SPACES = [
  {
    title: "Directorio Ejecutivo VIP",
    subtitle: "Mesa Estratégica KAM & Clientes",
    image: "/images/assets/infra_directorio.webp",
    imageJpg: "/images/assets/infra_directorio.jpg",
    description: "En nuestro directorio, se reúnen nuestros clientes (KAM) con el Back Office y coordinan las estrategias del negocio en un ambiente ejecutivo y privado.",
    features: ["Mesa ejecutiva con conexiones integradas", "Pantallas de proyección 4K", "Sistema de videoconferencia para KAMs", "Climatización"]
  },
  {
    title: "Salas de Reuniones & Back Office",
    subtitle: "Coordinación Operativa Continua",
    image: "/images/assets/infra_backoffice.webp",
    imageJpg: "/images/assets/infra_backoffice.jpg",
    description: "Instalaciones donde nuestro equipo de operaciones, logística y recursos humanos coordina en tiempo real con los supervisores de campo en todo el país.",
    features: ["Estaciones de trabajo ergonómicas", "Conexión de fibra óptica redundante", "Supervisión digital en tiempo real", "Coordinación logística"]
  },
  {
    title: "Sala de Promotoría",
    subtitle: "Briefing & Alineamiento de Campo",
    image: "/images/assets/infra_sala_promotoria.webp",
    imageJpg: "/images/assets/infra_sala_promotoria.jpg",
    description: "Área especialmente acondicionada para reuniones de briefing, entrega de uniformes, asignación de metas comerciales y alineamiento de la fuerza de ventas.",
    features: ["Capacidad para equipos completos de campo", "Área de entrega y prueba de uniformes", "Pizarras tácticas de objetivos", "Alineamiento diario"]
  },
  {
    title: "Auditorio de Capacitación",
    subtitle: "Entrenamiento Masivo en Producto",
    image: "/images/assets/infra_auditorio.webp",
    imageJpg: "/images/assets/infra_auditorio.jpg",
    description: "Auditorio con capacidad para más de 60 personas donde se realizan inducciones rigurosas sobre características técnicas de productos Canon, Asus, TCL, JBL, etc.",
    features: ["Capacidad masiva de butacas", "Audio envolvente y microfonía", "Equipos demo para práctica en vivo", "Proyector de alta luminosidad"]
  }
];
