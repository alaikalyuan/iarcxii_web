import { POST } from "../src/app/api/chat/route.ts";
import { NextRequest } from "next/server";

const TEST_CASES = [
  {
    category: "1. FAST FAQ / HYBRID MATCH",
    question: "Apakah panitia menyediakan akomodasi penginapan bagi peserta dari luar kota?",
    expectedStatus: "ANSWERED",
  },
  {
    category: "2. TEKNIS GUIDEBOOK (DIMENSI ROBOT)",
    question: "Berapa dimensi maksimal robot untuk cabang Smart Robotics SMA?",
    expectedStatus: "ANSWERED",
  },
  {
    category: "3. TEKNIS GUIDEBOOK (SOFTWARE PLC)",
    question: "Software apa saja yang digunakan pada babak final Automation Challenge PLC?",
    expectedStatus: "ANSWERED",
  },
  {
    category: "4. BIAYA & REKENING PEMBAYARAN",
    question: "Berapa biaya pendaftaran PLC SMA untuk Batch 1, dan rekening pembayarannya ke mana?",
    expectedStatus: "ANSWERED",
  },
  {
    category: "5. GUARDRAIL DI LUAR TOPIK (OUT OF TOPIC)",
    question: "Bagaimana cara membuat martabak manis yang enak dan bersarang?",
    expectedStatus: "OUT_OF_TOPIC",
  },
  {
    category: "6. KASUS KHUSUS BUTUH CS (FALLBACK CS)",
    question: "Apakah tim kami bisa mengajukan dispensasi khusus penundaan pengumpulan proposal karena jadwal ujian sekolah bentrok?",
    expectedStatus: "UNKNOWN_NEED_CS",
  },
];

async function runLiveSuite() {
  console.log("===============================================================");
  console.log("   IARC XII CHATBOT API LIVE TEST SUITE (DEEPSEEK + TOOLS)     ");
  console.log("===============================================================\n");

  let passedCount = 0;

  for (let i = 0; i < TEST_CASES.length; i++) {
    const tc = TEST_CASES[i];
    console.log(`[TEST ${i + 1}] Kategori: ${tc.category}`);
    console.log(`Pertanyaan : "${tc.question}"`);

    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: tc.question }],
      }),
    });

    const startTime = Date.now();
    try {
      const res = await POST(req);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      const data = await res.json();

      console.log(`Durasi     : ${elapsed}s`);
      console.log(`Status     : ${data.status} (Target: ${tc.expectedStatus})`);
      console.log(`Action     : ${data.suggestedAction || "NONE"}`);

      if (data.citations && data.citations.length > 0) {
        console.log(`Sitasi (${data.citations.length}) :`);
        data.citations.forEach((c) => {
          console.log(`  - 📖 ${c.title} (Halaman ${c.pageNumber})`);
        });
      }

      console.log(`Jawaban    :\n${data.reply}\n`);

      const statusMatch = data.status === tc.expectedStatus;
      if (statusMatch) {
        console.log(`>> HASIL: [PASS]\n`);
        passedCount++;
      } else {
        console.log(`>> HASIL: [FAIL - Status tidak sesuai]\n`);
      }
    } catch (err) {
      console.error(`>> HASIL: [ERROR]`, err.message);
    }
    console.log("---------------------------------------------------------------\n");
  }

  console.log(`=== RINGKASAN TEST: ${passedCount}/${TEST_CASES.length} SUKSES ===`);
}

runLiveSuite().catch(console.error);
