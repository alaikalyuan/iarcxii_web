export type ChatStatus = "ANSWERED" | "OUT_OF_TOPIC" | "UNKNOWN_NEED_CS";

export interface ChatCitation {
  guidebookId: string;
  title: string;
  pageNumber: number;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  status?: ChatStatus;
  citations?: ChatCitation[];
  suggestedAction?: "CONTACT_CS" | "OPEN_GUIDEBOOK" | "NONE";
  timestamp: number;
}

export interface ChatApiResponse {
  id: string;
  status: ChatStatus;
  reply: string;
  citations?: ChatCitation[];
  suggestedAction?: "CONTACT_CS" | "OPEN_GUIDEBOOK" | "NONE";
  matchedFaqId?: string;
}

export interface ChatApiRequest {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}
