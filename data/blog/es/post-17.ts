import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Privacidad desde el diseño: recopila menos datos y gana más confianza",
  excerpt:
    "Cada dato personal que guardas es tanto una responsabilidad como un activo. Cómo recopilar menos, conservarlo menos tiempo y explicarlo con claridad hace que un negocio sea más seguro y confiable.",
  imageAlt: "Un centro de control de privacidad con interruptores de consentimiento, temporizadores de retención de datos y una bóveda cifrada de datos personales",
  takeaways: [
    "Recopila solo los datos personales para los que puedas definir un propósito claro.",
    "Haz que el consentimiento sea específico, honesto y tan fácil de retirar como de otorgar.",
    "Define periodos de retención y elimina los datos cuando su propósito haya terminado.",
    "Considera las prácticas de privacidad claras y respetuosas como parte de tu experiencia del cliente.",
  ],
  body: [
    {
      type: "p",
      text: "Durante años, el instinto predeterminado en los negocios fue recopilarlo todo. Cada formulario pedía un campo más, cada aplicación solicitaba un permiso más y cada base de datos conservaba los registros para siempre “por si llegan a ser útiles”. El almacenamiento era barato y los datos parecían un activo cuyo valor solo podía crecer.",
    },
    {
      type: "p",
      text: "Ese instinto ha envejecido mal. Cada dato personal que guardas es algo que debes proteger, explicar y, eventualmente, eliminar. Aumenta el daño de una filtración, el esfuerzo de responder a las solicitudes de los clientes y la complejidad de cumplir con las leyes de privacidad. La privacidad desde el diseño invierte ese viejo instinto: crea sistemas que recopilen menos, lo conserven menos tiempo y muestren a las personas exactamente qué sucede con su información.",
    },
    { type: "h2", text: "Qué significa realmente la privacidad desde el diseño" },
    {
      type: "p",
      text: "La privacidad desde el diseño es la idea de que la protección de los datos personales debe integrarse en los productos y procesos desde el principio, no añadirse después como un parche. Se trata menos de una tecnología en particular y más del hábito de hacer las preguntas correctas desde temprano. ¿Qué necesitamos? ¿Por qué? ¿Quién puede verlo? ¿Cuánto tiempo lo conservaremos? Cuando esas preguntas se responden durante el diseño, la privacidad cuesta poco. Cuando se responden después del lanzamiento, suele significar un retrabajo doloroso.",
    },
    {
      type: "p",
      text: "Las leyes de privacidad en muchas partes del mundo ya esperan este enfoque, y algunas lo exigen de forma explícita. Los detalles varían según el país y el sector, así que vale la pena obtener asesoría legal adecuada para tu situación. Pero los principios de fondo son notablemente consistentes, y seguirlos coloca a la mayoría de los negocios en terreno firme.",
    },
    { type: "h2", text: "Recopila menos, a propósito" },
    {
      type: "p",
      text: "La minimización de datos es el corazón de la privacidad desde el diseño. Por cada dato personal que recopilas, deberías poder nombrar el propósito que cumple. Si el registro a un newsletter pide un número de teléfono y una fecha de nacimiento, alguien debería poder explicar por qué. Con frecuencia nadie puede, y el campo existe solo porque venía incluido en una plantilla.",
    },
    {
      type: "quote",
      text: "Los datos que nunca recopilas jamás pueden filtrarse, usarse indebidamente ni ser reclamados de vuelta.",
    },
    {
      type: "p",
      text: "Revisa tus formularios, aplicaciones e integraciones con otros ojos. Elimina los campos opcionales que nadie usa. Pide un rango de edad en lugar de la fecha de nacimiento completa, o una ciudad en lugar de la dirección completa, cuando eso es todo lo que el propósito requiere. Menos datos también suele significar formularios más cortos, que las personas tienen más probabilidades de completar.",
    },
    { type: "h2", text: "Un consentimiento que la gente pueda entender" },
    {
      type: "p",
      text: "El consentimiento solo tiene sentido cuando las personas saben a qué están aceptando. Los textos legales extensos, las casillas premarcadas y los banners diseñados para empujar a todos hacia “aceptar todo” pueden cumplir un requisito interno, pero erosionan la confianza y cada vez se quedan más cortos frente a lo que esperan los reguladores. Un buen consentimiento es específico, está redactado en lenguaje sencillo y se separa por propósito, para que alguien pueda aceptar recibir actualizaciones de sus pedidos sin aceptar recibir marketing.",
    },
    {
      type: "p",
      text: "Igual de importante, retirar el consentimiento debe ser tan fácil como otorgarlo. Si registrarse toma un clic, pero darse de baja requiere una llamada telefónica, el diseño les está diciendo algo a tus clientes sobre cómo los ves. Registra cuándo y cómo se otorgó el consentimiento, para que puedas demostrarlo más adelante si alguien lo pide.",
    },
    { type: "h2", text: "Consérvalos solo el tiempo que los necesites" },
    {
      type: "p",
      text: "Los datos antiguos son uno de los riesgos más ignorados en cualquier organización. Los registros de antiguos clientes, los candidatos de hace años y las exportaciones guardadas en unidades compartidas siguen siendo tu responsabilidad. Una política de retención clara te ayuda a decidir qué conservar y por cuánto tiempo, y convierte la eliminación en una rutina y no en una crisis. Una política sencilla suele cubrir unos cuantos puntos clave:",
    },
    {
      type: "list",
      items: [
        "Categorías: agrupa los datos por tipo, como clientes, empleados, candidatos y visitantes del sitio web.",
        "Propósito: indica por qué se conserva cada categoría y para qué se utiliza.",
        "Periodo de retención: define cuánto tiempo se necesita cada categoría, incluidos los mínimos legales.",
        "Método de eliminación: describe cómo se eliminan o anonimizan los datos cuando termina el periodo.",
        "Responsable: nombra a quien se encarga de asegurar que esto realmente suceda.",
      ],
    },
    {
      type: "p",
      text: "Siempre que sea posible, automatiza la eliminación para que no dependa de que alguien lo recuerde. Y no olvides los respaldos, los entornos de prueba y las hojas de cálculo exportadas para un reporte único; con frecuencia conservan copias mucho tiempo después de que los registros originales desaparecieron.",
    },
    { type: "h2", text: "Limita quién puede ver qué" },
    {
      type: "p",
      text: "No todas las personas de una organización necesitan acceso a todos los datos personales. Un agente de soporte puede necesitar el historial de pedidos de un cliente, pero no sus datos de pago. Un analista de marketing puede necesitar tendencias, no nombres. El acceso basado en roles, en el que los permisos siguen las responsabilidades de cada puesto, mantiene la información sensible en menos manos y facilita saber quién accedió a qué.",
    },
    {
      type: "p",
      text: "Técnicas como la seudonimización, en la que los nombres se reemplazan por códigos, y el cifrado, que vuelve ilegibles los datos almacenados sin una clave, agregan capas adicionales de protección. No eliminan la responsabilidad, pero reducen el daño si algo sale mal. Revisa los accesos con regularidad, sobre todo cuando las personas cambian de puesto o dejan la organización.",
    },
    {
      type: "callout",
      title: "Una revisión rápida de privacidad",
      text: "Antes de lanzar cualquier formulario, función o herramienta nueva, responde por escrito cuatro preguntas: ¿qué datos personales utiliza, para qué, quién puede acceder a ellos y cuándo se eliminarán? Si alguna respuesta no está clara, resuélvela antes de salir en vivo.",
    },
    { type: "h2", text: "La transparencia como ventaja competitiva" },
    {
      type: "p",
      text: "Muchas personas han aprendido a desconfiar de cómo las organizaciones manejan sus datos. Eso crea una oportunidad para los negocios que lo hacen bien. Un aviso de privacidad redactado en lenguaje sencillo, una página simple donde los clientes puedan ver y administrar su información, y respuestas rápidas y amables a las solicitudes sobre datos transmiten respeto. Se vuelven parte de la experiencia del cliente, no solo un ejercicio de cumplimiento.",
    },
    {
      type: "p",
      text: "La privacidad desde el diseño también facilita la operación del propio negocio. Los conjuntos de datos más pequeños son más baratos de almacenar y proteger, más sencillos de consultar y más fáciles de mantener precisos. Cuando un cliente pregunta qué información tienes sobre él, puedes responder en minutos y no en semanas. Cuando un socio o un cliente más grande pregunta por tus prácticas de manejo de datos, tienes respuestas claras listas.",
    },
    {
      type: "p",
      text: "El cambio empieza con una sencilla transformación de mentalidad: los datos personales se toman prestados, no se poseen. Trátalos así, recopilando solo lo que necesitas, protegiéndolos con cuidado y devolviéndolos o eliminándolos cuando termines, y la confianza suele llegar por sí sola.",
    },
  ],
};

export default es;
