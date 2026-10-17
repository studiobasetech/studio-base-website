/**
 * Client reviews for the Home "Trusted by Innovative Companies" carousel.
 * Companies are shown by initials only, for client privacy.
 * tone: colour of the card (blue | purple | yellow | cyan | pink | green).
 */
export type Testimonial = {
  initials: string;
  industry: string;
  service: string;
  quote: string;
  rating: number;
  tone: "blue" | "purple" | "yellow" | "cyan" | "pink" | "green";
};

export const testimonials: Testimonial[] = [
  {
    initials: "A.M.",
    industry: "Business Operations",
    service: "AI Automation",
    quote:
      "Studio Base helped us identify repetitive tasks across our operations and turn them into automated workflows. The result is a more efficient process, less manual work, and more time for our team to focus on important priorities.",
    rating: 5,
    tone: "blue",
  },
  {
    initials: "J.R.",
    industry: "Technology",
    service: "Software Engineering",
    quote:
      "We needed a custom software solution that could grow with our business. Studio Base helped us translate our requirements into a clear technical direction and a solution designed around our actual workflows.",
    rating: 5,
    tone: "purple",
  },
  {
    initials: "L.C.",
    industry: "Digital Products",
    service: "Mobile Development",
    quote:
      "Our goal was to create a modern mobile experience for our customers. The team understood the importance of usability, performance, and a consistent experience across devices. Communication throughout the process was clear and professional.",
    rating: 5,
    tone: "yellow",
  },
  {
    initials: "K.B.",
    industry: "Customer Support",
    service: "AI Voice Agents",
    quote:
      "Our customer service has completely transformed since implementing our AI agents. Studio Base helped us deploy realistic voice assistants and automated support workflows that handle hundreds of interactions daily, improving response times and customer satisfaction.",
    rating: 5,
    tone: "pink",
  },
  {
    initials: "S.T.",
    industry: "Business Strategy",
    service: "Technology Consulting",
    quote:
      "Studio Base provided strategic guidance that helped us choose the right technology and prioritize our next steps. Their insights went beyond individual tools and focused on how our systems, processes, and long-term business goals fit together.",
    rating: 5,
    tone: "cyan",
  },
  {
    initials: "M.P.",
    industry: "Digital Platforms",
    service: "Custom Software",
    quote:
      "The team developed a robust digital platform that has streamlined our operations and improved efficiency across multiple departments. From planning to implementation, Studio Base delivered a solution that truly supports our business and future growth.",
    rating: 5,
    tone: "green",
  },
];
