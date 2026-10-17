import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Primero, datos limpios: por qué la calidad de los datos importa más que los dashboards",
  excerpt:
    "Un dashboard atractivo construido sobre datos desordenados te da respuestas equivocadas con total seguridad. Cómo enfrentar duplicados, vacíos y definiciones contradictorias, y por qué importa aún más en la era de la IA.",
  imageAlt: "Un monitor de calidad de datos que muestra registros duplicados, faltantes e inválidos en proceso de limpieza, con un índice de salud en aumento",
  takeaways: [
    "Los reportes y las herramientas de IA son tan confiables como los datos que los alimentan.",
    "Acuerden definiciones compartidas para los términos clave antes de discutir sobre las cifras.",
    "Asigna a cada conjunto de datos importante un responsable con nombre propio que vele por su calidad.",
    "Evita los datos incorrectos desde el momento en que se capturan; limpiarlos después es más lento y nunca queda completo.",
  ],
  body: [
    {
      type: "p",
      text: "Cuando una organización decide tomar decisiones más basadas en datos, el primer paso suele ser un nuevo dashboard. Se diseñan gráficas, se conectan cifras y se organiza una reunión de lanzamiento. Unas semanas después, empiezan las preguntas. ¿Por qué el reporte de ventas muestra un total distinto al del reporte de finanzas? ¿Por qué hay tres registros para el mismo cliente? ¿Por qué el campo de región está vacío en un tercio de los pedidos?",
    },
    {
      type: "p",
      text: "Estas preguntas apuntan a un problema que ninguna visualización puede resolver. Si los datos de origen están incompletos, duplicados o son inconsistentes, un dashboard no revela la verdad; solo presenta los errores de forma más atractiva. Antes de invertir en mejores reportes, vale la pena invertir en la calidad de los datos que los alimentan.",
    },
    { type: "h2", text: "Cómo se ven los datos de mala calidad" },
    {
      type: "p",
      text: "Los problemas de calidad de datos rara vez se anuncian. Se acumulan en silencio a medida que las personas capturan información con prisa, los sistemas se conectan a lo largo de los años y los procesos cambian sin que nadie actualice los registros. La mayoría de los problemas entran en unas cuantas categorías conocidas:",
    },
    {
      type: "list",
      items: [
        "Duplicados: el mismo cliente, producto o proveedor aparece varias veces con ligeras diferencias en la escritura.",
        "Campos faltantes: información clave como el correo electrónico, la región o la fecha del contrato simplemente está en blanco.",
        "Valores inválidos: fechas en el futuro, cantidades negativas o números de teléfono en el campo del correo electrónico.",
        "Formatos inconsistentes: el mismo país escrito de cuatro maneras distintas, o precios con y sin impuestos.",
        "Registros desactualizados: direcciones, contactos y estatus que alguna vez fueron correctos, pero ya no lo son.",
      ],
    },
    {
      type: "p",
      text: "Cada problema parece menor por sí solo. En conjunto, provocan que los correos de marketing reboten, que las facturas lleguen a la dirección equivocada, que los niveles de inventario sean incorrectos y que nadie confíe del todo en los reportes.",
    },
    { type: "h2", text: "Pónganse de acuerdo en lo que significan las palabras" },
    {
      type: "p",
      text: "Algunos de los problemas de datos más dañinos no son errores, sino desacuerdos. Pregunta a tres áreas qué cuenta como un “cliente activo” y es posible que obtengas tres respuestas distintas: alguien que compró en el último año, alguien con un contrato vigente o cualquiera que no haya cancelado formalmente. Cada definición es razonable. Usadas lado a lado y sin explicación, producen cifras que nunca coinciden.",
    },
    {
      type: "p",
      text: "La solución es un glosario compartido de los términos que más importan: cliente, pedido, ingresos, tasa de abandono, prospecto y cualquier otro que sea central para tu negocio. Para cada término, anota una definición en lenguaje sencillo, cómo se calcula y qué sistema contiene la versión oficial. Es un trabajo poco vistoso, pero pone fin a una cantidad sorprendente de reuniones dedicadas a discutir qué hoja de cálculo tiene la razón.",
    },
    {
      type: "quote",
      text: "La mayoría de las discusiones sobre cifras son, en realidad, discusiones sobre definiciones.",
    },
    { type: "h2", text: "Asigna un responsable a los datos" },
    {
      type: "p",
      text: "Cuando todos son responsables de la calidad de los datos, nadie lo es. Cada conjunto de datos importante, como los registros de clientes, la información de productos o los datos de proveedores, necesita un responsable con nombre propio. Esa persona no tiene que corregir cada error personalmente, pero sí define las reglas, vigila los problemas y tiene la autoridad para cambiar los procesos que generan datos incorrectos.",
    },
    {
      type: "p",
      text: "Los responsables funcionan mejor cuando están cerca del origen de los datos. Quien gestiona el proceso de ventas entiende los registros de clientes mucho mejor que un equipo central que solo los ve en reportes. Combina ese conocimiento del negocio con soporte técnico para los sistemas involucrados, y los problemas de calidad empezarán a resolverse desde su origen.",
    },
    { type: "h2", text: "Detén los datos incorrectos en la entrada" },
    {
      type: "p",
      text: "Limpiar los datos después es lento, costoso y nunca termina, porque todos los días llegan errores nuevos. Es mucho más eficaz evitarlos desde el momento de la captura. Los formularios pueden exigir los campos esenciales, ofrecer listas desplegables en lugar de texto libre, validar formatos mientras la persona escribe y avisar cuando un registro se parece a uno existente.",
    },
    {
      type: "p",
      text: "Lo mismo aplica cuando los datos fluyen entre sistemas. Cada conexión debería comparar los registros entrantes con reglas básicas y señalar todo lo que no las cumpla, en lugar de pasar los problemas en silencio al siguiente sistema. Pequeños pasos de validación, aplicados de forma constante, hacen más por la calidad de los datos que cualquier proyecto anual de limpieza.",
    },
    {
      type: "callout",
      title: "Una revisión mensual de salud",
      text: "Elige tu conjunto de datos más importante y mide cada mes unos cuantos indicadores sencillos: el porcentaje de duplicados, el porcentaje de registros sin campos clave y el número de valores inválidos. Sigue la tendencia a lo largo del tiempo y pide al responsable que explique cualquier cambio repentino.",
    },
    { type: "h2", text: "La base para la IA" },
    {
      type: "p",
      text: "La calidad de los datos se ha vuelto aún más importante a medida que las organizaciones adoptan la IA. Un modelo de lenguaje que responde preguntas a partir de tus documentos, un modelo de pronóstico que predice la demanda o un asistente que redacta respuestas a clientes dependen de la información que les proporcionas. Si los alimentas con datos duplicados, desactualizados o contradictorios, producirán respuestas fluidas y seguras que simplemente están equivocadas.",
    },
    {
      type: "p",
      text: "Peor aún, la IA puede hacer que los datos incorrectos sean más difíciles de detectar. Una hoja de cálculo desordenada se ve desordenada; un resumen pulido generado por IA, no. Por eso es indispensable limpiar y gobernar primero las fuentes. Las organizaciones que ya hicieron el trabajo de base en definiciones, responsables y validación descubren que sus proyectos de IA avanzan más rápido y entregan resultados en los que la gente realmente confía.",
    },
    { type: "h2", text: "Empieza en pequeño y sé constante" },
    {
      type: "p",
      text: "Mejorar la calidad de los datos no requiere un gran programa. Elige un conjunto de datos que cause problemas visibles, acuerden sus definiciones clave, nombra a un responsable, agrega validaciones en el punto de captura y depura el rezago de errores existentes. Mide la mejora, compártela y luego pasa al siguiente conjunto de datos.",
    },
    {
      type: "p",
      text: "Los dashboards y las herramientas de IA seguirán mejorando y siendo más fáciles de construir. Sin embargo, su valor siempre dependerá de lo que fluya hacia ellos. Los datos limpios no son la parte emocionante de volverse una organización basada en datos, pero sí la que hace que todo lo demás funcione.",
    },
  ],
};

export default es;
