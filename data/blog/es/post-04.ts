import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Automatización que la gente sí quiere: cómo diseñar flujos de trabajo que perduren",
  excerpt:
    "La mayoría de los proyectos de automatización fracasan por razones humanas, no técnicas. Cómo elegir los procesos adecuados, involucrar a las personas correctas y medir lo que importa.",
  imageAlt: "Un lienzo de automatización de flujos de trabajo que conecta un disparador de nuevo pedido con revisión de inventario, facturación, notificaciones a clientes y actualizaciones del CRM",
  takeaways: [
    "Automatiza un proceso solo después de entenderlo y simplificarlo.",
    "Elige tareas frecuentes, basadas en reglas y pesadas para quienes las realizan.",
    "Involucra desde el primer día a las personas que hacen el trabajo; ellas conocen las excepciones.",
    "Mide el tiempo ahorrado y los errores evitados, y prepárate para cuando algo falle.",
  ],
  body: [
    {
      type: "p",
      text: "Toda organización las tiene: la hoja de cálculo que se copia en otra hoja de cálculo cada lunes, el formulario que se vuelve a capturar en un segundo sistema, el correo de recordatorio que se envía a mano a la misma lista de personas. Por separado son tareas pequeñas, pero juntas consumen miles de horas al año y una cantidad sorprendente de buena voluntad. La automatización promete hacerlas desaparecer.",
    },
    {
      type: "p",
      text: "Sin embargo, muchos proyectos de automatización fracasan en silencio. El nuevo flujo de trabajo falla con el primer caso inusual, nadie confía en sus resultados o la gente sigue haciendo las cosas a la antigua “por si acaso”. La causa rara vez es la tecnología. Por lo general es un problema de diseño: se automatizó el proceso equivocado o se automatizó el proceso correcto de la manera equivocada.",
    },
    { type: "h2", text: "No automatices un desorden" },
    {
      type: "p",
      text: "Automatizar un proceso roto te da un proceso roto más rápido. Antes de construir cualquier cosa, traza cómo se hace realmente el trabajo hoy, no cómo dice el manual que se hace. Siéntate con las personas que lo realizan. Anota cada paso, cada traspaso y cada solución improvisada. Casi siempre encontrarás pasos que existen solo por costumbre y que simplemente se pueden eliminar.",
    },
    {
      type: "quote",
      text: "La primera pregunta no es “¿cómo automatizamos esto?”, sino “¿este paso debería existir?”",
    },
    { type: "h2", text: "Elige a los candidatos correctos" },
    {
      type: "p",
      text: "No toda tarea merece automatizarse. Los mejores candidatos comparten algunas características, y revisar un proceso con base en ellas ahorra mucho esfuerzo desperdiciado:",
    },
    {
      type: "list",
      items: [
        "Frecuencia: ocurre lo bastante seguido como para que el tiempo ahorrado se acumule.",
        "Reglas: las decisiones siguen una lógica clara y no dependen del criterio personal.",
        "Entradas estables: los datos llegan en un formato predecible.",
        "Molestia: a quienes la realizan les resulta tediosa, propensa a errores o estresante.",
        "Medibilidad: puedes saber si la versión automatizada está funcionando.",
      ],
    },
    {
      type: "p",
      text: "Las tareas que cumplen bien los cinco puntos son donde están los logros rápidos. Las tareas que dependen mucho del criterio también pueden beneficiarse, pero normalmente a través de asistencia, como preparar información o sugerir una decisión, más que de una automatización total.",
    },
    { type: "h2", text: "Diseña pensando en las excepciones" },
    {
      type: "p",
      text: "El camino ideal, en el que todo llega correctamente y no pasa nada inusual, es la parte fácil. El trabajo real está lleno de excepciones: un campo vacío, un registro duplicado, un cliente que responde de forma inesperada. Un buen flujo de trabajo automatizado sabe lo que no puede resolver y envía esos casos a una persona con el contexto suficiente para resolverlos rápido.",
    },
    {
      type: "p",
      text: "Aquí también son invaluables las personas que hoy hacen el trabajo. Saben qué excepciones ocurren cada semana y cuáles una vez al año. Involucrarlas desde el principio produce un mejor diseño y convierte a posibles escépticos en dueños del nuevo sistema.",
    },
    { type: "h2", text: "Mantén a las personas al tanto, de forma visible" },
    {
      type: "p",
      text: "Una automatización que trabaja en silencio puede generar inquietud. La gente se pregunta qué está haciendo y si ha cometido errores. Un poco de visibilidad resuelve buena parte de esto: un resumen diario de lo que se procesó, una lista clara de los elementos pendientes de revisión y una forma sencilla de pausar o anular el sistema.",
    },
    {
      type: "callout",
      title: "Empieza en pequeño",
      text: "Automatiza de principio a fin una parte de un proceso, ejecútala en paralelo con la versión manual durante un periodo corto, compara los resultados y luego amplía. Los logros pequeños y comprobados generan la confianza que necesitan los proyectos más grandes.",
    },
    { type: "h2", text: "Mide lo que importa" },
    {
      type: "p",
      text: "Decide antes de construir cómo vas a juzgar el éxito. Las horas ahorradas por semana son la medida obvia, pero rara vez la única. Menos errores, tiempos de respuesta más rápidos, menos pagos atrasados y menos trabajo en fin de semana suelen ser más valiosos. Mide primero el punto de partida, para que la mejora sea visible y no solo una suposición.",
    },
    {
      type: "p",
      text: "Planea también el mantenimiento. Los sistemas cambian, los formularios incorporan campos nuevos y los proveedores actualizan sus servicios. Toda automatización necesita un responsable que note cuando falla y tenga tiempo para arreglarla. Una automatización sin responsable tiende a fallar en silencio, lo cual es peor que no haberla construido nunca.",
    },
    { type: "h2", text: "Cómo elegir herramientas sin dejarse llevar por la moda" },
    {
      type: "p",
      text: "El mercado de herramientas de automatización está saturado y muchos productos prometen automatizarlo todo con unos cuantos clics. La elección correcta depende menos de las funciones y más del ajuste. ¿La herramienta se conecta con los sistemas que ya usas? ¿Las personas que mantendrán el flujo de trabajo pueden entenderlo sin llamar a un especialista cada vez? ¿Qué pasa con tus flujos de trabajo si dejas de pagarla?",
    },
    {
      type: "p",
      text: "Para procesos sencillos y lineales, los constructores visuales de flujos de trabajo suelen ser suficientes y permiten que los equipos no técnicos hagan cambios por su cuenta. Para procesos que manejan datos sensibles, implican lógica compleja o funcionan con grandes volúmenes, la automatización a la medida suele ser más confiable y más económica a largo plazo. Muchas organizaciones terminan con una combinación: herramientas ligeras para logros rápidos y soluciones desarrolladas a la medida para los procesos de los que depende el negocio.",
    },
    {
      type: "p",
      text: "Sea cual sea el camino que elijas, documenta cada flujo de trabajo en lenguaje sencillo: qué lo activa, qué hace, quién es responsable y qué hacer cuando falla. Esa documentación es lo que mantiene útil una automatización cuando la persona que la construyó ya no está.",
    },
    { type: "h2", text: "El verdadero objetivo" },
    {
      type: "p",
      text: "El propósito de la automatización no es sacar a las personas del trabajo. Es eliminar las partes del trabajo que desperdician su tiempo y su atención. Cuando un equipo deja de copiar datos entre sistemas, tiene más tiempo para los clientes, para mejorar y para los problemas que de verdad requieren pensamiento humano.",
    },
    {
      type: "p",
      text: "Diseñada con cuidado, la automatización se convierte en algo que la gente pide, no en algo que se le impone. Esa es la señal más clara de que un flujo de trabajo va a perdurar.",
    },
  ],
};

export default es;
