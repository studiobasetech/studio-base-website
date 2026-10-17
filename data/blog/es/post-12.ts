import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "¿Reglas, bots o IA? Cómo elegir el tipo de automatización adecuado",
  excerpt:
    "Los flujos basados en reglas, los robots de software y la automatización con IA resuelven problemas distintos. Cómo funciona cada uno, dónde encaja, cuánto cuesta y cómo combinarlos.",
  imageAlt: "Un panel comparativo de tres enfoques de automatización (reglas, bots e IA) con puntuaciones de idoneidad y una ruta de decisión",
  takeaways: [
    "Los flujos basados en reglas son la opción más confiable cuando la lógica es clara y los sistemas pueden conectarse directamente.",
    "Los robots de software conectan sistemas que no tienen integración, pero son frágiles y requieren mantenimiento constante.",
    "La IA maneja información no estructurada y tareas que requieren criterio, a costa de la previsibilidad, así que incorpora revisiones.",
    "La mayoría de las buenas soluciones combinan los tres, usando el enfoque más simple que funcione para cada paso.",
  ],
  body: [
    {
      type: "p",
      text: "“Vamos a automatizarlo” se ha convertido en una de las frases más comunes en las juntas de trabajo. Pero la automatización no es una sola cosa. Detrás de esa palabra hay enfoques muy distintos, cada uno con sus propias fortalezas, costos y formas de fallar. Elegir el equivocado es una razón común por la que los proyectos se salen del presupuesto o dejan de funcionar discretamente unos meses después del lanzamiento.",
    },
    {
      type: "p",
      text: "En términos generales, hay tres familias. Los flujos basados en reglas siguen instrucciones explícitas y conectan sistemas directamente. Los robots de software imitan a una persona haciendo clic en las pantallas. La automatización con IA interpreta información desordenada y toma decisiones que requieren algo parecido al criterio. Entender la diferencia te ayuda a hacer mejores preguntas y a invertir tu presupuesto donde realmente dará resultados.",
    },
    { type: "h2", text: "Flujos basados en reglas: predecibles y precisos" },
    {
      type: "p",
      text: "La forma más simple de automatización es un conjunto de reglas: cuando pase esto, haz aquello. Cuando llegue un pedido nuevo, crea una factura. Cuando se envíe un formulario, agrega el contacto a una lista y avisa al equipo de ventas. Estos flujos normalmente conectan sistemas a través de sus interfaces oficiales, intercambiando datos directamente en lugar de hacerlo a través de las pantallas.",
    },
    {
      type: "p",
      text: "Su gran fortaleza es la previsibilidad. Ante la misma entrada, un flujo basado en reglas hace exactamente lo mismo cada vez, y cuando algo sale mal es fácil ver qué regla lo causó. Además, son económicos de operar. Su limitación es que solo manejan situaciones que alguien anticipó. Una regla no puede leer un correo molesto y decidir que necesita la atención de un gerente, ni puede lidiar con datos que llegan en un formato inesperado.",
    },
    { type: "h2", text: "Robots de software: cerrando las brechas" },
    {
      type: "p",
      text: "Muchas organizaciones todavía dependen de sistemas antiguos que no tienen una forma moderna de intercambiar datos. Los robots de software llenan ese vacío. Se programan para hacer lo que haría una persona: iniciar sesión, abrir una pantalla, copiar un valor, pegarlo en otro lugar, hacer clic en guardar. Para el sistema antiguo, el robot parece un empleado muy rápido y muy paciente.",
    },
    {
      type: "p",
      text: "Esto puede generar resultados rápidos sin reemplazar los sistemas principales. La debilidad es la fragilidad. Los robots dependen de que las pantallas se vean exactamente como se espera, así que un botón que cambia de lugar, un campo con otro nombre o una nueva ventana emergente pueden detenerlos. Cada cambio en el software de fondo es una posible falla, lo que significa que los robots necesitan monitoreo y mantenimiento regular. Es mejor verlos como un puente, a menudo temporal, y no como una base.",
    },
    {
      type: "quote",
      text: "Usa el tipo de automatización más simple que haga el trabajo de forma confiable. La sofisticación es un costo, no un objetivo.",
    },
    { type: "h2", text: "Automatización con IA: manejar la zona gris" },
    {
      type: "p",
      text: "Una gran parte del trabajo en las empresas implica información que las reglas no pueden manejar: correos en texto libre, documentos escaneados, tickets de soporte, mensajes de voz. Los modelos de IA pueden leer este tipo de material, clasificarlo, extraer los datos clave y redactar respuestas. Pueden ordenar las solicitudes entrantes por urgencia, resumir una conversación larga o decidir a qué departamento corresponde un mensaje.",
    },
    {
      type: "p",
      text: "El precio a pagar es la previsibilidad. Los sistemas de IA funcionan con probabilidades, así que pueden equivocarse con total seguridad, y la misma entrada no siempre produce exactamente la misma salida. Además, operarlos suele costar más por tarea que las reglas simples. Eso no hace que la IA sea inadecuada para el trabajo importante, pero sí implica diseñar pensando en la revisión: umbrales de confianza, aprobación humana para las acciones con consecuencias importantes y controles de calidad periódicos.",
    },
    { type: "h2", text: "Cómo elegir el enfoque según la tarea" },
    {
      type: "p",
      text: "Unas cuantas preguntas sobre cualquier proceso suelen señalar el enfoque correcto, o la combinación correcta:",
    },
    {
      type: "list",
      items: [
        "Estructura: si la información de entrada es estructurada y predecible, las reglas suelen ser suficientes.",
        "Conectividad: si los sistemas pueden intercambiar datos directamente, conéctalos en lugar de automatizar las pantallas.",
        "Sistemas heredados: si un sistema clave no tiene interfaz y no puede reemplazarse pronto, un robot de software puede ser un puente práctico.",
        "Criterio: si la tarea implica leer, interpretar o clasificar contenido no estructurado, probablemente se necesite IA.",
        "Consecuencias: cuanto más costoso sería un error, más revisión y previsibilidad deberías incorporar.",
      ],
    },
    {
      type: "p",
      text: "Los costos siguen un patrón similar. Las reglas son baratas de operar y moderadamente baratas de construir. Los robots suelen construirse rápido, pero su mantenimiento es caro. Con IA se puede crear un prototipo rápidamente, pero alcanzar una calidad confiable con datos del mundo real requiere pruebas, monitoreo y ajustes continuos. Considera el costo total durante toda su vida útil, no solo el desarrollo inicial.",
    },
    { type: "h2", text: "Cómo combinarlos bien" },
    {
      type: "p",
      text: "En la práctica, las soluciones más efectivas mezclan enfoques, y cada paso se resuelve con el método más simple que funcione. Piensa en el correo de un cliente que solicita un reembolso. La IA lee el mensaje, identifica el número de pedido y clasifica la solicitud. Después, las reglas verifican el pedido contra la política de reembolsos y, si todo coincide, procesan el reembolso a través del sistema de pagos. Si el pedido está en un sistema antiguo sin interfaz, un robot obtiene los datos. Cualquier cosa inusual pasa a una persona.",
    },
    {
      type: "callout",
      title: "Mantén la IA en los extremos",
      text: "Un patrón útil es dejar que la IA convierta la información desordenada en datos estructurados y que luego las reglas tomen las decisiones reales. Así ganas flexibilidad donde la necesitas y mantienes una lógica predecible y auditable donde más importa.",
    },
    {
      type: "p",
      text: "Este diseño por capas también facilita diagnosticar los problemas. Cuando algo sale mal, puedes ver si la IA interpretó mal la entrada, si faltaba una regla o si un robot falló por un cambio en una pantalla, y corregir esa pieza sin reconstruir todo el flujo.",
    },
    { type: "h2", text: "Cómo elegir sin dejarse llevar por la moda" },
    {
      type: "p",
      text: "Es tentador recurrir a la IA para todo, porque es la opción más impresionante. Resiste esa tentación. Empieza por mapear el proceso y preguntarte qué pasos son realmente reglas, cuáles dependen de sistemas antiguos y cuáles necesitan de verdad interpretación. A menudo la respuesta es que la mayor parte del proceso puede resolverse con reglas sencillas, y que la IA solo hace falta en uno o dos pasos difíciles.",
    },
    {
      type: "p",
      text: "Elijas lo que elijas, asigna un responsable a cada automatización, documenta en lenguaje sencillo lo que hace y mide si cumple lo prometido. El tipo de automatización adecuado no es el más avanzado. Es aquel en el que tu equipo puede confiar, que puede mantener y mejorar durante muchos años.",
    },
  ],
};

export default es;
