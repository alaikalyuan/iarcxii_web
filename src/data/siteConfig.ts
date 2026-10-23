import { SiteConfig } from "@/types";
import { Language } from "@/i18n/types";

export const siteConfig: SiteConfig = {
  title: "IARC XII - Industrial Automation & Robotics Competition 2026",
  shortTitle: "IARC XII",
  theme: "ENGINEERING SYSTEMS THAT MOVES THE WORLD",
  themePhilosophy:
    "Filosofi tema ini menggambarkan tujuan IARC XII dalam memperkenalkan Departemen Teknik Elektro Otomasi kepada masyarakat melalui kompetisi robotika dan teknologi rekayasa otomasi. Kegiatan ini menjadi media pengasahan kemampuan teknis dan kreativitas peserta agar menjadi agen perubahan yang memimpin kemajuan teknologi untuk industri dan kesejahteraan masyarakat.",
  organizer: "Departemen Teknik Elektro Otomasi bersama HMDTEO ITS",
  department: "Departemen Teknik Elektro Otomasi",
  faculty: "Fakultas Vokasi",
  university: "Institut Teknologi Sepuluh Nopember (ITS) Surabaya",
  email: "iarc2025.hmdteo@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/iarc.its",
    tiktok: "https://www.tiktok.com/@iarc.its",
    linkedin: "https://www.linkedin.com/company/iarc-its",
  },
  twibbonUrl: "https://its.id/m/TwibbonCompeIARCXII",
  captionUrl: "https://its.id/m/CaptionTwibbonIARCXII",
  totalPrize: "Rp 50.000.000+++",
  objectives: [
    "Mengasah kemampuan teknis dalam bidang robotika, otomasi, dan teknologi rekayasa.",
    "Mendorong kreativitas dan inovasi dalam menciptakan solusi berbasis teknologi terapan.",
    "Meningkatkan kemampuan problem solving melalui tantangan dan studi kasus teknologi riil.",
    "Menerapkan ilmu pengetahuan dan teknologi dalam bentuk karya dan sistem purwarupa nyata.",
    "Menumbuhkan semangat kompetisi sehat dan sportivitas tinggi dalam bidang teknologi.",
    "Menjadi wadah kolaborasi, pertukaran pengetahuan, dan jejaring antar peserta lintas jenjang.",
    "Memperkenalkan serta mengapresiasi inovasi karya teknologi kepada industri dan masyarakat luas.",
  ],
  about: {
    badge: "Tentang Acara",
    title: "ABOUT IARC",
    subtitle: "Industrial Automation & Robotics Competition",
    paragraph1:
      "IARC (Industrial Automation & Robotics Competition) merupakan kompetisi teknologi tahunan yang diselenggarakan oleh Departemen Teknik Elektro Otomasi, Fakultas Vokasi, Institut Teknologi Sepuluh Nopember (ITS) Surabaya. Ajang ini mempertemukan pelajar dan mahasiswa dari seluruh Indonesia untuk menguji kemampuan di bidang robotika dan sistem otomasi melalui tantangan yang aplikatif, kreatif, dan inovatif.",
    paragraph2:
      "IARC menjadi wadah strategis bagi generasi muda dalam mengasah kompetensi teknis, daya pemecahan masalah (problem solving), kreativitas, serta kolaborasi tim yang solid melalui kompetisi rekayasa teknologi berskala nasional.",
    quoteEn:
      "IARC serves as a platform for the younger generation to develop technical skills, creativity, problem solving, and teamwork through a technology competition.",
    highlights: [
      { label: "Penyelenggara", value: "Departemen Teknik Elektro Otomasi ITS" },
      { label: "Tingkat", value: "Nasional & Terbuka untuk Pelajar/Mahasiswa" },
      { label: "Fokus", value: "Robotika Presisi, Otomasi Industri, & IoT" },
    ],
  },
};

