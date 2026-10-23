import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { searchGuidebooks, getGuidebookPage } from "@/lib/guidebookSearch";
import { tryFastMatch } from "@/lib/hybridMatcher";
import { siteConfig } from "@/data/siteConfig";
import { ChatApiResponse, ChatCitation, ChatStatus } from "@/types/chat";

export const dynamic = "force-dynamic";

const SYSTEM_INSTRUCTION = `Anda adalah asisten virtual resmi untuk IARC XII (Industrial Automation & Robotics Competition 2026) yang diselenggarakan oleh Departemen Teknik Elektro Otomasi, Institut Teknologi Sepuluh Nopember (ITS) Surabaya.

TEMA: "${siteConfig.theme}"
EMAIL CS: ${siteConfig.email}
INSTAGRAM: @iarc.its (${siteConfig.socials.instagram})

LINIMASA RESMI (TIMELINE):
- Jalur 1: Automation Challenge (Microcontroller IoT) & KTI Vortex
  * Pendaftaran Batch 1: 25 Sep - 16 Okt 2026
  * Pendaftaran Batch 2: 17 Okt - 7 Nov 2026
  * Pendaftaran Batch 3: 8 Nov - 27 Nov 2026
  * BATAS PENGUMPULAN PROPOSAL & VIDEO/NASKAH: 11 Desember 2026 (berlaku untuk semua jenjang SD, SMP, SMA, Mahasiswa, College)
  * Pengumuman Finalis (Top 5 / Top 10): 16 Desember 2026
  * Technical Meeting Babak Final: 18 Desember 2026
  * Event Day Babak Final Luring di Kampus ITS: 9 - 10 Januari 2027

- Jalur 2: Smart Robotics, Automation Challenge (PLC), Energy Treasure
  * Pendaftaran Batch 1: 25 Sep - 18 Okt 2026
  * Pendaftaran Batch 2: 19 Okt - 15 Nov 2026
  * Pendaftaran Batch 3: 16 Nov - 13 Des 2026
  * Technical Meeting Babak Penyisihan: 20 Desember 2026
  * Babak Penyisihan Daring: 26 - 27 Desember 2026
  * Pengumuman Semifinalis/Finalis: 30 Desember 2026
  * Technical Meeting Babak Final: 3 Januari 2027
  * Event Day Babak Semifinal & Final Luring di Kampus ITS: 9 - 10 Januari 2027

ATURAN UTAMA & GUARDRAIL KETAT:
1. HANYA JAWAB PERTANYAAN TENTANG IARC XII:
   - Cabang lomba: Automation Challenge (IoT & PLC), Smart Robotics, Energy Treasure, KTI Vortex.
   - Pendaftaran, biaya (batch 1, 2, 3), rekening pembayaran (BCA 1430996882 a.n. Luna Aulia Afifah), jadwal/linimasa, software, teknis robot/PLC, dan fasilitas.
2. JIKA DI LUAR TOPIK IARC XII:
   - Tolak secara sopan.
   - Berikan status: "OUT_OF_TOPIC".
   - suggestedAction: "NONE".
3. TOOL READING (BACA GUIDEBOOK):
   - Jika pengguna menanyakan regulasi teknis mendalam, dimensi, hardware, software, format penilaian, sanksi, atau peraturan pertandingan, gunakan tool 'search_guidebooks' atau 'read_guidebook_page' untuk mencari informasi resmi dari naskah PDF asli.
   - Untuk pertanyaan jadwal/linimasa umum, gunakan data linimasa resmi di atas atau verifikasi dengan tool jika perlu.
4. JIKA INFORMASI TIDAK DITEMUKAN / BUTUH KEBIJAKAN PANITIA:
   - JANGAN MENGARANG ATAU BERHALUSINASI!
   - Berikan status: "UNKNOWN_NEED_CS".
   - suggestedAction: "CONTACT_CS".
   - Sarankan pengguna untuk menghubungi Customer Service resmi melalui Email (${siteConfig.email}) atau Direct Message Instagram (@iarc.its).
5. FORMAT OUTPUT:
   Anda WAJIB memberikan respons akhir berupa format JSON valid berikut (tanpa markdown code fences di luar JSON):
   {
     "status": "ANSWERED" | "OUT_OF_TOPIC" | "UNKNOWN_NEED_CS",
     "reply": "Teks jawaban dalam bahasa Indonesia santun dan jelas (boleh format markdown).",
     "citations": [
       { "guidebookId": "id-guidebook", "title": "Judul Guidebook", "pageNumber": 1 }
     ],
     "suggestedAction": "CONTACT_CS" | "OPEN_GUIDEBOOK" | "NONE"
   }
`;

