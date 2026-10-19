import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompetitionDetailClient from "@/components/CompetitionDetailClient";
import { getCompetitionBySlug } from "@/data/competitions";

export function generateStaticParams() {
  return [
    { slug: ["automation-challenge"] },
    { slug: ["automation-challenge", "iot"] },
    { slug: ["automation-challenge", "plc"] },
    { slug: ["smart-robotics"] },
    { slug: ["energy-treasure"] },
    { slug: ["vortex"] },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return { title: "Kompetisi Tidak Ditemukan - IARC XII" };
  }

  const divisionSlug = slug[0];
  const trackSlug = slug[1];

  const competition = getCompetitionBySlug(divisionSlug);
  if (!competition) {
    return {
      title: "Kompetisi Tidak Ditemukan - IARC XII",
      description: "Halaman kompetisi IARC XII tidak ditemukan.",
    };
  }

  if (divisionSlug === "automation-challenge") {
    if (trackSlug === "iot") {
      return {
        title: "Automation Challenge (IoT) - IARC XII",
        description:
          "Kompetisi Automation Challenge Jalur Microcontroller (IoT) IARC XII. Perancangan solusi cerdas berbasis IoT sesuai 3 Pusat Studi ITS.",
      };
    }
    if (trackSlug === "plc") {
      return {
        title: "Automation Challenge (PLC) - IARC XII",
        description:
          "Kompetisi Automation Challenge Jalur PLC IARC XII. Logika kendali otomasi industri berbasis PLC Omron CP2E-N & Haiwell Cloud SCADA.",
      };
    }
  }

  return {
    title: `${competition.name} - IARC XII`,
    description: `${competition.name}: ${competition.tagline}. Diselenggarakan oleh Departemen Teknik Elektro Otomasi Fakultas Vokasi Institut Teknologi Sepuluh Nopember (ITS).`,
  };
}

export default async function CompetitionCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    notFound();
  }

  const divisionSlug = slug[0];
  const trackSlug = slug[1];

  const competition = getCompetitionBySlug(divisionSlug);
  if (!competition) {
    notFound();
  }

  // Handle automation-challenge
  if (divisionSlug === "automation-challenge") {
    if (!trackSlug) {
      redirect("/competition/automation-challenge/iot");
    }
    if (trackSlug !== "iot" && trackSlug !== "plc") {
      notFound();
    }

    return (
      <div className="flex min-h-screen flex-col bg-navy-950 text-text-main overflow-x-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">
          <CompetitionDetailClient
            division={competition}
            initialTrackId={trackSlug}
            lockedTrackId={trackSlug}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Other divisions should only have single segment slug
  if (slug.length > 1) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-950 text-text-main overflow-x-hidden">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <CompetitionDetailClient division={competition} />
      </main>
      <Footer />
    </div>
  );
}
