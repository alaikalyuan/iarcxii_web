import { TimelineTrack } from "@/types";
import { Language } from "@/i18n/types";

export const TIMELINE_TRACKS: TimelineTrack[] = [
  {
    id: "track-a",
    name: "Smart Robotics · PLC · Energy Treasure",
    targetDivisions: "Smart Robotics, Automation Challenge (PLC), Energy Treasure",
    milestones: [
      {
        date: "25 Sep - 18 Okt 2026",
        title: "Pendaftaran Gelombang 1 (Batch 1)",
        description: "Periode early bird dengan biaya pendaftaran paling terjangkau.",
        status: "completed",
      },
      {
        date: "19 Okt - 15 Nov 2026",
        title: "Pendaftaran Gelombang 2 (Batch 2)",
        description: "Pendaftaran reguler untuk seluruh tim dari semua jenjang pendidikan.",
        status: "active",
      },
      {
        date: "16 Nov - 13 Des 2026",
        title: "Pendaftaran Gelombang 3 (Batch 3)",
        description: "Gelombang pendaftaran terakhir sebelum pelaksanaan babak penyisihan.",
        status: "upcoming",
      },
      {
        date: "20 Desember 2026",
        title: "Technical Meeting Babak Penyisihan",
        description: "Penjelasan teknis aturan main, simulasi soal, dan format pengumpulan video secara daring via Zoom.",
        status: "upcoming",
      },
      {
        date: "26 - 27 Desember 2026",
        title: "Babak Penyisihan Daring",
        description: "Pengerjaan ladder diagram CX-Programmer live Zoom (PLC) dan kurasi video robotika online.",
        status: "upcoming",
      },
      {
        date: "30 Desember 2026",
        title: "Pengumuman Semifinalis & Finalis",
        description: "Publikasi tim yang lolos menuju panggung luring di kampus ITS.",
        status: "upcoming",
      },
      {
        date: "3 Januari 2027",
        title: "Technical Meeting Babak Final",
        description: "Sosialisasi modul trainer fisik PLC Omron CP2E-N, HMI Haiwell, dan arena perlombaan ITS.",
        status: "upcoming",
      },
      {
        date: "9 - 10 Januari 2027",
        title: "Event Day: Babak Semifinal & Final Luring",
        description: "Kompetisi offline di Departemen Teknik Elektro Otomasi ITS Surabaya dan penganugerahan juara.",
        status: "upcoming",
      },
    ],
  },
  {
    id: "track-b",
    name: "Microcontroller & Vortex",
    targetDivisions: "Automation Challenge (Microcontroller IoT), KTI Vortex",
    milestones: [
      {
        date: "25 Sep - 16 Okt 2026",
        title: "Pendaftaran Gelombang 1 (Batch 1)",
        description: "Pembukaan pendaftaran awal untuk kategori IoT dan Karya Tulis Ilmiah Vortex.",
        status: "completed",
      },
      {
        date: "17 Okt - 7 Nov 2026",
        title: "Pendaftaran Gelombang 2 (Batch 2)",
        description: "Pendaftaran reguler dan persiapan penyusunan proposal teknis atau naskah ilmiah.",
        status: "active",
      },
      {
        date: "8 Nov - 27 Nov 2026",
        title: "Pendaftaran Gelombang 3 (Batch 3)",
        description: "Batas akhir registrasi peserta tim kategori IoT dan Vortex.",
        status: "upcoming",
      },
      {
        date: "11 Desember 2026",
        title: "Batas Pengumpulan Proposal & Naskah",
        description: "Batas akhir pengunggahan dokumen proposal sistem IoT dan berkas paper karya tulis ilmiah.",
        status: "upcoming",
      },
      {
        date: "16 Desember 2026",
        title: "Pengumuman Finalis (Top 5 & Top 10)",
        description: "Pengumuman peserta terbaik yang melaju ke babak demonstrasi purwarupa dan presentasi final.",
        status: "upcoming",
      },
      {
        date: "18 Desember 2026",
        title: "Technical Meeting Babak Final",
        description: "Pengarahan teknis sesi expo, demonstrasi alat uji, dan mekanisme presentasi luring di ITS.",
        status: "upcoming",
      },
      {
        date: "9 - 10 Januari 2027",
        title: "Event Day: Live Demo, Expo & Presentasi",
        description: "Uji fungsi alat purwarupa IoT, pameran inovasi karya, dan sidang presentasi akhir di ITS Surabaya.",
        status: "upcoming",
      },
    ],
  },
];

