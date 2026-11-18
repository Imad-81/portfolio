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
  fullName: string;
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
  fullName: "Shaik Imaduddin",
  roles: ["SOFTWARE ENGINEER", "BUILDER", "TECH LEAD"],
  bioLine: "SOFTWARE ENGINEER · BUILDER · TECH LEAD",
  links: [
    { label: "LinkedIn", url: "https://linkedin.com", target: "_blank" },
    { label: "GitHub", url: "https://github.com/Imad-81", target: "_blank" },
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
    id: "geovoxel-3d",
    number: "01",
    title: "GEOVOXEL-3D",
    tagline: "Autonomous 3D cadastre & WebGL spatial digital twin pipeline",
    year: "2026",
    category: "GEOSPATIAL AI / DIGITAL TWIN",
    descriptionPlaceholder: "Geospatial intelligence platform transforming 2D land records into 3D volumetric buildings with vertical Bhu-Aadhaar (3D ULPIN) parcel subdivision. Built for Smart India Hackathon (SIH26011), featuring a 5-tier height inference engine fusing Copernicus DEM with satellite vectors, and an interactive 60+ FPS WebGL twin rendering 4,600+ structures.",
    technologies: ["Next.js 16", "Three.js", "Python", "Copernicus DEM", "GDAL", "ISO 19152 LADM"],
    link: "https://github.com/Imad-81/SIH-26011",
    linkLabel: "VIEW REPOSITORY →",
    marker: "01",
  },
  {
    id: "pool-predictive-system",
    number: "02",
    title: "POOL PREDICTIVE OPS",
    tagline: "ML-driven chemical kinetics & automated dosing optimizer",
    year: "2026",
    category: "INDUSTRIAL IOT / PREDICTIVE ML",
    descriptionPlaceholder: "Industrial predictive maintenance system engineered for collective-use pools in Alicante, Spain under Real Decreto 742/2013. Couples physical chemical kinetics with XGBoost to forecast chlorine, pH, and turbidity degradation, computing optimal pump configurations across 525 candidate states in vectorized O(n) time (<2ms).",
    technologies: ["Python", "FastAPI", "React 19", "XGBoost", "PostgreSQL", "Docker", "Open-Meteo"],
    link: "https://github.com/Imad-81/pool-maintenance",
    linkLabel: "VIEW REPOSITORY →",
    marker: "02",
  },
  {
    id: "woxsen-japan-centre",
    number: "03",
    title: "WOXSEN JAPAN CENTRE",
    tagline: "Bilingual web platform & sub-5ms in-memory CMS",
    year: "2026",
    category: "FULL-STACK / SYSTEMS ARCHITECTURE",
    descriptionPlaceholder: "Official bilingual web platform and administrative CMS for the Woxsen Japan Centre at Woxsen University. Features a dual-layer in-memory caching engine delivering sub-5ms public reads, instantaneous 0ms admin navigation, Cloudflare R2 zero-egress asset storage, Better Auth cryptographic sessions, and automated RSVP lead capture.",
    technologies: ["Next.js 16", "React 19", "Tailwind CSS v4", "Prisma", "Neon PostgreSQL", "Cloudflare R2"],
    link: "https://github.com/Imad-81/wjc-main",
    linkLabel: "VIEW REPOSITORY →",
    marker: "03",
  },
  {
    id: "ecell-scrollytelling",
    number: "04",
    title: "E-CELL SCROLLYTELLING",
    tagline: "Sub-frame 120 FPS canvas streaming & venture portal",
    year: "2026",
    category: "CREATIVE ENGINEERING / GRAPHICS",
    descriptionPlaceholder: "Cinematic 120 FPS scrollytelling web platform spanning 1,262 virtual timeline frames. Engineered with a custom binary-pack streaming demuxer, directional predictive preloader, Hermite sub-frame interpolation, procedural Web Audio synthesizer, and Convex real-time data layer.",
    technologies: ["Next.js 16", "HTML5 Canvas", "Convex", "TypeScript", "Cloudflare R2", "Web Audio API"],
    link: "https://github.com/Imad-81/ecell-website",
    linkLabel: "VIEW REPOSITORY →",
    marker: "04",
  },
  {
    id: "mac-tap-detector",
    number: "05",
    title: "CHASSIS TAP DETECTOR",
    tagline: "Hardware IMU sensor tapping on Apple Silicon logic boards",
    year: "2026",
    category: "SYSTEMS & HARDWARE / MACOS KERNEL",
    descriptionPlaceholder: "Low-level Swift macOS systems utility interfacing directly with Apple Silicon's Bosch BMI286 MEMS 6-axis IMU via the Sensor Processing Unit (AppleSPUHIDDevice) at 800 Hz. Implements transient jerk filtering and DC gravity blocking to detect physical chassis knocks in real time without root privileges.",
    technologies: ["Swift 6", "macOS IOKit", "Apple SPU HID", "Signal Processing", "ANSI TUI"],
    link: "https://github.com/Imad-81/mac_tap_detector",
    linkLabel: "VIEW REPOSITORY →",
    marker: "05",
  },
];
