/**
 * Portfolio content. Edit the projects below to change the cards on
 * /portfolio. Each project belongs to one category (the filter chips at
 * the top) and uses one accent colour.
 *
 * Every visible text has an English (en) and Spanish (es) version.
 */
import type { Accent } from "./services";
import type { Bi } from "@/lib/i18n";

export type PortfolioCategory = {
  id: string;
  label: Bi; // shown on two lines: "AI Solutions\n& Automation"
  icon: "brain" | "code" | "phone" | "platform";
  accent: Accent;
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "ai",
    label: { en: "AI Solutions\n& Automation", es: "Soluciones de IA\ny automatización" },
    icon: "brain",
    accent: "blue",
  },
  {
    id: "software",
    label: { en: "Software\nEngineering", es: "Ingeniería\nde software" },
    icon: "code",
    accent: "purple",
  },
  {
    id: "mobile",
    label: { en: "Mobile\nApplications", es: "Aplicaciones\nmóviles" },
    icon: "phone",
    accent: "yellow",
  },
  {
    id: "platforms",
    label: { en: "Digital\nPlatforms", es: "Plataformas\ndigitales" },
    icon: "platform",
    accent: "cyan",
  },
];

export type Project = {
  id: string;
  category: string; // id from portfolioCategories
  tag: Bi; // small label on the image
  title: Bi;
  client: Bi;
  image: string;
  accent: Accent;
  challenge: Bi;
  solution: Bi;
  features: Bi[];
  results: Bi[];
  featured?: boolean; // shown when no category is selected
};

/* Shared tags */
const TAG_AI: Bi = { en: "AI & Automation", es: "IA y automatización" };
const TAG_SOFTWARE: Bi = { en: "Custom Software", es: "Software a la medida" };
const TAG_MOBILE: Bi = { en: "Mobile Application", es: "Aplicación móvil" };
const TAG_PLATFORM: Bi = { en: "Digital Platform", es: "Plataforma digital" };