export const siteConfigEn: SiteConfig = {
  title: "IARC XII - Industrial Automation & Robotics Competition 2026",
  shortTitle: "IARC XII",
  theme: "ENGINEERING SYSTEMS THAT MOVES THE WORLD",
  themePhilosophy:
    "This theme reflects the mission of IARC XII to introduce the Department of Automation Electrical Engineering to society through robotics competitions and applied automation engineering. The event provides a forum for participants to strengthen technical skills and creativity, equipping them to advance technology for industry and public welfare.",
  organizer: "Department of Automation Electrical Engineering with HMDTEO ITS",
  department: "Department of Automation Electrical Engineering",
  faculty: "Faculty of Vocational Studies",
  university: "Institut Teknologi Sepuluh Nopember (ITS) Surabaya",
  email: "iarc2025.hmdteo@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/iarc.its",
    tiktok: "https://www.tiktok.com/@iarc.its",
    linkedin: "https://www.linkedin.com/company/iarc-its",
  },
  twibbonUrl: "https://its.id/m/TwibbonCompeIARCXII",
  captionUrl: "https://its.id/m/CaptionTwibbonIARCXII",
  totalPrize: "IDR 50,000,000+++",
  objectives: [
    "Honing technical capabilities in robotics, automation, and applied engineering technologies.",
    "Fostering creativity and innovation in building applied technology solutions.",
    "Strengthening problem-solving skills through real-world technological challenges and case studies.",
    "Implementing science and engineering into tangible systems and functional prototypes.",
    "Nurturing healthy competition and sportsmanship across the technology field.",
    "Serving as a hub for collaboration, knowledge exchange, and networking across educational levels.",
    "Showcasing and appreciating technological innovations for industry and the broader community.",
  ],
  about: {
    badge: "About Event",
    title: "ABOUT IARC",
    subtitle: "Industrial Automation & Robotics Competition",
    paragraph1:
      "IARC (Industrial Automation & Robotics Competition) is an annual technology competition organized by the Department of Automation Electrical Engineering, Faculty of Vocational Studies, Institut Teknologi Sepuluh Nopember (ITS) Surabaya. The event convenes students and undergraduates across Indonesia to test capabilities in robotics and automation systems through applied engineering challenges.",
    paragraph2:
      "IARC serves as a platform for the younger generation to hone technical competence, problem-solving skills, and teamwork through national-scale technology competitions.",
    quoteEn:
      "IARC serves as a platform for the younger generation to develop technical skills, creativity, problem solving, and teamwork through a technology competition.",
    highlights: [
      { label: "Organizer", value: "Department of Automation Electrical Engineering ITS" },
      { label: "Level", value: "National & Open for Students / Undergraduates" },
      { label: "Focus", value: "Precision Robotics, Industrial Automation, & IoT" },
    ],
  },
};

export function getSiteConfig(lang: Language = "id"): SiteConfig {
  return lang === "en" ? siteConfigEn : siteConfig;
}

export interface PrizeItem {
  rank: string;
  badge: string;
  rewards: string[];
}

export const PRIZE_DATA: PrizeItem[] = [
  {
    rank: "Juara 1",
    badge: "Champion",
    rewards: [
      "Uang Tunai Pembinaan",
      "Trophy & Plakat Juara Resmi ITS",
      "Sertifikat Juara Berpredikat Resmi",
      "Merchandise Eksklusif IARC XII",
      "Akses Gratis Mentoring & Open Training",
    ],
  },
  {
    rank: "Juara 2",
    badge: "Runner Up",
    rewards: [
      "Uang Tunai Pembinaan",
      "Trophy & Plakat Penghargaan",
      "Sertifikat Juara Berpredikat Resmi",
      "Merchandise Eksklusif IARC XII",
      "Akses Gratis Mentoring & Open Training",
    ],
  },
  {
    rank: "Juara 3",
    badge: "Third Place",
    rewards: [
      "Uang Tunai Pembinaan",
      "Trophy & Plakat Penghargaan",
      "Sertifikat Juara Berpredikat Resmi",
      "Merchandise Eksklusif IARC XII",
      "Akses Gratis Mentoring & Open Training",
    ],
  },
  {
    rank: "Seluruh Peserta",
    badge: "All Participants",
    rewards: [
      "E-Sertifikat Kepesertaan Nasional/Internasional",
      "Akses Eksklusif Kelas Open Training IARC XII",
      "Relasi dan Jejaring Komunitas Otomasi Indonesia",
    ],
  },
];

export const PRIZE_DATA_EN: PrizeItem[] = [
  {
    rank: "1st Place",
    badge: "Champion",
    rewards: [
      "Cash Coaching Prize",
      "Official ITS Champion Trophy & Plaque",
      "Official Certified Winner Certificate",
      "Exclusive IARC XII Merchandise",
      "Free Mentoring & Open Training Access",
    ],
  },
  {
    rank: "2nd Place",
    badge: "Runner Up",
    rewards: [
      "Cash Coaching Prize",
      "Honorary Trophy & Plaque",
      "Official Certified Winner Certificate",
      "Exclusive IARC XII Merchandise",
      "Free Mentoring & Open Training Access",
    ],
  },
  {
    rank: "3rd Place",
    badge: "Third Place",
    rewards: [
      "Cash Coaching Prize",
      "Honorary Trophy & Plaque",
      "Official Certified Winner Certificate",
      "Exclusive IARC XII Merchandise",
      "Free Mentoring & Open Training Access",
    ],
  },
  {
    rank: "All Participants",
    badge: "All Participants",
    rewards: [
      "National / International E-Certificate",
      "Exclusive Access to IARC XII Open Training Classes",
      "Indonesian Automation Community Network",
    ],
  },
];

export function getPrizeData(lang: Language = "id"): PrizeItem[] {
  return lang === "en" ? PRIZE_DATA_EN : PRIZE_DATA;
}
