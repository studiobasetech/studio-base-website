import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "IA responsable para empresas comunes: equidad, privacidad y confianza",
  excerpt:
    "No necesitas un laboratorio de investigación para usar la IA de forma responsable. Un marco práctico para manejar datos, detectar sesgos y mantener informadas a las personas.",
  imageAlt: "Un escudo de cristal con una palomita junto a un panel de gobernanza de IA con privacidad, equidad, transparencia y revisión humana activadas",
  takeaways: [
    "La IA responsable es un conjunto de hábitos cotidianos, no un proyecto aparte.",
    "Debes saber qué datos entran en cada herramienta, dónde se guardan y quién puede verlos.",
    "Prueba los resultados con casos variados y realistas para detectar resultados injustos o inconsistentes.",
    "Informa a las personas cuando interviene la IA y mantén a una persona responsable de las decisiones importantes.",
  ],
  body: [
    {
      type: "p",
      text: "Las conversaciones sobre IA responsable a menudo suenan como si pertenecieran a laboratorios de investigación y audiencias gubernamentales. Hablan de grandes modelos, regulación global y principios abstractos. Pero la mayoría de las empresas que usan IA hoy enfrentan preguntas mucho más concretas. ¿Puedo pegar el correo de este cliente en un chatbot? ¿Debería un algoritmo ayudar a decidir quién recibe un descuento? ¿Qué les digo a mis clientes cuando parte de su reporte la redactó una máquina?",
    },
    {
      type: "p",
      text: "Son preguntas cotidianas y merecen respuestas cotidianas. La IA responsable, a la escala de una empresa típica, no es un departamento aparte ni un extenso documento de políticas que nadie lee. Es un puñado de hábitos aplicados de forma constante a cómo se manejan los datos, cómo se revisan los resultados y cómo se informa a las personas.",
    },
    { type: "h2", text: "Empieza por tus datos" },
    {
      type: "p",
      text: "Toda herramienta de IA funciona con datos, y ahí empiezan las fallas más comunes de la IA responsable. El personal pega documentos confidenciales en herramientas públicas, los registros de clientes terminan en lugares a los que nunca debieron llegar, o nadie sabe qué sistema guarda qué. La solución empieza con un inventario sencillo: qué herramientas de IA se usan, qué tipo de información entra en cada una y qué hace el proveedor con esa información.",
    },
    {
      type: "list",
      items: [
        "Clasifica la información en niveles sencillos, como pública, interna y confidencial, y decide qué niveles puede recibir cada herramienta.",
        "Lee las condiciones de uso de datos de las herramientas que utilizas, sobre todo si tu información puede usarse para entrenar modelos futuros.",
        "Prefiere planes empresariales o configuraciones que mantengan tus datos privados y permitan eliminarlos.",
        "Elimina u oculta los datos personales cuando no sean necesarios para la tarea.",
      ],
    },
    {
      type: "p",
      text: "Las leyes de privacidad de muchas regiones ya establecen expectativas sobre cómo se recopilan, almacenan y comparten los datos personales. La IA no suspende esas reglas. Al contrario, las vuelve más importantes, porque ahora los datos pueden pasar a sistemas nuevos con un simple copiar y pegar.",
    },
    { type: "h2", text: "Revisa que no haya resultados injustos" },
    {
      type: "p",
      text: "Los sistemas de IA aprenden de patrones en los datos, y los datos reflejan el mundo tal como era, incluidos sus desequilibrios. Un modelo que filtra solicitudes de empleo, califica prospectos o marca transacciones puede tratar a algunos grupos de forma distinta que a otros sin que nadie lo note, aunque nadie lo haya querido así.",
    },
    {
      type: "p",
      text: "No necesitas estadística avanzada para detectar muchos de estos problemas. Prueba el sistema con ejemplos variados y realistas. Cambia un detalle a la vez, como un nombre, una edad, una colonia o un estilo de redacción, y observa si el resultado cambia cuando no debería. Revisa con regularidad una muestra de decisiones reales y presta especial atención a los casos que el sistema rechaza.",
    },
    {
      type: "quote",
      text: "Si te incomodaría explicarle una decisión a la persona a la que afecta, el sistema que la toma necesita una revisión más a fondo.",
    },
    { type: "h2", text: "Sé transparente con las personas" },
    {
      type: "p",
      text: "La confianza crece cuando la gente sabe lo que está pasando. Los clientes deben saber cuándo hablan con un asistente automatizado y cómo comunicarse con una persona. Deben saber cuándo la IA ayudó a producir un trabajo por el que están pagando y cómo se revisó. Los colaboradores deben saber qué herramientas están aprobadas y cuáles son las reglas.",
    },
    {
      type: "p",
      text: "La transparencia también te protege. Cuando algo sale mal, y tarde o temprano algo saldrá mal, una organización que ha sido abierta sobre su uso de la IA está en una posición mucho mejor que una a la que se descubre ocultándolo.",
    },
    { type: "h2", text: "Mantén a una persona responsable" },
    {
      type: "p",
      text: "La IA puede redactar, recomendar y predecir, pero la responsabilidad no se puede delegar a un software. En las decisiones que afectan de forma importante a las personas, como contratación, créditos, precios, salud o asuntos legales, una persona designada debe revisar el resultado y asumir la decisión final. Esa persona necesita el tiempo, la información y la autoridad suficientes para no estar de acuerdo con el sistema.",
    },
    {
      type: "p",
      text: "Una trampa común es la aprobación automática: en el papel existe un paso de revisión, pero quien revisa aprueba todo porque el sistema casi siempre acierta y la fila es larga. Mide con qué frecuencia los revisores realmente cambian los resultados. Si la respuesta es nunca, probablemente la revisión no está funcionando.",
    },
    {
      type: "callout",
      title: "Una política de una página",
      text: "Enumera las herramientas aprobadas, qué datos puede recibir cada una, qué decisiones siempre necesitan revisión humana y a quién acudir si hay dudas. Las políticas breves se leen; las largas se ignoran.",
    },
    { type: "h2", text: "Cómo trabajar con proveedores y socios" },
    {
      type: "p",
      text: "La mayoría de las empresas no construye su propia IA. Usa herramientas de proveedores, y esos proveedores pasan a formar parte de tu cadena de responsabilidad. Cuando adoptes una herramienta nueva, haz algunas preguntas directas: ¿dónde se guardan nuestros datos?, ¿quién dentro del proveedor puede acceder a ellos?, ¿cuánto tiempo se conservan? y ¿se pueden eliminar si lo solicitamos? Pregunta cómo prueba el proveedor su sistema para detectar errores y sesgos, y qué pasa cuando reportas un problema.",
    },
    {
      type: "p",
      text: "Los buenos proveedores responden estas preguntas con claridad y por escrito. Las respuestas vagas son una señal en sí mismas. También vale la pena comprobar si las condiciones del proveedor te permiten cumplir tus propias obligaciones con los clientes, por ejemplo si un cliente pregunta cómo se procesó su información.",
    },
    {
      type: "p",
      text: "Por último, lleva un registro sencillo de qué herramientas se usan, para qué y quién las aprobó. Cuando algo cambie, como un proveedor que actualiza sus condiciones o un regulador que publica nuevos lineamientos, ese registro te permite ver rápidamente qué se ve afectado en lugar de empezar desde cero.",
    },
    { type: "h2", text: "Conviértelo en un hábito, no en un proyecto" },
    {
      type: "p",
      text: "La IA responsable no es algo que se termina. Aparecen herramientas nuevas, las existentes cambian sus condiciones y los equipos encuentran nuevos usos cada mes. Revisa tu inventario y tu política con regularidad, invita al personal a expresar sus inquietudes sin miedo y trata los errores como información, no como motivo de vergüenza.",
    },
    {
      type: "p",
      text: "Bien aplicados, estos hábitos no frenan la innovación. Son lo que permite a una empresa adoptar la IA con confianza, porque clientes, colaboradores y socios pueden ver que la tecnología se usa con cuidado y en su beneficio.",
    },
  ],
};

export default es;