export const TIMELINE_TRACKS_EN: TimelineTrack[] = [
  {
    id: "track-a",
    name: "Smart Robotics · PLC · Energy Treasure",
    targetDivisions: "Smart Robotics, Automation Challenge (PLC), Energy Treasure",
    milestones: [
      {
        date: "Sep 25 - Oct 18, 2026",
        title: "Registration Batch 1 (Early Bird)",
        description: "Early bird registration period offering the lowest entry fee.",
        status: "completed",
      },
      {
        date: "Oct 19 - Nov 15, 2026",
        title: "Registration Batch 2 (Regular)",
        description: "Regular registration period for all teams across all educational levels.",
        status: "active",
      },
      {
        date: "Nov 16 - Dec 13, 2026",
        title: "Registration Batch 3 (Late Entry)",
        description: "Final registration window before the start of preliminary rounds.",
        status: "upcoming",
      },
      {
        date: "December 20, 2026",
        title: "Preliminary Round Technical Meeting",
        description: "Online briefing via Zoom regarding game rules, simulation problem sets, and video submission criteria.",
        status: "upcoming",
      },
      {
        date: "December 26 - 27, 2026",
        title: "Online Preliminary Rounds",
        description: "Live CX-Programmer ladder logic design via Zoom (PLC) and online robotics video curation.",
        status: "upcoming",
      },
      {
        date: "December 30, 2026",
        title: "Semifinalist & Finalist Announcement",
        description: "Publication of qualified teams invited to the offline stages at ITS campus.",
        status: "upcoming",
      },
      {
        date: "January 3, 2027",
        title: "Final Round Technical Meeting",
        description: "Briefing on the physical Omron CP2E-N PLC trainer modules, Haiwell HMI, and official ITS competition arenas.",
        status: "upcoming",
      },
      {
        date: "January 9 - 10, 2027",
        title: "Event Day: Offline Semifinals & Finals",
        description: "Onsite competition at the Department of Automation Electrical Engineering ITS Surabaya and awards ceremony.",
        status: "upcoming",
      },
    ],
  },
  {
    id: "track-b",
    name: "Microcontroller & Vortex",
    targetDivisions: "Automation Challenge (Microcontroller IoT), KTI Vortex",
    milestones: [
      {
        date: "Sep 25 - Oct 16, 2026",
        title: "Registration Batch 1 (Early Bird)",
        description: "Initial registration window for IoT and Vortex Scientific Paper categories.",
        status: "completed",
      },
      {
        date: "Oct 17 - Nov 7, 2026",
        title: "Registration Batch 2 (Regular)",
        description: "Regular registration and preparation of technical proposals or scientific papers.",
        status: "active",
      },
      {
        date: "Nov 8 - Nov 27, 2026",
        title: "Registration Batch 3 (Late Entry)",
        description: "Final registration deadline for IoT and Vortex competition categories.",
        status: "upcoming",
      },
      {
        date: "December 11, 2026",
        title: "Proposal & Paper Submission Deadline",
        description: "Final deadline for uploading IoT prototype proposals and scientific paper manuscripts.",
        status: "upcoming",
      },
      {
        date: "December 16, 2026",
        title: "Finalist Announcement (Top 5 & Top 10)",
        description: "Announcement of top qualified teams advancing to the live prototype demonstration and final defense.",
        status: "upcoming",
      },
      {
        date: "December 18, 2026",
        title: "Final Round Technical Meeting",
        description: "Technical instructions for expo booths, hardware testing, and offline defense presentation mechanisms at ITS.",
        status: "upcoming",
      },
      {
        date: "January 9 - 10, 2027",
        title: "Event Day: Live Demo, Expo & Defense",
        description: "IoT prototype functional testing, project exhibitions, and final judging defense in Surabaya.",
        status: "upcoming",
      },
    ],
  },
];

export function getTimelineTracks(lang: Language = "id"): TimelineTrack[] {
  return lang === "en" ? TIMELINE_TRACKS_EN : TIMELINE_TRACKS;
}
