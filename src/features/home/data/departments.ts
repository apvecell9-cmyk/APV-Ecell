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
    members: [],
  },
  {
    id: "technical",
    department: "Technical & Web Development",
    subtitle: "Digital & Engineering Systems",
    description:
    "Driving innovation through cutting-edge web platforms, hackathon infrastructure, and developer training.",
    headName: "Rehan Khan",
    headRole: "Head of Technology & Web Development",
    members: [
      { name: "Pranav Ingulkar", role: "Team Member", image: "pranav.jpg" },
      { name: "Raechel", role: "Team Member", image: "rachael.jpg" },
      { name: "Sheikh Namira", role: "Team Member", image: "namira.jpg" },
    ],
  },
  {
    id: "events-planning",
    department: "Events & Planning",
    subtitle: "Visual Brand Experience",
    description:
      "Crafting visual stories, high-end brand identities, posters, and creative event aesthetics.",
    headName: "Palak Panchala",
    headRole: "Head of Events and Planning",
    members: [
      { name: "Tarun Bodal", role: "Team Member", image: "tarun_bodal.jpg" },
      { name: "Ananya", role: "Team Member", image: "ananya.jpg" },
      { name: "Someone", role: "Team Member", image: "remember.jpg" },
    ],
  },
  {
    id: "pr-marketing",
    department: "PR & Marketing",
    subtitle: "Community & Brand Outreach",
    description:
      "Building strong relationships, strategic partnerships, and expanding APV E-Cell community reach across institutions.",
    headName: "Trisha Jainwal",
    headRole: "Head of PR and Marketing",
    members: [{ name: "Om Mane", role: "Team Member", image: "om.jpg" }],
  },
  {
    id: "liaison",
    department: "Liaison & Documentation",
    subtitle: "Institutional & External Relations",
    description:
      "Building strong partnerships, industry connections, and coordinating external collaborations for APV E-Cell.",
    headName: "Harsh Vaidya",
    headRole: "Head of Liaison",
    members: [
      { name: "Shreya Gupta", role: "Team Member", image: "shreya.jpg" },
      { name: "Mukadam Mohammed", role: "Team Member", image: "muhammad.jpg" },
    ],
  },
  {
    id: "finance",
    department: "Finance & Operations",
    subtitle: "Fiscal Strategy & Budgeting",
    description:
      "Managing financial strategies, budgets, sponsorships, and operational excellence across all E-Cell initiatives.",
    headName: "Ritesh Jogdankar",
    headRole: "Head of Finance",
    members: [
      { name: "Nitu Patil", role: "Team Member", image: "nitu.jpg" },
      { name: "Ashley Dsouza", role: "Team Member", image: "ashley.jpg" },
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
    members: [
      { name: "Tanvi Patil", role: "Team Member", image: "tanvi.jpg" },
      { name: "Nandan Temkar", role: "Team Member", image: "nandan.jpg" },
      { name: "Mayuresh", role: "Team Member", image: "mayuresh.jpg" },
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
    members: [
      { name: "Tanvi Gawande", role: "Team Member", image: "tanvi.jpg" },
      { name: "Arnav Gatkal", role: "Team Member", image: "arnav.jpg" },
    ],
  },
];
