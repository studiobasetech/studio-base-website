import type { PostTranslation } from "../types";

const es: PostTranslation = {
  title: "Anatomía de un sitio web rápido: lo que pasa en el primer segundo",
  excerpt:
    "La velocidad define las primeras impresiones, las conversiones y la visibilidad en buscadores. Un recorrido por lo que hace el navegador cuando alguien abre tu página y a dónde se va realmente el tiempo.",
  imageAlt: "Un reporte de rendimiento de un sitio web con una puntuación de 98, métricas principales y una cascada de red",
  takeaways: [
    "Los visitantes juzgan un sitio en cuestión de instantes; la velocidad percibida importa tanto como la velocidad real.",
    "Las imágenes, las fuentes y los scripts de terceros son las causas más comunes de lentitud.",
    "Sirve el contenido desde un lugar cercano al visitante y guarda en caché todo lo que no cambia.",
    "Mide con dispositivos y redes reales, no solo con la conexión rápida de la oficina.",
  ],
  body: [
    {
      type: "p",
      text: "Alguien toca un enlace a tu sitio web. Antes de que lea una sola palabra, ocurre una cantidad notable de trabajo en segundo plano: un nombre de dominio se traduce en una dirección, se negocia una conexión segura, se solicitan y descargan archivos, se interpreta el código y se pintan los píxeles en la pantalla. Idealmente, todo esto tarda bastante menos de un segundo. Cuando no es así, los visitantes lo notan y muchos se van.",
    },
    {
      type: "p",
      text: "La velocidad de un sitio web no es solo una métrica técnica. Influye en qué tan confiable se percibe una empresa, en cuántos visitantes se convierten en clientes y en qué tan visible muestran los buscadores una página. Entender lo que pasa en ese primer segundo es la mejor manera de hacerlo más rápido.",
    },
    { type: "h2", text: "Paso uno: encontrar el servidor" },
    {
      type: "p",
      text: "Primero, el navegador necesita saber dónde vive tu sitio. Le pide al sistema de nombres de dominio que traduzca tu dirección a una ubicación numérica, luego abre una conexión y acuerda el cifrado para que el intercambio sea seguro. Cada uno de estos pasos implica un viaje de ida y vuelta por internet, y esos viajes están limitados por la distancia física.",
    },
    {
      type: "p",
      text: "Por eso importan las redes de distribución de contenido. Guardan copias de tu sitio en servidores repartidos por todo el mundo, de modo que un visitante en Madrid y otro en la Ciudad de México se conectan a un servidor relativamente cercano. Distancias más cortas significan viajes de ida y vuelta más rápidos, incluso antes de descargar nada.",
    },
    { type: "h2", text: "Paso dos: los primeros bytes" },
    {
      type: "p",
      text: "Una vez conectado, el navegador solicita la página. Qué tan rápido responde el servidor depende de cuánto trabajo tenga que hacer. Una página que se construye desde cero para cada visitante, consultando bases de datos y armando plantillas, tarda más que una página preparada de antemano que simplemente se entrega. Generar las páginas por adelantado y guardarlas en caché siempre que sea posible es una de las mejoras de velocidad más efectivas que existen.",
    },
    {
      type: "quote",
      text: "La solicitud más rápida es la que nunca hay que hacer, y la siguiente más rápida es la que se sirve desde la caché.",
    },
    { type: "h2", text: "Paso tres: construir la página" },
    {
      type: "p",
      text: "El documento HTML le indica al navegador qué otros archivos necesita: hojas de estilo, scripts, fuentes e imágenes. Algunos de ellos impiden que la página aparezca hasta que llegan. Una hoja de estilo pesada o un script cargado en el lugar equivocado puede dejar a los visitantes mirando una pantalla en blanco aunque la mayor parte del contenido ya esté lista.",
    },
    {
      type: "list",
      items: [
        "Imágenes: suelen ser la parte más pesada de una página. Los formatos modernos, el tamaño adecuado para cada pantalla y la carga diferida de las imágenes más abajo marcan una diferencia enorme.",
        "Fuentes: las tipografías personalizadas aportan carácter, pero también peso. Cargar solo los estilos que usas y mostrar de inmediato una fuente alternativa evita el texto invisible.",
        "Scripts: cada etiqueta de analítica, widget de chat y píxel de seguimiento agrega código que debe descargarse y ejecutarse. Revísalos con regularidad y elimina los que no uses.",
        "Saltos de diseño: los elementos que se mueven mientras carga la página dan la sensación de que algo está roto. Reservar espacio para imágenes y anuncios mantiene la página estable.",
      ],
    },
    { type: "h2", text: "Velocidad percibida" },
    {
      type: "p",
      text: "Los usuarios no viven el tiempo de carga como un solo número. Notan cuándo aparece algo por primera vez, cuándo se vuelve visible el contenido principal y cuándo la página responde a un toque. Una página que muestra rápido su titular y su imagen principal se siente rápida, aunque los elementos más pequeños sigan cargándose después.",
    },
    {
      type: "p",
      text: "Diseñadores y desarrolladores pueden trabajar juntos en esto. Dar prioridad a lo que aparece en la parte visible de la pantalla, mostrar marcadores de posición ligeros mientras carga el contenido y mantener fluidas las animaciones mejora la sensación de velocidad de un sitio, que al final es lo que juzgan los visitantes.",
    },
    {
      type: "callout",
      title: "Prueba como tus visitantes",
      text: "Seguramente tu oficina tiene internet rápido y computadoras recientes. Muchos visitantes usan teléfonos de gama media con redes móviles. Haz pruebas en un teléfono modesto con una conexión limitada para ver lo que ellos ven.",
    },
    { type: "h2", text: "Primero el móvil, de verdad" },
    {
      type: "p",
      text: "En muchos sitios web, la mayoría de los visitantes llega desde un teléfono. Diseñar para escritorio y luego apretar el resultado en una pantalla pequeña suele producir páginas pesadas, con imágenes demasiado grandes y menús ocultos llenos de contenido que nadie pidió. Empezar por la experiencia móvil obliga a una disciplina útil: ¿qué es lo único que un visitante necesita ver primero y qué puede esperar?",
    },
    {
      type: "p",
      text: "El rendimiento en móviles también depende del propio dispositivo. Los teléfonos tienen menos capacidad de procesamiento que las laptops, así que los scripts pesados y las animaciones complejas que funcionan sin problema en una computadora de escritorio pueden hacer que un teléfono se sienta lento. Mantener ligero el código interactivo, evitar tareas que bloqueen el desplazamiento y probar las animaciones en un dispositivo de gama media protege la experiencia de la mayoría de los visitantes.",
    },
    {
      type: "p",
      text: "La velocidad y la accesibilidad suelen ir de la mano. Una estructura clara, tamaños de texto legibles, contraste suficiente y botones bien etiquetados ayudan a quienes usan tecnologías de asistencia, y además tienden a producir páginas más ligeras y sencillas que cargan más rápido para todos.",
    },
    { type: "h2", text: "La velocidad es un hábito" },
    {
      type: "p",
      text: "Los sitios web tienden a volverse más lentos con el tiempo. Nuevas funciones, imágenes más grandes y scripts adicionales se van colando uno por uno, cada uno inofensivo por sí solo. Los sitios que se mantienen rápidos son los que miden su rendimiento de forma continua y tratan cualquier lentitud como un error que hay que corregir, no como un costo inevitable del crecimiento.",
    },
    {
      type: "p",
      text: "La recompensa de esta disciplina es un sitio que se siente fluido. Puede que los visitantes nunca noten de forma consciente que tus páginas cargan rápido, pero sí notarán cuando no lo hagan. En el primer segundo, la velocidad es la primera impresión.",
    },
  ],
};

export default es;
