import { CompetitionDivision } from "@/types";
import { Language } from "@/i18n/types";
import { buildCompetitionsEn } from "./competitionsEn";

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
                        stages: [
              {
                name: "Babak Penyisihan (Daring)",
                date: "Pengumpulan 11 Des 2026",
                description: "Pemilihan studi kasus, pengumpulan proposal ide inovasi mikrokontroler, dan pengunggahan video penjelasan konsep alat. 5 tim terbaik lolos ke babak final.",
              },
              {
                name: "Technical Meeting Final",
                date: "18 Des 2026",
                description: "Pengarahan teknis daring via Zoom untuk 5 tim finalis mengenai ketentuan babak final.",
              },
              {
                name: "Babak Final: Hari 1 Bootcamp",
                date: "9 Jan 2027",
                description: "Microcontroller Bootcamp: pembekalan materi dan praktik dasar mikrokontroler, sensor, aktuator, pemrograman, dan IoT di kampus ITS.",
              },
              {
                name: "Babak Final: Hari 2 Challenge",
                date: "10 Jan 2027",
                description: "Microcontroller Challenge: penyelesaian tantangan studi kasus menggunakan trainer kit yang disediakan oleh panitia.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Inovasi",
                weight: "30%",
                note: "Tingkat kebaruan ide, kreativitas solusi, dan orisinalitas karya.",
              },
              {
                criterion: "Video Penjelasan",
                weight: "25%",
                note: "Menjelaskan ide, inovasi yang dibawakan, serta keterkaitannya dengan tema pilihan.",
              },
              {
                criterion: "Keterkaitan dengan Tema",
                weight: "20%",
                note: "Keselarasan karya dengan target tema (Energi, Mitigasi Bencana, Teknologi Tepat Guna) dan kontribusi nyata solutif.",
              },
              {
                criterion: "Dampak & Berkelanjutan",
                weight: "15%",
                note: "Potensi manfaat karya bagi masyarakat, lingkungan, atau industri serta peluang keberlanjutan.",
              },
              {
                criterion: "Kesesuaian Format",
                weight: "10%",
                note: "Kesesuaian terhadap tata cara dan format penulisan, sistematika naskah, serta bahasa pedoman.",
              },
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
                        stages: [
              {
                name: "Babak Penyisihan (Daring)",
                date: "Pengumpulan 11 Des 2026",
                description: "Penyusunan rencana penyelesaian studi kasus dalam bentuk proposal dan video penjelasan ide inovasi konsep alat. 5 tim dengan nilai tertinggi lolos ke final.",
              },
              {
                name: "Technical Meeting Final",
                date: "18 Des 2026",
                description: "Pengarahan teknis daring via Zoom bagi finalis mengenai ketentuan dan batasan prototipe.",
              },
              {
                name: "Babak Final Luring",
                date: "9 - 10 Jan 2027",
                description: "Realisasi proposal menjadi prototipe fisik dengan batasan komponen maksimal 75 Flux Poin, dilanjutkan presentasi di hadapan dewan juri.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Inovasi",
                weight: "30%",
                note: "Tingkat kebaruan ide, kreativitas solusi, dan orisinalitas karya.",
              },
              {
                criterion: "Video Penjelasan",
                weight: "25%",
                note: "Menjelaskan ide, inovasi yang dibawakan, serta keterkaitannya dengan tema yang sudah dipilih.",
              },
              {
                criterion: "Keterkaitan dengan Tema",
                weight: "20%",
                note: "Keselarasan karya dengan target tema dan kontribusi nyata dalam menjawab isu global atau nasional.",
              },
              {
                criterion: "Dampak & Berkelanjutan",
                weight: "15%",
                note: "Potensi manfaat karya bagi masyarakat, lingkungan, atau industri serta keberlanjutan jangka panjang.",
              },
              {
                criterion: "Kesesuaian Format",
                weight: "10%",
                note: "Kesesuaian tata cara dan format penulisan, sistematika penyusunan karya, serta kaidah ejaan pedoman.",
              },
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
                        stages: [
              {
                name: "Babak Penyisihan (Daring)",
                date: "Pengumpulan 11 Des 2026",
                description: "Pemilihan studi kasus, pengiriman proposal perancangan mikrokontroler, dan video penjelasan inovasi rancangan. 10 tim terbaik lolos ke final.",
              },
              {
                name: "Technical Meeting Final",
                date: "18 Des 2026",
                description: "Briefing daring via Zoom untuk 10 tim finalis mengenai petunjuk teknis pelaksanaan babak final.",
              },
              {
                name: "Babak Final Luring",
                date: "9 - 10 Jan 2027",
                description: "Realisasi proposal dalam bentuk prototipe fisik, pameran stan booth dengan membawa X-Banner informasi alat, serta sesi penilaian juri.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Inovasi",
                weight: "30%",
                note: "Tingkat kebaruan ide, kreativitas solusi, dan orisinalitas proposal.",
              },
              {
                criterion: "Video Penjelasan",
                weight: "25%",
                note: "Kemampuan menjelaskan ide serta keterkaitannya dengan tema yang sudah dipilih.",
              },
              {
                criterion: "Keterkaitan dengan Tema",
                weight: "20%",
                note: "Keselarasan proposal dengan target tema dan kontribusi nyatanya dalam menjawab permasalahan.",
              },
              {
                criterion: "Dampak & Berkelanjutan",
                weight: "15%",
                note: "Potensi manfaat proposal bagi masyarakat, lingkungan, atau industri serta peluang keberlanjutan.",
              },
              {
                criterion: "Kesesuaian Format",
                weight: "10%",
                note: "Kesesuaian terhadap tata cara dan format penulisan, sistematika penyusunan proposal, serta kaidah bahasa.",
              },
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
                        stages: [
              {
                name: "Babak Penyisihan (Daring)",
                date: "Pengumpulan 11 Des 2026",
                description: "Penyusunan proposal sistem mikrokontroler tingkat lanjut berbasis studi kasus industri dan pembuatan video penjelasan ide. 10 tim terbaik melaju ke final.",
              },
              {
                name: "Technical Meeting Final",
                date: "18 Des 2026",
                description: "Pertemuan teknis daring via Zoom untuk informasi detail dan regulasi pameran babak final.",
              },
              {
                name: "Babak Final Luring",
                date: "9 - 10 Jan 2027",
                description: "Fabrikasi prototipe fisik fungsional, setup booth pameran dengan X-Banner informasi alat, dan demonstrasi langsung di hadapan dewan juri.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Inovasi",
                weight: "30%",
                note: "Tingkat kebaruan ide, kreativitas solusi, dan orisinalitas proposal.",
              },
              {
                criterion: "Keterkaitan dengan Tema",
                weight: "20%",
                note: "Keselarasan proposal dengan target tema dan kontribusi nyatanya dalam menjawab isu lokal atau nasional.",
              },
              {
                criterion: "Dampak & Berkelanjutan",
                weight: "20%",
                note: "Potensi manfaat proposal bagi masyarakat, lingkungan, atau industri serta peluang keberlanjutan jangka panjang.",
              },
              {
                criterion: "Video Kreatif",
                weight: "20%",
                note: "Kemampuan menjelaskan ide serta keterkaitannya dengan tema yang sudah dipilih.",
              },
              {
                criterion: "Kesesuaian Format",
                weight: "10%",
                note: "Kesesuaian terhadap tata cara dan format penulisan, sistematika penyusunan proposal, serta kaidah bahasa baku.",
              },
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
                        stages: [
              {
                name: "Preliminary Round (Online)",
                date: "Deadline Dec 11, 2026",
                description: "Case study selection, submission of advanced microcontroller engineering proposal, and explanatory video. Top 10 teams advance to finals.",
              },
              {
                name: "Technical Meeting",
                date: "Dec 18, 2026",
                description: "Online briefing via Zoom detailing final round procedures, exhibition booth guidelines, and evaluation rubrics.",
              },
              {
                name: "Final Round (Offline ITS)",
                date: "Jan 9 - 10, 2027",
                description: "Fabrication of working physical prototype, interactive booth exhibition with X-Banner, and on-site technical demonstration with jury panel.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Innovation",
                weight: "30%",
                note: "The level of novelty of the idea, creativity of the solution, and originality of the proposal.",
              },
              {
                criterion: "Relation to the Theme",
                weight: "20%",
                note: "The alignment of the proposal with sustainable living objectives and its tangible contribution to addressing issues.",
              },
              {
                criterion: "Impact & Sustainability",
                weight: "20%",
                note: "The proposal potential benefits for society, the environment, or industry, as well as opportunities for long-term sustainability.",
              },
              {
                criterion: "Creative Video",
                weight: "20%",
                note: "Ability to explain ideas and their connection to the chosen theme.",
              },
              {
                criterion: "Format Compliance",
                weight: "10%",
                note: "Adherence to writing procedures and formatting, structural organization, and correct language according to guidelines.",
              },
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
                        stages: [
              {
                name: "Babak Penyisihan (Daring)",
                date: "9 Jan 2027",
                description: "Pengerjaan soal logika ladder logic selama 60 menit melalui Zoom breakout room dengan sistem 2 kamera (kamera belakang ruangan dan share screen).",
              },
              {
                name: "Babak Semifinal (Luring ITS)",
                date: "23 Jan 2027",
                description: "Departemen Teknik Elektro Otomasi ITS. Sesi penyesuaian trainer 15 menit dan pengerjaan soal 60 menit. Top 3 tim terbaik melaju ke Final.",
              },
              {
                name: "Babak Final (Luring ITS)",
                date: "24 Jan 2027",
                description: "Pengerjaan soal studi kasus industri 60 menit, transfer program ke modul trainer hardware, dan sesi presentasi di hadapan dewan juri untuk penentuan Juara.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Program Berjalan Sesuai Soal",
                weight: "60 - 70 Poin",
                note: "Logika dan eksekusi instruksi ladder logic berjalan sempurna (+70 pada Penyisihan & Final, +60 pada Semifinal).",
              },
              {
                criterion: "Address & Comment I/O",
                weight: "10 Poin",
                note: "Pemberian address dan comment utama yang sesuai dengan deskripsi tugas.",
              },
              {
                criterion: "Upload & Simulasi Trainer PLC",
                weight: "10 Poin",
                note: "Program berhasil ditransfer dan disimulasikan secara valid pada modul trainer PLC (Babak Semifinal & Final).",
              },
              {
                criterion: "Pengumpulan Berkas Tepat Waktu",
                weight: "10 Poin",
                note: "Mengumpulkan file program kepada dewan juri sebelum waktu perlombaan 60 menit berakhir.",
              },
              {
                criterion: "Bonus Kecepatan Pengumpulan",
                weight: "10 Poin",
                note: "Tambahan nilai bagi 2 peserta tercepat yang mengumpulkan berkas program ke dewan juri.",
              },
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
                        stages: [
              {
                name: "Babak Penyisihan (Daring)",
                date: "9 Jan 2027",
                description: "Pengerjaan soal software pemrograman PLC 60 menit via Zoom breakout room dengan sistem 2 kamera (kamera sudut ruangan dan share screen). Peserta terbaik langsung melaju ke Final.",
              },
              {
                name: "Babak Final (Luring ITS)",
                date: "23 - 24 Jan 2027",
                description: "Departemen Teknik Elektro Otomasi ITS. Studi kasus kontrol industri nyata (Omron CP2E-N & Haiwell Cloud HMI), waktu 60 menit, transfer program ke trainer, dan presentasi juri. (Tanpa babak semifinal).",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Program Berjalan Sesuai Soal",
                weight: "70 Poin",
                note: "Program ladder logic dan integrasi HMI berjalan penuh sesuai deskripsi kasus industri nyata.",
              },
              {
                criterion: "Upload & Simulasi Trainer Hardware",
                weight: "10 Poin",
                note: "Program berhasil terupload via Ethernet dan disimulasikan pada modul Omron CP2E-N & Haiwell Cloud HMI.",
              },
              {
                criterion: "Address & Comment I/O",
                weight: "10 Poin",
                note: "Pemberian address dan comment utama yang sesuai dengan deskripsi soal.",
              },
              {
                criterion: "Pengumpulan Berkas Tepat Waktu",
                weight: "10 Poin",
                note: "Mengumpulkan file program NAMA TIM_FINAL.zip sebelum waktu perlombaan berakhir.",
              },
              {
                criterion: "Bonus Kecepatan Pengumpulan",
                weight: "10 Poin",
                note: "Tambahan nilai bagi 2 peserta tercepat yang mengumpulkan file program ke dewan juri.",
              },
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
                        stages: [
              {
                name: "Day 1: Group Stage & Rising Stage",
                date: "Hari Pertama",
                description: "Arena 1 Onsite Program. Babak grup 4 tim per grup, dilanjutkan Rising Stage (4 runner-up bertanding serentak) untuk perebutan tiket Knockout Stage.",
              },
              {
                name: "Day 1: Knockout Stage",
                date: "Hari Pertama",
                description: "Arena 1 Onsite Program. Pembagian 4 grup (masing-masing 4 tim) sistem Onsite Program untuk menentukan peserta yang lolos ke Day 2.",
              },
              {
                name: "Day 2: Top 8, Semifinal, & Final",
                date: "Hari Kedua",
                description: "Arena 2 Onsite Program. Format 1 vs 1 sistem gugur mulai dari Top 8 Stage, Semifinal (maksimal 15 menit), hingga Perebutan Juara 3 dan Grand Final.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Start & Ketepatan Kehadiran",
                weight: "50%",
                note: "Kehadiran tim tepat waktu (25%) dan robot mulai bergerak tertib pasca aba-aba wasit dari garis start (25%).",
              },
              {
                criterion: "Navigasi Lintasan & Finish",
                weight: "50%",
                note: "Kestabilan robot melintasi garis arena (25%) dan keberhasilan menyelesaikan misi hingga garis finish (25%).",
              },
              {
                criterion: "Poin Objek Misi Arena",
                weight: "Bonus Poin",
                note: "Perolehan poin objek lintasan: Objek Bulat 1 (+10 pt), Objek Bulat 2 (+30 pt), dan Objek Hexagon (+50 pt).",
              },
              {
                criterion: "Penalti Pelanggaran",
                weight: "Pengurangan",
                note: "Start mendahului aba-aba wasit (-5 poin) dan intervensi menyentuh robot tanpa izin juri (-10 poin).",
              },
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
                        stages: [
              {
                name: "Day 1: Trial & Babak Kualifikasi",
                date: "Hari Pertama",
                description: "Masa trial 60 menit. Babak Kualifikasi di Arena 1 untuk menentukan 16 tim catatan waktu tercepat ke Babak 16 Besar (alokasi 8 menit per match, COT 5 menit).",
              },
              {
                name: "Day 2: Trial & Babak 16 Besar",
                date: "Hari Kedua",
                description: "Masa trial 30-40 menit. Babak 16 Besar di Arena 2 (konfigurasi lintasan baru) sistem Onsite Program dengan misi khusus pelepasan objek di drop point.",
              },
              {
                name: "Day 2: Quarter Final hingga Grand Final",
                date: "Hari Kedua",
                description: "Sistem gugur single elimination lanjutan di Arena 2 dengan misi utama drop point dan misi bonus pengambilan objek khusus.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Babak Kualifikasi (100 Poin)",
                weight: "100 Poin",
                note: "Start & navigasi (20 pt), mendorong objek hingga Checkpoint 1 (30 pt), finish berbeban bersama objek (50 pt) + waktu tercepat.",
              },
              {
                criterion: "Babak 16 Besar (100 Poin)",
                weight: "100 Poin",
                note: "Mendorong ke drop point (30 pt), pelepasan objek di zona drop (40 pt), dan finish robot tanpa beban (30 pt).",
              },
              {
                criterion: "Babak Final (100 Poin)",
                weight: "100 Poin",
                note: "Mendorong ke drop point (25 pt), pelepasan objek (25 pt), garis finish (20 pt), dan objek khusus (ambil +15 pt, bawa finish +15 pt).",
              },
              {
                criterion: "Penalti Misi Khusus",
                weight: "Pengurangan",
                note: "Objek meleset di luar batas drop point (-10 pt), objek khusus jatuh sebelum finish (hangus 15 pt), objek terbawa finish (0 pt pelepasan).",
              },
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
                        stages: [
              {
                name: "Day 1: Babak Penyisihan",
                date: "Hari Pertama",
                description: "Kompetisi luring arena berintangan. Setiap tim melakoni 2 kali race untuk mengakumulasikan skor rute, checkpoint, dan pemindahan objek.",
              },
              {
                name: "Day 2: Babak 16 & 8 Besar",
                date: "Hari Kedua",
                description: "Format knock-out 1 vs 1. Setiap race diikuti 2 tim di lintasan masing-masing dengan batas maksimal 50 poin per race.",
              },
              {
                name: "Day 2: Semifinal & Grand Final",
                date: "Hari Kedua",
                description: "Babak Semifinal dan Final (2 kali pertandingan; jika poin seri dilakukan race ketiga) untuk menentukan Juara.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Checkpoint Lintasan Arena",
                weight: "15 Poin",
                note: "Robot berhasil melewati 5 titik checkpoint bertanda garis merah di lintasan (masing-masing bernilai 3 poin).",
              },
              {
                criterion: "Pemindahan Objek 1 (Kotak Jingga)",
                weight: "10 Poin",
                note: "Mekanisme robot berhasil mengambil dan memindahkan objek 1 ke kotak jingga (minimal 50% alas objek masuk).",
              },
              {
                criterion: "Pemindahan Objek 2 (Kotak Hijau)",
                weight: "10 Poin",
                note: "Mekanisme robot berhasil menjepit dan meletakkan objek 2 secara tepat ke dalam kotak target hijau.",
              },
              {
                criterion: "Menuntaskan Misi & Garis Finish",
                weight: "15 Poin",
                note: "Robot mencapai garis finish dan menyelesaikan seluruh rangkaian misi rintangan track.",
              },
              {
                criterion: "Total Skor & Penentu Seri",
                weight: "50 Pt / Race",
                note: "Maksimal 50 poin per race (Day 1 akumulasi 2 race = 100 pt). Jika poin sama, pemenang ditentukan berdasarkan waktu tercepat.",
              },
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
                        stages: [
              {
                name: "Penyisihan Tahap 1 (Daring)",
                date: "Daring",
                description: "Seleksi berkas administrasi dan pengumpulan video pengujian performa Robot Autonomous Line Follower serta Robot Shooter.",
              },
              {
                name: "Penyisihan Tahap 2 Day 1: Seeding",
                date: "Hari Pertama",
                description: "Babak Seeding non-eliminasi yang diikuti 16 tim terbaik di arena ITS untuk menentukan posisi bagan bracket.",
              },
              {
                name: "Penyisihan Tahap 2 Day 2: Knockout",
                date: "Hari Kedua",
                description: "Pertandingan sistem gugur Best of 3 (BO3, 2 kemenangan race) dari 16 Besar, 8 Besar, Semifinal, hingga Perebutan Juara 3 dan Final.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Seleksi Tahap 1: Line Follower",
                weight: "30 Poin",
                note: "Kecepatan looping 1 putaran (maksimal 5 menit), konsistensi jalur, dan kemandirian robot autonomous.",
              },
              {
                criterion: "Seleksi Tahap 1: Robot Shooter",
                weight: "30 Poin",
                note: "Akurasi dan kestabilan menembak 3 target sasaran serta kejelasan verifikasi visual tembakan.",
              },
              {
                criterion: "Kepatuhan Regulasi & Administrasi",
                weight: "40 Poin",
                note: "Kesesuaian dimensi, bobot, dan komponen (25 pt) serta kelengkapan formulir dan video demonstrasi (15 pt).",
              },
              {
                criterion: "Pertandingan Tahap 2: Misi Balok",
                weight: "+10 Poin",
                note: "Robot Autonomous berhasil mendorong balok rintangan pada arena pertandingan.",
              },
              {
                criterion: "Pertandingan Tahap 2: Misi Shooter",
                weight: "+10 - 20 Poin",
                note: "Bola mengenai Robot Autonomous lawan (+20 pt) atau bola berhasil masuk Target Bowl (+10 pt).",
              },
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
                        stages: [
              {
                name: "Tahap 1: Pra Kualifikasi & Kualifikasi",
                date: "Hari Pertama",
                description: "Robot autonomous melintasi track awal. Pra Kualifikasi menentukan kuota tim lolos, Kualifikasi menetapkan seeding urutan (tidak memengaruhi skor akhir).",
              },
              {
                name: "Tahap 2: On Site Programming",
                date: "Hari Pertama / Kedua",
                description: "Arena/lintasan baru diberikan pada hari-H. Seluruh tim lolos bertanding menyusuri track baru; pencatatan waktu dan konsumsi daya dimulai.",
              },
              {
                name: "Tahap 3: On Site Programming",
                date: "Hari Kedua",
                description: "Konfigurasi lintasan baru berikutnya tanpa eliminasi tim. Hasil skor diakumulasikan langsung dengan Tahap 2 untuk menentukan Juara.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Waktu Tempuh Lintasan",
                weight: "50%",
                note: "Skor Waktu = (Sisa Waktu Countdown ÷ Waktu Countdown Total) × 100. Jika robot tidak finish, Skor Waktu = 0.",
              },
              {
                criterion: "Efisiensi Konsumsi Energi",
                weight: "50%",
                note: "Skor Energi = ((Energi Maksimal − Energi Terpakai) ÷ Energi Maksimal) × 100. Melebihi energi maksimum mendapat nilai 0.",
              },
              {
                criterion: "Akumulasi Skor Akhir",
                weight: "Tahap 2 + 3",
                note: "Skor Tahap = (50% × Skor Waktu) + (50% × Skor Energi). Pemenang Juara 1, 2, dan 3 ditentukan murni dari total Skor Tahap 2 + Skor Tahap 3.",
              },
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
                        stages: [
              {
                name: "Tahap 1: Pra Kualifikasi & Kualifikasi",
                date: "Hari Pertama",
                description: "Pengujian autonomous di arena awal untuk menentukan kuota tim lolos dan penempatan urutan seeding bracket pertandingan.",
              },
              {
                name: "Tahap 2: On Site Programming",
                date: "Hari Pertama / Kedua",
                description: "Tantangan lintasan baru yang diumumkan di hari-H. Seluruh tim berlomba mengoptimalkan kecepatan dan efisiensi konsumsi daya robot.",
              },
              {
                name: "Tahap 3: On Site Programming",
                date: "Hari Kedua",
                description: "Kompetisi lanjutan pada konfigurasi lintasan baru hari-H tanpa eliminasi tim dari Tahap 2.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Waktu Tempuh Lintasan",
                weight: "50%",
                note: "Dihitung berdasarkan rumus: (Sisa Waktu Countdown ÷ Waktu Countdown Total) × 100.",
              },
              {
                criterion: "Efisiensi Konsumsi Energi",
                weight: "50%",
                note: "Dihitung berdasarkan rumus: ((Energi Maksimal − Energi Terpakai) ÷ Energi Maksimal) × 100.",
              },
              {
                criterion: "Akumulasi Skor Akhir",
                weight: "Tahap 2 + 3",
                note: "Penentuan peringkat Juara 1, 2, dan 3 didasarkan pada akumulasi total perolehan Skor Tahap 2 ditambah Skor Tahap 3.",
              },
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
                        stages: [
              {
                name: "Babak Penyisihan (Daring)",
                date: "Pengumpulan Berkas",
                description: "Peserta memilih 1 dari 4 rumusan masalah subtema, menyusun karya tulis ilmiah/konsep ide format PDF. 10 tim terbaik lolos ke Final.",
              },
              {
                name: "Final: Vortex Idea Challenge",
                date: "Luring ITS",
                description: "Penyelesaian studi kasus baru secara on-the-spot dalam 120 menit, dilanjutkan presentasi Three Minute Thesis (3MT) 3 menit dan sesi Q&A juri.",
              },
              {
                name: "Final: Vortex Innovation Challenge",
                date: "Luring ITS",
                description: "Penataan booth pameran, demonstrasi fungsional alat/prototipe secara langsung saat sesi booth judging dewan juri, dan tanya jawab teknis.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Penyisihan: Idea Challenge",
                weight: "100 Poin",
                note: "Orisinalitas Gagasan (35%), Relevansi Isu (20%), Kelayakan Konsep (20%), Sistematika (15%), Format (10%).",
              },
              {
                criterion: "Penyisihan: Innovation Challenge",
                weight: "100 Poin",
                note: "Urgensi Masalah (30%), Solusi & Kelayakan (30%), Metodologi (15%), Orisinalitas (15%), Format Penulisan (10%).",
              },
              {
                criterion: "Final: Idea Challenge (3MT)",
                weight: "100 Poin",
                note: "Spontanitas Ide Baru (25%), Komunikasi Verbal (25%), Q&A Juri (25%), Konsep & Solusi (20%), Kepatuhan Aturan (5%).",
              },
              {
                criterion: "Final: Innovation Challenge (Booth)",
                weight: "100 Poin",
                note: "Urgensi Masalah (30%), Presentasi Verbal (25%), Tanya Jawab Juri (25%), Solusi Teknis Alat (15%), Kepatuhan Aturan (5%).",
              },
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
                        stages: [
              {
                name: "Preliminary Stage (Online)",
                date: "Submission Period",
                description: "Selection of 1 of 4 case study topics, submission of scientific research/innovation paper in PDF format. Top 10 teams advance to Final.",
              },
              {
                name: "Final: Vortex Idea Challenge",
                date: "Offline ITS",
                description: "On-site problem solving for a new case study within 120 minutes, followed by a 3-Minute Thesis (3MT) pitch and rigorous jury Q&A defense.",
              },
              {
                name: "Final: Vortex Innovation Challenge",
                date: "Offline ITS",
                description: "Exhibition booth setup, on-site live prototype/device demonstration during booth judging rounds, and technical Q&A session.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Preliminary: Idea Challenge",
                weight: "100 Points",
                note: "Originality of Ideas (35%), Relevance & Depth (20%), Concept Feasibility (20%), Systematics (15%), Format Compliance (10%).",
              },
              {
                criterion: "Preliminary: Innovation Challenge",
                weight: "100 Points",
                note: "Problem Urgency (30%), Solution & Feasibility (30%), Research Methodology (15%), Originality (15%), Format Compliance (10%).",
              },
              {
                criterion: "Final: Idea Challenge (3MT)",
                weight: "100 Points",
                note: "Spontaneity & New Solutions (25%), Verbal Communication (25%), Jury Q&A Defense (25%), Concept Quality (20%), Rules Compliance (5%).",
              },
              {
                criterion: "Final: Innovation Challenge (Booth)",
                weight: "100 Points",
                note: "Problem Urgency (30%), Verbal Presentation (25%), Jury Q&A (25%), Technical Prototype Quality (15%), Rules Compliance (5%).",
              },
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

let cachedCompetitionsEn: CompetitionDivision[] | null = null;

export function getCompetitions(lang: Language = "id"): CompetitionDivision[] {
  if (lang === "en") {
    if (!cachedCompetitionsEn) {
      cachedCompetitionsEn = buildCompetitionsEn(COMPETITIONS);
    }
    return cachedCompetitionsEn;
  }
  return COMPETITIONS;
}

export function getCompetitionBySlug(
  slug: string,
  lang: Language = "id"
): CompetitionDivision | undefined {
  const pool = getCompetitions(lang);
  return pool.find((c) => c.slug === slug);
}

