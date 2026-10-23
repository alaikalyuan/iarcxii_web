import { tryFastMatch } from "../src/lib/hybridMatcher.ts";
import { searchGuidebooks, getGuidebookPage } from "../src/lib/guidebookSearch.ts";

console.log("=== RUNNING CHATBOT GUARDRAIL & TOOL SEARCH TESTS ===");

let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// 1. Off-topic detection
const offTopicRes1 = tryFastMatch("resep membuat kue bolu");
assert(offTopicRes1.matched && offTopicRes1.type === "OFF_TOPIC", "Filter off-topic: Resep memasak");

const offTopicRes2 = tryFastMatch("siapa presiden amerika serikat?");
assert(offTopicRes2.matched && offTopicRes2.type === "OFF_TOPIC", "Filter off-topic: Politik umum");

const offTopicRes3 = tryFastMatch("buatkan kode python sorting array");
assert(offTopicRes3.matched && offTopicRes3.type === "OFF_TOPIC", "Filter off-topic: Pemrograman umum");

// 2. Greeting detection
const greetRes = tryFastMatch("halo min");
assert(greetRes.matched && greetRes.type === "GREETING", "Filter greeting: Halo min");

// 3. Fast FAQ match
const faqRes = tryFastMatch("apakah panitia menyediakan akomodasi penginapan?");
assert(faqRes.matched && faqRes.type === "FAQ" && faqRes.faqId === "faq-4", "FAQ Match: Akomodasi penginapan");

// 4. Guidebook local search
const plcSearch = searchGuidebooks("omron cp2e-n cx-programmer", "ac-plc-sma", 3);
assert(plcSearch.length > 0 && plcSearch[0].guidebookId === "ac-plc-sma", "Search Guidebook: PLC software & hardware");

const robotSearch = searchGuidebooks("dimensi robot gripper", "sr-sma", 3);
assert(robotSearch.length > 0 && robotSearch[0].guidebookId === "sr-sma", "Search Guidebook: Dimensi robot Smart Robotics SMA");

const rekeningSearch = searchGuidebooks("rekening bca pendaftaran", undefined, 3);
assert(rekeningSearch.length > 0, "Search Guidebook: Rekening pembayaran pendaftaran");

// 5. Read guidebook page
const pageData = getGuidebookPage("ac-plc-sma", 4);
assert(pageData !== null && pageData.text.includes("BCA"), "Read Page: Membaca rekening di Halaman 4 ac-plc-sma");

console.log(`\nTEST SUMMARY: ${passed}/${total} assertions passed.`);
if (passed === total) {
  console.log("All chatbot guardrail and search tests passed successfully!");
} else {
  process.exit(1);
}
