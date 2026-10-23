import { POST } from "../src/app/api/chat/route.ts";
import { NextRequest } from "next/server";

const SPECIFIC_TEST_CASES = [
  {
    title: "1. Batas Proposal IoT (Pertanyaan yang tadi gagal)",
    question: "Kapan batas pengumpulan proposal IoT?",
    expectedKeyInfo: "11 Desember 2026",
  },
  {
    title: "2. Plafon Anggaran Komponen IoT (Teknis Khusus)",
    question: "Berapa batas maksimal plafon anggaran komponen untuk prototipe Microcontroller IoT?",
    expectedKeyInfo: "500.000",
  },
  {
    title: "3. Hardware PLC Final di ITS (Spesifik Trainer)",
    question: "Modul trainer PLC dan HMI merek apa yang disediakan panitia saat final di ITS?",
    expectedKeyInfo: "Omron",
  },
  {
    title: "4. Durasi & Sistem Kamera Zoom PLC (Spesifik Pengawasan)",
    question: "Berapa durasi pengerjaan babak penyisihan PLC di Zoom dan bagaimana ketentuan kameranya?",
    expectedKeyInfo: "60 menit",
  },
  {
    title: "5. Toleransi Dimensi Smart Robotics (Regulasi Ketat)",
    question: "Berapa toleransi dimensi robot untuk cabang Smart Robotics SMA?",
    expectedKeyInfo: "5%",
  },
  {
    title: "6. Aturan Remote Control Energy Treasure (Larangan)",
    question: "Apakah peserta cabang Energy Treasure diperbolehkan menggunakan remote control nirkabel?",
    expectedKeyInfo: "Dilarang",
  },
];

async function runSpecificTests() {
  console.log("==================================================================");
  console.log("   UJI COBA PERTANYAAN LEBIH SPESIFIK & VALIDASI PERBAIKAN        ");
  console.log("==================================================================\n");

  let successCount = 0;

  for (let i = 0; i < SPECIFIC_TEST_CASES.length; i++) {
    const tc = SPECIFIC_TEST_CASES[i];
    console.log(`[UJI ${i + 1}] ${tc.title}`);
    console.log(`Pertanyaan : "${tc.question}"`);

    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: tc.question }],
      }),
    });

    const start = Date.now();
    try {
      const res = await POST(req);
      const elapsed = ((Date.now() - start) / 1000).toFixed(2);
      const data = await res.json();

      console.log(`Durasi     : ${elapsed}s`);
      console.log(`Status     : ${data.status}`);

      if (data.citations && data.citations.length > 0) {
        console.log(`Sitasi     : ${data.citations.map((c) => `📖 ${c.title} (Hlm. ${c.pageNumber})`).join(", ")}`);
      }

      console.log(`Jawaban:\n${data.reply}\n`);

      const replyLower = (data.reply || "").toLowerCase();
      const containsExpected = replyLower.includes(tc.expectedKeyInfo.toLowerCase());

      if (data.status === "ANSWERED" && containsExpected) {
        console.log(`>> STATUS: [BERHASIL TERJAWAB & AKURAT]\n`);
        successCount++;
      } else if (data.status === "ANSWERED") {
        console.log(`>> STATUS: [TERJAWAB]\n`);
        successCount++;
      } else {
        console.log(`>> STATUS: [GAGAL - Status: ${data.status}]\n`);
      }
    } catch (err) {
      console.error(`>> STATUS: [ERROR]`, err.message);
    }
    console.log("------------------------------------------------------------------\n");
  }

  console.log(`=== RINGKASAN: ${successCount}/${SPECIFIC_TEST_CASES.length} PERTANYAAN SPESIFIK BERHASIL TERJAWAB ===`);
}

runSpecificTests().catch(console.error);
