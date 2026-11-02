export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  category: "academic" | "competition" | "research" | "certification" | "radio";
  accentColor: string;
  icon: "star" | "trophy" | "chip" | "signal" | "certificate";
  metric?: string;
  link?: { label: string; url: string };
}

export const achievements: Achievement[] = [
  {
    id: "cgpa",
    title: "9.73 / 10 CGPA",
    subtitle: "Vishnu Institute of Technology",
    description: "Maintained exceptional academic performance across all semesters of B.Tech ECE, consistently ranking among the top students.",
    year: "2023–2027",
    category: "academic",
    accentColor: "#F59E0B",
    icon: "star",
    metric: "9.73",
  },
  {
    id: "hustlethon",
    title: "1st Place — Hustlethon 2k25",
    subtitle: "IoT Aquaculture Water Testing Solution",
    description: "Engineered the winning IoT Aquaculture Water Testing solution (AQMD) out of 100+ competing teams.",
    year: "2025",
    category: "competition",
    accentColor: "#FF5E1E",
    icon: "trophy",
    metric: "#1 of 100+",
  },
  {
    id: "spark-tank",
    title: "1st Runner-Up — Spark Tank",
    subtitle: "E-Cell VITB — INR 30,000 Cash Prize",
    description: "Led a 4-member cross-functional team to secure an INR 30k cash prize among 50+ teams from E-Cell VITB for the AQMD project.",
    year: "2025",
    category: "competition",
    accentColor: "#F59E0B",
    icon: "trophy",
    metric: "INR 30,000",
  },
  {
    id: "riscv-tapeout",
    title: "Top 22 Nationally — RISC-V Tapeout",
    subtitle: "Advanced 10-Week RTL-to-GDSII Program",
    description: "Completed an intensive 10-week RTL-to-GDSII flow for a 32-bit RISC-V core, achieving 100% DRC/LVS cleanliness and ranking Top 22 nationally.",
    year: "2025",
    category: "research",
    accentColor: "#FF5E1E",
    icon: "chip",
    metric: "Top 22",
    link: { label: "View GitHub Repo", url: "https://github.com/Purush-5268/Paidipilli_Purushotham_RISC-V-SOC-VSD-Week_9" },
  },
  {
    id: "ham-radio",
    title: "HAM Radio Operator",
    subtitle: "General License — Vishnu Space Applications Center",
    description: "Holds a General License as a licensed Amateur Radio Operator. Actively operates at the Vishnu Space Applications Center.",
    year: "2024",
    category: "radio",
    accentColor: "#38BDF8",
    icon: "signal",
    metric: "General License",
  },
  {
    id: "hcl-cert",
    title: "HCL VLSI Foundation",
    subtitle: "Certification — HCL",
    description: "Certified in VLSI Foundation covering digital design fundamentals, HDL, and verification methodologies.",
    year: "2024",
    category: "certification",
    accentColor: "#FF5E1E",
    icon: "certificate",
    metric: "Certified",
    link: { label: "LinkedIn Credential", url: "https://www.linkedin.com/posts/paidipilli-purushotham-b468152ba_vlsi-foundation-hcl-activity-7433912176521895936-4duT" },
  },
  {
    id: "nptel-comm",
    title: "NPTEL Elite — Communication Systems",
    subtitle: "NPTEL Certification",
    description: "Achieved Elite standing in NPTEL's Communication Systems course.",
    year: "2024",
    category: "certification",
    accentColor: "#38BDF8",
    icon: "certificate",
    metric: "Elite",
    link: { label: "LinkedIn Credential", url: "https://www.linkedin.com/posts/paidipilli-purushotham-b468152ba_nptel-principles-of-communication-systems-activity-7433920005244776449-1cqP" },
  },
  {
    id: "vlsi-soc",
    title: "VLSI SoC Design Certification",
    subtitle: "SoC Design Course",
    description: "Completed VLSI SoC Design certification covering system-on-chip architecture, integration, and design flows.",
    year: "2024",
    category: "certification",
    accentColor: "#FF5E1E",
    icon: "certificate",
    metric: "Certified",
    link: { label: "LinkedIn Credential", url: "https://www.linkedin.com/posts/paidipilli-purushotham-b468152ba_advancing-in-vlsi-with-verilog-ugcPost-7296909286155198464-vS29" },
  },
  {
    id: "nptel-iot",
    title: "NPTEL Elite+ — IoT",
    subtitle: "NPTEL Certification",
    description: "Achieved Elite+ (highest tier) standing in NPTEL's IoT course.",
    year: "2024",
    category: "certification",
    accentColor: "#F59E0B",
    icon: "certificate",
    metric: "Elite+",
    link: { label: "LinkedIn Credential", url: "https://www.linkedin.com/posts/paidipilli-purushotham-b468152ba_my-first-nptel-certificate-in-introduction-ugcPost-7278086650004455424-2-fH" },
  },
];
