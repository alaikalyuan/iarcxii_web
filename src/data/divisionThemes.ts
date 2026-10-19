export interface DivisionTheme {
  slug: string;
  colorName: string;
  text: string;
  textHover: string;
  iconBox: string;
  cardHoverBorder: string;
  cardGlow: string;
  tagline: string;
  badge: string;
  pillActive: string;
  trackActive: string;
  specBox: string;
  specTitle: string;
  bulletDot: string;
  heroBgGlow: string;
  btnBorder: string;
}

export const DIVISION_THEMES: Record<string, DivisionTheme> = {
  "automation-challenge": {
    slug: "automation-challenge",
    colorName: "Merah",
    text: "text-rose-400",
    textHover: "group-hover:text-rose-400",
    iconBox: "bg-rose-500/10 text-rose-400 border-rose-500/25",
    cardHoverBorder: "hover:border-rose-500/50",
    cardGlow: "hover:shadow-rose-500/10",
    tagline: "text-rose-400",
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    pillActive: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    trackActive: "bg-rose-500/15 border-rose-500 text-rose-300 shadow-rose-500/10",
    specBox: "border-rose-500/30 bg-navy-900/70",
    specTitle: "text-rose-400",
    bulletDot: "text-rose-400",
    heroBgGlow: "bg-rose-500/15",
    btnBorder: "hover:border-rose-500/50",
  },
  "smart-robotics": {
    slug: "smart-robotics",
    colorName: "Hijau",
    text: "text-emerald-400",
    textHover: "group-hover:text-emerald-400",
    iconBox: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    cardHoverBorder: "hover:border-emerald-500/50",
    cardGlow: "hover:shadow-emerald-500/10",
    tagline: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    pillActive: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    trackActive: "bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-emerald-500/10",
    specBox: "border-emerald-500/30 bg-navy-900/70",
    specTitle: "text-emerald-400",
    bulletDot: "text-emerald-400",
    heroBgGlow: "bg-emerald-500/15",
    btnBorder: "hover:border-emerald-500/50",
  },
  "energy-treasure": {
    slug: "energy-treasure",
    colorName: "Kuning",
    text: "text-amber-400",
    textHover: "group-hover:text-amber-400",
    iconBox: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    cardHoverBorder: "hover:border-amber-500/50",
    cardGlow: "hover:shadow-amber-500/10",
    tagline: "text-amber-400",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    pillActive: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    trackActive: "bg-amber-500/15 border-amber-500 text-amber-300 shadow-amber-500/10",
    specBox: "border-amber-500/30 bg-navy-900/70",
    specTitle: "text-amber-400",
    bulletDot: "text-amber-400",
    heroBgGlow: "bg-amber-500/15",
    btnBorder: "hover:border-amber-500/50",
  },
  vortex: {
    slug: "vortex",
    colorName: "Ungu",
    text: "text-purple-400",
    textHover: "group-hover:text-purple-400",
    iconBox: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    cardHoverBorder: "hover:border-purple-500/50",
    cardGlow: "hover:shadow-purple-500/10",
    tagline: "text-purple-400",
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    pillActive: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    trackActive: "bg-purple-500/15 border-purple-500 text-purple-300 shadow-purple-500/10",
    specBox: "border-purple-500/30 bg-navy-900/70",
    specTitle: "text-purple-400",
    bulletDot: "text-purple-400",
    heroBgGlow: "bg-purple-500/15",
    btnBorder: "hover:border-purple-500/50",
  },
};

export const DEFAULT_THEME: DivisionTheme = {
  slug: "default",
  colorName: "Gold",
  text: "text-gold-400",
  textHover: "group-hover:text-gold-400",
  iconBox: "bg-gold-500/10 text-gold-400 border-gold-500/20",
  cardHoverBorder: "hover:border-gold-500/50",
  cardGlow: "hover:shadow-gold-500/10",
  tagline: "text-gold-400",
  badge: "bg-gold-500/15 text-gold-300 border-gold-500/30",
  pillActive: "bg-gold-500/20 text-gold-400 border-gold-500/40",
  trackActive: "bg-gold-500/15 border-gold-500 text-gold-400 shadow-gold-500/10",
  specBox: "border-gold-500/30 bg-navy-900/70",
  specTitle: "text-gold-400",
  bulletDot: "text-gold-400",
  heroBgGlow: "bg-gold-500/10",
  btnBorder: "hover:border-gold-500/50",
};

export function getDivisionTheme(slug: string): DivisionTheme {
  return DIVISION_THEMES[slug] || DEFAULT_THEME;
}
