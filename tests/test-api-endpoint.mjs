import { POST } from "../src/app/api/chat/route.ts";
import { NextRequest } from "next/server";

async function run() {
  console.log("=== TESTING /api/chat ENDPOINT DIRECTLY ===");

  // Test 1: Off-topic request
  const req1 = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "bagaimana resep memasak rendang padang?" }],
    }),
  });
  const res1 = await POST(req1);
  const data1 = await res1.json();
  console.log("Test 1 (Off-topic):", data1.status === "OUT_OF_TOPIC" ? "PASS" : "FAIL", data1);

  // Test 2: FAQ match request
  const req2 = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "apakah panitia menyediakan akomodasi penginapan bagi peserta luar kota?" }],
    }),
  });
  const res2 = await POST(req2);
  const data2 = await res2.json();
  console.log("Test 2 (FAQ Match):", data2.status === "ANSWERED" && data2.matchedFaqId === "faq-4" ? "PASS" : "FAIL", data2.reply.slice(0, 80));

  // Test 3: Local search fallback without API key
  const req3 = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "apa software yang digunakan untuk PLC Omron?" }],
    }),
  });
  const res3 = await POST(req3);
  const data3 = await res3.json();
  console.log("Test 3 (Guidebook Search):", data3.status === "ANSWERED" && data3.citations.length > 0 ? "PASS" : "FAIL", data3.citations[0]);

  // Test 4: Unknown question triggers CS fallback
  const req4 = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "xyzqwerty asdasd zzz" }],
    }),
  });
  const res4 = await POST(req4);
  const data4 = await res4.json();
  console.log("Test 4 (CS Fallback):", data4.status === "UNKNOWN_NEED_CS" && data4.suggestedAction === "CONTACT_CS" ? "PASS" : "FAIL", data4);
}

run().catch(console.error);
