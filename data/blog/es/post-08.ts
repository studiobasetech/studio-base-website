import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Datos pequeños, grandes decisiones: cómo hacer que la analítica funcione para empresas en crecimiento",
  excerpt:
    "No necesitas un equipo de ciencia de datos para tomar mejores decisiones con datos. Cómo elegir los pocos números que importan, generar confianza en ellos y convertir los dashboards en acción.",
  imageAlt: "Un dashboard de analítica con tarjetas de KPI, una tendencia de crecimiento al alza y una gráfica de barras por canal",
  takeaways: [
    "Empieza por las decisiones, no por los datos: pregúntate qué necesitas saber para actuar de otra manera.",
    "Da seguimiento a un puñado de métricas que se conecten directamente con tus objetivos.",
    "La calidad de los datos y las definiciones compartidas importan más que las herramientas sofisticadas.",
    "Un dashboard solo es útil si alguien lo revisa con regularidad y actúa en consecuencia.",
  ],
  body: [
    {
      type: "p",
      text: "Las grandes empresas hablan de big data: petabytes de información, equipos de analistas y complejos modelos de machine learning. Para la mayoría de las empresas en crecimiento, la realidad es muy distinta. Los datos están repartidos en unas cuantas herramientas, nadie está del todo seguro de cuál hoja de cálculo es la vigente y el reporte mensual tarda dos días en armarse. Aun así, el potencial es igual de real. Unos cuantos números confiables, revisados con regularidad, pueden transformar la calidad de las decisiones.",
    },
    { type: "h2", text: "Empieza por las decisiones, no por los datos" },
    {
      type: "p",
      text: "El error más común en analítica es empezar recopilándolo todo con la esperanza de que surjan ideas valiosas. Rara vez sucede. Un mejor punto de partida es una lista de las decisiones que el negocio toma con regularidad. ¿Qué canales de marketing merecen más presupuesto? ¿Qué productos deberíamos promover? ¿Cuándo necesitamos contratar? ¿Qué clientes están en riesgo de irse?",
    },
    {
      type: "p",
      text: "Para cada decisión, pregúntate qué información te ayudaría a tomarla mejor. Esa pregunta reduce de forma natural los datos que necesitas y le da a cada métrica un propósito claro. Un número que no informa ninguna decisión es solo un dato curioso, por interesante que se vea en una gráfica.",
    },
    {
      type: "quote",
      text: "El objetivo de la analítica no es saber más. Es actuar mejor.",
    },
    { type: "h2", text: "Elige unos cuantos números que importen" },
    {
      type: "p",
      text: "Un conjunto enfocado de métricas es mejor que un dashboard abrumador. Muchas empresas pueden operar bien con menos de diez indicadores clave, revisados semanal o mensualmente. El conjunto adecuado depende del negocio, pero por lo general abarca algunas áreas:",
    },
    {
      type: "list",
      items: [
        "Crecimiento: nuevos clientes, ingresos y de dónde proviene el nuevo negocio.",
        "Eficiencia: costo de adquirir un cliente, márgenes y tiempo dedicado a los procesos clave.",
        "Retención: cuántos clientes se quedan, regresan o vuelven a comprar.",
        "Salud: flujo de efectivo, facturas vencidas y capacidad.",
      ],
    },
    {
      type: "p",
      text: "Siempre que sea posible, combina los resultados con indicadores adelantados. Los ingresos te dicen lo que ya pasó; el número de conversaciones calificadas de este mes te dice lo que probablemente pasará después. Los indicadores adelantados te dan tiempo para reaccionar.",
    },
    { type: "h2", text: "La confianza lo es todo" },
    {
      type: "p",
      text: "Un dashboard en el que nadie confía es peor que no tener dashboard, porque genera discusiones en lugar de decisiones. La confianza proviene de dos cosas: la calidad de los datos y las definiciones compartidas. Calidad significa que los números están completos, actualizados y sin duplicados. Definiciones compartidas significa que todos están de acuerdo en lo que significa cada término. ¿Un “cliente activo” es alguien que compró este mes, este trimestre o este año? Distintos equipos suelen tener respuestas distintas.",
    },
    {
      type: "p",
      text: "Pon las definiciones por escrito, mantenlas junto al dashboard y asigna un responsable a cada métrica. Cuando los números se vean mal, el responsable investiga. Con el tiempo, esta sencilla disciplina construye una única versión de la verdad en la que todo el equipo confía.",
    },
    { type: "h2", text: "Automatiza la parte aburrida" },
    {
      type: "p",
      text: "Si armar un reporte toma días, se hará con menos frecuencia y con más errores. Conectar tus herramientas para que los datos fluyan automáticamente a un solo lugar, y de ahí a un dashboard que se actualice solo, libera tiempo para la parte valiosa: interpretar lo que significan los números y decidir qué hacer.",
    },
    {
      type: "callout",
      title: "Un ritual semanal",
      text: "Reserva treinta minutos cada semana para revisar las métricas clave con las personas que pueden actuar sobre ellas. Haz tres preguntas: ¿qué cambió?, ¿por qué? y ¿qué vamos a hacer al respecto?",
    },
    { type: "h2", text: "Trampas comunes que debes evitar" },
    {
      type: "p",
      text: "Incluso con buenas intenciones, los esfuerzos de analítica suelen caer en las mismas trampas. La primera son las métricas de vanidad: números que se ven impresionantes pero no se conectan con resultados, como el total de visitas a la página o los seguidores en redes sociales por sí solos. Lucen bien en una presentación, pero rara vez cambian una decisión.",
    },
    {
      type: "p",
      text: "La segunda es confundir correlación con causalidad. Las ventas pueden subir el mismo mes en que se lanzó una nueva campaña, pero la verdadera causa podría ser la temporada, un problema de un competidor o un cambio de precio. Siempre que sea posible, prueba los cambios de forma deliberada, por ejemplo intentando algo con un grupo de clientes y no con otro, antes de concluir qué funciona.",
    },
    {
      type: "p",
      text: "La tercera son los promedios que ocultan la historia. El valor promedio de un pedido puede mantenerse estable mientras un grupo valioso de clientes desaparece en silencio y es reemplazado por compradores más pequeños. Desglosar los números por tipo de cliente, canal o región suele revelar lo que la cifra principal oculta.",
    },
    {
      type: "p",
      text: "Por último, cuidado con el perfeccionismo. Esperar a tener datos perfectos antes de actuar significa nunca actuar. Unos números razonablemente precisos revisados cada semana valen mucho más que números impecables que llegan una vez al año.",
    },
    { type: "h2", text: "De los dashboards a la acción" },
    {
      type: "p",
      text: "Los datos solo generan valor cuando cambian el comportamiento. Las empresas que más se benefician de la analítica no son las que tienen las herramientas más sofisticadas, sino las que tienen el hábito de mirar unos cuantos números confiables y actuar sobre ellos de forma constante.",
    },
    {
      type: "p",
      text: "A medida que las herramientas de IA mejoran en analizar datos y responder preguntas en lenguaje sencillo, la barrera para obtener información valiosa seguirá bajando. Sin embargo, los fundamentos seguirán siendo los mismos: preguntas claras, datos confiables y la disciplina para actuar. Si los dominas con datos pequeños, las grandes decisiones se vuelven mucho más fáciles.",
    },
  ],
};

export default es;
