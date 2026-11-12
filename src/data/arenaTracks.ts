import { SMART_ROBOTICS_TRACKS, SmartRoboticsTrack } from "./smartRoboticsTracks";

export type ArenaTrack = SmartRoboticsTrack;

// Stage 1 (Day 1) arenas only: the guidebooks keep Stage 2 and 3 arenas hidden until competition day
export const ENERGY_TREASURE_TRACKS: ArenaTrack[] = [
  {
    id: "track-et-sma",
    level: "SMA/SMK",
    title: "Arena Tahap 1 Energy Treasure (SMA/SMK)",
    titleEn: "Energy Treasure Stage 1 Arena (Senior High)",
    status: "available",
    fileUrl: "/tracks/energy-treasure/Track Energy Treasure (SMA) [Arena 1].pdf",
    fileName: "Track Energy Treasure (SMA) [Arena 1].pdf",
    imageUrl: "/tracks/energy-treasure/Track Energy Treasure (SMA) [Arena 1].webp",
    imageWidth: 2000,
    imageHeight: 2000,
    guidebookDocId: "et-sma",
    description:
      "Arena Tahap 1 (Day 1): labirin garis hitam selebar 2 cm di atas banner vinyl 2 m x 2 m, dengan tiga titik finish yang diundi panitia sebelum sesi Race. Arena Tahap 2 dan 3 berbeda dan baru diperlihatkan pada hari pertandingan.",
    descriptionEn:
      "Stage 1 (Day 1) arena: a maze of 2 cm black lines on a 2 m x 2 m vinyl banner, with three finish points drawn by the committee before the Race session. Stage 2 and 3 arenas are different and only shown on competition day.",
  },
  {
    id: "track-et-mahasiswa",
    level: "Mahasiswa",
    title: "Arena Tahap 1 Energy Treasure (Mahasiswa)",
    titleEn: "Energy Treasure Stage 1 Arena (University)",
    status: "available",
    fileUrl: "/tracks/energy-treasure/Track Energy Treasure (Mahasiswa) [Arena 1].pdf",
    fileName: "Track Energy Treasure (Mahasiswa) [Arena 1].pdf",
    imageUrl: "/tracks/energy-treasure/Track Energy Treasure (Mahasiswa) [Arena 1].webp",
    imageWidth: 2000,
    imageHeight: 2000,
    guidebookDocId: "et-mahasiswa",
    description:
      "Arena Tahap 1 (Day 1): labirin garis hitam selebar 2 cm di atas banner vinyl 3 m x 3 m, dengan tiga titik finish yang diundi panitia sebelum sesi Race. Arena Tahap 2 dan 3 berbeda, diperlihatkan pada hari pertandingan, dan dapat diberi obstacle.",
    descriptionEn:
      "Stage 1 (Day 1) arena: a maze of 2 cm black lines on a 3 m x 3 m vinyl banner, with three finish points drawn by the committee before the Race session. Stage 2 and 3 arenas are different, shown on competition day, and may add obstacles.",
  },
];

const TRACKS_BY_DIVISION: Record<string, ArenaTrack[]> = {
  "smart-robotics": SMART_ROBOTICS_TRACKS,
  "energy-treasure": ENERGY_TREASURE_TRACKS,
};

export function getArenaTracks(divisionSlug: string): ArenaTrack[] {
  return TRACKS_BY_DIVISION[divisionSlug] ?? [];
}

export function getArenaTrack(
  divisionSlug: string,
  level: string
): ArenaTrack | undefined {
  return getArenaTracks(divisionSlug).find((t) => t.level === level);
}
