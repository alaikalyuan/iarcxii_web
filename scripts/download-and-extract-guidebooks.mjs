import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const GUIDEBOOKS = [
  {
    id: "utama",
    title: "Guidebook Utama IARC XII",
    division: "Umum",
    track: "Semua Divisi",
    level: "Semua Jenjang",
    driveFileId: "184sPpIroHzL4nIPJ7Nae8H3mofs6ts3B",
  },
  {
    id: "ac-iot-sd",
    title: "Automation Challenge (IoT) - SD",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "SD",
    driveFileId: "1HgXscE4qxnuleO7bpNu-W3HHG9LJJjha",
  },
  {
    id: "ac-iot-smp",
    title: "Automation Challenge (IoT) - SMP",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "SMP",
    driveFileId: "1S9tndYneDhlVF5EVE7_oQp5LUs7fpTea",
  },
  {
    id: "ac-iot-sma",
    title: "Automation Challenge (IoT) - SMA/SMK",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "SMA/SMK",
    driveFileId: "11FFJnDza-c5A1mcNOoWV6CR1RKMccrEn",
  },
  {
    id: "ac-iot-mahasiswa",
    title: "Automation Challenge (IoT) - Mahasiswa",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "Mahasiswa",
    driveFileId: "1RX5g-d4NAGj9Mj5pWWD3kpxmdEY0DlXU",
  },
  {
    id: "ac-iot-college",
    title: "Automation Challenge (IoT) - International (College)",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "International",
    driveFileId: "1RX5g-d4NAGj9Mj5pWWD3kpxmdEY0DlXU",
  },
  {
    id: "ac-plc-sma",
    title: "Automation Challenge (PLC) - SMA/SMK",
    division: "Automation Challenge",
    track: "Track 2: PLC",
    level: "SMA/SMK",
    driveFileId: "16oR7A49dKUqqIT4aze36i94dgqUQ1wFW",
  },
  {
    id: "ac-plc-mahasiswa",
    title: "Automation Challenge (PLC) - Mahasiswa",
    division: "Automation Challenge",
    track: "Track 2: PLC",
    level: "Mahasiswa",
    driveFileId: "1coQGlUYXAxmB65M93sXWCS93m6hAuB7c",
  },
  {
    id: "sr-sd",
    title: "Smart Robotics - SD",
    division: "Smart Robotics",
    track: "Line Follower / Mission",
    level: "SD",
    driveFileId: "1aDIGw8GW-Qnk28qVPreZ-_5gOw1rYuNx",
  },
  {
    id: "sr-smp",
    title: "Smart Robotics - SMP",
    division: "Smart Robotics",
    track: "Line Follower / Mission",
    level: "SMP",
    driveFileId: "1vSzLNsugX7yqUsk8_jSqydGaTLpe-ez2",
  },
  {
    id: "sr-sma",
    title: "Smart Robotics - SMA/SMK",
    division: "Smart Robotics",
    track: "Line Follower / Gripper",
    level: "SMA/SMK",
    driveFileId: "1EaCDWjzcJMk1aCl9EqlJaiUhhANQOrCK",
  },
  {
    id: "sr-mahasiswa",
    title: "Smart Robotics - Mahasiswa",
    division: "Smart Robotics",
    track: "Dual Robot Autonomous (R1) & Shooter (R2)",
    level: "Mahasiswa",
    driveFileId: "16BQ6_5-tzjk4ev0zCgDByqs9TtlzUuYD",
  },
  {
    id: "et-sma",
    title: "Energy Treasure - SMA/SMK",
    division: "Energy Treasure",
    track: "Maze Solver Line Follower",
    level: "SMA/SMK",
    driveFileId: "1M8ZKTFb3CUlu_GFMw51yFqYjn2GAxzAt",
  },
  {
    id: "et-mahasiswa",
    title: "Energy Treasure - Mahasiswa",
    division: "Energy Treasure",
    track: "Maze Solver Line Follower",
    level: "Mahasiswa",
    driveFileId: "17TA69X_pn8T4qc7-7YsZKRBaEdsDhGOu",
  },
  {
    id: "kti-sma",
    title: "KTI Vortex - SMA/SMK",
    division: "KTI Vortex",
    track: "Idea & Innovation Challenge",
    level: "SMA/SMK",
    driveFileId: "1d61pRSlnBKvPNFTA9ymIA3UpQmHzIent",
  },
  {
    id: "kti-mahasiswa",
    title: "KTI Vortex - Mahasiswa",
    division: "KTI Vortex",
    track: "Idea & Innovation Challenge",
    level: "Mahasiswa",
    driveFileId: "1DWBk4L6oLwpO3goD5nOxOE9VKrrWx8BC",
  },
];

