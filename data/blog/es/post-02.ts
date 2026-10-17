import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "El arte del prompt: guía práctica para trabajar con modelos de lenguaje",
  excerpt:
    "Obtener grandes resultados de la IA tiene menos que ver con palabras mágicas y más con pensar con claridad. Una guía de campo sobre contexto, ejemplos, restricciones e iteración.",
  imageAlt: "Un espacio de trabajo con un prompt estructurado a la izquierda y una respuesta de IA generándose a la derecha",
  takeaways: [
    "Trata al modelo como a un colega nuevo y capaz: dale contexto, no solo órdenes.",
    "Muestra con un ejemplo cómo se ve un buen resultado; funciona mejor que párrafos de descripción.",
    "Indica el formato, la extensión y el público que buscas, y lo que debe evitar.",
    "Itera: la primera respuesta es un borrador y tu retroalimentación es parte del proceso.",
  ],
  body: [
    {
      type: "p",
      text: "Pide a dos personas que obtengan el mismo resultado del mismo modelo de IA y muchas veces verás resultados muy distintos. Una obtiene un párrafo vago y genérico. La otra obtiene algo preciso, bien estructurado y útil de inmediato. El modelo no cambió. Lo que cambió fue la petición. Escribir buenos prompts es una habilidad y, como cualquier habilidad, se puede aprender.",
    },
    {
      type: "p",
      text: "La buena noticia es que tiene poco que ver con frases secretas o trucos ingeniosos. Los hábitos que producen grandes prompts son los mismos que producen grandes briefs para colegas humanos: claridad sobre el objetivo, suficiente contexto para tomar buenas decisiones y una idea compartida de cómo debe verse el trabajo terminado.",
    },
    { type: "h2", text: "Empieza con contexto, no con órdenes" },
    {
      type: "p",
      text: "Los modelos de lenguaje saben muchísimo sobre el mundo, pero nada sobre tu situación a menos que se lo cuentes. “Escribe un anuncio de producto” obliga al modelo a adivinar el producto, el público, el tono y la extensión. “Escribe un anuncio breve para clientes actuales de una app de contabilidad, explicando que ahora las facturas se pueden exportar a formato de hoja de cálculo; el tono es cercano y sencillo, de unas 120 palabras” deja mucho menos al azar.",
    },
    {
      type: "p",
      text: "Un modelo mental útil es el de la nueva contratación capaz. Es inteligente y rápida, pero es su primer día. ¿Qué tendrías que decirle para que la tarea salga bien? ¿Quién es el público, por qué importa la tarea, qué se ha intentado ya y qué restricciones existen? La mayor parte de esa información se escribe en pocas frases y ahorra varias rondas de correcciones.",
    },
    {
      type: "quote",
      text: "La calidad de la respuesta rara vez supera la claridad de la pregunta.",
    },
    { type: "h2", text: "Muestra, no solo describas" },
    {
      type: "p",
      text: "Describir un estilo con palabras es sorprendentemente difícil. Mostrar un ejemplo es fácil. Si quieres resúmenes con un formato concreto, pega uno que te guste y pide la misma estructura. Si buscas una voz determinada, incluye una muestra breve de un texto escrito con esa voz. Los modelos son excelentes para captar patrones a partir de ejemplos, muchas veces mejor que para interpretar instrucciones abstractas como “hazlo más impactante”.",
    },
    {
      type: "p",
      text: "Una advertencia: los modelos pueden copiar los ejemplos de forma demasiado literal. Si todos los ejemplos que das tratan del mismo tema, el resultado puede desviarse hacia ese tema. Dos o tres ejemplos variados suelen enseñar el patrón sin fijar el contenido.",
    },
    { type: "h2", text: "Sé explícito sobre la forma de la respuesta" },
    {
      type: "p",
      text: "Muchos resultados decepcionantes en realidad son problemas de formato. El contenido está bien, pero llega como un bloque de texto cuando necesitabas una tabla, o como diez viñetas cuando necesitabas dos frases. Di lo que quieres:",
    },
    {
      type: "list",
      items: [
        "Formato: una tabla, una lista numerada, un correo, un párrafo breve, un esquema estructurado.",
        "Extensión: un número de palabras o de elementos, en lugar de “breve” o “detallado”.",
        "Público: directivos, equipos técnicos, clientes o principiantes necesitan distintos niveles de detalle.",
        "Límites: temas que evitar, afirmaciones que no hacer y qué hacer cuando falta información.",
      ],
    },
    {
      type: "p",
      text: "El último punto merece atención. Decirle a un modelo “si no estás seguro, dilo en lugar de adivinar” es una de las formas más sencillas de reducir respuestas seguras pero equivocadas.",
    },
    { type: "h2", text: "Divide las tareas grandes en pasos" },
    {
      type: "p",
      text: "Las peticiones complejas funcionan mejor como una secuencia. En lugar de pedir un reporte de mercado terminado de una sola vez, pide primero un esquema, revísalo y luego pide cada sección. En lugar de pedir una decisión final, pide al modelo que enumere las opciones, luego los pros y contras de cada una y después una recomendación. Cada paso te da la oportunidad de corregir el rumbo antes de que los errores se acumulen.",
    },
    {
      type: "p",
      text: "Pedirle al modelo que razone antes de responder también ayuda en tareas analíticas. Una petición como “primero enumera los datos del documento que sean relevantes y después responde la pregunta” lo anima a basar su respuesta en el material y no en suposiciones generales.",
    },
    {
      type: "callout",
      title: "Pruébalo",
      text: "Antes de enviar un prompt largo, pregúntate: si una persona recibiera este mensaje, ¿sabría exactamente qué entregar? Si no, el modelo tampoco.",
    },
    { type: "h2", text: "Itera como un editor" },
    {
      type: "p",
      text: "La primera respuesta es un borrador. Trátala como un editor trata una primera versión: señala lo que funciona, nombra lo que no y pide una revisión. Una retroalimentación concreta, como “el segundo párrafo repite el primero; elimínalo y agrega un ejemplo concreto”, produce revisiones mucho mejores que “mejóralo”.",
    },
    {
      type: "p",
      text: "Con el tiempo notarás que ciertas instrucciones se repiten. Guárdalas. Una pequeña biblioteca personal de prompts para tareas recurrentes, como resúmenes de reuniones, respuestas a correos o revisiones de documentos, convierte los experimentos individuales en una práctica confiable para todo el equipo.",
    },
    { type: "h2", text: "Conoce los límites" },
    {
      type: "p",
      text: "Un buen prompt mejora los resultados, pero no cambia lo que un modelo es en esencia. Los modelos pueden producir afirmaciones creíbles que no son ciertas, sobre todo acerca de acontecimientos recientes, datos muy específicos o cifras. No conocen automáticamente tus datos internos a menos que se los proporciones. Los resultados importantes, como cifras, textos legales o cualquier cosa que se publique con tu nombre, siguen mereciendo una revisión humana.",
    },
    {
      type: "p",
      text: "Escribir prompts se entiende mejor como una forma de comunicación. Cuanto más claro seas sobre lo que quieres y por qué, más útil se vuelve el modelo. Es una buena noticia, porque comunicar con claridad es una habilidad que rinde frutos mucho más allá de la IA.",
    },
  ],
};

export default es;
