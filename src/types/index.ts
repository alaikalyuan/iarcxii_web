export * from "./guidebook";
export * from "./competition";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
}

export interface TimelineTrack {
  id: string;
  name: string;
  targetDivisions: string;
  milestones: TimelineMilestone[];
}

export interface SiteConfig {
  title: string;
  shortTitle: string;
  theme: string;
  themePhilosophy: string;
  organizer: string;
  department: string;
  faculty: string;
  university: string;
  email: string;
  socials: {
    instagram: string;
    tiktok: string;
    linkedin: string;
  };
  twibbonUrl: string;
  captionUrl: string;
  totalPrize: string;
  objectives: string[];
  about?: {
    badge: string;
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    quoteEn: string;
    highlights: Array<{ label: string; value: string }>;
  };
}
