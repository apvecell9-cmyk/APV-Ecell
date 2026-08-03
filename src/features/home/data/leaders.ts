export interface Leader {
  name: string;
  role: string;
  image: string;
  quote: string;
  tag: string;
  linkedin?: string;
}

export const leaders: Leader[] = [
  {
    name: "Mrs. Saly Antony",
    role: "Principal, Agnel Polytechnic",
    image: "https://ecellapv.in/principal.jpeg",
    quote:
      "At Agnel Polytechnic, we promote innovation, creativity, and self-reliance through our E-Cell. Entrepreneurship empowers students to solve real-world problems and think independently. Let's continue nurturing future-ready, self-reliant entrepreneurs.",
    tag: "Academic Visionary",
  },
  {
    name: "Mr. Pranavkumar Bhadane",
    role: "APV E-Cell In-charge",
    image: "https://ecellapv.in/Pranavkumar%20Bhadane.jpg",
    quote:
      "Our E-Cell fosters innovation, leadership, and entrepreneurship beyond the classroom. We empower students to think independently, pitch real-world ideas, and connect with industry leaders to become confident changemakers.",
    tag: "Faculty Leader",
  },
  {
    name: "Soham Dhanokar",
    role: "President, APV E-Cell",
    image: "https://ecellapv.in/Soham%20Dhanokar%20(President).png",
    quote:
      "Leading the vision and strategic direction of APV E-Cell. Together with our department heads, we are creating an inclusive ecosystem where resilience, creativity, and real social impact drive student success.",
    tag: "Student President",
    linkedin: "https://www.linkedin.com/in/soham-dhanokar-13807a355",
  },
];
