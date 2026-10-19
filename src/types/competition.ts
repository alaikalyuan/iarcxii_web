export type EducationLevel =
  | "Semua"
  | "SD"
  | "SMP"
  | "SMA/SMK"
  | "Mahasiswa"
  | "International";

export interface CategoryCard {
  id: string;
  name: string;
  level: EducationLevel;
  teamRequirement: string;
  guidebookDocId: string;
  registrationUrl: string;
  fees: {
    batch1: string;
    batch2: string;
    batch3: string;
  };
  highlights: string[];
}

export interface CompetitionTrack {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hardwareSpecs?: string[];
  softwareSpecs?: string[];
  categories: CategoryCard[];
}

export interface CompetitionDivision {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroImage?: string;
  levels: EducationLevel[];
  tracks: CompetitionTrack[];
  scoringRubric: { criterion: string; weight: string; note: string }[];
  stages: { name: string; date: string; description: string }[];
}
