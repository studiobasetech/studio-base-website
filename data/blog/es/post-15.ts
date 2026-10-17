import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "La accesibilidad es buen diseño: cómo crear sitios web que todos puedan usar",
  excerpt:
    "Un sitio web accesible es más fácil de usar para todos, llega a más personas y resiste mejor el paso del tiempo. Los fundamentos prácticos y cómo integrarlos al trabajo diario.",
  imageAlt: "Un panel de auditoría de accesibilidad web con verificaciones de contraste, estados de foco del teclado y una puntuación general de accesibilidad",
  takeaways: [
    "La accesibilidad beneficia directamente a un gran número de personas y hace que los sitios web sean más fáciles de usar para todos.",
    "Un contraste legible, la navegación con teclado, textos alternativos significativos y formularios claros resuelven buena parte de los problemas más comunes.",
    "Las verificaciones automáticas son un buen punto de partida, pero las pruebas con personas reales detectan lo que las herramientas pasan por alto.",
    "Integra la accesibilidad en las rutinas de diseño, desarrollo y contenido, en lugar de corregirla al final.",
  ],
  body: [
    {
      type: "p",
      text: "Piensa en la última vez que un sitio web te frustró. Quizá el texto era demasiado tenue para leerlo en tu teléfono bajo el sol, un botón era demasiado pequeño para tocarlo o un formulario borró todo lo que habías escrito por un solo error. Ahora imagina enfrentarte a esos obstáculos todos los días, en casi todos los sitios, por la forma en que ves, oyes, te mueves o procesas la información.",
    },
    {
      type: "p",
      text: "Esa es la realidad cotidiana de muchas personas con discapacidad, y por eso la accesibilidad web importa. A menudo se trata como un requisito de cumplimiento que se marca al final de un proyecto. En la práctica, es simplemente buen diseño: los hábitos que hacen que un sitio web sea utilizable para personas con discapacidad también lo vuelven más claro, rápido y agradable para todos los demás.",
    },
    { type: "h2", text: "Por qué importa para tu negocio" },
    {
      type: "p",
      text: "La primera razón son las personas. Una parte significativa de cualquier audiencia vive con una discapacidad visual, auditiva, motriz o cognitiva, y muchas más experimentan limitaciones temporales o situacionales: un brazo fracturado, una vista que envejece, un tren ruidoso, una conexión lenta. Un sitio que deja fuera a estos visitantes pierde clientes que, de otro modo, habrían comprado, reservado o enviado una solicitud.",
    },
    {
      type: "p",
      text: "También hay beneficios prácticos. En muchos países, las leyes y las reglas de contratación pública esperan cada vez más que los servicios digitales cumplan con estándares de accesibilidad reconocidos, y las expectativas avanzan en una sola dirección. Las páginas accesibles también suelen posicionarse mejor en los buscadores, porque los encabezados claros, los enlaces descriptivos y las alternativas de texto ayudan a los motores de búsqueda a entender el contenido, de la misma forma en que ayudan a las tecnologías de asistencia.",
    },
    {
      type: "quote",
      text: "La accesibilidad no es una función para unos cuantos usuarios. Es un estándar de calidad para todos ellos.",
    },
    { type: "h2", text: "Empieza por lo que la gente ve" },
    {
      type: "p",
      text: "El bajo contraste es uno de los problemas más comunes en la web. Un texto gris claro sobre fondo blanco puede verse elegante en un archivo de diseño, pero resulta ilegible para muchos visitantes, sobre todo en pantallas móviles al aire libre. Las pautas reconocidas definen relaciones de contraste mínimas entre el texto y el fondo, y existen verificadores sencillos que las comprueban en segundos.",
    },
    {
      type: "p",
      text: "Además, el color nunca debe ser la única forma de transmitir un significado. Si un formulario marca los errores solo en rojo, o una gráfica depende únicamente del color para distinguir sus líneas, las personas con deficiencias en la visión del color no captarán el mensaje. Agrega una etiqueta, un ícono o un patrón, y asegúrate de que el texto pueda ampliarse sin que el diseño se rompa.",
    },
    { type: "h2", text: "Haz que todo funcione sin mouse" },
    {
      type: "p",
      text: "Muchas personas navegan con un teclado, un dispositivo de conmutación o comandos de voz en lugar de un mouse o una pantalla táctil. Para ellas, cada enlace, botón, menú y campo de formulario debe ser accesible y utilizable solo con el teclado, en un orden lógico. Una prueba sencilla revela mucho: deja el mouse a un lado e intenta completar una tarea clave en tu sitio usando únicamente las teclas Tab, Enter y las flechas.",
    },
    {
      type: "p",
      text: "Mientras lo haces, observa el indicador de foco, el contorno que muestra en qué parte de la página te encuentras. A veces los diseñadores lo eliminan porque se ve desordenado, lo que deja completamente perdidos a quienes usan el teclado. Un estado de foco claro y con buen estilo es una de las mejoras más económicas y valiosas que puedes hacer.",
    },
    { type: "h2", text: "Contenido y formularios que se explican solos" },
    {
      type: "p",
      text: "Los lectores de pantalla convierten una página en voz, lo que significa que todo lo importante necesita un equivalente en texto y una estructura clara. Unos cuantos hábitos de contenido marcan una gran diferencia:",
    },
    {
      type: "list",
      items: [
        "Texto alternativo: describe lo que una imagen comunica en su contexto y deja vacío el texto alternativo de las imágenes decorativas para que se omitan.",
        "Encabezados: usa niveles de encabezado reales en un orden lógico, para que las personas puedan recorrer la página y saltar entre secciones.",
        "Texto de los enlaces: escribe enlaces que tengan sentido por sí solos, como “descarga la lista de precios” en lugar de “haz clic aquí”.",
        "Etiquetas de formulario: dale a cada campo una etiqueta visible que permanezca en su lugar, no solo un texto de ejemplo que desaparece.",
        "Mensajes de error: explica qué salió mal y cómo corregirlo, junto al campo, sin borrar el resto del formulario.",
      ],
    },
    {
      type: "p",
      text: "El lenguaje sencillo también entra aquí. Las oraciones cortas, las palabras conocidas y las instrucciones claras ayudan por igual a personas con discapacidades cognitivas, a hablantes no nativos y a visitantes con prisa.",
    },
    { type: "h2", text: "Prueba con herramientas y luego con personas" },
    {
      type: "p",
      text: "Los verificadores automáticos de accesibilidad son un buen primer paso. Detectan rápidamente textos alternativos faltantes, bajo contraste, campos sin etiqueta y estructuras de encabezados incorrectas. Pero solo pueden identificar una parte de los problemas reales. Una herramienta puede confirmar que una imagen tiene texto alternativo; no puede saber si ese texto realmente es útil.",
    },
    {
      type: "p",
      text: "Los aprendizajes más confiables surgen de observar a personas reales, incluidas personas que usan tecnologías de asistencia, mientras intentan completar tareas reales. Incluso unas pocas sesiones suelen revelar problemas que nadie en el equipo había notado. Combina esto con revisiones manuales usando un teclado y un lector de pantalla, y tendrás una imagen mucho más honesta de la que puede darte cualquier puntuación.",
    },
    {
      type: "callout",
      title: "Una revisión de diez minutos",
      text: "Elige tu página más importante. Recórrela solo con el teclado, amplía el navegador al 200 por ciento y haz una verificación de contraste en el texto principal y los botones. Anota cada punto en el que te atores; esa lista será tu primera ronda de correcciones.",
    },
    { type: "h2", text: "Intégrala al proceso" },
    {
      type: "p",
      text: "Es mucho más barato incorporar la accesibilidad desde el principio que añadirla después. Adaptar un sitio existente suele implicar rediseñar componentes y reescribir contenido, mientras que hacerlo bien desde el inicio cuesta muy poco más. La clave es que forme parte de la rutina de todos: los diseñadores revisan el contraste y los estados de foco, los desarrolladores usan una estructura adecuada y prueban con el teclado, y los editores de contenido escriben textos alternativos y encabezados claros al publicar.",
    },
    {
      type: "p",
      text: "Agrega verificaciones de accesibilidad a tu definición de “terminado”, inclúyelas al revisar nuevas funciones y vuelve a revisar las páginas clave con regularidad. Con el tiempo, deja de ser un proyecto aparte y se convierte en parte de lo que significa calidad. El resultado es un sitio web que da la bienvenida a más personas, funciona mejor para todas ellas y habla bien de la organización que está detrás.",
    },
  ],
};

export default es;
