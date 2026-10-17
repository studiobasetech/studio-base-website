import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "De chatbots a agentes: cómo la IA está aprendiendo a hacer el trabajo",
  excerpt:
    "La IA está pasando de responder preguntas a completar tareas. Te explicamos qué distingue a un agente de un chatbot, dónde brillan hoy los agentes y cómo incorporarlos sin perder el control.",
  imageAlt: "El núcleo de un agente de IA conectado a una cola de tareas con tareas completadas, en curso y pendientes",
  takeaways: [
    "Un agente se define por lo que puede hacer: planear, usar herramientas y revisar sus propios resultados.",
    "Los mejores primeros casos de uso son repetitivos, con muchas reglas y fáciles de verificar.",
    "Empieza con un agente que sugiere acciones y una persona que las aprueba; después amplía su autonomía paso a paso.",
    "Los objetivos claros, los permisos acotados y los buenos registros importan más que el modelo que elijas.",
  ],
  body: [
    {
      type: "p",
      text: "Para la mayoría de las personas, el primer contacto con la IA moderna fue una ventana de chat. Escribías una pregunta, la IA escribía una respuesta y la conversación terminaba al cerrar la pestaña. Ese modelo era impresionante, pero también pasivo: la IA podía explicarte cómo hacer algo, pero aun así tenías que hacerlo tú. El siguiente paso, que ya está llegando a oficinas y flujos de trabajo en todo el mundo, es una IA que no solo responde, sino que actúa. A estos sistemas se les suele llamar agentes.",
    },
    {
      type: "p",
      text: "La diferencia parece sutil, pero cambia nuestra forma de pensar el software. Un chatbot es un gran conversador. Un agente se parece más a un colega junior: le das un objetivo, lo divide en pasos, usa las herramientas que se le han dado, comprueba si el resultado tiene sentido y te informa. Entender esa diferencia es clave para aprovechar bien a los agentes y no dejarse llevar por el entusiasmo exagerado que los rodea.",
    },
    { type: "h2", text: "Qué convierte realmente a algo en un agente" },
    {
      type: "p",
      text: "No existe una definición oficial única, pero la mayoría de los especialistas coincide en algunos ingredientes. El primero es la planeación: la capacidad de tomar un objetivo difuso, como “prepara un resumen de los tickets de soporte de la semana pasada”, y convertirlo en pasos concretos. El segundo es el uso de herramientas: el agente puede recurrir a otros sistemas, por ejemplo buscar en una base de datos, leer un documento, enviar un mensaje o llenar un formulario. El tercero es un ciclo de retroalimentación: después de cada paso observa qué ocurrió y decide qué hacer a continuación, en lugar de seguir un guion a ciegas.",
    },
    {
      type: "p",
      text: "Juntos, estos ingredientes crean algo que se comporta menos como un programa y más como un proceso. La automatización tradicional sigue un camino fijo: si pasa esto, haz aquello. Un agente puede manejar la variación, porque razona sobre cada situación a medida que se presenta. Esa flexibilidad es su mayor fortaleza y, como veremos, la principal razón por la que necesita límites claros.",
    },
    {
      type: "quote",
      text: "Un chatbot te dice cómo hacer el trabajo. Un agente hace el trabajo y te cuenta cómo le fue.",
    },
    { type: "h2", text: "Dónde brillan hoy los agentes" },
    {
      type: "p",
      text: "Las primeras implementaciones más exitosas comparten un patrón. Las tareas son repetitivas, siguen reglas reconocibles y su resultado es fácil de revisar para una persona. Piensa en clasificar los correos entrantes por categorías, redactar primeras respuestas a preguntas frecuentes de clientes, conciliar registros entre dos sistemas o reunir información de varias fuentes en un solo reporte.",
    },
    {
      type: "list",
      items: [
        "Operaciones con clientes: clasificar solicitudes, consultar los datos correctos de la cuenta y redactar una respuesta para que una persona la apruebe.",
        "Trabajo administrativo: emparejar facturas con pedidos, señalar discrepancias y actualizar registros.",
        "Investigación y reportes: recopilar datos de documentos internos y resumir qué cambió desde la semana pasada.",
        "Apoyo a ventas: enriquecer prospectos con información pública y preparar notas informativas antes de una reunión.",
      ],
    },
    {
      type: "p",
      text: "En cada caso, el agente elimina la parte tediosa de la tarea, copiar, buscar y dar formato, mientras una persona conserva las decisiones que requieren criterio. De esa división del trabajo provienen las verdaderas mejoras de productividad. La gente deja de pasar las mañanas en trabajo mecánico y empieza a dedicarlas a tomar decisiones.",
    },
    { type: "h2", text: "Dónde todavía tienen dificultades" },
    {
      type: "p",
      text: "Los agentes no son magia, y fingir lo contrario lleva a proyectos decepcionantes. Pueden malinterpretar instrucciones ambiguas, dar con total seguridad respuestas equivocadas o tomar un camino largo y costoso para llegar a un resultado sencillo. También tienen problemas con tareas cuyo éxito es difícil de medir, porque sin una señal clara de cómo se ve un “buen” resultado, el ciclo de retroalimentación no tiene con qué trabajar.",
    },
    {
      type: "p",
      text: "Las tareas largas y abiertas son otro punto débil. Cada paso conlleva una pequeña probabilidad de error y, a lo largo de decenas de pasos, esas probabilidades se acumulan. Por eso los agentes más confiables de hoy trabajan en tareas cortas y bien definidas, y por eso dividir un proceso grande en partes más pequeñas y supervisadas suele funcionar mejor que entregarlo todo de una vez.",
    },
    { type: "h2", text: "Un camino práctico para adoptarlos" },
    {
      type: "p",
      text: "La forma más segura de incorporar agentes es gradual, en etapas de autonomía creciente. En la primera etapa, el agente solo sugiere: redacta el correo, prepara la actualización del registro o propone el siguiente paso, y una persona da clic en aprobar. Esto genera confianza y, algo igual de importante, deja un historial de dónde el agente acierta y dónde no.",
    },
    {
      type: "p",
      text: "Cuando la tasa de aprobación es alta de forma constante en un tipo de tarea concreto, se puede permitir que el agente actúe por su cuenta en esa tarea, sin dejar de registrar todo lo que hace. Las excepciones y los casos inusuales siguen pasando a una persona. Con el tiempo, el límite se desplaza, pero lo hace por evidencia, no por optimismo.",
    },
    {
      type: "callout",
      title: "Regla práctica",
      text: "Dale a un agente el conjunto mínimo de permisos que necesita para hacer su trabajo. Un agente que solo puede leer un calendario no puede borrarlo por accidente.",
    },
    { type: "h2", text: "El lado humano de la ecuación" },
    {
      type: "p",
      text: "La configuración técnica suele ser más sencilla que la organizacional. Los equipos necesitan saber de qué es responsable el agente, quién revisa su trabajo y qué pasa cuando comete un error. Una responsabilidad bien definida evita dos fallas comunes: que la gente ignore al agente porque no confía en él, y que confíe tanto que nadie note cuando empieza a desviarse.",
    },
    {
      type: "p",
      text: "También ayuda ser honestos sobre el objetivo. Los agentes funcionan mejor cuando se plantean como una forma de eliminar el trabajo pesado, no como un reemplazo de las personas que entienden el negocio. Los colegas que conocen el proceso son quienes están en mejor posición para diseñar, probar y supervisar al agente que se encargará de sus partes repetitivas.",
    },
    { type: "h2", text: "Mirando hacia adelante" },
    {
      type: "p",
      text: "La dirección está clara. Los modelos planean cada vez mejor, las herramientas son más fáciles de conectar y el costo de operar agentes sigue bajando. Lo que distinguirá a las organizaciones exitosas no será el acceso a la tecnología, que cada vez está más disponible, sino la disciplina para aplicarla a los problemas correctos con los controles adecuados.",
    },
    {
      type: "p",
      text: "El paso de los chatbots a los agentes es, al final, un paso de la información a la acción. Si se maneja con cuidado, libera a las personas para hacer el trabajo que solo ellas pueden hacer. Si se maneja sin cuidado, simplemente automatiza la confusión. La diferencia está en tener objetivos claros, permisos acotados, una medición honesta y la disposición de empezar en pequeño.",
    },
  ],
};

export default es;
