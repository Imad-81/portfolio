export interface WorkExperience {
  id: string;
  number: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  descriptionPlaceholder: string;
  details?: string[];
  marker: string; // Sleek typographic mark for bottom timeline, e.g. "E", "SC", "AIRC"
  logoUrl?: string; // Optional real logo path when available
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  year: string;
  category: string;
  descriptionPlaceholder: string;
  technologies: string[];
  link?: string;
  linkLabel?: string;
  marker: string; // e.g. "01", "02", "03"
  imageUrl?: string;
}

export interface ProfileData {
  name: string;
  roles: string[];
  bioLine: string;
  links: {
    label: string;
    url: string;
    target?: string;
  }[];
}

export const PROFILE: ProfileData = {
  name: "IMAD",
  roles: ["SOFTWARE ENGINEER", "BUILDER", "TECH LEAD"],
  bioLine: "SOFTWARE ENGINEER · BUILDER · TECH LEAD",
  links: [
    { label: "LinkedIn", url: "https://linkedin.com", target: "_blank" },
    { label: "GitHub", url: "https://github.com", target: "_blank" },
    { label: "Resume", url: "#resume", target: "_blank" },
  ],
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: "e-cell",
    number: "01",
    company: "E-CELL",
    role: "HEAD OF TECH",
    period: "MAY 2026 — PRESENT",
    location: "CAMPUS",
    descriptionPlaceholder: "Leading technology initiatives, technical architecture, and development teams across core entrepreneurial platforms.",
    details: [
      "Technical leadership and architectural oversight",
      "System design and high-reliability web infrastructure",
      "Engineering team mentoring and project delivery"
    ],
    marker: "E",
  },
  {
    id: "student-council",
    number: "02",
    company: "STUDENT COUNCIL",
    role: "CO-TECH LEAD",
    period: "JANUARY 2026 — MARCH 2026",
    location: "CAMPUS",
    descriptionPlaceholder: "Co-led technical direction and software operations supporting student body communication and event management systems.",
    details: [
      "Cross-functional collaboration and platform delivery",
      "System integration and event software coordination",
      "Digital student operations workflow modernization"
    ],
    marker: "SC",
  },
  {
    id: "airc-woxsen",
    number: "03",
    company: "AIRC WOXSEN",
    role: "AI/ML & FULL STACK INTERN",
    period: "MAY 2026 — PRESENT",
    location: "HYDERABAD",
    descriptionPlaceholder: "Research and implementation of AI/ML models coupled with full-stack interfaces and scalable data pipelines.",
    details: [
      "Applied machine learning and neural architecture pipelines",
      "Full-stack interface design and high-performance APIs",
      "Model inference optimization and experimental validation"
    ],
    marker: "AIRC",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "project-01",
    number: "01",
    title: "DISTRIBUTED RUNTIME",
    tagline: "Low-latency scheduling & worker coordination engine",
    year: "2026",
    category: "SYSTEMS / DISTRIBUTED ARCHITECTURE",
    descriptionPlaceholder: "High-throughput scheduling runtime designed for deterministic state coordination and fault-tolerant job dispatch across worker nodes.",
    technologies: ["TypeScript", "Next.js", "Distributed State", "WebSockets"],
    link: "#",
    linkLabel: "VIEW PROJECT →",
    marker: "01",
  },
  {
    id: "project-02",
    number: "02",
    title: "NEURAL PIPELINE",
    tagline: "Streaming inference & edge evaluation framework",
    year: "2026",
    category: "ARTIFICIAL INTELLIGENCE / RESEARCH",
    descriptionPlaceholder: "Streamlined inference pipeline architected for real-time model execution, latency monitoring, and multi-tenant telemetry aggregation.",
    technologies: ["Python", "PyTorch", "gRPC", "Next.js", "Edge Compute"],
    link: "#",
    linkLabel: "VIEW PROJECT →",
    marker: "02",
  },
  {
    id: "project-03",
    number: "03",
    title: "AUTONOMOUS CORE",
    tagline: "Deterministic multi-agent execution protocol",
    year: "2026",
    category: "INTELLIGENT SYSTEMS",
    descriptionPlaceholder: "Autonomous orchestration environment featuring verifiable workflow graphs, structured memory retrieval, and transactional state validation.",
    technologies: ["TypeScript", "Next.js", "Vector DB", "State Machine"],
    link: "#",
    linkLabel: "VIEW PROJECT →",
    marker: "03",
  },
];
