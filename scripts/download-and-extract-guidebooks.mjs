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
    driveFileId: "1uQ1cab1J8q-c0y7LHuPGqYbmo9pNAk6G",
  },
  {
    id: "ac-iot-smp",
    title: "Automation Challenge (IoT) - SMP",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "SMP",
    driveFileId: "1eCWiLbaj854c4vDzMbeE8kK6wLObjjF6",
  },
  {
    id: "ac-iot-sma",
    title: "Automation Challenge (IoT) - SMA/SMK",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "SMA/SMK",
    driveFileId: "1sQLag3CtjTOqG0Hp2LSeiM2ffC6IgRAj",
  },
  {
    id: "ac-iot-mahasiswa",
    title: "Automation Challenge (IoT) - Mahasiswa",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "Mahasiswa",
    driveFileId: "1YBo2zKuqBSvma3KcbQWKaW1zD0ecAUMD",
  },
  {
    id: "ac-iot-college",
    title: "Automation Challenge (IoT) - International (College)",
    division: "Automation Challenge",
    track: "Track 1: Microcontroller (IoT)",
    level: "International",
    driveFileId: "1cs-v0yp4zXNqJcVQnMEOx4U7rqLwRIZe",
  },
  {
    id: "ac-plc-sma",
    title: "Automation Challenge (PLC) - SMA/SMK",
    division: "Automation Challenge",
    track: "Track 2: PLC",
    level: "SMA/SMK",
    driveFileId: "11wDZHyCo-r5gM62c-eU448oY9Ay9pk3x",
  },
  {
    id: "ac-plc-mahasiswa",
    title: "Automation Challenge (PLC) - Mahasiswa",
    division: "Automation Challenge",
    track: "Track 2: PLC",
    level: "Mahasiswa",
    driveFileId: "1eAkkfOJ7U8E6rU_lPMbFVOg8adzW5z3b",
  },
  {
    id: "sr-sd",
    title: "Smart Robotics - SD",
    division: "Smart Robotics",
    track: "Line Follower / Mission",
    level: "SD",
    driveFileId: "1gwJp1EsmaPgV-oWPW57k0VUM5jXVAMn5",
  },
  {
    id: "sr-smp",
    title: "Smart Robotics - SMP",
    division: "Smart Robotics",
    track: "Line Follower / Mission",
    level: "SMP",
    driveFileId: "1SXfoOAbM4mkzRXBwNfQWH8X91bmraz8l",
  },
  {
    id: "sr-sma",
    title: "Smart Robotics - SMA/SMK",
    division: "Smart Robotics",
    track: "Line Follower / Gripper",
    level: "SMA/SMK",
    driveFileId: "1x5xDg_yqAeZHoZibnt1J4ToDzjQFWHM-",
  },
  {
    id: "sr-mahasiswa",
    title: "Smart Robotics - Mahasiswa",
    division: "Smart Robotics",
    track: "Dual Robot Autonomous (R1) & Shooter (R2)",
    level: "Mahasiswa",
    driveFileId: "1CBZHKGrm7e1O55Tc6k2tvP1i0mW9QWpw",
  },
  {
    id: "et-sma",
    title: "Energy Treasure - SMA/SMK",
    division: "Energy Treasure",
    track: "Maze Solver Line Follower",
    level: "SMA/SMK",
    driveFileId: "1b1X3bBQ3ZM1jqWvnQ5j6eMBPz_aRzP1u",
  },
  {
    id: "et-mahasiswa",
    title: "Energy Treasure - Mahasiswa",
    division: "Energy Treasure",
    track: "Maze Solver Line Follower",
    level: "Mahasiswa",
    driveFileId: "1HfvYmff8UDEvPp9FbY3naiIObMO_CBAM",
  },
  {
    id: "kti-sma",
    title: "KTI Vortex - SMA/SMK",
    division: "KTI Vortex",
    track: "Idea & Innovation Challenge",
    level: "SMA/SMK",
    driveFileId: "1U06MEmMDTWX0aBkGw-OyNULOvUnZVwwq",
  },
  {
    id: "kti-mahasiswa",
    title: "KTI Vortex - Mahasiswa",
    division: "KTI Vortex",
    track: "Idea & Innovation Challenge",
    level: "Mahasiswa",
    driveFileId: "10bcXDOy2u8kNo6o9-bTqadFdzao4kF9i",
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
  const url = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${driveFileId}: ${response.status} ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
  return Buffer.from(buffer);
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
  console.log(`Starting extraction of ${GUIDEBOOKS.length} guidebooks...`);
  const masterIndex = [];

  for (const gb of GUIDEBOOKS) {
    const pdfPath = path.join(pdfDir, `${gb.id}.pdf`);
    const jsonPath = path.join(extractDir, `${gb.id}.json`);

    let buffer;
    if (fs.existsSync(pdfPath) && fs.statSync(pdfPath).size > 1000) {
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
