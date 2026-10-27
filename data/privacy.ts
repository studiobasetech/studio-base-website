import type { Bi } from "@/lib/i18n";
import { LEGAL_NAME } from "@/data/site";

/**
 * Privacy Policy text (English + Spanish), shown at /privacy by
 * sections/legal/PrivacyPolicy.tsx. Section 14 (Contact) is rendered by
 * that component from data/site.ts.
 *
 * Source: "PRIVACY POLICY ENG 2026" and "AVISO DE PRIVACIDAD 2026 ESP"
 * (October 2026), with the internal draft notes removed and Eva (the AI
 * receptionist demo) added. Update LEGAL_ENTITY, PRIVACY_UPDATED and the
 * relevant section whenever the website's practices change.
 */
export const LEGAL_ENTITY = LEGAL_NAME;

export const PRIVACY_EFFECTIVE: Bi = { en: "October 2026", es: "octubre de 2026" };
export const PRIVACY_UPDATED: Bi = { en: "October 2026", es: "octubre de 2026" };

export type PolicySection = { id: string; title: Bi; body: Bi[]; list?: Bi[]; after?: Bi[] };

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    "id": "who-we-are",
    "title": {
      "en": "1. Who We Are",
      "es": "1. Quiénes somos"
    },
    "body": [
      {
        "en": "This Privacy Policy explains how Studio Base LLC (doing business as “Studio Base,” “we,” “us,” or “our”), located at 5900 Balcones Drive #34618, Austin, TX 78731, handles personal information collected through https://studiobase.tech/ (the “Website”) and inquiries about our technology and creative services. Contact: info@studiobase.tech.",
        "es": "El presente Aviso de Privacidad explica cómo Studio Base LLC (que opera comercialmente como «Studio Base», «nosotros» o «nuestro»), con domicilio en 5900 Balcones Drive #34618, Austin, TX 78731, trata los datos personales recabados a través de https://studiobase.tech/ (el «Sitio Web») y de las consultas relacionadas con nuestros servicios tecnológicos y creativos. Contacto: info@studiobase.tech."
      }
    ]
  },
  {
    "id": "information-we-collect",
    "title": {
      "en": "2. Information We Collect",
      "es": "2. Información que recopilamos"
    },
    "body": [
      {
        "en": "When you use the contact form, we collect the name, email address, optional company name, service or project category, and message you provide. If you email us, we receive your email address and the contents of your communication. If you engage us for services, we may receive additional business contact information, proposals, project requirements, and documents you choose to share, subject to applicable agreements.",
        "es": "Cuando utiliza el formulario de contacto, recopilamos su nombre, dirección de correo electrónico, nombre de empresa (opcional), categoría de servicio o proyecto y el mensaje que nos proporcione. Si nos escribe por correo electrónico, recibimos su dirección y el contenido de su comunicación. Si nos contrata para prestar servicios, podremos recibir datos de contacto empresariales adicionales, propuestas, requisitos de proyectos y documentos que decida compartir, sujetos a los acuerdos aplicables."
      },
      {
        "en": "If you book a consultation through Eva, the AI receptionist demo on our website, we collect the name, email address, and description of your needs that you provide. If you choose to speak to Eva, your voice is converted to text by your own browser’s speech recognition; in some browsers, such as Chrome, this is done by the browser provider’s servers under its own privacy terms. We do not record or store voice audio.",
        "es": "Si agenda una consulta a través de Eva, la recepcionista de inteligencia artificial de demostración de nuestro sitio web, recopilamos el nombre, la dirección de correo electrónico y la descripción de sus necesidades que nos proporcione. Si decide hablar con Eva, el reconocimiento de voz de su propio navegador convierte su voz en texto; en algunos navegadores, como Chrome, esto lo realizan los servidores del proveedor del navegador conforme a sus propios términos de privacidad. No grabamos ni almacenamos audio de voz."
      },
      {
        "en": "The Website uses Google Analytics 4 in Google’s Consent Mode. Until you accept analytics cookies, or if you decline them, no analytics cookies are set and Google may receive only limited, cookie-free signals (such as a page visit and basic browser information) that are not tied to an identifier. If you consent to analytics, Google Analytics 4 may collect information about website visits, pages viewed, device and browser characteristics, approximate geographic area, and cookie identifiers. GitHub Pages may independently collect technical logs, including IP addresses, to provide and secure hosting. The Website does not offer user accounts or subscriptions and does not collect payment-card information.",
        "es": "El Sitio Web utiliza Google Analytics 4 con el Modo de consentimiento de Google. Mientras no acepte las cookies analíticas, o si las rechaza, no se instalan cookies analíticas y Google podrá recibir únicamente señales limitadas y sin cookies (como una visita a la página e información básica del navegador) que no están vinculadas a un identificador. Si otorga su consentimiento para el análisis de tráfico, Google Analytics 4 podrá recopilar información sobre visitas al Sitio Web, páginas consultadas, características del dispositivo y navegador, ubicación geográfica aproximada e identificadores de cookies. GitHub Pages podrá recopilar de manera independiente registros técnicos, incluidas direcciones IP, para prestar y proteger el servicio de alojamiento. El Sitio Web no ofrece cuentas de usuario ni suscripciones y no recopila datos de tarjetas de pago."
      }
    ]
  },
  {
    "id": "how-we-use",
    "title": {
      "en": "3. How We Use Information",
      "es": "3. Cómo utilizamos la información"
    },
    "body": [
      {
        "en": "We use information to respond to inquiries; evaluate project needs; prepare proposals; provide requested services; maintain communications and necessary business records; protect the Website and prevent abuse; comply with law; and, only with the appropriate permission or other lawful basis, analyze Website performance. We do not add contact-form visitors to marketing mailing lists without an appropriate lawful basis. We do not sell personal information or use Website analytics for targeted advertising.",
        "es": "Utilizamos la información para responder consultas; evaluar necesidades de proyectos; preparar propuestas; prestar los servicios solicitados; mantener comunicaciones y registros comerciales necesarios; proteger el Sitio Web y prevenir usos indebidos; cumplir la ley; y, únicamente con la autorización pertinente u otra base jurídica válida, analizar el desempeño del Sitio Web. No incorporamos a los visitantes que utilizan el formulario de contacto a listas de correo publicitario sin una base jurídica adecuada. No vendemos datos personales ni utilizamos los análisis del Sitio Web para publicidad dirigida."
      }
    ]
  },
  {
    "id": "service-providers",
    "title": {
      "en": "4. Contact Form and Service Providers",
      "es": "4. Formulario de contacto y proveedores de servicios"
    },
    "body": [
      {
        "en": "The Website uses FormSubmit to transmit contact-form submissions and consultation requests made through Eva to our business email inbox; it does not maintain its own database of these submissions. The Website is hosted on GitHub Pages. We also use our email provider and, only when accepted, Google Analytics 4. These providers may process data in accordance with their respective terms and privacy notices. Access is limited to persons and providers with a legitimate need to handle information for authorized purposes. If additional providers, CRM systems, AI tools, or payment processors are introduced, we will update this notice as required.",
        "es": "El Sitio Web utiliza FormSubmit para enviar los formularios de contacto y las solicitudes de consulta realizadas a través de Eva a nuestra bandeja de correo empresarial; el Sitio Web no mantiene una base de datos propia de dichos envíos. El Sitio Web está alojado en GitHub Pages. También utilizamos nuestro proveedor de correo electrónico y, únicamente cuando el usuario lo acepta, Google Analytics 4. Estos proveedores podrán tratar datos conforme a sus respectivos términos y avisos de privacidad. El acceso se limita a las personas y proveedores que tengan una necesidad legítima de tratar la información para fines autorizados. Si incorporamos otros proveedores, sistemas CRM, herramientas de inteligencia artificial o procesadores de pagos, actualizaremos este aviso cuando corresponda."
      }
    ]
  },
  {
    "id": "cookies",
    "title": {
      "en": "5. Cookies, Analytics, and Browser Storage",
      "es": "5. Cookies, análisis de tráfico y almacenamiento del navegador"
    },
    "body": [
      {
        "en": "The Website stores your language preference locally under “sb-lang,” your cookie choice under “sb-cookie-consent,” and, if you play the game on the home page, your best score under “sb-orbit-best.” If you select “Accept,” Google Analytics 4 may set cookies including “_ga” and “_ga_*” for measurement, generally for up to two years, subject to configuration. If you select “Decline,” no analytics cookies are set and Google Analytics receives only limited, cookie-free signals. You may change your choice at any time through the “Cookie settings” control in the Website footer; withdrawing consent stops further analytics collection and clears the analytics cookies set by the Website. Your browser settings may also allow you to delete stored information.",
        "es": "El Sitio Web guarda localmente su preferencia de idioma bajo «sb-lang», su elección sobre cookies bajo «sb-cookie-consent» y, si juega el juego de la página de inicio, su mejor puntuación bajo «sb-orbit-best». Si selecciona «Aceptar», Google Analytics 4 podrá instalar cookies, incluidas «_ga» y «_ga_*», para medición, generalmente hasta por dos años, según la configuración. Si selecciona «Rechazar», no se instalan cookies analíticas y Google Analytics recibe únicamente señales limitadas y sin cookies. Puede cambiar su elección en cualquier momento mediante el control «Configuración de cookies» en el pie de página del Sitio Web; retirar el consentimiento detiene la recopilación posterior de datos analíticos y elimina las cookies analíticas instaladas por el Sitio Web. La configuración de su navegador también puede permitirle eliminar la información almacenada."
      }
    ]
  },
  {
    "id": "sharing",
    "title": {
      "en": "6. Sharing and Disclosure",
      "es": "6. Comunicación y divulgación de información"
    },
    "body": [
      {
        "en": "We may share information with:",
        "es": "Podremos compartir información con:"
      }
    ],
    "list": [
      {
        "en": "Our website hosting, form delivery, email, analytics, and other authorized service providers, as needed",
        "es": "Nuestros proveedores autorizados de alojamiento web, transmisión de formularios, correo electrónico, análisis de tráfico y otros servicios, cuando sea necesario"
      },
      {
        "en": "Professional advisers subject to appropriate duties",
        "es": "Asesores profesionales sujetos a obligaciones apropiadas"
      },
      {
        "en": "Authorities, where legally required",
        "es": "Autoridades, cuando exista una obligación legal"
      },
      {
        "en": "Counterparties to a lawful business transaction, with suitable protections",
        "es": "Contrapartes de operaciones empresariales lícitas, con las protecciones correspondientes"
      }
    ],
    "after": [
      {
        "en": "Project information may be shared with authorized personnel or contractors only as needed to evaluate or deliver the requested services and subject to appropriate confidentiality and data-handling arrangements. We do not publicly display confidential project materials merely because they were submitted through an inquiry.",
        "es": "La información de proyectos podrá compartirse con personal o contratistas autorizados únicamente en la medida necesaria para evaluar o prestar los servicios solicitados y con sujeción a acuerdos adecuados de confidencialidad y tratamiento de datos. No publicamos materiales confidenciales de proyectos por el solo hecho de haber sido enviados mediante una consulta."
      }
    ]
  },
  {
    "id": "customer-data-ai",
    "title": {
      "en": "7. Customer Project Data and Artificial Intelligence",
      "es": "7. Datos de proyectos de clientes e inteligencia artificial"
    },
    "body": [
      {
        "en": "Some engagements may require us to handle documents or personal information supplied by business customers. The customer and Studio Base may have different legal roles depending on the project; a separate services agreement or data processing agreement may be required. We do not use confidential customer project materials to train external general-purpose AI models without appropriate authorization and any legally required consent. If we later launch account profiles, business matching, subscriptions, or automated recommendations, we will expand this notice before those features begin processing personal information.",
        "es": "Algunos encargos pueden requerir que tratemos documentos o datos personales proporcionados por clientes empresariales. El cliente y Studio Base pueden desempeñar funciones jurídicas distintas según el proyecto; podría ser necesario celebrar un contrato de servicios o un acuerdo de tratamiento de datos por separado. No utilizamos materiales confidenciales de proyectos de clientes para entrenar modelos externos de inteligencia artificial de propósito general sin la autorización pertinente y los consentimientos exigidos por la ley. Si en el futuro lanzamos perfiles de usuario, vinculación empresarial, suscripciones o recomendaciones automatizadas, ampliaremos este aviso antes de que dichas funciones comiencen a tratar datos personales."
      }
    ]
  },
  {
    "id": "security-retention",
    "title": {
      "en": "8. Security and Retention",
      "es": "8. Seguridad y conservación"
    },
    "body": [
      {
        "en": "We use reasonable technical, administrative, and organizational safeguards appropriate to the information handled, including access controls and measures to protect communications. No system is completely secure. We keep inquiries and related records for the time reasonably necessary to respond, provide services, comply with applicable recordkeeping duties, and resolve disputes; after that, information is deleted, de-identified, or securely disposed of where feasible.",
        "es": "Aplicamos medidas de seguridad técnicas, administrativas y organizativas razonables y adecuadas a la información tratada, incluidas restricciones de acceso y medidas para proteger las comunicaciones. Ningún sistema es completamente seguro. Conservamos las consultas y los registros relacionados durante el tiempo razonablemente necesario para responder, prestar servicios, cumplir las obligaciones aplicables de conservación documental y resolver controversias; posteriormente, la información se elimina, se disocia de sus titulares o se desecha de forma segura cuando resulta viable."
      }
    ]
  },
  {
    "id": "your-rights",
    "title": {
      "en": "9. Your Privacy Rights",
      "es": "9. Sus derechos en materia de privacidad"
    },
    "body": [
      {
        "en": "Depending on applicable law and your relationship with us, you may have rights to request access, correction, deletion, portability, or information about our processing, to withdraw consent, or to opt out of certain processing. To make a request, email info@studiobase.tech with “Privacy Request” in the subject line. We may verify your identity or authority and will respond within legally applicable deadlines. Some requests may be limited by legal exceptions or obligations. We will not discriminate against individuals for exercising rights protected by applicable law. Residents of jurisdictions including Texas, California, Mexico, and the EEA/UK may have additional rights where the relevant laws apply to our operations.",
        "es": "Dependiendo de la legislación aplicable y de su relación con nosotros, usted podrá tener derecho a solicitar acceso, rectificación, supresión, portabilidad o información sobre el tratamiento de sus datos; retirar su consentimiento; u oponerse a determinados tratamientos. Para presentar una solicitud, escriba a info@studiobase.tech con el asunto «Solicitud de privacidad». Podremos verificar su identidad o representación y responderemos dentro de los plazos legalmente aplicables. Algunas solicitudes pueden estar sujetas a excepciones u obligaciones legales. No discriminaremos a las personas por ejercer derechos protegidos por la legislación aplicable. Los residentes de jurisdicciones como Texas, California, México y el Espacio Económico Europeo/Reino Unido podrán contar con derechos adicionales cuando las leyes correspondientes resulten aplicables a nuestras operaciones."
      }
    ]
  },
  {
    "id": "international",
    "title": {
      "en": "10. International Processing",
      "es": "10. Tratamiento internacional de datos"
    },
    "body": [
      {
        "en": "Our service providers and project teams may access or process information in the United States or other countries. Where cross-border processing is subject to applicable privacy requirements, we will use the required notices, agreements, or safeguards. We will identify any additional country-specific requirements before expanding services into new markets.",
        "es": "Nuestros proveedores de servicios y equipos de proyecto podrán acceder a información o tratarla en Estados Unidos u otros países. Cuando el tratamiento transfronterizo esté sujeto a requisitos de privacidad aplicables, utilizaremos los avisos, acuerdos o salvaguardas exigidos. Identificaremos los requisitos adicionales de cada país antes de ampliar los servicios a nuevos mercados."
      }
    ]
  },
  {
    "id": "children",
    "title": {
      "en": "11. Children’s Privacy",
      "es": "11. Privacidad de menores de edad"
    },
    "body": [
      {
        "en": "The Website is intended for businesses and professionals, not children. We do not knowingly collect personal information from children under 13 through the Website. If you believe a child has submitted information, contact us so that we can review and take appropriate action. Our services are not directed to persons under 18.",
        "es": "El Sitio Web está dirigido a empresas y profesionales, no a menores de edad. No recopilamos deliberadamente datos personales de menores de 13 años a través del Sitio Web. Si considera que un menor ha enviado información, contáctenos para que podamos revisarla y adoptar las medidas pertinentes. Nuestros servicios no están dirigidos a personas menores de 18 años."
      }
    ]
  },
  {
    "id": "third-party-links",
    "title": {
      "en": "12. Third-Party Links",
      "es": "12. Enlaces de terceros"
    },
    "body": [
      {
        "en": "The Website may contain links to external websites or tools. Their privacy practices are governed by their own notices. We encourage visitors to review those notices before submitting information.",
        "es": "El Sitio Web puede contener enlaces a sitios web o herramientas externos. Las prácticas de privacidad de dichos terceros se rigen por sus propios avisos. Recomendamos a los visitantes consultarlos antes de proporcionar información."
      }
    ]
  },
  {
    "id": "changes",
    "title": {
      "en": "13. Changes to This Policy",
      "es": "13. Modificaciones a este aviso"
    },
    "body": [
      {
        "en": "We may revise this Policy when our practices, services, vendors, or legal obligations change. We will update the “Last updated” date and provide any additional notice or obtain consent where required.",
        "es": "Podremos modificar este Aviso cuando cambien nuestras prácticas, servicios, proveedores u obligaciones legales. Actualizaremos la fecha de «Última actualización» y proporcionaremos avisos adicionales u obtendremos consentimiento cuando así se exija."
      }
    ]
  }
];
