"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, ArrowRight } from "lucide-react";
import { usePdfModal } from "@/context/PdfModalContext";

export default function Navbar() {
  const { openModal } = usePdfModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Tentang", href: "/#tentang" },
    { name: "Kompetisi", href: "/#kompetisi" },
    { name: "Alur Pendaftaran", href: "/#alur" },
    { name: "Jadwal", href: "/#timeline" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-navy-800/80 bg-navy-950/85 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo-full.png"
            alt="IARC XII Logo"
            width={160}
            height={46}
            priority
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-text-soft transition hover:text-gold-400 focus:outline-none focus:text-gold-400"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => openModal("utama")}
            className="inline-flex items-center gap-2 rounded-xl border border-gold-500/30 bg-navy-900/90 px-4 py-2 text-xs font-semibold text-gold-400 transition hover:border-gold-400 hover:bg-gold-500/10 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Guidebook Utama</span>
          </button>

          <a
            href="/#alur"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2 text-xs font-bold text-navy-950 shadow-md transition hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-500/20 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span>Daftar Sekarang</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-navy-800 bg-navy-900/90 p-2 text-text-soft transition hover:text-text-main lg:hidden focus:outline-none focus:ring-2 focus:ring-gold-500"
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-navy-800 bg-navy-950/95 backdrop-blur-xl lg:hidden overflow-hidden"
          >
            <div className="space-y-1 px-4 pt-3 pb-6 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-soft hover:bg-navy-900 hover:text-gold-400"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal("utama");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-navy-900 py-2.5 text-xs font-semibold text-gold-400"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Guidebook Utama (PDF)</span>
                </button>

                <a
                  href="/#alur"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-2.5 text-xs font-bold text-navy-950"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
