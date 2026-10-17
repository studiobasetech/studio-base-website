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
    initials: "D.K.",
    industry: "Information Technology",
    service: "Cybersecurity",
    quote:
      "Security was a major consideration for our business. Studio Base helped us approach our technology infrastructure more strategically, with a focus on identifying vulnerabilities, improving protection, and reducing unnecessary risk.",
    rating: 5,
    tone: "cyan",
  },
  {
    initials: "S.T.",
    industry: "Business Strategy",
    service: "Technology Consulting",
    quote:
      "We needed guidance on choosing the right technology and prioritizing our next steps. Studio Base helped us look beyond individual tools and consider how our systems, processes, and long-term business goals fit together.",
    rating: 5,
    tone: "pink",
  },
  {
    initials: "M.P.",
    industry: "Digital Infrastructure",
    service: "Technology Solutions",
    quote:
      "Studio Base brought a practical approach to improving our digital infrastructure. From understanding our requirements to planning implementation, the focus stayed on building a solution that supports our business rather than adding complexity.",
    rating: 5,
    tone: "green",
  },
];
