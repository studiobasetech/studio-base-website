/**
 * Content for the Products & Services page.
 * Edit the text here; the design lives in sections/products-services/.
 *
 * accent picks the color: "yellow" | "purple" | "blue" | "cyan"
 */

export type Accent = "yellow" | "purple" | "blue" | "cyan";

/* ------------------------------------------------------------------ */
/*  Our Technology Products                                            */
/* ------------------------------------------------------------------ */

export const techProducts = [
  {
    id: "hcrm-ai",
    title: "HCRM AI",
    subtitle: "AI-Powered Business Automation Platform",
    description:
      "Automate client management, communication, project tracking, and team operations with artificial intelligence.",
    capabilities: [
      "AI Sales Agents",
      "Automated Customer Communication",
      "Lead Qualification Automation",
      "CRM Process Automation",
      "Intelligent Workflow Management",
      "Business Process Optimization",
      "Data Analysis & Insights",
    ],
    image: "/images/hcrm-ai.png",
    href: "/contact",
    accent: "yellow" as Accent,
  },
  {
    id: "baselead-ai",
    title: "BaseLead AI",
    subtitle: "AI-Powered Client Acquisition & Sales Intelligence Platform",
    description:
      "Find and connect with potential clients using artificial intelligence, identify business opportunities, and amplify your sales process.",
    capabilities: [
      "AI-Powered Lead Discovery",
      "Customer Prospect Identification",
      "Business Opportunity Analysis",
      "Intelligent Lead Qualification",
      "Automated Sales Research",
      "Personalized Outreach Generation",
      "Sales Pipeline Management",
      "CRM Integration",
    ],
    image: "/images/baselead-ai.png",
    href: "/contact",
    accent: "purple" as Accent,
  },
];

/* ------------------------------------------------------------------ */
/*  Our Technology Services                                            */
/* ------------------------------------------------------------------ */

// icon names match components in sections/products-services/TechServices.tsx
export const techServices = [
  {
    icon: "ai",
    title: "Artificial Intelligence\n& Business Automation",
    description:
      "AI agents, intelligent process automation, sales automation, workflow automation, and custom AI integrations.",
    accent: "yellow" as Accent,
  },
  {
    icon: "software",
    title: "Custom\nSoftware Engineering",
    description:
      "Enterprise software development, SaaS platforms, APIs, databases, internal business systems, and software optimization.",
    accent: "purple" as Accent,
  },
  {
    icon: "apps",
    title: "Application\nDevelopment",
    description:
      "Mobile applications, web applications, cross-platform solutions, application architecture, and maintenance.",
    accent: "blue" as Accent,
  },
  {
    icon: "web",
    title: "Digital Platforms\n& Web Engineering",
    description:
      "Corporate websites, e-commerce platforms, customer portals, web-based business systems, and digital optimization.",
    accent: "cyan" as Accent,
  },
  {
    icon: "security",
    title: "Cybersecurity\nSolutions",
    description:
      "Security assessments, vulnerability analysis, penetration testing, application security, data protection, and monitoring.",
    accent: "blue" as Accent,
  },
  {
    icon: "cloud",
    title: "Software Deployment\n& Cloud Integration",
    description:
      "Cloud infrastructure, server deployment, system integration, DevOps, scalable architecture, and cloud optimization.",
    accent: "purple" as Accent,
  },
  {
    icon: "analytics",
    title: "Business Intelligence\n& Analytics",
    description:
      "Business intelligence systems, analytics dashboards, data integration, predictive analytics, and AI-based data solutions.",
    accent: "cyan" as Accent,
  },
  {
    icon: "strategy",
    title: "Technology Strategy\n& AI Consulting",
    description:
      "Technology strategy, AI adoption consulting, software architecture, digital transformation planning, and process optimization.",
    accent: "yellow" as Accent,
  },
];

/* ------------------------------------------------------------------ */
/*  Why Studio Base                                                    */
/* ------------------------------------------------------------------ */

export const reasons = [
  {
    icon: "innovation",
    title: "Innovative\nTechnology",
    description: "Cutting-edge AI solutions designed for real business impact.",
    accent: "purple" as Accent,
  },
  {
    icon: "results",
    title: "Measurable\nResults",
    description: "Increased efficiency, productivity and growth.",
    accent: "yellow" as Accent,
  },
  {
    icon: "expertise",
    title: "Trusted\nExpertise",
    description:
      "A network of specialized experts in AI, software, and cybersecurity.",
    accent: "blue" as Accent,
  },
  {
    icon: "scalable",
    title: "Scalable\nSolutions",
    description: "Technology that grows with your business.",
    accent: "purple" as Accent,
  },
];
