import { TimelineTrack } from "@/types";

export const TIMELINE_TRACKS: TimelineTrack[] = [
  {
    id: "track-a",
    name: "Track A (Robotics, PLC & Energy)",
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
    name: "Track B (IoT & Vortex)",
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
