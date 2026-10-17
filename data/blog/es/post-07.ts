import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "APIs: el pegamento invisible que mantiene unida la economía digital",
  excerpt:
    "Cada vez que una app muestra un mapa, cobra un pago o envía una notificación, hay APIs trabajando. Una guía en lenguaje sencillo sobre cómo funcionan y por qué importan para cualquier negocio.",
  imageAlt: "Una consola de API enviando una solicitud JSON, conectada a servicios de pagos, mapas, mensajería, calendario y almacenamiento",
  takeaways: [
    "Una API es un contrato que permite que un software le solicite algo a otro.",
    "Conectar sistemas mediante APIs elimina el copiado manual y mantiene los datos consistentes.",
    "Las buenas APIs están documentadas, versionadas, protegidas y monitoreadas.",
    "Al elegir software, revisa con qué se puede conectar antes de revisar sus funciones.",
  ],
  body: [
    {
      type: "p",
      text: "Abre una app de entrega de comida y observa lo que sucede. Un mapa muestra dónde está tu repartidor, se hace el cargo a tu tarjeta, llega una confirmación por mensaje y la pantalla de la cocina del restaurante se ilumina con tu pedido. Parece un solo producto sin fisuras, pero tras bambalinas varios sistemas independientes están hablando entre sí. El lenguaje que usan se llama API, siglas en inglés de interfaz de programación de aplicaciones.",
    },
    {
      type: "p",
      text: "Las APIs son de las tecnologías más importantes y menos visibles en los negocios modernos. Entenderlas, aunque sea a grandes rasgos, ayuda a los líderes a tomar mejores decisiones sobre qué software comprar, qué procesos automatizar y cómo crear productos que encajen en el mundo digital más amplio.",
    },
    { type: "h2", text: "Una analogía con un restaurante" },
    {
      type: "p",
      text: "La explicación clásica de una API usa un restaurante. Tú, como cliente, no entras a la cocina a preparar tu comida. Lees un menú, que indica lo que está disponible, y le haces tu pedido a un mesero. El mesero lleva la solicitud a la cocina y te trae tu platillo. Nunca necesitas saber cómo funciona la cocina.",
    },
    {
      type: "p",
      text: "Una API cumple el papel del menú y del mesero. Define qué puede solicitar un sistema a otro, en qué formato y qué recibirá a cambio. El sistema que hace la solicitud no necesita saber cómo está construido el otro por dentro, solo cómo hacer un pedido válido.",
    },
    {
      type: "quote",
      text: "Una API es una promesa: pregúntame de esta manera y te responderé de esa otra.",
    },
    { type: "h2", text: "Por qué las APIs importan para los negocios" },
    {
      type: "list",
      items: [
        "Eliminan la doble captura: cuando los sistemas intercambian datos directamente, nadie tiene que copiarlos a mano.",
        "Mantienen la información consistente: un cambio hecho en un lugar aparece en todos los lugares donde se necesita.",
        "Hacen posible la automatización: los flujos de trabajo pueden pasar de una herramienta a otra sin traspasos manuales.",
        "Aceleran la innovación: en lugar de construirlo todo, los equipos pueden combinar servicios probados.",
        "Crean oportunidades: ofrecer tu propia API puede permitir que tus socios construyan sobre tus servicios.",
      ],
    },
    {
      type: "p",
      text: "Muchos de los problemas de productividad que enfrentan las empresas son, en el fondo, problemas de integración. Los datos de ventas viven en una herramienta, las facturas en otra y los tickets de soporte en una tercera. Cada herramienta funciona bien por sí sola, pero los huecos entre ellas se llenan con hojas de cálculo y trabajo manual. Las APIs son la forma de cerrar esos huecos.",
    },
    { type: "h2", text: "Qué hace buena a una API" },
    {
      type: "p",
      text: "No todas las APIs son iguales. Una buena está claramente documentada, para que los desarrolladores puedan entenderla sin adivinar. Está versionada, para que los cambios no rompan de repente los sistemas que dependen de ella. Está protegida, normalmente con claves o tokens que identifican quién hace la llamada y limitan lo que puede hacer. Y está monitoreada, para que los problemas se detecten antes de que los noten los clientes.",
    },
    {
      type: "p",
      text: "La confiabilidad merece especial atención. Cuando tu negocio depende de la API de otro servicio, sus caídas se convierten en tus caídas. Las integraciones bien construidas lo anticipan: reintentan de forma sensata, ponen en cola las solicitudes cuando un servicio no está disponible y alertan a alguien cuando algo lleva demasiado tiempo fallando.",
    },
    { type: "h2", text: "Consideraciones de seguridad" },
    {
      type: "p",
      text: "Como las APIs exponen datos y acciones a otros sistemas, también son un objetivo atractivo para los atacantes. Las claves de acceso deben tratarse como contraseñas: guardarse de forma segura, nunca compartirse por correo electrónico ni en repositorios de código, y rotarse con regularidad. Cada integración debe recibir solo los permisos que necesita, y cualquier actividad inusual, como un aumento repentino de solicitudes, debe disparar una alerta.",
    },
    {
      type: "callout",
      title: "Antes de comprar software",
      text: "Pregunta con qué se conecta y cómo. Una herramienta con menos funciones pero con una API sólida y bien documentada suele aportar más valor que una herramienta llena de funciones que mantiene sus datos encerrados.",
    },
    { type: "h2", text: "Cómo crear tu propia API" },
    {
      type: "p",
      text: "Tarde o temprano, muchas empresas descubren que otros quieren conectarse con ellas: un socio que quiere hacer pedidos automáticamente, un cliente que quiere recibir datos en sus propios sistemas o un equipo interno que está creando una aplicación móvil. Ofrecer una API convierte estas solicitudes en un servicio repetible en lugar de una serie de proyectos aislados.",
    },
    {
      type: "p",
      text: "Diseñar una API es un ejercicio de empatía. Las personas que la usarán no conocen tus sistemas internos, así que los nombres deben ser claros, las respuestas consistentes y los errores explicados de forma que ayuden a los desarrolladores a resolver el problema. Empieza en pequeño, con las pocas operaciones que tus socios realmente necesitan, y crece según la demanda real.",
    },
    {
      type: "p",
      text: "Trata una API como un producto. Publica documentación con ejemplos, ofrece un entorno de pruebas seguro, comunica los cambios con suficiente anticipación y mantén funcionando las versiones anteriores durante un periodo razonable. Los socios que pueden integrarse de forma fácil y confiable tienen muchas más probabilidades de construir relaciones a largo plazo sobre tus servicios.",
    },
    { type: "h2", text: "El futuro conectado" },
    {
      type: "p",
      text: "Las APIs también son, cada vez más, la forma de poner a trabajar a los sistemas de IA. Un asistente de IA se vuelve mucho más útil cuando puede consultar un calendario, buscar un pedido o actualizar un registro, y cada una de esas capacidades normalmente se entrega a través de una API. Cuanto más conectados estén los sistemas de una empresa, más valor podrá obtener de las nuevas tecnologías a medida que lleguen.",
    },
    {
      type: "p",
      text: "Quizá nunca veas una API, pero dependes de cientos de ellas todos los días. Para las empresas, tratar la integración como una prioridad estratégica y no como un detalle técnico de último momento es una de las formas más discretas y efectivas de trabajar más rápido.",
    },
  ],
};

export default es;
