import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Los costos de la nube, sin misterios: cómo dejar de pagar por servidores que no usas",
  excerpt:
    "La nube prometía que solo pagarías por lo que usas. En la práctica, muchas facturas crecen más rápido que el negocio. A dónde se va el dinero y cómo tomar el control.",
  imageAlt: "Un dashboard de costos en la nube que muestra el gasto mensual a la baja, un indicador de presupuesto y ahorros por categoría",
  takeaways: [
    "Las facturas de la nube crecen por recursos inactivos, máquinas sobredimensionadas y experimentos olvidados.",
    "Etiqueta cada recurso con un responsable y un propósito para poder rastrear los costos.",
    "Ajusta el tamaño, programa horarios y apaga automáticamente lo que no se necesita.",
    "Revisa el gasto cada mes y trata el costo como una responsabilidad compartida de ingeniería.",
  ],
  body: [
    {
      type: "p",
      text: "La propuesta de la computación en la nube era irresistible: no más comprar servidores por adelantado, no más adivinar la capacidad futura, solo pagar por lo que usas. Para muchas empresas, la realidad resultó más complicada. Las facturas crecen mes tras mes, a menudo más rápido que los ingresos, y nadie logra explicar bien por qué. La nube sí te permite pagar solo por lo que usas. El problema es que es muy fácil usar mucho más de lo que necesitas.",
    },
    { type: "h2", text: "A dónde se va realmente el dinero" },
    {
      type: "p",
      text: "El desperdicio en la nube rara vez proviene de un gran error. Se acumula a partir de muchos errores pequeños, cada uno fácil de cometer y fácil de olvidar:",
    },
    {
      type: "list",
      items: [
        "Recursos inactivos: servidores de prueba que quedan encendidos durante fines de semana y días festivos, o mucho después de que terminó un proyecto.",
        "Máquinas sobredimensionadas: servidores elegidos con generosidad “por si acaso” y nunca ajustados al uso real.",
        "Almacenamiento olvidado: respaldos, snapshots y logs antiguos que se conservan indefinidamente.",
        "Transferencia de datos: mover datos entre regiones o hacia internet, algo que suele cobrarse por separado y es fácil pasar por alto.",
        "Experimentos huérfanos: una prueba de concepto rápida que, sin que nadie lo notara, se convirtió en un cargo mensual permanente.",
      ],
    },
    {
      type: "quote",
      text: "En la nube, cada recurso olvidado es una suscripción que no sabías que habías contratado.",
    },
    { type: "h2", text: "Primero, la visibilidad" },
    {
      type: "p",
      text: "No puedes gestionar lo que no puedes ver. El primer paso para tomar el control es hacer que cada costo sea rastreable. La mayoría de las plataformas en la nube te permiten asignar etiquetas a los recursos, como el proyecto, el equipo, el entorno y el responsable al que pertenece cada uno. Con etiquetas consistentes, una factura total confusa se convierte en un desglose claro: este producto cuesta tanto, este entorno de pruebas cuesta tanto otro, y esta máquina desconocida necesita un responsable o un interruptor de apagado.",
    },
    {
      type: "p",
      text: "Configura también alertas de presupuesto. Una notificación cuando el gasto supera un límite convierte una sorpresa a fin de mes en una conversación a mitad de mes, cuando todavía hay tiempo para actuar.",
    },
    { type: "h2", text: "Ajusta el tamaño y programa horarios" },
    {
      type: "p",
      text: "Una vez que puedes ver el uso, las oportunidades se vuelven evidentes. Muchos servidores funcionan a una pequeña fracción de su capacidad y pueden pasarse a un tamaño más pequeño y económico sin un impacto visible. Los entornos de desarrollo y pruebas rara vez necesitan funcionar de noche o los fines de semana; programarlos para que se apaguen fuera del horario laboral puede reducir significativamente su costo.",
    },
    {
      type: "p",
      text: "Para cargas de trabajo que varían a lo largo del día, el escalado automático agrega capacidad cuando la demanda sube y la retira cuando baja. Para cargas de trabajo estables y predecibles, la mayoría de los proveedores ofrecen descuentos considerables a cambio de comprometerse a un nivel de uso durante un periodo más largo.",
    },
    { type: "h2", text: "Diseña pensando en la eficiencia" },
    {
      type: "p",
      text: "Las decisiones de arquitectura tienen un efecto duradero en el costo. Servir páginas y archivos ya generados desde una red de distribución de contenido es mucho más barato que generarlos en cada solicitud. Mover los datos más antiguos a niveles de almacenamiento más económicos, y definir reglas para eliminar lo que ya no se necesita, evita que las facturas de almacenamiento crezcan sin fin. Elegir servicios administrados puede reducir el costo oculto del mantenimiento, incluso cuando el precio de lista parece más alto.",
    },
    {
      type: "callout",
      title: "Revisión mensual de costos",
      text: "Revisa los diez costos más altos, los mayores aumentos respecto al mes anterior y cualquier recurso sin responsable. La mayoría de los ahorros se encuentran en esas tres listas.",
    },
    { type: "h2", text: "Costos ocultos más allá de la factura" },
    {
      type: "p",
      text: "La factura de la nube es el costo más visible, pero no el único. Las configuraciones complejas con muchos servicios, regiones y ajustes personalizados requieren tiempo para entenderlas, mantenerlas y protegerlas. Ese tiempo es un costo real, aunque nunca aparezca en la factura del proveedor. A veces, pagar un poco más por un servicio administrado y más sencillo es, en conjunto, la opción más barata.",
    },
    {
      type: "p",
      text: "También está el costo de la dependencia. Construir en gran medida sobre funciones exclusivas de un proveedor puede hacer que mudarse después resulte caro, lo que debilita tu posición de negociación. Esto no significa evitar esas funciones por completo, ya que muchas son excelentes, pero sí significa tomar la decisión de forma consciente y saber qué partes de tu sistema serían difíciles de migrar.",
    },
    {
      type: "p",
      text: "Por último, considera el costo de las sorpresas. Un pico repentino de tráfico, un proceso mal configurado que se ejecuta en bucle o una clave de acceso filtrada que alguien usa para correr sus propias cargas de trabajo pueden generar facturas enormes en cuestión de horas. Los límites de gasto, las alertas y una gestión cuidadosa de las claves son un seguro económico contra errores costosos.",
    },
    { type: "h2", text: "Haz que el costo sea tarea de todos" },
    {
      type: "p",
      text: "El control de costos más efectivo es cultural. Cuando las personas que construyen y operan los sistemas pueden ver lo que cuestan sus decisiones, de forma natural toman mejores decisiones. Compartir reportes de costos con los equipos técnicos, celebrar los ahorros e incluir el costo en las conversaciones de diseño convierte el gasto en una responsabilidad compartida de ingeniería, en lugar de un problema exclusivo de finanzas.",
    },
    {
      type: "p",
      text: "La nube sigue siendo una de las herramientas más poderosas al alcance de empresas de cualquier tamaño. Usada con criterio, realmente te permite pagar por lo que usas. La clave es asegurarte de que lo que usas sea lo que de verdad necesitas.",
    },
  ],
};

export default es;
