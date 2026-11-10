export interface TrackVariant {
  id: string;
  name: string;
  nameEn: string;
  tag: string;
  tagEn: string;
  fileUrl: string;
  fileName: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  description: string;
  descriptionEn: string;
}

export interface SmartRoboticsTrack {
  id: string;
  level: "SD" | "SMP" | "SMA/SMK" | "Mahasiswa";
  title: string;
  titleEn: string;
  status: "available" | "placeholder";
  description: string;
  descriptionEn: string;
  fileUrl?: string;
  fileName?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  variants?: TrackVariant[];
  placeholderNotice?: string;
  placeholderNoticeEn?: string;
  guidebookDocId: string;
}

export const SMART_ROBOTICS_TRACKS: SmartRoboticsTrack[] = [
  {
    id: "track-sd",
    level: "SD",
    title: "Track Smart Robotics (SD)",
    titleEn: "Smart Robotics Track (Elementary)",
    status: "available",
    fileUrl: "/tracks/Track Smart Robotics (SD).pdf",
    fileName: "Track Smart Robotics (SD).pdf",
    imageUrl: "/tracks/track-sr-sd.webp",
    imageWidth: 1800,
    imageHeight: 2400,
    guidebookDocId: "sr-sd",
    description:
      "Denah lintasan resmi kategori SD. Menampilkan rute garis putih panduan line follower, titik start bertingkat, dan zona rintangan dorong objek.",
    descriptionEn:
      "Official arena track layout for Elementary level. Features white guidance lines, staged start positions, and obstacle push zones.",
  },
  {
    id: "track-smp",
    level: "SMP",
    title: "Track Smart Robotics (SMP)",
    titleEn: "Smart Robotics Track (Junior High)",
    status: "placeholder",
    guidebookDocId: "sr-smp",
    description:
      "Lintasan arena resmi Smart Robotics kategori SMP dengan spesifikasi mekanik gripper dan checkpoint.",
    descriptionEn:
      "Official Smart Robotics arena track layout for Junior High category featuring gripper mechanics and checkpoints.",
    placeholderNotice:
      "Konfigurasi lintasan resmi jenjang SMP sedang dalam tahap pengujian rintangan dan penyusunan teknis oleh panitia IARC XII. Denah akan dipublikasikan pada halaman ini.",
    placeholderNoticeEn:
      "The official track layout for the Junior High category is currently in final testing and technical preparation by the IARC XII committee. It will be published here once ready.",
  },
  {
    id: "track-sma",
    level: "SMA/SMK",
    title: "Track Smart Robotics (SMA/SMK)",
    titleEn: "Smart Robotics Track (Senior High)",
    status: "placeholder",
    guidebookDocId: "sr-sma",
    description:
      "Lintasan arena resmi Smart Robotics kategori SMA/SMK dengan mekanisme gripper capit dan kotak relokasi objek.",
    descriptionEn:
      "Official Smart Robotics arena track layout for Senior High category featuring gripper mechanisms and object relocation target boxes.",
    placeholderNotice:
      "Konfigurasi lintasan resmi jenjang SMA/SMK dengan rute checkpoint dan zona relokasi objek sedang difinalisasi oleh panitia teknis. Denah akan segera diunggah.",
    placeholderNoticeEn:
      "The official track layout for the Senior High category with checkpoint routes and object relocation zones is being finalized by the technical committee and will be available soon.",
  },
  {
    id: "track-mahasiswa",
    level: "Mahasiswa",
    title: "Track Smart Robotics (Mahasiswa)",
    titleEn: "Smart Robotics Track (University)",
    status: "available",
    guidebookDocId: "sr-mahasiswa",
    description:
      "Denah lintasan resmi kategori Perguruan Tinggi (Mahasiswa) untuk sistem kolaborasi Dual-Robot (R1 Autonomous Line Follower + R2 Shooter Robot). Tersedia dalam varian Offline dan Online.",
    descriptionEn:
      "Official arena track layout for University level featuring Dual-Robot collaboration (R1 Autonomous Line Follower + R2 Shooter Robot). Available in Offline and Online editions.",
    variants: [
      {
        id: "mahasiswa-offline",
        name: "Lintasan Offline (Onsite ITS)",
        nameEn: "Offline Track (Onsite ITS)",
        tag: "Babak Penyisihan & Gugur Onsite",
        tagEn: "Onsite Seeding & Knockout",
        fileUrl: "/tracks/Track Smart Robotics (Mahasiswa) (Offline).pdf",
        fileName: "Track Smart Robotics (Mahasiswa) (Offline).pdf",
        imageUrl: "/tracks/track-sr-mahasiswa-offline.webp",
        imageWidth: 1800,
        imageHeight: 2057,
        description:
          "Konfigurasi arena luring (offline) di kampus ITS untuk babak Seeding dan babak Knockout sistem Best of 3 (BO3).",
        descriptionEn:
          "Onsite arena layout at ITS campus for Seeding and Knockout stages under the Best of 3 (BO3) tournament system.",
      },
      {
        id: "mahasiswa-online",
        name: "Lintasan Online (Seleksi Daring)",
        nameEn: "Online Track (Stage 1 Selection)",
        tag: "Seleksi Tahap 1 Daring",
        tagEn: "Stage 1 Online Selection",
        fileUrl: "/tracks/Track Smart Robotics (Mahasiswa) (Online).pdf",
        fileName: "Track Smart Robotics (Mahasiswa) (Online).pdf",
        imageUrl: "/tracks/track-sr-mahasiswa-online.webp",
        imageWidth: 1800,
        imageHeight: 1285,
        description:
          "Konfigurasi lintasan resmi untuk pengujian video seleksi tahap 1 daring bagi Robot Autonomous Line Follower dan Robot Shooter.",
        descriptionEn:
          "Official track configuration for Stage 1 online video performance testing of Autonomous Line Follower and Shooter Robot.",
      },
    ],
  },
];

export function getSmartRoboticsTrackByLevel(
  level: string
): SmartRoboticsTrack | undefined {
  return SMART_ROBOTICS_TRACKS.find((tr) => tr.level === level);
}

export function getSmartRoboticsTrackById(
  id: string
): SmartRoboticsTrack | undefined {
  return SMART_ROBOTICS_TRACKS.find((tr) => tr.id === id);
}
