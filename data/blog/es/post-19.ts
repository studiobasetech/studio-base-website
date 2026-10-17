import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Migrar a la nube sin caos: una guía práctica de migración",
  excerpt:
    "Una migración a la nube tiene menos que ver con la tecnología y más con la planeación, el orden de los pasos y las personas. Una guía paso a paso, desde el inventario hasta el cambio definitivo y más allá.",
  imageAlt: "Un tablero de seguimiento de migración a la nube que traslada aplicaciones de servidores locales a la nube a través de las etapas de evaluación, piloto y cambio definitivo",
  takeaways: [
    "Empieza con un inventario completo de los sistemas, los datos y las conexiones entre ellos.",
    "Decide para cada sistema si lo migrarás tal como está, si lo ajustarás o si lo reconstruirás.",
    "Valida el enfoque con un piloto de bajo riesgo antes de migrar cualquier cosa crítica.",
    "Planea el cambio definitivo, la capacitación y la optimización posterior con el mismo cuidado que la migración misma.",
  ],
  body: [
    {
      type: "p",
      text: "Migrar a la nube ya es un paso habitual para organizaciones de todos los tamaños. Las razones son bien conocidas: menos hardware que mantener, acceso remoto más sencillo, capacidad más flexible y mayor resiliencia. Aun así, muchas migraciones se exceden en tiempo y presupuesto, interrumpen el trabajo diario o terminan con sistemas que cuestan más y rinden peor que antes.",
    },
    {
      type: "p",
      text: "Esos problemas rara vez se deben a la nube en sí. Surgen de las prisas, de migrar cosas que nadie entendía del todo y de olvidarse de las personas que dependen de los sistemas todos los días. Un enfoque tranquilo y por etapas evita la mayor parte del caos. Esta guía recorre los pasos que marcan la diferencia.",
    },
    { type: "h2", text: "Conoce lo que tienes" },
    {
      type: "p",
      text: "Toda migración exitosa comienza con un inventario. Haz una lista de cada aplicación, base de datos, carpeta compartida y tarea programada que operas, junto con quién la usa, qué tan importante es y con qué se conecta. Ese último punto es crítico. Con frecuencia, los sistemas están vinculados de maneras que nadie ha documentado: una exportación nocturna alimenta un reporte, una herramienta contable lee una carpeta compartida, una impresora depende de un servidor antiguo.",
    },
    {
      type: "p",
      text: "Mapear estas dependencias lleva tiempo, pero evita la sorpresa más común en una migración: mover un sistema y descubrir que otros tres dejaron de funcionar sin que nadie lo notara. De paso, anota qué sistemas ya no se necesitan. Retirarlos es la migración más barata de todas.",
    },
    { type: "h2", text: "Elige cómo migrar cada sistema" },
    {
      type: "p",
      text: "No todos los sistemas deben migrarse de la misma manera. Para cada uno, decide qué enfoque se ajusta a su valor, antigüedad y estado. La mayoría de las decisiones se reducen a unas cuantas opciones:",
    },
    {
      type: "list",
      items: [
        "Rehospedar: mover el sistema tal como está a servidores en la nube, lo cual es rápido pero conserva sus limitaciones actuales.",
        "Cambiar de plataforma: hacer cambios moderados, como pasar a una base de datos administrada, para obtener beneficios de la nube sin reescribir el sistema.",
        "Reconstruir: rediseñar el sistema para aprovechar al máximo la nube, lo cual es más lento, pero a menudo vale la pena para el software principal.",
        "Reemplazar: sustituir el sistema por un servicio en línea listo para usar que cumpla la misma función.",
        "Retirar: apagarlo porque ya no se necesita.",
        "Conservar: dejarlo donde está por ahora, porque migrarlo aporta muy poco beneficio o implica demasiado riesgo.",
      ],
    },
    {
      type: "p",
      text: "Un error común es rehospedar todo porque parece lo más rápido y luego preguntarse por qué no mejoraron los costos ni el rendimiento. Otro es reconstruir todo a la vez y perderse en un proyecto que nunca termina. Una combinación sensata, decidida sistema por sistema, suele funcionar mejor.",
    },
    { type: "h2", text: "Empieza con un piloto" },
    {
      type: "p",
      text: "Antes de migrar cualquier cosa crítica, elige un sistema que sea útil, pero no esencial, y migra ese primero. El piloto pone a prueba todo tu proceso: configurar el entorno en la nube, establecer la seguridad y los accesos, mover los datos, monitorear el rendimiento y dar soporte a los usuarios después. Revela los problemas mientras hay poco en juego.",
    },
    {
      type: "quote",
      text: "El piloto no se trata del sistema que migras. Se trata de aprender cómo tu organización migra sistemas.",
    },
    {
      type: "p",
      text: "Anota qué salió bien y qué no, y luego ajusta tu plan. Cada migración posterior debería ser más fluida que la anterior y, para cuando migres los sistemas sin los que el negocio no puede vivir, el equipo debería estar trabajando con base en la experiencia y no en la esperanza.",
    },
    { type: "h2", text: "Migra los datos con cuidado" },
    {
      type: "p",
      text: "Los datos suelen ser la parte más difícil de una migración. Los grandes volúmenes tardan en transferirse, los datos siguen cambiando mientras los mueves y los errores pueden no aparecer hasta que alguien genera un reporte semanas después. Haz limpieza antes de migrar: elimina duplicados, archiva registros antiguos y corrige los problemas de calidad conocidos, para no arrastrar problemas al nuevo entorno.",
    },
    {
      type: "p",
      text: "Planea cómo mantendrás sincronizadas las copias antigua y nueva durante la transición, y cómo verificarás que todo llegó correctamente. Comprobaciones sencillas, como comparar el número de registros, los totales y una muestra de registros individuales, detectan la mayoría de los problemas. Y asegúrate de contar con respaldos seguros y probados antes de mover cualquier dato.",
    },
    { type: "h2", text: "Planea el cambio definitivo" },
    {
      type: "p",
      text: "El cambio definitivo es el momento en que los usuarios pasan del sistema antiguo al nuevo. Elige un periodo tranquilo, acuerden quién tomará la decisión final de seguir adelante o no, y prepara una lista de verificación paso a paso. Lo más importante: ten un plan de reversión, una forma clara de volver al sistema antiguo si algo grave sale mal. Saber que puedes regresar hace mucho más fácil avanzar con calma.",
    },
    {
      type: "callout",
      title: "Lista de verificación para el cambio definitivo",
      text: "Confirma los respaldos, congela los cambios en el sistema antiguo, completa la sincronización final de datos, ejecuta las pruebas acordadas, cambia a los usuarios al nuevo sistema, monitorea de cerca y mantén disponible el sistema antiguo hasta que el nuevo haya demostrado su funcionamiento.",
    },
    { type: "h2", text: "Suma a las personas y después optimiza" },
    {
      type: "p",
      text: "Una migración cambia la forma en que las personas trabajan, incluso cuando las pantallas se ven parecidas. Los pasos para iniciar sesión pueden ser distintos, los archivos pueden estar en un lugar nuevo y el rendimiento puede sentirse diferente. Informa a las personas qué va a cambiar y cuándo, ofrece capacitaciones breves y prácticas, y deja muy claro dónde pueden obtener ayuda durante los primeros días. Un pequeño grupo de usuarios pioneros y seguros en cada equipo puede resolver la mayoría de las dudas en el momento.",
    },
    {
      type: "p",
      text: "Por último, trata la migración como un comienzo y no como un final. Los sistemas migrados tal como están suelen funcionar con más capacidad de la que necesitan, y los primeros meses en la nube revelan qué se puede redimensionar, automatizar o simplificar. Revisa con regularidad el rendimiento, los costos y la configuración de seguridad, y vuelve a analizar los sistemas que rehospedaste para ver si ahora merecen una mejora más profunda.",
    },
    {
      type: "p",
      text: "Hecha de esta manera, una migración a la nube se convierte en una serie de pasos manejables y no en un salto arriesgado. El resultado no es solo software en un nuevo lugar, sino una base más flexible para la forma en que el negocio quiere trabajar a partir de ahora.",
    },
  ],
};

export default es;
