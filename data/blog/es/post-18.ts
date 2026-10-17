import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "¿Serverless, contenedores o servidores? Una guía en lenguaje sencillo para elegir cómo ejecutar tu software en la nube",
  excerpt:
    "Los servidores virtuales, los contenedores y las funciones serverless ejecutan tu software en la nube, pero de maneras muy distintas. Qué es cada uno, dónde destaca y cómo elegir.",
  imageAlt: "Un panel de arquitectura en la nube que compara servidores virtuales, contenedores y funciones serverless con indicadores de escalabilidad y costo",
  takeaways: [
    "Los servidores virtuales ofrecen el mayor control, pero también te dejan la mayor parte del trabajo.",
    "Los contenedores empaquetan el software de forma consistente y son ideales para equipos que operan varios servicios.",
    "Las funciones serverless se ejecutan solo cuando se necesitan y son ideales para trabajo irregular o basado en eventos.",
    "Elige según tu carga de trabajo y las habilidades de tu equipo, y combina opciones cuando tenga sentido.",
  ],
  body: [
    {
      type: "p",
      text: "Pregúntale a un equipo técnico cómo debería ejecutarse una nueva aplicación en la nube y es posible que escuches una avalancha de términos: máquinas virtuales, contenedores, orquestación, funciones, serverless. Cada opción tiene defensores apasionados, y la conversación puede volverse difícil de seguir rápidamente para cualquiera que simplemente quiere que el software funcione de forma confiable a un precio razonable.",
    },
    {
      type: "p",
      text: "La buena noticia es que las ideas centrales no son complicadas. Los tres enfoques responden la misma pregunta, “¿dónde se ejecuta nuestro código?”, pero reparten la responsabilidad de manera diferente entre tú y la plataforma en la nube. Entender esa división basta para tener una conversación útil y tomar una decisión con confianza.",
    },
    { type: "h2", text: "Servidores virtuales: tu propia computadora en la nube" },
    {
      type: "p",
      text: "Un servidor virtual es la opción más conocida. Se comporta como una computadora física: tiene un sistema operativo, memoria, almacenamiento y una capacidad de procesamiento fija. Lo rentas por hora o por mes, instalas lo que necesitas y ejecutas tu software en él, de forma muy parecida a como lo harías en un servidor en tu propia oficina.",
    },
    {
      type: "p",
      text: "La ventaja es el control. Puedes instalar casi cualquier cosa, configurarlo exactamente como quieras y migrar a él software existente con pocos cambios. La desventaja es que también te haces cargo de las tareas de mantenimiento: actualizar el sistema operativo, aplicar parches de seguridad, vigilar el espacio en disco y decidir cuándo agregar más capacidad. Además, un servidor virtual sigue funcionando, y generando costos, tanto si está ocupado como si está inactivo.",
    },
    { type: "h2", text: "Contenedores: software en una caja estándar" },
    {
      type: "p",
      text: "Un contenedor empaqueta una aplicación junto con todo lo que necesita para ejecutarse, como bibliotecas y configuraciones, en una sola unidad estándar. Piénsalo como un contenedor de carga: sin importar lo que lleve dentro, puede moverse y manejarse de la misma forma. Un contenedor que funciona en la laptop de un desarrollador se comportará igual en pruebas y en producción, lo que elimina toda una categoría de problemas del tipo “en mi máquina sí funciona”.",
    },
    {
      type: "p",
      text: "Los contenedores son ligeros, por lo que muchos pueden ejecutarse en el mismo servidor subyacente, y arrancan en segundos. En entornos más grandes, un software de orquestación los administra automáticamente: inicia más copias cuando aumenta el tráfico, reinicia las que fallan y las distribuye entre varias máquinas. Ese poder viene acompañado de complejidad, y operar bien un entorno orquestado requiere experiencia real. Los servicios administrados de contenedores reducen la carga, pero alguien todavía necesita entender cómo encajan las piezas.",
    },
    { type: "h2", text: "Serverless: solo el código" },
    {
      type: "p",
      text: "La computación serverless no significa que no haya servidores; significa que nunca los ves ni los administras. Escribes pequeñas piezas de código, a menudo llamadas funciones, y la plataforma las ejecuta cada vez que algo las activa: una solicitud web, un archivo subido, un nuevo pedido o una hora programada. Cuando no pasa nada, nada se ejecuta y, por lo general, no pagas nada.",
    },
    {
      type: "quote",
      text: "La verdadera pregunta no es qué tecnología es la mejor, sino de cuánta parte de la maquinaria quieres hacerte cargo.",
    },
    {
      type: "p",
      text: "Serverless escala automáticamente, de cero a miles de solicitudes, sin que nadie tenga que planear la capacidad. Es ideal para trabajo irregular o basado en eventos, como procesar envíos de formularios, redimensionar imágenes o enviar notificaciones. Las contrapartes son menos control sobre el entorno, límites en el tiempo que puede ejecutarse una función, pequeños retrasos ocasionales cuando una función arranca después de estar inactiva y una dependencia mayor de la plataforma específica sobre la que construyes.",
    },
    { type: "h2", text: "Comparación de ventajas y desventajas" },
    {
      type: "p",
      text: "Ninguna opción gana en todos los aspectos. Comparar unos cuantos factores prácticos lado a lado suele aclarar la decisión:",
    },
    {
      type: "list",
      items: [
        "Control: los servidores virtuales ofrecen el mayor, serverless el menor, y los contenedores quedan en medio.",
        "Mantenimiento: serverless elimina la mayor parte del trabajo operativo, mientras que los servidores virtuales te lo dejan todo a ti.",
        "Escalabilidad: serverless escala automáticamente, los contenedores escalan bien con orquestación y los servidores requieren planeación.",
        "Patrón de costos: los servidores cuestan lo mismo ocupados o inactivos, mientras que los costos de serverless siguen el uso real.",
        "Portabilidad: los contenedores se mueven fácilmente entre entornos, mientras que el código serverless está más ligado a una sola plataforma.",
        "Habilidades: cada opción requiere experiencia distinta, y las habilidades que tu equipo ya tiene importan muchísimo.",
      ],
    },
    {
      type: "p",
      text: "El costo merece un análisis cuidadoso. Serverless suele ser muy económico para cargas de trabajo ligeras o impredecibles, pero para software que se ejecuta de forma constante y con alto volumen, un servidor o un entorno de contenedores bien dimensionado puede resultar más económico. La opción más barata en papel no siempre es la más barata una vez que incluyes el tiempo que tu equipo dedica a mantenerla en funcionamiento.",
    },
    { type: "h2", text: "Cómo elegir" },
    {
      type: "p",
      text: "Empieza por la carga de trabajo, no por la tecnología. Una aplicación de negocio más antigua que espera un sistema operativo tradicional y funciona todo el día suele estar mejor en un servidor virtual. Una plataforma web moderna compuesta por varios servicios que necesitan desplegarse con frecuencia y de forma consistente encaja de forma natural con los contenedores. Las tareas en segundo plano que ocurren en ráfagas, o las pequeñas integraciones entre sistemas, suelen ser perfectas para serverless.",
    },
    {
      type: "p",
      text: "Después, considera a tu equipo. Un entorno de contenedores sofisticado que nadie en la empresa entiende es un riesgo, por más elegante que se vea. Elegir la opción que tu gente pueda operar, monitorear y reparar con confianza a las dos de la mañana suele ser la decisión más sensata, aunque no sea la más de moda.",
    },
    {
      type: "callout",
      title: "Preguntas que debes hacerte",
      text: "¿Qué tan estable es el tráfico? ¿Con qué frecuencia cambiará el software? ¿Necesita una configuración especial? ¿Quién le dará mantenimiento? Responder estas cuatro preguntas con honestidad orienta a la mayoría de los proyectos hacia la opción correcta.",
    },
    { type: "h2", text: "Combinar enfoques es lo normal" },
    {
      type: "p",
      text: "La mayoría de las organizaciones no eligen solo uno. Una configuración típica podría ejecutar una aplicación principal en contenedores, un sistema heredado en un servidor virtual y unas cuantas funciones serverless para notificaciones, procesamiento de archivos y reportes programados. Cada parte usa el modelo que mejor le funciona.",
    },
    {
      type: "p",
      text: "Lo importante es que la elección sea deliberada. Documenta por qué cada parte se ejecuta donde se ejecuta, revisa esa decisión a medida que el negocio crece y mantente abierto a mover piezas cuando cambien las razones. El modelo de cómputo correcto es simplemente el que entrega software confiable a un costo justo, con un nivel de esfuerzo que tu equipo pueda sostener.",
    },
  ],
};

export default es;
