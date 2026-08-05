export interface Reference {
  name: string;
  subtitle: string;
  tag: string;
  highlight?: boolean;
}

export const references: Reference[] = [
  {
    name: "E-Cell NEC",
    subtitle: "National Entrepreneurship Challenge 2025",
    tag: "Reference",
  },
  {
    name: "Agnel Polytechnic, Vashi",
    subtitle: "Leading Technical Education Institution",
    tag: "Institution",
  },
  {
    name: "E-Cell IIT Bombay",
    subtitle: "Premier Technological Institute in India",
    tag: "Reference",
  },
  {
    name: "Eureka!",
    subtitle: "Startup Idea Pitching Competition",
    tag: "Reference",
  },
  {
    name: "CIBA",
    subtitle: "Centre for Incubation & Business Acceleration",
    tag: "Incubation Partner",
    highlight: true,
  },
];
