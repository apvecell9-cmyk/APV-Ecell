export interface Reference {
  name: string;
  subtitle: string;
  tag: string;
  logo: string;
  highlight?: boolean;
  description?: string;
  perks?: string[];
}

export const references: Reference[] = [
  {
    name: "CIBA",
    subtitle: "Centre for Incubation & Business Acceleration",
    tag: "Incubation Partner",
    logo: "/logos/ciba.jpg",
    highlight: true,
    description:
      "Premier incubation ecosystem providing seed support, prototyping labs, legal counsel, and direct investor access to student ventures.",
    perks: ["Seed Funding Access", "Prototyping Labs", "Investor Mentorship"],
  },
  {
    name: "E-Cell IIT Bombay",
    subtitle: "Premier Technological & Entrepreneurial Hub",
    tag: "Reference Partner",
    logo: "/logos/ecell_iitb.jpg",
    description:
      "Collaborating with Asia's largest student-run entrepreneurship body for nationwide mentorship, workshops, and ecosystem exchange.",
    perks: ["National Exposure", "Mentor Connect"],
  },
  {
    name: "E-Cell NEC 2025",
    subtitle: "National Entrepreneurship Challenge",
    tag: "Reference Track",
    logo: "/logos/nec.png",
    description:
      "Benchmarking institutional innovation through high-impact national challenges and structured E-Cell growth tracks.",
    perks: ["National Benchmark", "Leadership Track"],
  },
  {
    name: "Eureka!",
    subtitle: "Asia's Largest B-Model Competition",
    tag: "Flagship Track",
    logo: "/logos/eureka.png",
    description:
      "Paving the way for high-impact student startup pitches, jury evaluation, and venture incubation opportunities.",
    perks: ["Pitch Training", "Venture Incubation"],
  },
  {
    name: "Agnel Polytechnic, Vashi",
    subtitle: "Leading Technical Institution",
    tag: "Host Institution",
    logo: "/logos/logo.png",
    description:
      "Our parent campus fostering technical excellence, state-of-the-art infrastructure, and dedicated E-Cell institutional backing.",
    perks: ["Technical Labs", "Campus Ecosystem"],
  },
];
