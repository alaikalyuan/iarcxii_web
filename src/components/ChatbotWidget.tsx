"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  BookOpen,
  Mail,
  ExternalLink,
  Bot,
  User,
  AlertCircle,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { usePdfModal } from "@/context/PdfModalContext";
import { ChatMessage, ChatApiResponse } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "@/context/LanguageContext";

export default function ChatbotWidget() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { openModal } = usePdfModal();

  const initialMessage = useMemo<ChatMessage>(
    () => ({
      id: "welcome",
      role: "assistant",
      content: t.chatbot.welcomeMessage,
      timestamp: Date.now(),
    }),
    [t.chatbot.welcomeMessage]
  );

  // Initialize or update welcome message if no conversation has taken place
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [initialMessage];
      }
      return prev;
    });
  }, [initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setShowTeaser(false);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: ChatApiResponse = await response.json();

      const assistantMsg: ChatMessage = {
        id: data.id || `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        citations: data.citations,
        suggestedAction: data.suggestedAction,
        status: data.status,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          language === "id"
            ? "Terjadi kendala saat menghubungkan ke asisten. Silakan hubungi Customer Service panitia melalui kontak resmi di bawah ini."
            : "An issue occurred while connecting to the assistant. Please contact the committee support via the official contact details below.",
        status: "UNKNOWN_NEED_CS",
        suggestedAction: "CONTACT_CS",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([initialMessage]);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Pop-up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="pointer-events-auto mb-3.5 flex h-[580px] max-h-[82vh] w-[390px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-gold-500/30 bg-navy-950/95 backdrop-blur-2xl shadow-2xl shadow-navy-950/90"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy-800 bg-navy-900/90 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-text-main font-heading tracking-wide">
                      {t.chatbot.title}
                    </h3>
                  </div>
                  <p className="text-[10px] text-text-dim flex items-center gap-1">
                    <span>{t.chatbot.subtitle}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-dim hover:bg-navy-800 hover:text-gold-400 transition"
                  title={t.chatbot.resetTooltip}
                  aria-label={t.chatbot.resetTooltip}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-dim hover:bg-navy-800 hover:text-text-main transition"
                  aria-label={language === "id" ? "Tutup jendela chat" : "Close chat window"}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-text-main">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                const isNeedCs = msg.suggestedAction === "CONTACT_CS";
                const isOutOfTopic = msg.status === "OUT_OF_TOPIC";

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mt-0.5">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 font-medium rounded-tr-none shadow-md"
                          : "bg-navy-900/90 border border-navy-800 text-text-soft rounded-tl-none"
                      }`}
                    >
                      {/* Out of topic warning badge */}
                      {isOutOfTopic && (
                        <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>
                            {language === "id"
                              ? "Di luar topik perlombaan IARC"
                              : "Outside IARC competition topic"}
                          </span>
                        </div>
                      )}

                      {isUser ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <div className="markdown-content text-xs leading-relaxed text-text-soft">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0 leading-relaxed text-text-soft">
                                  {children}
                                </p>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-text-main">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic text-text-soft">{children}</em>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-4 space-y-1 mb-2 last:mb-0 text-text-soft">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-4 space-y-1 mb-2 last:mb-0 text-text-soft">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="leading-relaxed">{children}</li>
                              ),
                              h1: ({ children }) => (
                                <h1 className="font-bold text-gold-400 mt-2 mb-1 text-sm font-heading">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="font-bold text-gold-400 mt-2 mb-1 text-xs font-heading">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="font-bold text-gold-400 mt-2 mb-1 text-xs font-heading">
                                  {children}
                                </h3>
                              ),
                              table: ({ children }) => (
                                <div className="overflow-x-auto my-2 rounded-lg border border-navy-700 bg-navy-950/80 shadow-inner">
                                  <table className="min-w-full text-[10px] text-left border-collapse">
                                    {children}
                                  </table>
                                </div>
                              ),
                              thead: ({ children }) => (
                                <thead className="bg-navy-800/90 text-gold-400 border-b border-navy-700">
                                  {children}
                                </thead>
                              ),
                              tbody: ({ children }) => (
                                <tbody className="divide-y divide-navy-800/60">
                                  {children}
                                </tbody>
                              ),
                              tr: ({ children }) => (
                                <tr className="hover:bg-navy-800/40 transition">
                                  {children}
                                </tr>
                              ),
                              th: ({ children }) => (
                                <th className="px-2.5 py-1.5 font-bold uppercase tracking-wider text-[9px] text-gold-400">
                                  {children}
                                </th>
                              ),
                              td: ({ children }) => (
                                <td className="px-2.5 py-1.5 text-text-soft whitespace-nowrap">
                                  {children}
                                </td>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gold-400 underline hover:text-gold-300 transition"
                                >
                                  {children}
                                </a>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-gold-500/60 pl-2.5 my-2 italic text-text-dim text-[11px] bg-navy-950/40 py-1 rounded-r">
                                  {children}
                                </blockquote>
                              ),
                              code: ({ className, children, ...props }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code
                                    className="rounded bg-navy-950 px-1 py-0.5 text-[10px] font-mono text-gold-400 border border-navy-800"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                ) : (
                                  <code
                                    className="block font-mono text-[10px] text-cyan-300"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* Citations Badges */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-navy-800/80 space-y-1">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-gold-400" />
                            <span>
                              {language === "id"
                                ? "Referensi Dokumen Resmi:"
                                : "Official Document References:"}
                            </span>
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {msg.citations.map((c, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => openModal(c.guidebookId)}
                                className="inline-flex items-center gap-1 rounded bg-navy-800 px-2 py-0.5 text-[10px] font-medium text-gold-400 border border-gold-500/20 hover:border-gold-500/50 hover:bg-navy-750 transition"
                                title={
                                  language === "id"
                                    ? "Klik untuk membuka PDF di viewer"
                                    : "Click to open PDF in viewer"
                                }
                              >
                                <span>
                                  {c.title}{" "}
                                  {language === "id"
                                    ? `(Hlm. ${c.pageNumber})`
                                    : `(p. ${c.pageNumber})`}
                                </span>
                                <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CS Fallback Card */}
                      {isNeedCs && (
                        <div className="mt-3 rounded-lg border border-red-500/30 bg-red-950/25 p-2.5 space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-300">
                            <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                            <span>
                              {language === "id"
                                ? "Butuh Bantuan Panitia CS"
                                : "Need Committee Support"}
                            </span>
                          </div>
                          <p className="text-[10px] text-text-dim leading-normal">
                            {language === "id"
                              ? "Pertanyaan ini memerlukan verifikasi atau konfirmasi langsung panitia IARC XII:"
                              : "This inquiry requires direct verification or confirmation from the IARC XII team:"}
                          </p>
                          <div className="flex flex-col gap-1.5 pt-1">
                            <a
                              href={`mailto:${siteConfig.email}?subject=Tanya%20IARC%20XII`}
                              className="inline-flex items-center justify-center gap-1.5 rounded bg-navy-900 px-2.5 py-1.5 text-[10px] font-medium text-gold-400 border border-navy-700 hover:border-gold-400 transition"
                            >
                              <Mail className="h-3 w-3" />
                              <span>Email: {siteConfig.email}</span>
                            </a>
                            <a
                              href={siteConfig.socials.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 rounded bg-navy-900 px-2.5 py-1.5 text-[10px] font-medium text-purple-400 border border-navy-700 hover:border-purple-400 transition"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Instagram: @iarc.its</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-text-soft mt-0.5">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-xl rounded-tl-none border border-navy-800 bg-navy-900/90 px-3.5 py-2.5 text-text-dim flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-spin" />
                    <span className="text-[11px]">
                      {language === "id"
                        ? "Memeriksa regulasi & guidebook..."
                        : "Checking regulations & guidebooks..."}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {messages.length <= 2 && (
              <div className="border-t border-navy-800/60 bg-navy-950/70 px-3.5 py-2">
                <p className="text-[10px] font-semibold text-text-dim mb-1.5">
                  {t.chatbot.suggestedHeading}
                </p>
                <div className="flex flex-wrap gap-1">
                  {t.chatbot.suggestedQueries.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(q)}
                      disabled={isLoading}
                      className="rounded-full border border-navy-800 bg-navy-900/90 px-2.5 py-1 text-[10px] text-text-soft hover:border-gold-500/50 hover:text-gold-400 transition disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-navy-800 bg-navy-900/95 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chatbot.inputPlaceholder}
                  disabled={isLoading}
                  className="flex-1 rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-xs text-text-main placeholder:text-text-dim focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 hover:opacity-90 disabled:opacity-40 transition font-bold"
                  aria-label={t.chatbot.sendTooltip}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
              <p className="mt-1.5 text-center text-[9px] text-text-dim">
                {t.chatbot.disclaimer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button & Teaser Bubble */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Teaser Bubble (visible when closed) */}
        <AnimatePresence>
          {!isOpen && showTeaser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 10 }}
              className="relative hidden sm:flex items-center gap-2 rounded-2xl border border-gold-500/30 bg-navy-900/95 px-3.5 py-2 text-xs text-text-soft shadow-xl backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 text-left hover:text-gold-400 transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-gold-400 flex-shrink-0" />
                <span className="text-[11px] font-medium text-text-main">
                  {language === "id" ? (
                    <>
                      Ada pertanyaan lomba? <strong className="text-gold-400">Tanya AI</strong>
                    </>
                  ) : (
                    <>
                      Questions on rules? <strong className="text-gold-400">Ask AI</strong>
                    </>
                  )}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowTeaser(false)}
                className="ml-1 text-text-dim hover:text-text-main p-0.5 rounded transition"
                aria-label={language === "id" ? "Tutup petunjuk" : "Close teaser"}
              >
                <X className="h-3 w-3" />
              </button>
              {/* Little speech pointer arrow */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r border-t border-gold-500/30 bg-navy-900/95"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={`group relative flex items-center justify-center rounded-full p-3.5 sm:px-4 sm:py-3.5 font-semibold shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-gold-400 ${
            isOpen
              ? "bg-navy-800 text-text-main border border-navy-700 shadow-navy-950/80"
              : "bg-gradient-to-r from-gold-500 via-amber-500 to-amber-600 text-navy-950 shadow-gold-500/30 hover:shadow-gold-500/50"
          }`}
          aria-label={
            isOpen
              ? language === "id"
                ? "Tutup Chatbot IARC XII"
                : "Close IARC XII Chatbot"
              : language === "id"
              ? "Buka Chatbot Tanya Jawab IARC XII"
              : "Open IARC XII Q&A Chatbot"
          }
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-navy-950"></span>
              </span>
              <MessageSquare className="h-5 w-5 fill-current" />
              <span className="text-xs font-bold tracking-wide hidden sm:inline font-heading">
                {language === "id" ? "Tanya Bot" : "Ask Bot"}
              </span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
