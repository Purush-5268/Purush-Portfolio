export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startYear: number;
  type: "VLSI" | "Embedded" | "Software" | "Research" | "RF";
  bullets: string[];
  atmosphere: string;
  accentColor: string;
  link?: { label: string; url: string };
}

export const experiences: Experience[] = [
  {
    id: "hcl-vlsi",
    role: "VLSI Engineering Trainee",
    company: "HCL",
    location: "Remote",
    period: "Aug 2024 – Present",
    startYear: 2024,
    type: "VLSI",
    bullets: [
      "Directed the formulation of the Safe ALU architecture, reducing switching power consumption by 25% and ranking 1st among 62 engineering candidates.",
      "Executed advanced Physical Design (PD) and Verification projects using the Synopsys RTL-to-GDSII toolchain, focusing on structural coverage and timing-driven synthesis.",
    ],
    atmosphere: "semiconductor",
    accentColor: "#FF5E1E",
  },
  {
    id: "sure-trust-embedded",
    role: "Embedded Systems Intern",
    company: "SURE Trust / ProEd",
    location: "Remote",
    period: "Oct 2025 – Mar 2026",
    startYear: 2025,
    type: "Embedded",
    bullets: [
      "Engineered firmware in Embedded C for IoT applications, including a context-aware text-to-speech hazard monitor utilizing an ESP32, FreeRTOS, and hardware ADCs for real-time multi-sensor data acquisition.",
      "Interfaced environmental sensors and hardware peripherals using UART, I2C, and GPIO interrupts, while validating communication protocols and system reliability for continuous 24/7 dashboards.",
    ],
    atmosphere: "microcontroller",
    accentColor: "#F59E0B",
    link: { label: "Offer Letter", url: "https://drive.google.com/file/d/1ioDRYya02i7UOWIZsEUncYEoZdvpnkQF/view?usp=drive_link" },
  },
  {
    id: "sure-trust-vlsi",
    role: "Integrated VLSI Design Intern (Silicon to GDS)",
    company: "SURE Trust / ProEd",
    location: "Remote",
    period: "May 2026 – Present",
    startYear: 2026,
    type: "VLSI",
    bullets: [
      "Completed 3 core tracks: Semiconductor Fundamentals, RTL Design with Clock Domain Crossing (CDC), and Functional Verification using SystemVerilog/UVM; currently executing Design for Testability (DFT).",
      "Architected multi-module digital systems in Verilog, including a serial pseudo-random bitstream generator with FSM/shift-register pattern matchers and BCD/7-segment display logic.",
    ],
    atmosphere: "semiconductor",
    accentColor: "#FF5E1E",
    link: { label: "Offer Letter", url: "https://drive.google.com/file/d/1vBtpmQ3Q5Zay8mBiiJ7Cve-8krbsc51X/view?usp=sharing" },
  },
  {
    id: "iit-bhubaneswar",
    role: "Summer Research Intern — VLSI & Signal Processing",
    company: "IIT Bhubaneswar (Dept. of ECE)",
    location: "Bhubaneswar, Odisha",
    period: "May 2026 – Jul 2026",
    startYear: 2026,
    type: "Research",
    bullets: [
      "Selected from 1,000+ applicants for an exclusive offline summer internship under Dr. Himanshu Padole to conduct advanced computational research.",
      "Entrusted with full ownership of high-performance BCI signal processing pipelines across 4 massive datasets (>20GB); implemented Butterworth bandpass filtering and Euclidean Alignment (EA) for spatial covariance normalization.",
      "Applied Riemannian Tangent Space projection and Hybrid Stacking Ensembles (SVM, LDA, RF) to optimize EEG classification frameworks, boosting baseline accuracy by 12%.",
    ],
    atmosphere: "signal",
    accentColor: "#38BDF8",
    link: { label: "LinkedIn Post", url: "https://lnkd.in/p/g9ZF6yC7" },
  },
  {
    id: "gaetec",
    role: "Industrial Trainee — RF & Semiconductors",
    company: "GAETEC (DRDO/ISRO Foundry)",
    location: "Hyderabad, TS",
    period: "May 2026 – Jun 2026",
    startYear: 2026,
    type: "RF",
    bullets: [
      "Analyzed MESFET and pHEMT device architectures in the Design section using Keysight tools, focusing on Gallium Arsenide (GaAs) fabrication across high-frequency RF spectrums.",
      "Evaluated ATQC (Assembly, Testing & QC) processes for 100+ components: Die/Wire bonding, Shear/Pull testing, and RF characterization via VNA/PNA; assessed PIND, Acceleration, and Thermal cycles.",
    ],
    atmosphere: "rf",
    accentColor: "#F59E0B",
    link: { label: "Certificate", url: "https://drive.google.com/file/d/1dEMH7Ch-DWP6VfTIg9F7ZDiTR7Z-aSiU/view?usp=sharing" },
  },
  {
    id: "software-training",
    role: "Full-Stack .NET Developer Trainee",
    company: "Software Training",
    location: "Bhimavaram, AP",
    period: "Jun 2024 – Aug 2024",
    startYear: 2024,
    type: "Software",
    bullets: [
      "Completed an intensive .NET full-stack program, mastering C#, ASP.NET Core Web API, and Entity Framework Core for robust backend architecture.",
      "Applied clean architecture and MediatR design patterns, culminating in the end-to-end development of the ArogyaConnect smart hospital platform.",
    ],
    atmosphere: "software",
    accentColor: "#38BDF8",
  },
];
