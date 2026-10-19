"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { PdfModalContextType } from "@/types";

const PdfModalContext = createContext<PdfModalContextType | undefined>(undefined);

export function PdfModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDocId, setActiveDocId] = useState("utama");

  const openModal = useCallback((docId?: string) => {
    if (docId) {
      setActiveDocId(docId);
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const setActiveDoc = useCallback((docId: string) => {
    setActiveDocId(docId);
  }, []);

  return (
    <PdfModalContext.Provider
      value={{
        isOpen,
        activeDocId,
        openModal,
        closeModal,
        setActiveDoc,
      }}
    >
      {children}
    </PdfModalContext.Provider>
  );
}

export function usePdfModal(): PdfModalContextType {
  const context = useContext(PdfModalContext);
  if (!context) {
    throw new Error("usePdfModal must be used within a PdfModalProvider");
  }
  return context;
}
