import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Del papeleo a los datos: cómo la IA documental está cambiando el trabajo administrativo",
  excerpt:
    "Facturas, contratos y formularios siguen llegando como documentos que alguien tiene que leer y volver a capturar. Cómo la IA documental los convierte en datos útiles y cómo adoptarla de forma segura.",
  imageAlt: "Un dashboard de procesamiento de documentos que extrae los campos de proveedor, fecha y total de una factura escaneada, con niveles de confianza",
  takeaways: [
    "La IA documental lee el significado de un documento, no solo sus caracteres, por lo que puede manejar formatos variados.",
    "Empieza con un tipo de documento de alto volumen y mide la precisión frente a tu proceso actual.",
    "Usa niveles de confianza y reglas de validación para decidir qué se procesa automáticamente y qué revisa una persona.",
    "Trata los documentos como datos sensibles: controla el acceso, la retención y dónde se procesan.",
  ],
  body: [
    {
      type: "p",
      text: "A pesar de años hablando de la oficina sin papel, una gran parte de la información de las empresas todavía llega en forma de documentos. Las facturas de proveedores caen en un buzón compartido como archivos adjuntos. Las notas de entrega se fotografían con el celular. Los contratos, solicitudes, estados de cuenta y recibos se acumulan, y alguien tiene que abrir cada uno, encontrar los datos importantes y capturarlos en otro sistema.",
    },
    {
      type: "p",
      text: "Este trabajo es lento, repetitivo y sorprendentemente propenso a errores. Un dígito mal leído en una factura puede significar un pago equivocado; una fecha de renovación pasada por alto en un contrato puede costar mucho más. La IA documental, una combinación de reconocimiento de texto y modelos de lenguaje que entienden lo que dice un documento, está cambiando la forma en que se hace este trabajo. Bien utilizada, convierte el papeleo en datos estructurados que fluyen directamente a los sistemas con los que ya opera una empresa.",
    },
    { type: "h2", text: "Más allá del escaneo y las plantillas" },
    {
      type: "p",
      text: "Los enfoques anteriores para procesar documentos funcionaban en dos pasos. Primero, el reconocimiento óptico de caracteres convertía una imagen en texto. Después, unas plantillas le indicaban al software dónde buscar: el número de factura siempre está en la esquina superior derecha, el total siempre está abajo. Eso funciona con documentos que nunca cambian, pero falla en cuanto un proveedor rediseña su factura o un cliente llena un formulario a mano.",
    },
    {
      type: "p",
      text: "La IA documental moderna lee de una forma más parecida a una persona. Reconoce que una cifra etiquetada como “importe a pagar” es el total, sin importar en qué parte de la página aparezca. Puede distinguir una dirección de entrega de una de facturación por el contexto, entender una tabla que continúa en una segunda página y extraer el plazo de preaviso de un párrafo con lenguaje contractual. En lugar de cientos de plantillas frágiles, un solo modelo maneja muchos formatos.",
    },
    {
      type: "quote",
      text: "El valor no está en leer el documento. Está en lo que pasa después, cuando los datos llegan limpios, verificados y al lugar correcto.",
    },
    { type: "h2", text: "Dónde aporta valor" },
    {
      type: "p",
      text: "Casi todos los departamentos manejan documentos, pero algunos procesos se benefician más que otros. Los mejores candidatos combinan un alto volumen con campos claros y un sistema posterior que está esperando los datos:",
    },
    {
      type: "list",
      items: [
        "Cuentas por pagar: proveedor, fechas, conceptos y totales extraídos de las facturas y conciliados con las órdenes de compra.",
        "Incorporación: datos de clientes o empleados capturados de formularios y documentos de identidad en los registros correctos.",
        "Contratos: términos clave, partes, fechas de renovación y obligaciones resumidos para que no se pase por alto nada importante.",
        "Logística: notas de entrega, listas de empaque y documentos aduanales convertidos en actualizaciones de envío.",
        "Gastos: recibos leídos a partir de fotos y asignados a la categoría y al proyecto correctos.",
      ],
    },
    {
      type: "p",
      text: "En todos los casos, el objetivo es el mismo: que las personas dejen de capturar y empiecen a revisar. Los efectos secundarios también importan: ciclos de pago más rápidos, menos recargos por pagos tardíos y un registro consultable de lo que realmente contenía cada documento.",
    },
    { type: "h2", text: "Precisión, confianza y revisión" },
    {
      type: "p",
      text: "Ningún sistema de documentos es perfecto, y fingir lo contrario es la forma más rápida de perder la confianza. Los buenos sistemas reportan un nivel de confianza para cada campo que extraen. Cuando el modelo está seguro, los datos pueden fluir automáticamente. Cuando tiene dudas, porque el escaneo está borroso o un campo es ambiguo, el documento se envía a una persona que ve el original junto a los valores extraídos y puede corregirlos en segundos.",
    },
    {
      type: "p",
      text: "Los niveles de confianza funcionan mejor cuando se combinan con reglas de negocio. ¿El total de la factura es igual a la suma de sus conceptos más impuestos? ¿El proveedor existe en tus registros? ¿La fecha es verosímil? Estas validaciones detectan errores que un modelo podría cometer con mucha seguridad, y agregarlas cuesta poco.",
    },
    {
      type: "callout",
      title: "Haz una prueba en paralelo",
      text: "Toma unos cientos de documentos reales que tu equipo ya haya procesado a mano. Pásalos por el nuevo sistema y compara campo por campo. Así conocerás su precisión real con tus documentos, no en una demo, antes de que toque cualquier proceso en producción.",
    },
    { type: "h2", text: "Seguridad y privacidad" },
    {
      type: "p",
      text: "Los documentos suelen estar entre los datos más sensibles que tiene una empresa. Las facturas revelan precios y datos bancarios, los formularios de incorporación contienen información personal y los contratos incluyen términos confidenciales. Antes de adoptar IA documental, ten claro dónde se procesan y almacenan los documentos, quién puede verlos, cuánto tiempo se conservan y si se usan para entrenar modelos de alguien.",
    },
    {
      type: "p",
      text: "Aplica los mismos principios que usarías con cualquier sistema que contenga datos personales o financieros: limita el acceso por rol, cifra los datos en tránsito y en reposo, registra quién vio o cambió qué, y elimina los originales de acuerdo con una política de retención definida. Los datos de pago merecen especial cuidado, ya que una factura manipulada es una técnica de fraude común.",
    },
    { type: "h2", text: "Cómo empezar sin dejarse llevar por la moda" },
    {
      type: "p",
      text: "Empieza con un solo tipo de documento que llegue con frecuencia y cause problemas reales, como las facturas de proveedores. Primero mide el proceso actual: cuántos documentos llegan, cuánto tarda cada uno y con qué frecuencia ocurren errores. Esa línea base es la que hará visible la mejora más adelante.",
    },
    {
      type: "p",
      text: "Después, enfócate en todo el flujo, no solo en la extracción. ¿A dónde llegan los documentos? ¿A dónde deben ir los datos? ¿Qué pasa con las excepciones y quién se hace cargo de ellas? Un sistema que lee facturas a la perfección, pero que aun así requiere que alguien copie los resultados al sistema contable, ahorra muy poco. La integración con los sistemas que ya usas suele ser donde está la mayor parte del valor, y también la mayor parte del trabajo.",
    },
    {
      type: "p",
      text: "Por último, desconfía de las promesas de automatización total desde el primer día. Una meta realista es que la mayoría de los documentos rutinarios pasen sin intervención, mientras que los inusuales reciben una revisión humana rápida. A medida que la precisión mejora y la confianza crece, la proporción de documentos que necesitan revisión disminuye de forma natural.",
    },
    { type: "h2", text: "Otro tipo de back office" },
    {
      type: "p",
      text: "La IA documental no elimina la necesidad de personas en finanzas, administración u operaciones. Cambia aquello en lo que invierten su tiempo. En lugar de volver a capturar cifras, atienden excepciones, resuelven disputas, detectan patrones y mejoran procesos. Es un trabajo más interesante, y es donde su criterio realmente hace falta.",
    },
    {
      type: "p",
      text: "El papeleo no va a desaparecer pronto. Pero ya no tiene por qué ser el cuello de botella. Cuando los documentos se convierten en datos en el momento en que llegan, el back office deja de ser un lugar donde la información espera y se convierte en un lugar donde la información avanza.",
    },
  ],
};

export default es;
