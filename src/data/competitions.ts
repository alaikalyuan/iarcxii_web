import { CompetitionDivision } from "@/types";

export const COMPETITIONS: CompetitionDivision[] = [
  {
    slug: "automation-challenge",
    name: "Automation Challenge",
    shortName: "AC",
    tagline: "Inovasi IoT Terapan dan Otomasi Industri Presisi Tinggi",
    description:
      "Kompetisi rekayasa otomasi yang terbagi menjadi dua jalur utama: perancangan sistem Internet of Things berbasis mikrokontroler dan perancangan logika otomasi industri berbasis PLC dengan standar industri Omron dan Haiwell.",
    levels: ["SD", "SMP", "SMA/SMK", "Mahasiswa", "International"],
    tracks: [
      {
        id: "iot",
        name: "Track 1: Microcontroller (IoT)",
        tagline: "Perancangan Solusi Cerdas Berbasis IoT & Sensorika",
        description:
          "Peserta merancang sistem otomasi pintar berbasis mikrokontroler yang mengacu pada 3 Pusat Studi (Pusdi) ITS: Energi Terbarukan, Mitigasi Bencana & Perubahan Iklim, atau Teknologi Tepat Guna.",
        hardwareSpecs: [
          "Bebas menggunakan mikrokontroler apa pun (ESP32, ESP8266, STM32, Arduino, Raspberry Pi Pico)",
          "Plafon anggaran komponen purwarupa maksimal Rp 500.000 disertai Rencana Anggaran Biaya (RAB) resmi",
          "Wajib memiliki konektivitas IoT (Wi-Fi, Bluetooth, LoRa, atau MQTT)",
          "Desain sirkuit aman dengan proteksi arus dan tegangan",
        ],
        softwareSpecs: [
          "Platform cloud/dashboard bebas (Blynk, ThingsBoard, Antares, atau custom server)",
          "Dokumentasi kode sumber terstruktur dengan repositori atau lampiran proposal",
        ],
        categories: [
          {
            id: "ac-iot-sd",
            name: "SD / Sederajat (Beginner)",
            level: "SD",
            teamRequirement: "Maksimal 3 siswa ditambah 1 guru pembimbing dari institusi yang sama",
            guidebookDocId: "ac-iot-sd",
            registrationUrl: "https://its.id/m/FormRegistIoTIARCXII",
            fees: {
              batch1: "Rp 125.000",
              batch2: "Rp 145.000",
              batch3: "Rp 165.000",
            },
            highlights: [
              "Fokus pengenalan logika sensor dan aktuator sederhana",
              "Pengumpulan proposal ide dan video presentasi konsep",
              "Top 5 tim terbaik diundang ke babak final luring ITS",
            ],
          },
          {
            id: "ac-iot-smp",
            name: "SMP / Sederajat (Junior)",
            level: "SMP",
            teamRequirement: "Maksimal 3 siswa ditambah 1 guru pembimbing dari institusi yang sama",
            guidebookDocId: "ac-iot-smp",
            registrationUrl: "https://its.id/m/FormRegistIoTIARCXII",
            fees: {
              batch1: "Rp 145.000",
              batch2: "Rp 175.000",
              batch3: "Rp 200.000",
            },
            highlights: [
              "Pengolahan data sensor dan pengendalian aktuator otomatis",
              "Kesesuaian dengan salah satu dari 3 Pusdi ITS",
              "Top 5 tim terbaik melaju ke final demonstrasi alat di ITS",
            ],
          },
          {
            id: "ac-iot-sma",
            name: "SMA / SMK / MA (Senior)",
            level: "SMA/SMK",
            teamRequirement: "Maksimal 3 siswa ditambah 1 guru pembimbing dari institusi yang sama",
            guidebookDocId: "ac-iot-sma",
            registrationUrl: "https://its.id/m/FormRegistIoTIARCXII",
            fees: {
              batch1: "Rp 150.000",
              batch2: "Rp 185.000",
              batch3: "Rp 215.000",
            },
            highlights: [
              "Sistem otomasi terintegrasi IoT dengan telemetry data real-time",
              "Kelayakan teknis, efisiensi energi, dan batasan plafon Rp 500k",
              "Top 10 tim diundang sesi pameran dan pengujian langsung di ITS",
            ],
          },
          {
            id: "ac-iot-mahasiswa",
            name: "Perguruan Tinggi (Mahasiswa Nasional)",
            level: "Mahasiswa",
            teamRequirement: "Maksimal 3 mahasiswa aktif (D3/D4/S1) dari kampus yang sama ditambah 1 dosen",
            guidebookDocId: "ac-iot-mahasiswa",
            registrationUrl: "https://its.id/m/FormRegistIoTIARCXII",
            fees: {
              batch1: "Rp 165.000",
              batch2: "Rp 195.000",
              batch3: "Rp 235.000",
            },
            highlights: [
              "Solusi mutakhir dengan penilaian Tingkat Kesiapan Teknologi (TRL)",
              "Analisis kelayakan implementasi industri dan dampak sosio-ekonomi",
              "Top 10 finalis diundang demonstrasi luring dan evaluasi juri",
            ],
          },
          {
            id: "ac-iot-college",
            name: "International College Track",
            level: "International",
            teamRequirement: "Maximum 3 undergraduate students from the same university + 1 advisor",
            guidebookDocId: "ac-iot-college",
            registrationUrl: "https://its.id/m/FormRegistIoTIARCXII",
            fees: {
              batch1: "IDR 165.000",
              batch2: "IDR 195.000",
              batch3: "IDR 235.000",
            },
            highlights: [
              "Global competition track conducted in English",
              "Focus on sustainability and smart community resilience",
              "Live presentation and hardware exhibition for international finalists",
            ],
          },
        ],
      },
      {
        id: "plc",
        name: "Track 2: PLC (Programmable Logic Controller)",
        tagline: "Logika Kendali Industri dengan Omron CX-Programmer & Haiwell HMI",
        description:
          "Peserta menyelesaikan studi kasus otomasi manufaktur industri menggunakan diagram tangga (ladder diagram) dan perancangan antarmuka visual SCADA/HMI dengan modul perangkat keras resmi industri.",
        hardwareSpecs: [
          "Modul Trainer PLC OMRON CP2E-N resmi disediakan panitia di ITS",
          "Perangkat HMI Haiwell B7-H/W resmi disediakan panitia di ITS",
          "Komunikasi kabel Ethernet industri langsung ke PLC trainer kit",
        ],
        softwareSpecs: [
          "OMRON CX-Programmer (CX-One Suite) untuk ladder diagram target CP2E-N",
          "Haiwell Cloud SCADA Designer untuk perancangan visual antarmuka HMI",
          "CX-Simulator untuk pengujian mandiri babak penyisihan daring",
        ],
        categories: [
          {
            id: "ac-plc-sma",
            name: "SMA / SMK (Senior)",
            level: "SMA/SMK",
            teamRequirement: "Tepat 2 siswa aktif dari institusi sekolah yang sama",
            guidebookDocId: "ac-plc-sma",
            registrationUrl: "https://its.id/m/FormRegistPLCIARCXII",
            fees: {
              batch1: "Rp 135.000",
              batch2: "Rp 165.000",
              batch3: "Rp 200.000",
            },
            highlights: [
              "Penyisihan daring via Zoom dengan studi kasus industri 90 menit",
              "Babak final luring di ITS menggunakan trainer kit Omron CP2E-N",
              "Penilaian ketepatan program (+70), address/comment (+10), waktu (+20)",
            ],
          },
          {
            id: "ac-plc-mahasiswa",
            name: "Perguruan Tinggi (Mahasiswa)",
            level: "Mahasiswa",
            teamRequirement: "Tepat 2 mahasiswa aktif (D3/D4/S1) dari perguruan tinggi yang sama",
            guidebookDocId: "ac-plc-mahasiswa",
            registrationUrl: "https://its.id/m/FormRegistPLCIARCXII",
            fees: {
              batch1: "Rp 175.000",
              batch2: "Rp 200.000",
              batch3: "Rp 235.000",
            },
            highlights: [
              "Studi kasus kompleks sistem manufaktur bertingkat (multi-stage)",
              "Integrasi dua arah antara PLC Omron dan antarmuka HMI Haiwell Cloud SCADA",
              "Sesi pengujian modul trainer fisik 60 menit di lab otomasi ITS",
            ],
          },
        ],
      },
    ],
    scoringRubric: [
      { criterion: "Program Ladder Diagram Tepat Sesuai Deskripsi", weight: "70 Poin", note: "Verifikasi urutan logika, interlock, timer, counter, dan safety interlock" },
      { criterion: "Pemberian Address & Comment Sesuai Standar", weight: "10 Poin", note: "Kerapian pendefinisian simbol memori dan dokumentasi variabel input/output" },
      { criterion: "Pengumpulan Program Tepat Waktu", weight: "10 Poin", note: "Pengunggahan file proyek sebelum batas hitung mundur berakhir" },
      { criterion: "Kecepatan dan Efisiensi Pengerjaan", weight: "10 Poin", note: "Bonus kecepatan bagi peserta tercepat yang programnya diverifikasi benar" },
    ],
    stages: [
      { name: "Pendaftaran & Verifikasi", date: "Sep - Des 2026", description: "Pendaftaran tim melalui formulir online dan konfirmasi administrasi" },
      { name: "Technical Meeting", date: "20 Des 2026", description: "Pengarahan aturan teknis, simulasi soal, dan verifikasi software CX-Programmer" },
      { name: "Babak Penyisihan Daring", date: "26 - 27 Des 2026", description: "Pengerjaan studi kasus secara simultan di bawah pengawasan kamera Zoom" },
      { name: "Babak Final Luring", date: "9 - 10 Jan 2027", description: "Implementasi langsung pada hardware trainer Omron CP2E-N & HMI di kampus ITS" },
    ],
  },
  {
    slug: "smart-robotics",
    name: "Smart Robotics",
    shortName: "SR",
    tagline: "Kecepatan Lintasan Otonom dan Misi Presisi Manipulasi Objek",
    description:
      "Perlombaan rancang bangun robot line follower otonom lintas rintangan. Dimulai dari algoritma blok untuk pemula hingga sistem mutakhir Dual-Robot (Autonomous Line Follower + Shooter Robot) untuk mahasiswa.",
    levels: ["SD", "SMP", "SMA/SMK", "Mahasiswa"],
    tracks: [
      {
        id: "sr-track",
        name: "Autonomous Robotics Track",
        tagline: "Navigasi Lintasan Garis Cepat & Misi Mekanika Presisi",
        description:
          "Robot bernavigasi menyusuri garis putih pada lintasan gelap, melewati persimpangan, jembatan, tanjakan, dan menyelesaikan misi khusus memindahkan atau menembakkan target.",
        hardwareSpecs: [
          "SD: Robot Line Follower berbasis blok Arduino/Ardublock",
          "SMP: Line follower mikrokontroler mandiri dengan sensor fotodiode/optik",
          "SMA/SMK: Line follower dilengkapi mekanisme gripper capit (dimensi max 25x20x25 cm)",
          "Mahasiswa: Sistem dual-robot (R1 Autonomous Line Follower + R2 Shooter Robot)",
        ],
        softwareSpecs: [
          "Algoritma kontrol PID mandiri tanpa kendali manual nirkabel (otonom penuh)",
          "Lintasan digital resmi dapat diunduh di https://its.id/m/SmartRoboticsOnline",
        ],
        categories: [
          {
            id: "sr-sd",
            name: "SD / Sederajat",
            level: "SD",
            teamRequirement: "Maksimal 3 siswa ditambah 1 guru pembimbing",
            guidebookDocId: "sr-sd",
            registrationUrl: "https://its.id/m/FormRegistSmartRobotIARCXII",
            fees: {
              batch1: "Rp 95.000",
              batch2: "Rp 135.000",
              batch3: "Rp 150.000",
            },
            highlights: [
              "Line follower pemula berbasis antarmuka grafis atau mikrokontroler",
              "Misi mendorong objek rintangan keluar dari zona poin",
              "Babak grup kualifikasi 4 tim per pool dengan waktu persiapan 20 menit",
            ],
          },
          {
            id: "sr-smp",
            name: "SMP / Sederajat",
            level: "SMP",
            teamRequirement: "Maksimal 3 siswa ditambah 1 guru pembimbing",
            guidebookDocId: "sr-smp",
            registrationUrl: "https://its.id/m/FormRegistSmartRobotIARCXII",
            fees: {
              batch1: "Rp 110.000",
              batch2: "Rp 150.000",
              batch3: "Rp 175.000",
            },
            highlights: [
              "Line follower otonom pembawa muatan objek dari garis start",
              "Waktu trial lintasan bersama selama 60 menit sebelum race",
              "Kualifikasi pencatatan waktu tercepat top 16 menuju babak eliminasi",
            ],
          },
          {
            id: "sr-sma",
            name: "SMA / SMK / MA",
            level: "SMA/SMK",
            teamRequirement: "Maksimal 3 siswa ditambah 1 guru pembimbing",
            guidebookDocId: "sr-sma",
            registrationUrl: "https://its.id/m/FormRegistSmartRobotIARCXII",
            fees: {
              batch1: "Rp 125.000",
              batch2: "Rp 165.000",
              batch3: "Rp 200.000",
            },
            highlights: [
              "Line Follower Mikrokontroler (LFM) dengan mekanik Gripper capit aktif",
              "Poin checkpoint (+15) dan relokasi objek ke kotak target (+10 per objek)",
              "Dimensi maksimal 25x20x25 cm dengan toleransi dimensi ketat 5%",
            ],
          },
          {
            id: "sr-mahasiswa",
            name: "Perguruan Tinggi (Mahasiswa)",
            level: "Mahasiswa",
            teamRequirement: "Maksimal 3 mahasiswa aktif (D3/D4/S1) ditambah 1 pembimbing",
            guidebookDocId: "sr-mahasiswa",
            registrationUrl: "https://its.id/m/FormRegistSmartRobotIARCXII",
            fees: {
              batch1: "Rp 200.000",
              batch2: "Rp 245.000",
              batch3: "Rp 275.000",
            },
            highlights: [
              "Kolaborasi Dual-Robot: R1 otonom pemindah balok & R2 shooter penembak sasaran",
              "Format turnamen Best of 3 (BO3) sejak babak 16 besar hingga partai final",
              "Robot harus memenuhi standar uji kelayakan hardware sebelum masuk lintasan",
            ],
          },
        ],
      },
    ],
    scoringRubric: [
      { criterion: "Waktu Tempuh Lintasan (Speed & Agility)", weight: "40 Poin", note: "Kecepatan akumulatif robot menuntaskan seluruh pos checkpoint lintasan" },
      { criterion: "Keberhasilan Misi Manipulasi Objek", weight: "35 Poin", note: "Presisi capit gripper atau tembakan sasaran kubus target" },
      { criterion: "Kepatuhan Regulasi Dimensi & Kelistrikan", weight: "15 Poin", note: "Pemeriksaan bobot, voltase baterai, dan dimensi aman modul mekanik" },
      { criterion: "Jumlah Retrial / Penalti Sentuh Tangan", weight: "10 Poin", note: "Pengurangan poin apabila robot keluar garis atau direset manual peserta" },
    ],
    stages: [
      { name: "Pendaftaran Tim", date: "Sep - Des 2026", description: "Pendaftaran online dan pengunduhan modul lintasan digital resmi" },
      { name: "Technical Meeting", date: "20 Des 2026", description: "Penjelasan tata tertib babak penyisihan dan kalibrasi sensor online" },
      { name: "Penyisihan Daring", date: "26 - 27 Des 2026", description: "Pengunggahan unedited video running robot pada arena uji standar panitia" },
      { name: "Final Race Offline", date: "9 - 10 Jan 2027", description: "Balapan langsung head-to-head sistem gugur di Hall Teknik Elektro Otomasi ITS" },
    ],
  },
  {
    slug: "energy-treasure",
    name: "Energy Treasure",
    shortName: "ET",
    tagline: "Navigasi Cerdas Maze-Solver dengan Konsumsi Energi Optimal",
    description:
      "Tantangan robotika unik di mana robot line follower autonomous harus memecahkan jalur labirin acak yang tidak diketahui sebelumnya secara efisien dan hemat energi.",
    levels: ["SMA/SMK", "Mahasiswa"],
    tracks: [
      {
        id: "et-track",
        name: "Autonomous Maze Solver Track",
        tagline: "Pemetaan Labirin Mandiri & Efisiensi Konsumsi Daya",
        description:
          "Robot diuji kemampuannya membaca persimpangan labirin, memetakan rute tercepat, dan meminimalisir konsumsi daya miliampere selama proses pemecahan rute jalan buntu.",
        hardwareSpecs: [
          "Robot line follower autonomous dengan sensor jarak / dinding ultrasonik atau optik",
          "Wajib dilengkapi indikator daya dan sakelar pemutus darurat mandiri",
        ],
        softwareSpecs: [
          "Algoritma maze solving mandiri (misal: Wall Following, Tremaux, atau Flood-fill)",
          "Dilarang menggunakan remote control nirkabel eksternal",
        ],
        categories: [
          {
            id: "et-sma",
            name: "SMA / SMK / MA",
            level: "SMA/SMK",
            teamRequirement: "Maksimal 3 siswa ditambah 1 guru pembimbing",
            guidebookDocId: "et-sma",
            registrationUrl: "https://its.id/m/FormRegistEnergyTreasureIARCXII",
            fees: {
              batch1: "Rp 120.000",
              batch2: "Rp 145.000",
              batch3: "Rp 175.000",
            },
            highlights: [
              "3 tahapan berjenjang: Pra-kualifikasi, Kualifikasi rute, dan Onsite labirin rahasia",
              "Arena labirin rahasia baru diumumkan saat hari pelaksanaan",
              "Penilaian gabungan kecepatan lintasan dan ketahanan konsumsi baterai",
            ],
          },
          {
            id: "et-mahasiswa",
            name: "Perguruan Tinggi (Mahasiswa)",
            level: "Mahasiswa",
            teamRequirement: "Maksimal 3 mahasiswa aktif (D3/D4/S1) ditambah 1 dosen",
            guidebookDocId: "et-mahasiswa",
            registrationUrl: "https://its.id/m/FormRegistEnergyTreasureIARCXII",
            fees: {
              batch1: "Rp 130.000",
              batch2: "Rp 155.000",
              batch3: "Rp 185.000",
            },
            highlights: [
              "Studi kasus labirin multi-junction dinamis dengan rintangan jalan buntu",
              "Tahapan On-site programming di tempat tanpa eliminasi langsung",
              "Akumulasi skor tertinggi gabungan efisiensi konsumsi daya dan waktu tempuh",
            ],
          },
        ],
      },
    ],
    scoringRubric: [
      { criterion: "Keberhasilan Menemukan Titik Finish Labirin", weight: "40 Poin", note: "Robot mampu menemukan jalan keluar tanpa tersesat atau looping tak terhingga" },
      { criterion: "Efisiensi Konsumsi Energi Daya (mAh/Watt)", weight: "30 Poin", note: "Rasio konsumsi daya per satuan jarak yang terukur oleh modul alat panitia" },
      { criterion: "Waktu Tempuh Jalur Terpendek", weight: "20 Poin", note: "Kecepatan robot saat running kedua setelah proses pemetaan rute pertama selesai" },
      { criterion: "Orisinalitas Algoritma Pemetaan", weight: "10 Poin", note: "Evaluasi logika algoritma pemecahan labirin yang diterapkan tim" },
    ],
    stages: [
      { name: "Pendaftaran", date: "Sep - Des 2026", description: "Pendaftaran tim melalui formulir resmi panitia" },
      { name: "Technical Meeting", date: "20 Des 2026", description: "Pengarahan aturan teknis dimensi robot, toleransi sensor, dan format labirin" },
      { name: "Babak Penyisihan Daring", date: "26 - 27 Des 2026", description: "Pengujian seleksi pra-kualifikasi awal pemetaan labirin" },
      { name: "On-Site Programming & Final", date: "9 - 10 Jan 2027", description: "Pemrograman on-site pada layout labirin rahasia di kampus ITS" },
    ],
  },
  {
    slug: "vortex",
    name: "KTI Vortex",
    shortName: "Vortex",
    tagline: "Gagasan Inovatif Masa Depan & Solusi Riset Strategis Nasional",
    description:
      "Kompetisi Karya Tulis Ilmiah (KTI) yang menantang pemikiran kritis generasi muda dalam melahirkan ide konseptual serta solusi rekayasa teknologi terapan menjawab tantangan nyata industri dan masyarakat.",
    levels: ["SMA/SMK", "Mahasiswa"],
    tracks: [
      {
        id: "vortex-track",
        name: "Scientific Paper & Innovation Track",
        tagline: "Karya Tulis Ilmiah dan Purwarupa Konseptual Rekayasa",
        description:
          "Terbagi ke dalam dua pendekatan kompetisi: Vortex Idea Challenge (eksplorasi bebas gagasan inovatif visioner) dan Vortex Innovation Challenge (pemecahan studi kasus riset strategis unggulan ITS).",
        hardwareSpecs: [
          "Bebas menggunakan prototipe fisik pendukung atau simulasi software CAD/CAE",
          "Karya tulis harus orisinal dengan indeks kemiripan Turnitin di bawah 20%",
        ],
        softwareSpecs: [
          "Format naskah ilmiah sesuai template resmi guidebook vortex",
          "Presentasi visual menggunakan format slide profesional",
        ],
        categories: [
          {
            id: "kti-sma",
            name: "SMA / SMK / MA",
            level: "SMA/SMK",
            teamRequirement: "1 hingga 3 siswa aktif dari sekolah yang sama",
            guidebookDocId: "kti-sma",
            registrationUrl: "https://its.id/m/FormRegistVortexIARCXII",
            fees: {
              batch1: "Rp 50.000",
              batch2: "Rp 75.000",
              batch3: "Rp 100.000",
            },
            highlights: [
              "Fokus gagasan inovatif terapan bidang energi, lingkungan, dan teknologi",
              "Penilaian paper: Orisinalitas (35%), Relevansi isu (20%), Sistematika (15%)",
              "Top naskah terpilih melaju ke sesi presentasi daring/luring finalis",
            ],
          },
          {
            id: "kti-mahasiswa",
            name: "Perguruan Tinggi (Mahasiswa Nasional & International)",
            level: "Mahasiswa",
            teamRequirement: "1 hingga 3 mahasiswa aktif (D3/D4/S1) dari universitas yang sama",
            guidebookDocId: "kti-mahasiswa",
            registrationUrl: "https://its.id/m/FormRegistVortexIARCXII",
            fees: {
              batch1: "Rp 75.000",
              batch2: "Rp 90.000",
              batch3: "Rp 120.000",
            },
            highlights: [
              "Menjawab problem statement dari 4 fokus riset unggulan ITS",
              "Analisis kasus tajam (30%), Kelayakan solusi & purwarupa (30%), Orisinalitas (15%)",
              "Sidang presentasi ilmiah di hadapan dewan dosen penguji ITS",
            ],
          },
        ],
      },
    ],
    scoringRubric: [
      { criterion: "Ketajaman Analisis Kasus & Relevansi Solusi", weight: "30 Poin", note: "Kedalaman identifikasi masalah dan korelasi solusi teknologi yang diusulkan" },
      { criterion: "Kelayakan Implementasi & Feasibility Purwarupa", weight: "30 Poin", note: "Analisis teknis, biaya implementasi, dan kemudahan realisasi di lapangan" },
      { criterion: "Orisinalitas Gagasan & Tingkat Kemiripan Rendah", weight: "20 Poin", note: "Kebaruan ide dengan hasil uji similaritas karya di bawah 20%" },
      { criterion: "Sistematika, Tata Bahasa & Format Penulisan", weight: "20 Poin", note: "Kesesuaian dengan pedoman tata tulis ilmiah dan kerapian penyusunan naskah" },
    ],
    stages: [
      { name: "Pendaftaran Tim", date: "Sep - Nov 2026", description: "Pendaftaran resmi tim dan registrasi akun peserta" },
      { name: "Pengumpulan Naskah (Deadline)", date: "11 Des 2026", description: "Batas akhir pengunggahan dokumen karya tulis ilmiah lengkap" },
      { name: "Pengumuman Finalis Top Karya", date: "16 Des 2026", description: "Pengumuman karya terbaik yang berhak mempresentasikan paper" },
      { name: "Sidang Presentasi Final", date: "9 - 10 Jan 2027", description: "Presentasi dan sesi tanya jawab di depan dewan juri ahli di kampus ITS" },
    ],
  },
];

export function getCompetitionBySlug(slug: string): CompetitionDivision | undefined {
  return COMPETITIONS.find((c) => c.slug === slug);
}
