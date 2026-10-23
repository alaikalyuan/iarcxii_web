import { FAQS } from "@/data/faq";
import { FaqItem } from "@/types";

export interface FastMatchResult {
  matched: boolean;
  type?: "FAQ" | "GREETING" | "OFF_TOPIC";
  reply?: string;
  faqId?: string;
}

const GREETINGS = [
  "halo",
  "hai",
  "hi",
  "hello",
  "pagi",
  "siang",
  "sore",
  "malam",
  "assalamualaikum",
  "permisi",
  "selamat",
];

const OBVIOUS_OFF_TOPIC_PATTERNS = [
  /\b(resep|masak|baking|makanan)\b/i,
  /\b(cuaca|ramalan|zodiak)\b/i,
  /\b(presiden|pemilu|politik|pilpres)\b/i,
  /\b(crypto|bitcoin|trading|saham)\b/i,
  /\b(buatkan\s+(kode|script|cerita|puisi|lagu))\b/i,
  /\b(hitung|kalkulator|\d+\s*[\+\-\*\/]\s*\d+)\b/i,
  /\b(siapa\s+kamu|kamu\s+siapa|kamu\s+dibuat\s+oleh)\b/i,
];

function tokenize(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function tryFastMatch(userMessage: string): FastMatchResult {
  const trimmed = userMessage.trim();
  const lower = trimmed.toLowerCase();

  // 1. Check Greeting
  const isGreetingOnly = GREETINGS.some((g) => {
    return lower === g || lower === `${g} min` || lower === `${g} bot` || lower === `${g}!`;
  });
  if (isGreetingOnly) {
    return {
      matched: true,
      type: "GREETING",
      reply:
        "Halo! Saya asisten virtual resmi IARC XII (Industrial Automation & Robotics Competition 2026). Ada yang bisa saya bantu mengenai cabang perlombaan, jadwal, biaya pendaftaran, atau aturan teknis guidebook?",
    };
  }

  // 2. Check Obvious Off-Topic Patterns
  for (const pattern of OBVIOUS_OFF_TOPIC_PATTERNS) {
    if (pattern.test(lower)) {
      return {
        matched: true,
        type: "OFF_TOPIC",
        reply:
          "Maaf, saya asisten resmi khusus seputar perlombaan IARC XII. Saya tidak dapat menjawab topik di luar agenda, teknis, atau regulasi kompetisi IARC XII. Silakan tanyakan hal terkait cabang lomba, guidebook, alur pendaftaran, atau jadwal acara.",
      };
    }
  }

  // 3. Fast Exact or High-Similarity FAQ Match
  const userTokens = tokenize(lower);
  if (userTokens.length < 3) return { matched: false };

  let bestFaq: FaqItem | null = null;
  let bestScore = 0;

  for (const faq of FAQS) {
    const faqTokens = tokenize(faq.question);
    const commonCount = userTokens.filter((token) => faqTokens.includes(token)).length;
    const userCoverage = commonCount / userTokens.length;
    const dice = (2 * commonCount) / (userTokens.length + faqTokens.length);

    // Score favors queries whose core keywords are mostly covered by the FAQ
    const score = Math.max(dice, userCoverage >= 0.8 && commonCount >= 3 ? userCoverage : 0);

    if (score > bestScore) {
      bestScore = score;
      bestFaq = faq;
    }
  }

  // If similarity is high, return verified answer directly
  if (bestFaq && bestScore >= 0.75) {
    return {
      matched: true,
      type: "FAQ",
      reply: bestFaq.answer,
      faqId: bestFaq.id,
    };
  }

  return { matched: false };
}
