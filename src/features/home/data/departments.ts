import type { DeptCardProps } from "@/types/team";

export const departments: DeptCardProps[] = [
  {
    id: "president",
    department: "President",
    subtitle: "Overall E-Cell Leadership & Strategy",
    description:
      "Leading the vision and strategic direction of APV E-Cell, driving innovation, and empowering young founders across campus.",
    headName: "Rosemia James",
    headRole: "President, APV E-Cell",
    headPhoto: "/team/president/head.jpg",
    linkedin: "https://www.linkedin.com/",
    members: [],
  },
  {
    id: "finance",
    department: "Finance & Operations",
    subtitle: "Fiscal Strategy & Budgeting",
    description:
      "Managing financial strategies, budgets, sponsorships, and operational excellence across all E-Cell initiatives.",
    headName: "Ritesh Jogdankar",
    headRole: "Head of Finance",
    headPhoto: "/team/finance/head.jpg",
    members: [
      { name: "Nitu Patil", role: "Team Member" },
      { name: "Ashley Dsouza", role: "Team Member" },
    ],
  },
  {
    id: "technical",
    department: "Technical & Web Development",
    subtitle: "Digital & Engineering Systems",
    description:
      "Driving innovation through cutting-edge web platforms, hackathon infrastructure, and developer training.",
    headName: "Rehan Khan",
    headRole: "Head of Technology & Web Development",
    headPhoto: "/team/technical/head.png",
    linkedin: "https://www.linkedin.com/in/",
    members: [
      { name: "Pranav Ingulkar", role: "Team Member" },
      { name: "Raechel", role: "Team Member" },
      { name: "Sheikh Namira", role: "Team Member" },
    ],
  },
  {
    id: "liaison",
    department: "Liaison & Documentation",
    subtitle: "Institutional & External Relations",
    description:
      "Building strong partnerships, industry connections, and coordinating external collaborations for APV E-Cell.",
    headName: "Harsh Vaidya",
    headRole: "Head of Liaison",
    headPhoto: "/team/liaison/head.jpg",
    members: [
      { name: "Shreya Gupta", role: "Team Member" },
      { name: "Mukadam Mohammed", role: "Team Member" },
    ],
  },
  {
    id: "social-media",
    department: "Social Media & Content",
    subtitle: "Digital Voice & Storytelling",
    description:
      "Creating engaging visual content, podcasting, managing social channels, and amplifying APV E-Cell digital presence.",
    headName: "Shifa Khan",
    headRole: "Head of Social Media",
    headPhoto: "/team/social-media/head.jpg",
    members: [
      { name: "Tanvi Patil", role: "Team Member" },
      { name: "Nandan Temkar", role: "Team Member" },
    ],
  },
  {
    id: "hospitality",
    department: "Hospitality & Logistics",
    subtitle: "Guest Relations & Operations",
    description:
      "Ensuring exceptional experience for guests, judges, speakers, and seamless event management.",
    headName: "Neil Kulkarni",
    headRole: "Head of Hospitality",
    headPhoto: "/team/hospitality/head.jpg",
    members: [
      { name: "Tanvi Gawande", role: "Team Member" },
      { name: "Arnav Gatkal", role: "Team Member" },
    ],
  },
  {
    id: "pr-marketing",
    department: "PR & Marketing",
    subtitle: "Community & Brand Outreach",
    description:
      "Building strong relationships, strategic partnerships, and expanding APV E-Cell community reach across institutions.",
    headName: "Swara Hande",
    headRole: "Head of PR and Marketing",
    headPhoto: "/team/pr-marketing/head.jpg",
    linkedin: "https://www.linkedin.com/in/swara-hande-9a8277356",
    members: [
      { name: "Aarav Mehta", role: "Outreach Lead" },
      { name: "Tanvi Kulkarni", role: "Campus Ambassador" },
      { name: "Rohan Deshmukh", role: "PR Coordinator" },
      { name: "Siddhi Shinde", role: "Partnerships" },
    ],
  },
  {
    id: "design-creative",
    department: "Design & Creative",
    subtitle: "Visual Brand Experience",
    description:
      "Crafting visual stories, high-end brand identities, posters, and creative event aesthetics.",
    headName: "Harshali Bhosale",
    headRole: "Head of Design and Creative",
    headPhoto: "/team/design-creative/head.jpg",
    linkedin: "https://www.linkedin.com/in/harshali-bhosale-8768a3377",
    members: [
      { name: "Mayank Desai", role: "Illustrator" },
      { name: "Nandini Shetty", role: "Graphic Designer" },
      { name: "Kunal Dalvi", role: "Motion Designer" },
      { name: "Diya Wagh", role: "Visual Artist" },
    ],
  },
];