export const projects: Project[] = [
  {
    id: "ai-sales-automation",
    category: "ai",
    tag: TAG_AI,
    title: { en: "AI Sales Automation System", es: "Sistema de automatización de ventas con IA" },
    client: { en: "Real Estate Company", es: "Empresa inmobiliaria" },
    image: "/images/portfolio/project-ai-sales-blue.jpg",
    featured: true,
    accent: "blue",
    challenge: {
      en: "Manually handling leads and follow-ups was time consuming and resulted in lost opportunities.",
      es: "Gestionar prospectos y seguimientos a mano consumía mucho tiempo y hacía perder oportunidades.",
    },
    solution: {
      en: "AI-powered sales agents with automated communication and CRM integration.",
      es: "Agentes de ventas con IA, comunicación automatizada e integración con el CRM.",
    },
    features: [
      { en: "Lead qualification", es: "Calificación de prospectos" },
      { en: "Automated outreach", es: "Contacto automatizado" },
      { en: "CRM synchronization", es: "Sincronización con el CRM" },
      { en: "Appointment scheduling", es: "Agenda de citas" },
    ],
    results: [
      { en: "3x more qualified leads", es: "3x más prospectos calificados" },
      { en: "70% reduction in manual work", es: "70% menos trabajo manual" },
      { en: "45% increase in booked appointments", es: "45% más citas agendadas" },
    ],
  },
  {
    id: "property-management-platform",
    category: "software",
    tag: TAG_SOFTWARE,
    title: { en: "Property Management Platform", es: "Plataforma de administración de propiedades" },
    client: { en: "Vacation Rental Agency", es: "Agencia de rentas vacacionales" },
    image: "/images/portfolio/project-property.jpg",
    featured: true,
    accent: "purple",
    challenge: {
      en: "Operations, bookings, and client communication were managed across multiple tools.",
      es: "La operación, las reservas y la comunicación con clientes se manejaban en varias herramientas distintas.",
    },
    solution: {
      en: "Custom web platform to centralize property management, reservations, and client communication.",
      es: "Plataforma web a la medida que centraliza la administración de propiedades, las reservas y la comunicación con clientes.",
    },
    features: [
      { en: "Property and booking management", es: "Gestión de propiedades y reservas" },
      { en: "Automated reporting", es: "Reportes automatizados" },
      { en: "Payment processing integration", es: "Integración de pagos" },
      { en: "Owner and tenant portals", es: "Portales para propietarios e inquilinos" },
    ],
    results: [
      { en: "60% improvement in operational efficiency", es: "60% más eficiencia operativa" },
      { en: "40% increase in direct bookings", es: "40% más reservas directas" },
      { en: "Centralized management in one platform", es: "Gestión centralizada en una sola plataforma" },
    ],
  },
  {
    id: "wellness-nutrition-app",
    category: "mobile",
    tag: TAG_MOBILE,
    title: { en: "Wellness & Nutrition Mobile App", es: "App móvil de bienestar y nutrición" },
    client: { en: "Health & Wellness Brand", es: "Marca de salud y bienestar" },
    image: "/images/portfolio/project-wellness.jpg",
    featured: true,
    accent: "cyan",
    challenge: {
      en: "Needed a custom mobile app to engage users and deliver personalized nutrition plans.",
      es: "Necesitaba una app móvil a la medida para conectar con sus usuarios y ofrecer planes de nutrición personalizados.",
    },
    solution: {
      en: "iOS & Android app with AI recommendations, analytics, and scalable infrastructure.",
      es: "App para iOS y Android con recomendaciones de IA, analítica e infraestructura escalable.",
    },
    features: [
      { en: "Personalized meal plans", es: "Planes de alimentación personalizados" },
      { en: "Workout and nutrition tracking", es: "Seguimiento de ejercicio y nutrición" },
      { en: "AI recommendations", es: "Recomendaciones con IA" },
      { en: "Progress analytics", es: "Análisis de progreso" },
    ],
    results: [
      { en: "100K+ downloads in 6 months", es: "Más de 100K descargas en 6 meses" },
      { en: "4.8 average rating", es: "Calificación promedio de 4.8" },
      { en: "65% user retention rate", es: "65% de retención de usuarios" },
    ],
  },
  {
    id: "ecommerce-platform",
    category: "platforms",
    tag: TAG_PLATFORM,
    title: { en: "E-Commerce Platform", es: "Plataforma de e-commerce" },
    client: { en: "Home Decor Brand", es: "Marca de decoración para el hogar" },
    image: "/images/portfolio/project-ecommerce-gold.jpg",
    featured: true,
    accent: "yellow",
    challenge: {
      en: "Needed a modern, scalable e-commerce platform with an optimized user experience.",
      es: "Necesitaba una plataforma de e-commerce moderna y escalable, con una experiencia de usuario optimizada.",
    },
    solution: {
      en: "Custom shopping solution with integrations and automation.",
      es: "Solución de compras a la medida con integraciones y automatización.",
    },
    features: [
      { en: "Custom design and development", es: "Diseño y desarrollo a la medida" },
      { en: "Inventory management", es: "Gestión de inventario" },
      { en: "Payment integrations", es: "Integraciones de pago" },
      { en: "SEO optimization", es: "Optimización SEO" },
    ],
    results: [
      { en: "3x increase in online sales", es: "3x más ventas en línea" },
      { en: "50% faster load times", es: "Tiempos de carga 50% más rápidos" },
      { en: "Improved customer experience and conversions", es: "Mejor experiencia del cliente y más conversiones" },
    ],
  },
  {
    id: "ai-lead-generation",
    category: "ai",
    tag: { en: "AI & Data Platform", es: "Plataforma de IA y datos" },
    title: { en: "AI Lead Generation Platform", es: "Plataforma de generación de prospectos con IA" },
    client: { en: "B2B Services Company", es: "Empresa de servicios B2B" },
    image: "/images/portfolio/project-leadgen.jpg",
    featured: true,
    accent: "purple",
    challenge: {
      en: "Difficulty finding qualified leads and high customer acquisition costs.",
      es: "Dificultad para encontrar prospectos calificados y altos costos de adquisición de clientes.",
    },
    solution: {
      en: "AI-powered platform with data enrichment, personalized outreach, and analytics.",
      es: "Plataforma con IA para enriquecimiento de datos, contacto personalizado y analítica.",
    },
    features: [
      { en: "Lead discovery and scoring", es: "Búsqueda y calificación de prospectos" },
      { en: "Automated outreach sequences", es: "Secuencias de contacto automatizadas" },
      { en: "Pipeline management", es: "Gestión del pipeline" },
      { en: "Sales analytics dashboard", es: "Panel de analítica de ventas" },
    ],
    results: [
      { en: "4x more qualified opportunities", es: "4x más oportunidades calificadas" },
      { en: "60% reduction in acquisition cost", es: "60% menos costo de adquisición" },
      { en: "35% increase in sales conversions", es: "35% más conversiones de venta" },
    ],
  },

  // More projects (shown when a category is selected)
  {
    id: "ai-customer-support",
    category: "ai",
    tag: TAG_AI,
    title: { en: "AI Customer Support Assistant", es: "Asistente de atención al cliente con IA" },
    client: { en: "E-Commerce Retailer", es: "Tienda de e-commerce" },
    image: "/images/portfolio/p-ai-customer-support.jpg",
    accent: "blue",
    challenge: {
      en: "The support team was overwhelmed by repetitive questions, especially outside business hours.",
      es: "El equipo de soporte estaba saturado de preguntas repetitivas, sobre todo fuera del horario laboral.",
    },
    solution: {
      en: "AI chat assistant trained on store policies and order data, with a smooth handoff to human agents.",
      es: "Asistente de chat con IA entrenado con las políticas de la tienda y los datos de pedidos, con transferencia fluida a agentes humanos.",
    },
    features: [
      { en: "24/7 instant answers", es: "Respuestas inmediatas 24/7" },
      { en: "Order status lookup", es: "Consulta del estado de pedidos" },
      { en: "Human handoff", es: "Transferencia a un agente humano" },
      { en: "Multilingual replies", es: "Respuestas en varios idiomas" },
    ],
    results: [
      { en: "Customers get answers around the clock", es: "Los clientes reciben respuesta a cualquier hora" },
      { en: "Support team focused on complex cases", es: "El equipo de soporte se enfoca en casos complejos" },
      { en: "Much shorter response times", es: "Tiempos de respuesta mucho más cortos" },
    ],
  },
  {
    id: "ai-document-processing",
    category: "ai",
    tag: TAG_AI,
    title: { en: "Intelligent Document Processing", es: "Procesamiento inteligente de documentos" },
    client: { en: "Logistics Company", es: "Empresa de logística" },
    image: "/images/portfolio/p-ai-document-processing.jpg",
    accent: "blue",
    challenge: {
      en: "Invoices and shipping documents were typed into the system by hand, causing delays and errors.",
      es: "Las facturas y los documentos de envío se capturaban a mano en el sistema, lo que causaba retrasos y errores.",
    },
    solution: {
      en: "Document AI that reads, validates and sends data straight to the company’s ERP.",
      es: "IA documental que lee, valida y envía los datos directamente al ERP de la empresa.",
    },
    features: [
      { en: "Automatic data extraction", es: "Extracción automática de datos" },
      { en: "Validation rules", es: "Reglas de validación" },
      { en: "Exception review queue", es: "Cola de revisión de excepciones" },
      { en: "ERP integration", es: "Integración con el ERP" },
    ],
    results: [
      { en: "Far less manual data entry", es: "Mucha menos captura manual" },
      { en: "Fewer data entry errors", es: "Menos errores de captura" },
      { en: "Faster document processing", es: "Procesamiento de documentos más rápido" },
    ],
  },
  {
    id: "ai-voice-receptionist",
    category: "ai",
    tag: TAG_AI,
    title: { en: "AI Voice Receptionist", es: "Recepcionista de voz con IA" },
    client: { en: "Dental Clinic Group", es: "Grupo de clínicas dentales" },
    image: "/images/portfolio/p-ai-voice-receptionist.jpg",
    accent: "blue",
    challenge: {
      en: "Calls were missed during busy hours and after closing, and so were new appointments.",
      es: "Se perdían llamadas en horas pico y después del cierre, y con ellas nuevas citas.",
    },
    solution: {
      en: "AI voice agent that answers calls, books appointments in the calendar and sends reminders.",
      es: "Agente de voz con IA que contesta llamadas, agenda citas en el calendario y envía recordatorios.",
    },
    features: [
      { en: "Natural voice conversations", es: "Conversaciones de voz naturales" },
      { en: "Calendar booking", es: "Agenda en el calendario" },
      { en: "SMS reminders", es: "Recordatorios por SMS" },
      { en: "Call summaries", es: "Resúmenes de llamadas" },
    ],
    results: [
      { en: "No more missed calls", es: "Cero llamadas perdidas" },
      { en: "Appointments booked after hours", es: "Citas agendadas fuera de horario" },
      { en: "Front desk time freed up", es: "Más tiempo libre para la recepción" },
    ],
  },
  {
    id: "ai-demand-forecasting",
    category: "ai",
    tag: TAG_AI,
    title: { en: "AI Demand Forecasting", es: "Pronóstico de demanda con IA" },
    client: { en: "Food Distribution Company", es: "Distribuidora de alimentos" },
    image: "/images/portfolio/p-ai-demand-forecasting.jpg",
    accent: "blue",
    challenge: {
      en: "Ordering by gut feeling led to overstock of some products and shortages of others.",
      es: "Hacer pedidos por intuición provocaba exceso de algunos productos y faltantes de otros.",
    },
    solution: {
      en: "Machine learning forecasts based on sales history and seasonality, with clear reorder suggestions.",
      es: "Pronósticos con machine learning basados en el historial de ventas y la estacionalidad, con sugerencias claras de reabastecimiento.",
    },
    features: [
      { en: "Weekly demand forecasts", es: "Pronósticos semanales de demanda" },
      { en: "Reorder suggestions", es: "Sugerencias de reabastecimiento" },
      { en: "Seasonality analysis", es: "Análisis de estacionalidad" },
      { en: "Inventory dashboard", es: "Panel de inventario" },
    ],
    results: [
      { en: "Better stock planning", es: "Mejor planeación del inventario" },
      { en: "Less waste from overstock", es: "Menos merma por exceso de inventario" },
      { en: "Fewer stockouts", es: "Menos faltantes de producto" },
    ],
  },
  {
    id: "clinic-management-system",
    category: "software",
    tag: TAG_SOFTWARE,
    title: { en: "Clinic Management System", es: "Sistema de gestión para clínicas" },
    client: { en: "Medical Practice", es: "Consultorio médico" },
    image: "/images/portfolio/p-clinic-management.jpg",
    accent: "purple",
    challenge: {
      en: "Paper records and separate tools made scheduling and billing slow and hard to track.",
      es: "Los expedientes en papel y las herramientas separadas hacían que la agenda y la facturación fueran lentas y difíciles de controlar.",
    },
    solution: {
      en: "Custom web system for patient records, scheduling and billing, with role-based access.",
      es: "Sistema web a la medida para expedientes, agenda y facturación, con acceso según el rol.",
    },
    features: [
      { en: "Patient records", es: "Expedientes de pacientes" },
      { en: "Appointment scheduling", es: "Agenda de citas" },
      { en: "Billing and invoices", es: "Cobros y facturas" },
      { en: "Role-based access", es: "Acceso según el rol" },
    ],
    results: [
      { en: "Paperless patient records", es: "Expedientes sin papel" },
      { en: "Faster check-ins", es: "Registro de llegada más rápido" },
      { en: "Clear view of daily operations", es: "Visión clara de la operación diaria" },
    ],
  },
  {
    id: "fleet-dispatch",
    category: "software",
    tag: TAG_SOFTWARE,
    title: { en: "Fleet Dispatch & Tracking", es: "Despacho y rastreo de flotillas" },
    client: { en: "Transportation Company", es: "Empresa de transporte" },
    image: "/images/portfolio/p-fleet-dispatch.jpg",
    accent: "purple",
    challenge: {
      en: "Dispatch was handled by phone and spreadsheets, with no live view of where vehicles were.",
      es: "El despacho se hacía por teléfono y hojas de cálculo, sin saber en tiempo real dónde estaban los vehículos.",
    },
    solution: {
      en: "Dispatch software with route planning, live vehicle tracking and digital proof of delivery.",
      es: "Software de despacho con planeación de rutas, rastreo de vehículos en vivo y comprobante de entrega digital.",
    },
    features: [
      { en: "Route planning", es: "Planeación de rutas" },
      { en: "Live vehicle tracking", es: "Rastreo de vehículos en vivo" },
      { en: "Driver assignments", es: "Asignación de choferes" },
      { en: "Proof of delivery", es: "Comprobante de entrega" },
    ],
    results: [
      { en: "More efficient routes", es: "Rutas más eficientes" },
      { en: "Real-time visibility for the team", es: "Visibilidad en tiempo real para el equipo" },
      { en: "Fewer “where is my order” calls", es: "Menos llamadas de “¿dónde está mi pedido?”" },
    ],
  },
  {
    id: "manufacturing-erp",
    category: "software",
    tag: TAG_SOFTWARE,
    title: { en: "Custom ERP for Manufacturing", es: "ERP a la medida para manufactura" },
    client: { en: "Manufacturing Company", es: "Empresa manufacturera" },
    image: "/images/portfolio/p-manufacturing-erp.jpg",
    accent: "purple",
    challenge: {
      en: "Production, inventory and purchasing lived in disconnected spreadsheets.",
      es: "La producción, el inventario y las compras vivían en hojas de cálculo desconectadas.",
    },
    solution: {
      en: "Custom ERP that connects production orders, inventory and purchasing in one system.",
      es: "ERP a la medida que conecta órdenes de producción, inventario y compras en un solo sistema.",
    },
    features: [
      { en: "Production orders", es: "Órdenes de producción" },
      { en: "Inventory control", es: "Control de inventario" },
      { en: "Purchasing workflow", es: "Flujo de compras" },
      { en: "Management reports", es: "Reportes gerenciales" },
    ],
    results: [
      { en: "One source of truth", es: "Una sola fuente de información confiable" },
      { en: "Less spreadsheet work", es: "Menos trabajo en hojas de cálculo" },
      { en: "Faster monthly reporting", es: "Reportes mensuales más rápidos" },
    ],
  },
  {
    id: "hr-payroll-portal",
    category: "software",
    tag: TAG_SOFTWARE,
    title: { en: "HR & Payroll Portal", es: "Portal de RR. HH. y nómina" },
    client: { en: "Hospitality Group", es: "Grupo hotelero" },
    image: "/images/portfolio/p-hr-portal.jpg",
    accent: "purple",
    challenge: {
      en: "Shift schedules, time-off requests and payroll data were managed manually across locations.",
      es: "Los turnos, las solicitudes de días libres y los datos de nómina se gestionaban a mano en cada sucursal.",
    },
    solution: {
      en: "Employee portal for shifts, time off and payroll exports, shared by every location.",
      es: "Portal para empleados con turnos, días libres y exportación de nómina, compartido por todas las sucursales.",
    },
    features: [
      { en: "Shift scheduling", es: "Programación de turnos" },
      { en: "Time-off requests", es: "Solicitudes de días libres" },
      { en: "Employee profiles", es: "Perfiles de empleados" },
      { en: "Payroll exports", es: "Exportación de nómina" },
    ],
    results: [
      { en: "Simpler scheduling across locations", es: "Turnos más sencillos en todas las sucursales" },
      { en: "Fewer payroll mistakes", es: "Menos errores de nómina" },
      { en: "Happier, better-informed staff", es: "Personal más contento y mejor informado" },
    ],
  },
  {
    id: "tour-booking-engine",
    category: "software",
    tag: TAG_SOFTWARE,
    title: { en: "Tour Booking Engine", es: "Motor de reservas de tours" },
    client: { en: "Tour Operator", es: "Operador turístico" },
    image: "/images/portfolio/p-tour-booking.jpg",
    accent: "purple",
    challenge: {
      en: "Bookings came in by email and phone, causing double bookings and slow confirmations.",
      es: "Las reservas llegaban por correo y teléfono, lo que causaba reservas duplicadas y confirmaciones lentas.",
    },
    solution: {
      en: "Online booking engine with live availability, online payments and guide assignment.",
      es: "Motor de reservas en línea con disponibilidad en vivo, pagos en línea y asignación de guías.",
    },
    features: [
      { en: "Availability calendar", es: "Calendario de disponibilidad" },
      { en: "Online payments", es: "Pagos en línea" },
      { en: "Guide assignment", es: "Asignación de guías" },
      { en: "Automatic confirmations", es: "Confirmaciones automáticas" },
    ],
    results: [
      { en: "No more double bookings", es: "Cero reservas duplicadas" },
      { en: "Customers book any time", es: "Los clientes reservan a cualquier hora" },
      { en: "Instant confirmations", es: "Confirmaciones al instante" },
    ],
  },
  {
    id: "food-delivery-app",
    category: "mobile",
    tag: TAG_MOBILE,
    title: { en: "Food Delivery App", es: "App de entrega de comida" },
    client: { en: "Restaurant Group", es: "Grupo restaurantero" },
    image: "/images/portfolio/p-food-delivery-app.jpg",
    accent: "yellow",
    challenge: {
      en: "The restaurants depended on third-party apps and their high commissions.",
      es: "Los restaurantes dependían de apps de terceros y de sus altas comisiones.",
    },
    solution: {
      en: "Branded iOS & Android ordering app with menus, payments and live order tracking.",
      es: "App de pedidos propia para iOS y Android con menús, pagos y seguimiento de pedidos en vivo.",
    },
    features: [
      { en: "Digital menu", es: "Menú digital" },
      { en: "In-app payments", es: "Pagos dentro de la app" },
      { en: "Live order tracking", es: "Seguimiento de pedidos en vivo" },
      { en: "Push notifications", es: "Notificaciones push" },
    ],
    results: [
      { en: "Direct orders without middlemen", es: "Pedidos directos sin intermediarios" },
      { en: "Stronger customer relationships", es: "Relaciones más sólidas con los clientes" },
      { en: "Repeat orders made easy", es: "Volver a pedir es muy fácil" },
    ],
  },
  {
    id: "fitness-coaching-app",
    category: "mobile",
    tag: TAG_MOBILE,
    title: { en: "Fitness Coaching App", es: "App de entrenamiento personal" },
    client: { en: "Personal Training Studio", es: "Estudio de entrenamiento personal" },
    image: "/images/portfolio/p-fitness-coaching-app.jpg",
    accent: "yellow",
    challenge: {
      en: "Clients received training plans by message and progress was hard to follow.",
      es: "Los clientes recibían sus rutinas por mensaje y era difícil darle seguimiento a su progreso.",
    },
    solution: {
      en: "Coaching app with personalized workout plans, progress tracking and trainer feedback.",
      es: "App de coaching con rutinas personalizadas, seguimiento del progreso y retroalimentación del entrenador.",
    },
    features: [
      { en: "Workout plans", es: "Rutinas de ejercicio" },
      { en: "Progress tracking", es: "Seguimiento del progreso" },
      { en: "Trainer feedback", es: "Retroalimentación del entrenador" },
      { en: "Session booking", es: "Reserva de sesiones" },
    ],
    results: [
      { en: "More engaged clients", es: "Clientes más comprometidos" },
      { en: "Coaches can follow progress easily", es: "Los entrenadores siguen el progreso fácilmente" },
      { en: "New remote coaching offer", es: "Nueva oferta de coaching a distancia" },
    ],
  },
  {
    id: "field-service-app",
    category: "mobile",
    tag: TAG_MOBILE,
    title: { en: "Field Service App", es: "App de servicio en campo" },
    client: { en: "Maintenance Company", es: "Empresa de mantenimiento" },
    image: "/images/portfolio/p-field-service-app.jpg",
    accent: "yellow",
    challenge: {
      en: "Technicians used paper work orders that were lost, late or hard to read.",
      es: "Los técnicos usaban órdenes de trabajo en papel que se perdían, llegaban tarde o eran difíciles de leer.",
    },
    solution: {
      en: "Mobile app for work orders with offline mode, checklists, photos and customer signatures.",
      es: "App móvil de órdenes de trabajo con modo sin conexión, listas de verificación, fotos y firma del cliente.",
    },
    features: [
      { en: "Work order list", es: "Lista de órdenes de trabajo" },
      { en: "Offline mode", es: "Modo sin conexión" },
      { en: "Checklists and photos", es: "Listas de verificación y fotos" },
      { en: "Digital signatures", es: "Firmas digitales" },
    ],
    results: [
      { en: "Paperless field work", es: "Trabajo en campo sin papel" },
      { en: "Faster invoicing after each job", es: "Facturación más rápida tras cada servicio" },
      { en: "Complete service history", es: "Historial de servicio completo" },
    ],
  },
  {
    id: "loyalty-app",
    category: "mobile",
    tag: TAG_MOBILE,
    title: { en: "Customer Loyalty App", es: "App de lealtad para clientes" },
    client: { en: "Coffee Shop Chain", es: "Cadena de cafeterías" },
    image: "/images/portfolio/p-loyalty-app.jpg",
    accent: "yellow",
    challenge: {
      en: "Paper stamp cards were easy to lose and gave no insight into customers.",
      es: "Las tarjetas de sellos en papel se perdían fácilmente y no daban información sobre los clientes.",
    },
    solution: {
      en: "Loyalty app with digital points, QR scanning at checkout and personalized rewards.",
      es: "App de lealtad con puntos digitales, escaneo de QR en caja y recompensas personalizadas.",
    },
    features: [
      { en: "Digital points card", es: "Tarjeta de puntos digital" },
      { en: "QR code at checkout", es: "Código QR en caja" },
      { en: "Personalized rewards", es: "Recompensas personalizadas" },
      { en: "Push offers", es: "Ofertas por notificación push" },
    ],
    results: [
      { en: "More repeat visits", es: "Más visitas recurrentes" },
      { en: "Better understanding of customers", es: "Mejor conocimiento de los clientes" },
      { en: "Targeted promotions", es: "Promociones dirigidas" },
    ],
  },
  {
    id: "property-search-app",
    category: "mobile",
    tag: TAG_MOBILE,
    title: { en: "Property Search App", es: "App de búsqueda de propiedades" },
    client: { en: "Real Estate Agency", es: "Agencia inmobiliaria" },
    image: "/images/portfolio/p-property-search-app.jpg",
    accent: "yellow",
    challenge: {
      en: "Buyers had to call the agency to learn which properties were still available.",
      es: "Los compradores tenían que llamar a la agencia para saber qué propiedades seguían disponibles.",
    },
    solution: {
      en: "Property search app with map view, filters, saved searches and instant alerts.",
      es: "App de búsqueda de propiedades con vista de mapa, filtros, búsquedas guardadas y alertas al instante.",
    },
    features: [
      { en: "Map-based search", es: "Búsqueda en mapa" },
      { en: "Smart filters", es: "Filtros inteligentes" },
      { en: "Saved searches", es: "Búsquedas guardadas" },
      { en: "New listing alerts", es: "Alertas de nuevas propiedades" },
    ],
    results: [
      { en: "More qualified enquiries", es: "Más solicitudes calificadas" },
      { en: "Listings always up to date", es: "Propiedades siempre actualizadas" },
      { en: "Faster responses to buyers", es: "Respuestas más rápidas a los compradores" },
    ],
  },
  {
    id: "online-learning-platform",
    category: "platforms",
    tag: TAG_PLATFORM,
    title: { en: "Online Learning Platform", es: "Plataforma de aprendizaje en línea" },
    client: { en: "Education Company", es: "Empresa educativa" },
    image: "/images/portfolio/p-online-learning.jpg",
    accent: "cyan",
    challenge: {
      en: "Courses were delivered only in person, which limited growth.",
      es: "Los cursos solo se impartían de forma presencial, lo que limitaba el crecimiento.",
    },
    solution: {
      en: "Online learning platform with video lessons, progress tracking and certificates.",
      es: "Plataforma de aprendizaje en línea con clases en video, seguimiento del progreso y certificados.",
    },
    features: [
      { en: "Course catalog", es: "Catálogo de cursos" },
      { en: "Video lessons", es: "Clases en video" },
      { en: "Progress tracking", es: "Seguimiento del progreso" },
      { en: "Certificates", es: "Certificados" },
    ],
    results: [
      { en: "Courses available anywhere", es: "Cursos disponibles desde cualquier lugar" },
      { en: "New online revenue stream", es: "Nueva fuente de ingresos en línea" },
      { en: "Students learn at their own pace", es: "Los alumnos aprenden a su propio ritmo" },
    ],
  },
  {
    id: "services-marketplace",
    category: "platforms",
    tag: TAG_PLATFORM,
    title: { en: "Local Services Marketplace", es: "Marketplace de servicios locales" },
    client: { en: "Home Services Startup", es: "Startup de servicios para el hogar" },
    image: "/images/portfolio/p-services-marketplace.jpg",
    accent: "cyan",
    challenge: {
      en: "The startup needed a platform to connect customers with trusted local professionals.",
      es: "La startup necesitaba una plataforma para conectar a sus clientes con profesionales locales de confianza.",
    },
    solution: {
      en: "Two-sided marketplace with profiles, reviews, booking and secure payments.",
      es: "Marketplace de dos lados con perfiles, reseñas, reservas y pagos seguros.",
    },
    features: [
      { en: "Professional profiles", es: "Perfiles de profesionales" },
      { en: "Ratings and reviews", es: "Calificaciones y reseñas" },
      { en: "Online booking", es: "Reservas en línea" },
      { en: "Secure payments", es: "Pagos seguros" },
    ],
    results: [
      { en: "Launched on schedule", es: "Lanzamiento a tiempo" },
      { en: "Easy onboarding for professionals", es: "Alta sencilla para los profesionales" },
      { en: "Smooth booking for customers", es: "Reservas fluidas para los clientes" },
    ],
  },
  {
    id: "b2b-customer-portal",
    category: "platforms",
    tag: TAG_PLATFORM,
    title: { en: "B2B Customer Portal", es: "Portal de clientes B2B" },
    client: { en: "Industrial Supplier", es: "Proveedor industrial" },
    image: "/images/portfolio/p-b2b-portal.jpg",
    accent: "cyan",
    challenge: {
      en: "Business customers had to email or call to place orders and request invoices.",
      es: "Los clientes empresariales tenían que escribir o llamar para hacer pedidos y solicitar facturas.",
    },
    solution: {
      en: "Self-service portal for orders, invoices, order tracking and quick reorders.",
      es: "Portal de autoservicio para pedidos, facturas, seguimiento de pedidos y recompras rápidas.",
    },
    features: [
      { en: "Online ordering", es: "Pedidos en línea" },
      { en: "Invoice downloads", es: "Descarga de facturas" },
      { en: "Order tracking", es: "Seguimiento de pedidos" },
      { en: "Quick reorder", es: "Recompra rápida" },
    ],
    results: [
      { en: "Fewer calls and emails", es: "Menos llamadas y correos" },
      { en: "Faster repeat orders", es: "Pedidos recurrentes más rápidos" },
      { en: "Better customer experience", es: "Mejor experiencia para el cliente" },
    ],
  },
  {
    id: "membership-platform",
    category: "platforms",
    tag: TAG_PLATFORM,
    title: { en: "Membership & Events Platform", es: "Plataforma de membresías y eventos" },
    client: { en: "Business Association", es: "Asociación empresarial" },
    image: "/images/portfolio/p-membership-platform.jpg",
    accent: "cyan",
    challenge: {
      en: "Memberships, renewals and event sign-ups were tracked in spreadsheets.",
      es: "Las membresías, las renovaciones y los registros a eventos se controlaban en hojas de cálculo.",
    },
    solution: {
      en: "Membership platform with online renewals, event registration and a member directory.",
      es: "Plataforma de membresías con renovaciones en línea, registro a eventos y directorio de miembros.",
    },
    features: [
      { en: "Membership tiers", es: "Niveles de membresía" },
      { en: "Online renewals", es: "Renovaciones en línea" },
      { en: "Event registration", es: "Registro a eventos" },
      { en: "Member directory", es: "Directorio de miembros" },
    ],
    results: [
      { en: "Renewals on autopilot", es: "Renovaciones en piloto automático" },
      { en: "More event sign-ups", es: "Más registros a eventos" },
      { en: "A connected member community", es: "Una comunidad de miembros conectada" },
    ],
  },
  {
    id: "corporate-website-cms",
    category: "platforms",
    tag: TAG_PLATFORM,
    title: { en: "Corporate Website & CMS", es: "Sitio web corporativo y CMS" },
    client: { en: "Hospitality Group", es: "Grupo hotelero" },
    image: "/images/portfolio/p-corporate-cms.jpg",
    accent: "cyan",
    challenge: {
      en: "An outdated website was slow and every change needed a developer.",
      es: "El sitio web era antiguo y lento, y cada cambio requería a un desarrollador.",
    },
    solution: {
      en: "Fast, modern website with an easy content manager the marketing team runs itself.",
      es: "Sitio web rápido y moderno con un gestor de contenidos sencillo que el equipo de marketing maneja por su cuenta.",
    },
    features: [
      { en: "Custom design", es: "Diseño a la medida" },
      { en: "Easy content editing", es: "Edición de contenido sencilla" },
      { en: "SEO foundations", es: "Bases de SEO" },
      { en: "Multi-language pages", es: "Páginas en varios idiomas" },
    ],
    results: [
      { en: "Faster, more modern website", es: "Un sitio web más rápido y moderno" },
      { en: "Marketing team updates it alone", es: "Marketing lo actualiza sin ayuda" },
      { en: "Better search visibility", es: "Mejor visibilidad en buscadores" },
    ],
  },
];
