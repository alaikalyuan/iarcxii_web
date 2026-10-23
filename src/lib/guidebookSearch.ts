import fs from "fs";
import path from "path";

export interface MasterIndexItem {
  guidebookId: string;
  title: string;
  division: string;
  level: string;
  pageNumber: number;
  content: string;
}

export interface SearchResult {
  guidebookId: string;
  title: string;
  division: string;
  level: string;
  pageNumber: number;
  snippet: string;
  score: number;
}

let cachedIndex: MasterIndexItem[] | null = null;

export function getMasterIndex(): MasterIndexItem[] {
  if (cachedIndex) return cachedIndex;

  try {
    const indexPath = path.join(
      process.cwd(),
      "src",
      "data",
      "guidebook-extracted",
      "master-index.json"
    );
    if (fs.existsSync(indexPath)) {
      const data = fs.readFileSync(indexPath, "utf-8");
      cachedIndex = JSON.parse(data);
      return cachedIndex || [];
    }
  } catch (err) {
    console.error("Failed to load guidebook master index:", err);
  }

  return [];
}

const STOPWORDS = new Set([
  "dan", "yang", "di", "ke", "dari", "untuk", "pada", "adalah", "ini", "itu",
  "dengan", "atau", "apa", "bagaimana", "apakah", "berapa", "kapan", "siapa",
  "the", "and", "or", "to", "in", "of", "a", "is", "for", "on", "at", "by", "with"
]);

export function searchGuidebooks(
  query: string,
  guidebookId?: string,
  limit = 5
): SearchResult[] {
  const items = getMasterIndex();
  if (!items.length) return [];

  const rawTokens = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));

  if (rawTokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const item of items) {
    if (guidebookId && item.guidebookId !== guidebookId) {
      continue;
    }

    const contentLower = item.content.toLowerCase();
    const titleLower = item.title.toLowerCase();

    let score = 0;

    // Check exact phrase match
    const lowerQuery = query.toLowerCase().trim();
    if (lowerQuery.length > 4 && contentLower.includes(lowerQuery)) {
      score += 15;
    }

    // Token frequency and keyword weighting
    for (const token of rawTokens) {
      // Title match gives strong boost
      if (titleLower.includes(token)) {
        score += 6;
      }

      // Check occurrences in content
      let count = 0;
      let pos = contentLower.indexOf(token);
      while (pos !== -1 && count < 8) {
        count++;
        pos = contentLower.indexOf(token, pos + token.length);
      }
      score += count * 2;
    }

    if (score > 0) {
      // Extract snippet around first match
      let snippet = "";
      const firstToken = rawTokens.find((t) => contentLower.includes(t));
      if (firstToken) {
        const idx = contentLower.indexOf(firstToken);
        const start = Math.max(0, idx - 120);
        const end = Math.min(item.content.length, idx + 240);
        snippet = (start > 0 ? "..." : "") + item.content.slice(start, end).replace(/\s+/g, " ") + (end < item.content.length ? "..." : "");
      } else {
        snippet = item.content.slice(0, 200).replace(/\s+/g, " ") + "...";
      }

      results.push({
        guidebookId: item.guidebookId,
        title: item.title,
        division: item.division,
        level: item.level,
        pageNumber: item.pageNumber,
        snippet,
        score,
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

export function getGuidebookPage(
  guidebookId: string,
  pageNumber: number
): { text: string; title: string; totalPages: number } | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "guidebook-extracted",
      `${guidebookId}.json`
    );
    if (!fs.existsSync(filePath)) return null;

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const page = data.pages.find((p: { pageNumber: number }) => p.pageNumber === pageNumber);

    return {
      title: data.title,
      totalPages: data.totalPages,
      text: page ? page.content : "Halaman tidak ditemukan.",
    };
  } catch (err) {
    console.error(`Failed to read page ${pageNumber} of ${guidebookId}:`, err);
    return null;
  }
}
