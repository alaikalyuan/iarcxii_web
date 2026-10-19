import { SiteConfig } from "@/types";

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
  bcaAccount: {
    bank: "Bank Central Asia (BCA)",
    accountNumber: "1430996882",
    accountHolder: "Luna Aulia Afifah",
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
};

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