const pdfDir = path.join(rootDir, "public", "guidebooks", "pdf");
const extractDir = path.join(rootDir, "src", "data", "guidebook-extracted");

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}
if (!fs.existsSync(extractDir)) {
  fs.mkdirSync(extractDir, { recursive: true });
}

async function downloadFile(driveFileId, destPath) {
  const urls = [
    `https://drive.usercontent.google.com/download?id=${driveFileId}&export=download`,
    `https://drive.google.com/uc?export=download&id=${driveFileId}`
  ];

  let lastErr = null;
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength < 500) {
        throw new Error(`File too small or download interstitial returned (${buffer.byteLength} bytes)`);
      }
      fs.writeFileSync(destPath, Buffer.from(buffer));
      return Buffer.from(buffer);
    } catch (err) {
      lastErr = err;
    }
  }

  throw new Error(`Failed to download ${driveFileId}: ${lastErr?.message}`);
}

function parsePagesFromText(rawText, totalPages) {
  // pdf-parse v2 formats text with markers like "-- 1 of 8 --"
  const pages = [];
  const regex = /--\s*(\d+)\s+of\s+(\d+)\s*--/g;
  const matches = [...rawText.matchAll(regex)];

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const pageNum = parseInt(matches[i][1], 10);
      const startIdx = matches[i].index + matches[i][0].length;
      const endIdx = i + 1 < matches.length ? matches[i + 1].index : rawText.length;
      const content = rawText.slice(startIdx, endIdx).trim();
      pages.push({
        pageNumber: pageNum,
        content,
      });
    }
  } else {
    // Fallback: split by form-feed or chunk evenly
    const ffPages = rawText.split("\f");
    ffPages.forEach((p, idx) => {
      const trimmed = p.trim();
      if (trimmed) {
        pages.push({
          pageNumber: idx + 1,
          content: trimmed,
        });
      }
    });
  }

  return pages;
}

async function run() {
  const force = process.argv.includes("--force");
  console.log(`Starting extraction of ${GUIDEBOOKS.length} guidebooks (force: ${force})...`);
  const masterIndex = [];

  for (const gb of GUIDEBOOKS) {
    const pdfPath = path.join(pdfDir, `${gb.id}.pdf`);
    const jsonPath = path.join(extractDir, `${gb.id}.json`);

    let buffer;
    if (!force && fs.existsSync(pdfPath) && fs.statSync(pdfPath).size > 1000) {
      console.log(`[Cache] Using existing PDF for ${gb.id}`);
      buffer = fs.readFileSync(pdfPath);
    } else {
      console.log(`[Download] Fetching ${gb.id} (${gb.title}) from Drive...`);
      try {
        buffer = await downloadFile(gb.driveFileId, pdfPath);
      } catch (err) {
        console.error(`Error downloading ${gb.id}:`, err.message);
        continue;
      }
    }

    try {
      const parser = new PDFParse({ data: buffer });
      const parsed = await parser.getText();
      const rawText = parsed.text || "";
      const totalPages = parsed.total || 1;
      const pages = parsePagesFromText(rawText, totalPages);

      const extractedData = {
        id: gb.id,
        title: gb.title,
        division: gb.division,
        track: gb.track,
        level: gb.level,
        driveFileId: gb.driveFileId,
        totalPages,
        charCount: rawText.length,
        pages,
        fullText: rawText,
      };

      fs.writeFileSync(jsonPath, JSON.stringify(extractedData, null, 2), "utf-8");
      console.log(`[Success] Extracted ${gb.id}: ${totalPages} pages, ${rawText.length} chars`);

      // Add each page to master search index
      pages.forEach((p) => {
        masterIndex.push({
          guidebookId: gb.id,
          title: gb.title,
          division: gb.division,
          level: gb.level,
          pageNumber: p.pageNumber,
          content: p.content,
        });
      });
    } catch (parseErr) {
      console.error(`Failed parsing ${gb.id}:`, parseErr.message);
    }
  }

  const masterIndexPath = path.join(extractDir, "master-index.json");
  fs.writeFileSync(masterIndexPath, JSON.stringify(masterIndex, null, 2), "utf-8");
  console.log(`Done! Master search index created with ${masterIndex.length} page chunks.`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
