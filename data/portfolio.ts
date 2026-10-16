/**
 * Portfolio content. Edit the projects below to change the cards on
 * /portfolio. Each project belongs to one category (the filter chips at
 * the top) and uses one accent colour.
 */
import type { Accent } from "./services";

export type PortfolioCategory = {
  id: string;
  label: string; // shown on two lines: "AI Solutions\n& Automation"
  icon: "brain" | "code" | "phone" | "layers" | "shield";
  accent: Accent;
};

export const portfolioCategories: PortfolioCategory[] = [
  { id: "ai", label: "AI Solutions\n& Automation", icon: "brain", accent: "blue" },
  { id: "software", label: "Software\nEngineering", icon: "code", accent: "purple" },
  { id: "mobile", label: "Mobile\nApplications", icon: "phone", accent: "yellow" },
  { id: "platforms", label: "Digital\nPlatforms", icon: "layers", accent: "cyan" },
  { id: "security", label: "Cybersecurity\nSolutions", icon: "shield", accent: "blue" },
];

export type Project = {
  id: string;
  category: string; // id from portfolioCategories
  tag: string; // small label on the image
  title: string;
  client: string;
  image: string;
  accent: Accent;
  challenge: string;
  solution: string;
  features: string[];
  results: string[];
};

export const projects: Project[] = [
  {
    id: "ai-sales-automation",
    category: "ai",
    tag: "AI & Automation",
    title: "AI Sales Automation System",
    client: "Real Estate Company",
    image: "/images/portfolio/project-ai-sales-blue.jpg",
    accent: "blue",
    challenge:
      "Manually handling leads and follow-ups was time consuming and resulted in lost opportunities.",
    solution:
      "AI-powered sales agents with automated communication and CRM integration.",
    features: [
      "Lead qualification",
      "Automated outreach",
      "CRM synchronization",
      "Appointment scheduling",
    ],
    results: [
      "3x more qualified leads",
      "70% reduction in manual work",
      "45% increase in booked appointments",
    ],
  },
  {
    id: "property-management-platform",
    category: "software",
    tag: "Custom Software",
    title: "Property Management Platform",
    client: "Vacation Rental Agency",
    image: "/images/portfolio/project-property.jpg",
    accent: "purple",
    challenge:
      "Operations, bookings, and client communication were managed across multiple tools.",
    solution:
      "Custom web platform to centralize property management, reservations, and client communication.",
    features: [
      "Property and booking management",
      "Automated reporting",
      "Payment processing integration",
      "Owner and tenant portals",
    ],
    results: [
      "60% improvement in operational efficiency",
      "40% increase in direct bookings",
      "Centralized management in one platform",
    ],
  },
  {
    id: "wellness-nutrition-app",
    category: "mobile",
    tag: "Mobile Application",
    title: "Wellness & Nutrition Mobile App",
    client: "Health & Wellness Brand",
    image: "/images/portfolio/project-wellness.jpg",
    accent: "cyan",
    challenge:
      "Needed a custom mobile app to engage users and deliver personalized nutrition plans.",
    solution:
      "iOS & Android app with AI recommendations, analytics, and scalable infrastructure.",
    features: [
      "Personalized meal plans",
      "Workout and nutrition tracking",
      "AI recommendations",
      "Progress analytics",
    ],
    results: [
      "100K+ downloads in 6 months",
      "4.8 average rating",
      "65% user retention rate",
    ],
  },
  {
    id: "ecommerce-platform",
    category: "platforms",
    tag: "Digital Platform",
    title: "E-Commerce Platform",
    client: "Home Decor Brand",
    image: "/images/portfolio/project-ecommerce-gold.jpg",
    accent: "yellow",
    challenge:
      "Needed a modern, scalable e-commerce platform with an optimized user experience.",
    solution: "Custom shopping solution with integrations and automation.",
    features: [
      "Custom design and development",
      "Inventory management",
      "Payment integrations",
      "SEO optimization",
    ],
    results: [
      "3x increase in online sales",
      "50% faster load times",
      "Improved customer experience and conversions",
    ],
  },
  {
    id: "security-infrastructure",
    category: "security",
    tag: "Cybersecurity",
    title: "Security Infrastructure Enhancement",
    client: "Financial Services Company",
    image: "/images/portfolio/project-security-blue.jpg",
    accent: "blue",
    challenge: "Outdated infrastructure and security vulnerabilities.",
    solution:
      "Comprehensive cybersecurity assessment, infrastructure hardening, and monitoring system.",
    features: [
      "Security assessment & vulnerability analysis",
      "Infrastructure optimization",
      "Real-time threat monitoring",
      "Employee security training",
    ],
    results: [
      "90% reduction in security risks",
      "Zero major security incidents",
      "Full compliance with industry standards",
    ],
  },
  {
    id: "ai-lead-generation",
    category: "ai",
    tag: "AI & Data Platform",
    title: "AI Lead Generation Platform",
    client: "B2B Services Company",
    image: "/images/portfolio/project-leadgen.jpg",
    accent: "purple",
    challenge:
      "Difficulty finding qualified leads and high customer acquisition costs.",
    solution:
      "AI-powered platform with data enrichment, personalized outreach, and analytics.",
    features: [
      "Lead discovery and scoring",
      "Automated outreach sequences",
      "Pipeline management",
      "Sales analytics dashboard",
    ],
    results: [
      "4x more qualified opportunities",
      "60% reduction in acquisition cost",
      "35% increase in sales conversions",
    ],
  },
];
