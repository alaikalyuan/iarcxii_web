import { FaqItem } from "@/types";

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Bagaimana rangkaian umum kompetisi IARC XII?",
    answer:
      "Rangkaian IARC XII dimulai dari periode Pendaftaran (Batch 1 hingga 3), Pengumpulan Proposal/Karya atau Penyisihan Daring pada bulan Desember, Pengumuman Finalis pada akhir Desember, Technical Meeting awal Januari, hingga Babak Final dan Penganugerahan Juara secara luring di Departemen Teknik Elektro Otomasi ITS Surabaya pada 9 - 10 Januari 2027.",
    category: "Umum",
  },
  {
    id: "faq-2",
    question: "Siapa saja yang diperbolehkan mendaftar IARC XII?",
    answer:
      "IARC XII terbuka untuk pelajar SD/sederajat, SMP/sederajat, SMA/SMK/MA/sederajat, serta mahasiswa aktif Diploma (D3/D4) dan Sarjana (S1) dari seluruh perguruan tinggi di Indonesia maupun internasional (khusus kategori College pada Automation Challenge dan KTI Vortex).",
    category: "Pendaftaran",
  },
  {
    id: "faq-3",
    question: "Apakah alat, mikrokontroler, atau robot disediakan oleh panitia?",
    answer:
      "Untuk cabang Smart Robotics dan Energy Treasure, robot dirancang dan dibawa mandiri oleh masing-masing peserta sesuai regulasi dimensi di guidebook. Untuk Automation Challenge Microcontroller, peserta membawa prototipe yang diajukan dalam proposal. Khusus untuk Automation Challenge PLC babak final luring, panitia ITS menyediakan Modul Trainer Hardware PLC Omron CP2E-N dan HMI Haiwell B7-H/W.",
    category: "Teknis",
  },
  {
    id: "faq-4",
    question: "Apakah panitia menyediakan akomodasi penginapan bagi peserta dari luar kota atau pulau?",
    answer:
      "Panitia IARC XII menyediakan booklet rekomendasi penginapan dan hotel mitra di sekitar kampus ITS Sukolilo Surabaya dengan harga terjangkau, serta memfasilitasi titik kumpul penjemputan resmi pada saat hari pelaksanaan babak final luring.",
    category: "Akomodasi",
  },
  {
    id: "faq-5",
    question: "Bagaimana ketentuan pembentukan tim dan guru atau dosen pendamping?",
    answer:
      "Satu tim terdiri dari 2 hingga 3 orang sesuai cabang lomba (PLC: 2 orang; Microcontroller/Robotika/KTI: 1 hingga 3 orang). Peserta boleh didampingi 1 guru atau dosen pembimbing. Satu guru atau dosen diperbolehkan mendampingi lebih dari satu tim dari institusi yang sama. Setiap peserta hanya boleh terdaftar pada satu cabang perlombaan.",
    category: "Pendaftaran",
  },
  {
    id: "faq-6",
    question: "Bagaimana proses dan verifikasi pembayaran pendaftaran?",
    answer:
      "Informasi nomor rekening tujuan transfer bank dan nominal biaya registrasi resmi tercantum langsung di dalam formulir Google Form pendaftaran masing-masing cabang lomba. Bukti transfer wajib diunggah pada formulir tersebut saat mendaftar. Tim verifikasi panitia akan mengonfirmasi dalam 1x24 jam dan mengundang tim ke grup resmi WhatsApp Open Training IARC XII.",
    category: "Pembayaran",
  },
  {
    id: "faq-7",
    question: "Apakah twibbon dan caption wajib diunggah oleh seluruh anggota tim?",
    answer:
      "Ya, seluruh anggota tim wajib mengunggah Twibbon resmi IARC XII beserta Caption resmi di akun Instagram pribadi dengan menandai akun @iarc.its dan 3 akun teman. Tangkapan layar bukti unggahan menjadi syarat administrasi yang dilampirkan pada formulir pendaftaran.",
    category: "Administrasi",
  },
  {
    id: "faq-8",
    question: "Apa saja perangkat lunak (software) yang harus dipersiapkan untuk cabang PLC?",
    answer:
      "Peserta cabang PLC wajib menyiapkan OMRON CX-Programmer (tersedia dalam paket CX-One) untuk pemrograman ladder diagram target PLC Omron CP2E-N pada babak penyisihan dan final, serta Haiwell Cloud SCADA Designer untuk perancangan antarmuka visual HMI Haiwell B7-H/W pada babak final.",
    category: "Teknis",
  },
  {
    id: "faq-9",
    question: "Apakah seluruh peserta mendapatkan sertifikat dan materi bimbingan?",
    answer:
      "Seluruh peserta yang resmi terdaftar berhak memperoleh E-Sertifikat Kepesertaan berskala nasional atau internasional, serta mendapatkan hak akses eksklusif ke kelas Open Training IARC XII yang dipandu langsung oleh dosen dan praktisi ahli Departemen Teknik Elektro Otomasi ITS.",
    category: "Fasilitas",
  },
];
