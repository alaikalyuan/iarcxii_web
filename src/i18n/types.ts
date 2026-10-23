export type Language = "id" | "en";

export interface NavTranslations {
  about: string;
  competitions: string;
  registrationFlow: string;
  timeline: string;
  faq: string;
  mainGuidebook: string;
  registerNow: string;
  openMenu: string;
  closeMenu: string;
  menu: string;
}

export interface HeroTranslations {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  ctaButton: string;
}

export interface BentoTranslations {
  sectionBadge: string;
  sectionTitle: string;
  aboutTitlePrefix: string;
  aboutTitleHighlight: string;
  aboutSubtitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutHighlights: Array<{ label: string; value: string }>;
  prizeTitle: string;
  prizeTotalPrefix: string;
  prizeFootnote: string;
  prizeRanks: {
    first: string;
    second: string;
    third: string;
    all: string;
  };
  prizeBadges: {
    first: string;
    second: string;
    third: string;
    all: string;
  };
  prizeRewards: {
    first: string[];
    second: string[];
    third: string[];
    all: string[];
  };
  themePhilosophyTitle: string;
  themePhilosophyText: string;
  organizerLabel: string;
  carouselCaptions: string[];
}

export interface PrizeTranslations {
  sectionBadge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  totalPrizeLabel: string;
  totalPrizeSub: string;
  firstPlaceTitle: string;
  firstPlaceBadge: string;
  secondPlaceTitle: string;
  secondPlaceBadge: string;
  thirdPlaceTitle: string;
  thirdPlaceBadge: string;
  allParticipantsTitle: string;
  allParticipantsBadge: string;
  allParticipantsDesc: string;
  exploreCompetitionsCta: string;
  officialCertificationNotice: string;
}

export interface CompetitionTranslations {
  sectionBadge: string;
  sectionTitle: string;
  levelFilters: Record<string, string>;
  openStatus: string;
  tracksLabel: string;
  viewDetails: string;
  targetLevelsPrefix: string;
}

export interface FlowTranslations {
  sectionBadge: string;
  sectionTitle: string;
  countdownPrefix: string;
  countdownDays: string;
  countdownHours: string;
  countdownMinutes: string;
  countdownSeconds: string;
  countdownClosed: string;
  step1Title: string;
  step1Desc: string;
  step1Action: string;
  step2Title: string;
  step2Desc: string;
  step2Action: string;
  step3Title: string;
  step3Desc: string;
  step3ActionTwibbon: string;
  step3ActionCaption: string;
  step4Title: string;
  step4Desc: string;
  step4Notice: string;
  step5Title: string;
  step5Desc: string;
}

export interface TimelineTranslations {
  sectionBadge: string;
  sectionTitle: string;
  trackA: string;
  trackB: string;
  statusCompleted: string;
  statusActive: string;
  statusUpcoming: string;
}

export interface FaqTranslations {
  sectionBadge: string;
  sectionTitle: string;
}

export interface FooterTranslations {
  aboutText: string;
  navHeading: string;
  docsHeading: string;
  contactHeading: string;
  mainGuidebook: string;
  downloadTwibbon: string;
  copyCaption: string;
  rightsReserved: string;
  departmentName: string;
  switchLanguage: string;
}

export interface CompetitionDetailTranslations {
  backToHome: string;
  divisionTracks: string;
  hardwareSpecs: string;
  softwareSpecs: string;
  categories: string;
  teamRequirement: string;
  registrationFee: string;
  stages: string;
  scoringCriteria: string;
  registerCategory: string;
  guidebookCategory: string;
  noSpecs: string;
  stageDatePrefix: string;
  weightPrefix: string;
}

export interface ChatbotTranslations {
  badge: string;
  title: string;
  subtitle: string;
  welcomeMessage: string;
  inputPlaceholder: string;
  sendTooltip: string;
  resetTooltip: string;
  suggestedHeading: string;
  suggestedQueries: string[];
  disclaimer: string;
}

export interface TranslationDictionary {
  nav: NavTranslations;
  hero: HeroTranslations;
  bento: BentoTranslations;
  prizes: PrizeTranslations;
  competitions: CompetitionTranslations;
  flow: FlowTranslations;
  timeline: TimelineTranslations;
  faq: FaqTranslations;
  footer: FooterTranslations;
  competitionDetail: CompetitionDetailTranslations;
  chatbot: ChatbotTranslations;
}