const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "search_guidebooks",
      description:
        "Mencari kutipan teks resmi dari 16 guidebook PDF IARC XII berdasarkan kata kunci dan ID guidebook opsional.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Kata kunci pencarian (misal: 'dimensi robot', 'cx-programmer', 'plafon komponen', 'rekening transfer')",
          },
          guidebook_id: {
            type: "string",
            description: "ID spesifik guidebook jika sudah diketahui (misal: 'ac-plc-sma', 'sr-sd', 'utama')",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "read_guidebook_page",
      description:
        "Membaca teks lengkap dari satu halaman tertentu pada guidebook IARC XII.",
      parameters: {
        type: "object",
        properties: {
          guidebook_id: {
            type: "string",
            description: "ID guidebook (misal: 'ac-plc-sma', 'ac-iot-mahasiswa', 'sr-mahasiswa')",
          },
          page_number: {
            type: "number",
            description: "Nomor halaman yang ingin dibaca (1-based)",
          },
        },
        required: ["guidebook_id", "page_number"],
      },
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Pesan tidak valid atau kosong." },
        { status: 400 }
      );
    }

    const latestUserMsg = messages[messages.length - 1];
    const userQuery = latestUserMsg?.content || "";

    // 1. FAST HYBRID MATCH (FAQ, Greetings, Clear Off-Topic)
    const fastMatch = tryFastMatch(userQuery);
    if (fastMatch.matched) {
      if (fastMatch.type === "OFF_TOPIC") {
        const response: ChatApiResponse = {
          id: `msg-${Date.now()}`,
          status: "OUT_OF_TOPIC",
          reply: fastMatch.reply!,
          suggestedAction: "NONE",
        };
        return NextResponse.json(response);
      }

      if (fastMatch.type === "GREETING") {
        const response: ChatApiResponse = {
          id: `msg-${Date.now()}`,
          status: "ANSWERED",
          reply: fastMatch.reply!,
          suggestedAction: "NONE",
        };
        return NextResponse.json(response);
      }

      if (fastMatch.type === "FAQ") {
        const response: ChatApiResponse = {
          id: `msg-${Date.now()}`,
          status: "ANSWERED",
          reply: fastMatch.reply!,
          matchedFaqId: fastMatch.faqId,
          suggestedAction: "NONE",
        };
        return NextResponse.json(response);
      }
    }

    // 2. DEEPSEEK / OPENAI COMPATIBLE CLIENT
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const baseURL = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
    const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

    // If API key is not configured, fallback to local guidebook search response
    if (!apiKey) {
      const searchHits = searchGuidebooks(userQuery, undefined, 3);
      if (searchHits.length > 0) {
        const top = searchHits[0];
        const citations: ChatCitation[] = searchHits.map((h) => ({
          guidebookId: h.guidebookId,
          title: h.title,
          pageNumber: h.pageNumber,
          snippet: h.snippet,
        }));

        const response: ChatApiResponse = {
          id: `msg-${Date.now()}`,
          status: "ANSWERED",
          reply: `Berdasarkan penelusuran dokumen **${top.title}** (Halaman ${top.pageNumber}):\n\n> "${top.snippet}"\n\n*(Catatan: Mode pencarian indeks lokal aktif. Untuk mengaktifkan penalaran penuh DeepSeek, masukkan DEEPSEEK_API_KEY di file .env.local)*`,
          citations,
          suggestedAction: "OPEN_GUIDEBOOK",
        };
        return NextResponse.json(response);
      } else {
        const response: ChatApiResponse = {
          id: `msg-${Date.now()}`,
          status: "UNKNOWN_NEED_CS",
          reply:
            "Pertanyaan Anda belum tercantum dalam ringkasan data perlombaan ini. Silakan hubungi Customer Service panitia IARC XII agar mendapatkan informasi resmi dan akurat.",
          suggestedAction: "CONTACT_CS",
        };
        return NextResponse.json(response);
      }
    }

    const openai = new OpenAI({
      apiKey,
      baseURL,
    });

    // Build chat conversation history
    const conversationMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...messages.slice(-6).map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    let loopCount = 0;
    const maxLoops = 5;
    const collectedCitations: ChatCitation[] = [];

    while (loopCount < maxLoops) {
      loopCount++;

      const isLastLoop = loopCount === maxLoops;
      const completion = await openai.chat.completions.create({
        model,
        messages: conversationMessages,
        tools: isLastLoop ? undefined : TOOLS,
        tool_choice: isLastLoop ? "none" : "auto",
        temperature: 0.2,
        max_tokens: 2000,
      });

      const responseMessage = completion.choices[0]?.message;
      if (!responseMessage) break;

      // Check if LLM requested tool calls
      if (!isLastLoop && responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
        conversationMessages.push(responseMessage);

        for (const toolCall of responseMessage.tool_calls) {
          if (!("function" in toolCall)) continue;
          const fnName = toolCall.function.name;
          const fnArgs = JSON.parse(toolCall.function.arguments || "{}");

          let toolResult = "";

          if (fnName === "search_guidebooks") {
            const hits = searchGuidebooks(fnArgs.query, fnArgs.guidebook_id, 4);
            hits.forEach((h) => {
              collectedCitations.push({
                guidebookId: h.guidebookId,
                title: h.title,
                pageNumber: h.pageNumber,
                snippet: h.snippet,
              });
            });
            toolResult = JSON.stringify(hits);
          } else if (fnName === "read_guidebook_page") {
            const pageData = getGuidebookPage(fnArgs.guidebook_id, fnArgs.page_number);
            if (pageData) {
              collectedCitations.push({
                guidebookId: fnArgs.guidebook_id,
                title: pageData.title,
                pageNumber: fnArgs.page_number,
              });
            }
            toolResult = JSON.stringify(pageData || { error: "Page not found" });
          }

          conversationMessages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: toolResult,
          });
        }
      } else {
        // Model provided final text
        const contentStr = responseMessage.content || "";
        let parsed: {
          status?: ChatStatus;
          reply?: string;
          citations?: ChatCitation[];
          suggestedAction?: "CONTACT_CS" | "OPEN_GUIDEBOOK" | "NONE";
        } = {};

        try {
          const jsonMatch = contentStr.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          } else {
            const cleanJson = contentStr
              .replace(/^```json\s*/i, "")
              .replace(/^```\s*/i, "")
              .replace(/\s*```$/, "")
              .trim();
            parsed = JSON.parse(cleanJson);
          }
        } catch {
          parsed = {
            status: "ANSWERED",
            reply: contentStr,
            suggestedAction: "NONE",
          };
        }

        const finalStatus = parsed.status || "ANSWERED";
        const finalCitations =
          parsed.citations && parsed.citations.length > 0
            ? parsed.citations
            : collectedCitations.slice(0, 3);

        const response: ChatApiResponse = {
          id: `msg-${Date.now()}`,
          status: finalStatus,
          reply:
            parsed.reply ||
            "Maaf, terjadi kendala teknis dalam memproses respon. Silakan hubungi CS panitia.",
          citations: finalCitations,
          suggestedAction:
            finalStatus === "UNKNOWN_NEED_CS"
              ? "CONTACT_CS"
              : parsed.suggestedAction || (finalCitations.length > 0 ? "OPEN_GUIDEBOOK" : "NONE"),
        };

        return NextResponse.json(response);
      }
    }

    // If loop finished and citations were retrieved, formulate final answer
    if (collectedCitations.length > 0) {
      const finalPrompt = await openai.chat.completions.create({
        model,
        messages: [
          ...conversationMessages,
          {
            role: "user",
            content:
              "Berdasarkan data yang telah ditemukan di atas, tolong berikan jawaban final yang jelas dan terstruktur dalam format JSON { \"status\": \"ANSWERED\", \"reply\": \"...\" }.",
          },
        ],
        temperature: 0.2,
        max_tokens: 1500,
      });
      const synthText = finalPrompt.choices[0]?.message?.content || "";
      let synthParsed: { status?: ChatStatus; reply?: string } = {};
      try {
        const jsonMatch = synthText.match(/\{[\s\S]*\}/);
        synthParsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(synthText);
      } catch {
        synthParsed = { status: "ANSWERED", reply: synthText };
      }
      return NextResponse.json({
        id: `msg-${Date.now()}`,
        status: synthParsed.status || "ANSWERED",
        reply: synthParsed.reply || synthText,
        citations: collectedCitations.slice(0, 3),
        suggestedAction: "OPEN_GUIDEBOOK",
      });
    }

    // Fallback if loop exceeded and no info found
    return NextResponse.json({
      id: `msg-${Date.now()}`,
      status: "UNKNOWN_NEED_CS",
      reply:
        "Pertanyaan Anda membutuhkan verifikasi langsung dari panitia penyelenggara IARC XII. Silakan hubungi Customer Service kami via Email atau Instagram.",
      suggestedAction: "CONTACT_CS",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Chat API error:", errorMsg);
    return NextResponse.json(
      {
        id: `msg-${Date.now()}`,
        status: "UNKNOWN_NEED_CS",
        reply:
          "Mohon maaf, layanan chatbot sedang mengalami gangguan koneksi. Silakan hubungi Customer Service panitia melalui Email atau Instagram resmi @iarc.its.",
        suggestedAction: "CONTACT_CS",
      },
      { status: 500 }
    );
  }
}
