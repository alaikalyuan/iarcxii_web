import { FaqItem } from "@/types";
import { Language } from "@/i18n/types";

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

export const FAQS_EN: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is the general timeline and sequence of IARC XII?",
    answer:
      "The IARC XII sequence begins with Registration (Batches 1 to 3), Proposal/Paper Submission or Online Preliminary rounds in December, Finalist Announcement in late December, Technical Meetings in early January, culminating in the offline Finals and Awarding ceremony at the Department of Automation Electrical Engineering ITS Surabaya on January 9-10, 2027.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "Who is eligible to participate in IARC XII?",
    answer:
      "IARC XII is open to elementary students, junior high students, senior high/vocational students, and active diploma (D3/D4) and undergraduate (S1) university students across Indonesia as well as international participants (specifically for the College category in Automation Challenge and Vortex Scientific Paper).",
    category: "Registration",
  },
  {
    id: "faq-3",
    question: "Are microcontrollers, hardware tools, or robots provided by the committee?",
    answer:
      "For Smart Robotics and Energy Treasure, robots must be built and brought independently by each team according to dimension rules in the guidebook. For Automation Challenge Microcontroller, participants bring their proposed prototypes. For the offline final round of Automation Challenge PLC, the ITS committee provides the Omron CP2E-N PLC Hardware Trainer Module and Haiwell B7-H/W HMI.",
    category: "Technical",
  },
  {
    id: "faq-4",
    question: "Does the committee provide accommodation for out-of-town participants?",
    answer:
      "The IARC XII committee provides an accommodation guide featuring partner hotels near the ITS Sukolilo Surabaya campus at affordable rates, and facilitates official pickup meeting points during the offline final rounds.",
    category: "Accommodation",
  },
  {
    id: "faq-5",
    question: "What are the rules regarding team composition and faculty advisors?",
    answer:
      "Teams consist of 2 to 3 members depending on the division (PLC: 2 members; Microcontroller/Robotics/Scientific Paper: 1 to 3 members). Each team may be accompanied by 1 advisory teacher or lecturer. An advisor may oversee multiple teams from the same school or university. Each participant may only register in one competition branch.",
    category: "Registration",
  },
  {
    id: "faq-6",
    question: "How does the registration payment and verification process work?",
    answer:
      "Official bank transfer details and fees are listed inside the registration Google Form for each division. Proof of transfer must be uploaded to the form upon registration. The committee verification team confirms submissions within 24 hours and invites teams to the official WhatsApp Open Training group.",
    category: "Payment",
  },
  {
    id: "faq-7",
    question: "Is posting the official twibbon and caption mandatory for all members?",
    answer:
      "Yes, all team members must post the official IARC XII Twibbon with the official Caption on their personal Instagram accounts, tagging @iarc.its and 3 friends. Proof screenshots must be attached as an administrative requirement in the registration form.",
    category: "Administration",
  },
  {
    id: "faq-8",
    question: "What software is required for the PLC division?",
    answer:
      "PLC participants must prepare OMRON CX-Programmer (part of CX-One) for ladder diagram programming on the Omron CP2E-N PLC for both preliminary and final rounds, and Haiwell Cloud SCADA Designer for the Haiwell B7-H/W HMI visual interface in the final round.",
    category: "Technical",
  },
  {
    id: "faq-9",
    question: "Do all participants receive certificates and mentoring access?",
    answer:
      "All officially registered participants are entitled to a national or international E-Certificate of Participation, along with exclusive access to IARC XII Open Training classes guided by faculty lecturers and engineering practitioners from the ITS Department of Automation Electrical Engineering.",
    category: "Facilities",
  },
];

export function getFaqs(lang: Language = "id"): FaqItem[] {
  return lang === "en" ? FAQS_EN : FAQS;
}
