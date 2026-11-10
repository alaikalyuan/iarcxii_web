"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryCard, CompetitionDivision } from "@/types";
import { usePdfModal } from "@/context/PdfModalContext";
import { getDivisionTheme } from "@/data/divisionThemes";
import { getCompetitionBySlug, getCompetitions } from "@/data/competitions";
import { getSmartRoboticsTrackByLevel } from "@/data/smartRoboticsTracks";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";
import SmartRoboticsTrackModal from "./SmartRoboticsTrackModal";

interface CompetitionDetailClientProps {
  division: CompetitionDivision;
  initialTrackId?: string;
  lockedTrackId?: string;
}

const PANEL_ID = "level-panel";
const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

const divisionHref = (slug: string) =>
  slug === "automation-challenge"
    ? "/competition/automation-challenge/iot"
    : `/competition/${slug}`;

// Spec lines in the data carry plain URLs; render those as real links
function withLinks(text: string, linkClass: string) {
  return text.split(URL_PATTERN).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className={`break-all underline underline-offset-2 ${linkClass}`}
      >
        {part.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-x-8 gap-y-3 border-t border-navy-800 py-6 md:grid-cols-[8.5rem_minmax(0,1fr)]">
      <h2 className="text-base font-bold text-text-main">{title}</h2>
      <div className="min-w-0 text-sm leading-relaxed text-text-soft">{children}</div>
    </section>
  );
}

export default function CompetitionDetailClient({
  division: initialDivision,
  initialTrackId,
  lockedTrackId,
}: CompetitionDetailClientProps) {
  const { openModal } = usePdfModal();
  const { language, t } = useLanguage();
  const tr = (id: string, en: string) => (language === "id" ? id : en);

  const division =
    getCompetitionBySlug(initialDivision.slug, language) || initialDivision;
  const theme = getDivisionTheme(division.slug);

  const trackId = lockedTrackId || initialTrackId;
  const currentTrack =
    division.tracks.find((trk) => trk.id === trackId) || division.tracks[0];
  const categories = currentTrack.categories;

  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
  const category: CategoryCard =
    categories.find((c) => c.id === activeCategoryId) || categories[0];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // The tab row scrolls sideways on narrow screens; keep the chosen tab in view
  const selectCategory = (index: number) => {
    setActiveCategoryId(categories[index].id);
    tabRefs.current[index]?.scrollIntoView({ inline: "nearest", block: "nearest" });
  };

  // Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = categories.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      selectCategory(next);
      tabRefs.current[next]?.focus();
    }
  };

  const levelLabel = (level: string) => t.competitions.levelFilters[level] || level;

  // Some spec lines apply to one level only and start with "SD: ..." or "Elementary: ...".
  // Keep the shared lines plus the active level's own line, without its prefix.
  const levelPrefixes = Array.from(
    new Set(categories.flatMap((c) => [c.level, levelLabel(c.level)]))
  );
  const ownPrefixes = [category.level, levelLabel(category.level)];
  const specsForLevel = (specs: string[] = []) =>
    specs.flatMap((line) => {
      const prefix = levelPrefixes.find((p) => line.startsWith(`${p}: `));
      if (!prefix) return [line];
      if (!ownPrefixes.includes(prefix)) return [];
      const rest = line.slice(prefix.length + 2);
      return [rest.charAt(0).toUpperCase() + rest.slice(1)];
    });

  // Vortex is a paper competition: its spec lines are submission terms, not hardware or software
  const isPaperCompetition = division.slug === "vortex";
  const specGroups = (
    isPaperCompetition
      ? [
          {
            label: tr("Ketentuan karya", "Submission requirements"),
            lines: [
              ...specsForLevel(currentTrack.hardwareSpecs),
              ...specsForLevel(currentTrack.softwareSpecs),
            ],
          },
        ]
      : [
          {
            label: tr("Perangkat keras", "Hardware"),
            lines: specsForLevel(currentTrack.hardwareSpecs),
          },
          {
            label: tr("Perangkat lunak", "Software"),
            lines: specsForLevel(currentTrack.softwareSpecs),
          },
        ]
  ).filter((group) => group.lines.length > 0);

  // Arena layout (Smart Robotics only)
  const isSmartRobotics = division.slug === "smart-robotics";
  const arena = isSmartRobotics
    ? getSmartRoboticsTrackByLevel(category.level)
    : undefined;
  const [arenaVariantId, setArenaVariantId] = useState<string | undefined>();
  const arenaVariant =
    arena?.variants?.find((v) => v.id === arenaVariantId) || arena?.variants?.[0];
  const arenaFile = arenaVariant ?? arena;
  const arenaTitle = arenaVariant
    ? tr(arenaVariant.name, arenaVariant.nameEn)
    : arena
    ? tr(arena.title, arena.titleEn)
    : "";
  const arenaDescription = arenaVariant
    ? tr(arenaVariant.description, arenaVariant.descriptionEn)
    : arena
    ? tr(arena.description, arena.descriptionEn)
    : "";
  const [arenaModalOpen, setArenaModalOpen] = useState(false);

  const otherDivisions = getCompetitions(language).filter(
    (d) => d.slug !== division.slug
  );

  const fees = [
    { label: "Batch 1", value: category.fees.batch1 },
    { label: "Batch 2", value: category.fees.batch2 },
    { label: "Batch 3", value: category.fees.batch3 },
  ];

  const secondaryButton =
    "inline-flex min-h-[44px] items-center justify-center rounded-md border border-navy-600 bg-navy-900 px-4 py-2.5 text-sm font-semibold text-text-main transition-colors hover:border-gold-400 hover:text-gold-400 active:bg-navy-800";
  const primaryButton =
    "inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold-500 px-4 py-2.5 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400 active:bg-gold-600";

  return (
    <div className="relative overflow-clip pt-24 pb-16 md:pt-28 md:pb-20">
      <DecorativeBackground variant="section-e" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-text-dim"
        >
          <Link href="/" className="transition-colors hover:text-gold-400">
            {tr("Beranda", "Home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/#kompetisi" className="transition-colors hover:text-gold-400">
            {t.nav.competitions}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-semibold text-text-soft">{division.name}</span>
        </nav>

        <header className="rounded-md border border-navy-800 bg-navy-900 p-6 sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
            {division.name}
          </h1>
          <p className={`mt-2 text-sm font-semibold sm:text-base ${theme.tagline}`}>
            {division.tagline}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-soft sm:text-base">
            {division.description}
          </p>
        </header>

        {/* Track picker: only divisions with more than one track (Automation Challenge) */}
        {division.tracks.length > 1 && (
          <nav
            aria-label={t.competitionDetail.divisionTracks}
            className="mt-6 grid gap-2 sm:grid-cols-2"
          >
            {division.tracks.map((track) => {
              const isActive = track.id === currentTrack.id;
              return (
                <Link
                  key={track.id}
                  href={`/competition/${division.slug}/${track.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-[44px] flex-col justify-center rounded-md border px-4 py-3 transition-colors ${
                    isActive
                      ? theme.trackActive
                      : "border-navy-700 bg-navy-900 text-text-soft hover:border-navy-600 hover:text-text-main active:bg-navy-800"
                  }`}
                >
                  <span className="text-sm font-bold">{track.name}</span>
                  <span className="mt-0.5 text-xs text-text-soft">{track.tagline}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Level tabs */}
        <div
          role="tablist"
          aria-label={t.competitionDetail.categories}
          className="mt-6 flex overflow-x-auto border-b-2 border-navy-700 [scrollbar-width:none]"
        >
          {categories.map((cat, index) => {
            const isActive = cat.id === category.id;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                aria-controls={PANEL_ID}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectCategory(index)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`-mb-0.5 min-h-[48px] shrink-0 whitespace-nowrap border-b-2 px-4 text-sm transition-colors sm:px-5 sm:text-base ${
                  isActive
                    ? `font-bold ${theme.tabActive}`
                    : "border-transparent font-medium text-text-soft hover:border-navy-600 hover:text-text-main active:text-text-main"
                }`}
              >
                {levelLabel(cat.level)}
              </button>
            );
          })}
        </div>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`tab-${category.id}`}
          className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10"
        >
          {/* Fee and actions: first on small screens, sticky right column on large ones */}
          <aside className="rounded-md border border-navy-700 bg-navy-900 p-5 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 lg:self-start">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-start lg:grid-cols-1">
              <div>
                <h2 className="text-base font-bold text-text-main">
                  {t.competitionDetail.registrationFee}
                </h2>
                <p className="mt-0.5 text-xs text-text-soft">
                  {category.name}, {tr("per tim", "per team")}
                </p>
                <dl className="mt-3 divide-y divide-navy-800 border-y border-navy-800">
                  {fees.map((fee) => (
                    <div
                      key={fee.label}
                      className="flex items-baseline justify-between gap-3 py-2.5"
                    >
                      <dt className="text-sm text-text-soft">{fee.label}</dt>
                      <dd className="text-sm font-bold tabular-nums text-text-main">
                        {fee.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={category.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryButton}
                >
                  {t.nav.registerNow}
                </a>
                <button
                  type="button"
                  onClick={() => openModal(category.guidebookDocId)}
                  className={secondaryButton}
                >
                  {tr("Buka Guidebook", "Open Guidebook")}
                </button>
                <p className="text-xs leading-relaxed text-text-soft">
                  {tr(
                    "Nomor rekening pembayaran tercantum di formulir pendaftaran. Siapkan juga",
                    "Payment account details are in the registration form. You also need the"
                  )}{" "}
                  <a
                    href="https://its.id/m/TwibbonCompeIARCXII"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold-400 underline underline-offset-2 hover:text-gold-500"
                  >
                    twibbon
                  </a>{" "}
                  {tr("dan", "and")}{" "}
                  <a
                    href="https://its.id/m/CaptionTwibbonIARCXII"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold-400 underline underline-offset-2 hover:text-gold-500"
                  >
                    {tr("caption", "caption")}
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <p className="pb-6 text-sm leading-relaxed text-text-soft sm:text-base">
              {currentTrack.description}
            </p>

            <InfoSection title={tr("Spesifikasi", "Specifications")}>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-text-main">
                    {t.competitionDetail.teamRequirement}
                  </dt>
                  <dd className="mt-1">{category.teamRequirement}</dd>
                </div>
                {specGroups.map((group) => (
                  <div key={group.label}>
                    <dt className="font-semibold text-text-main">{group.label}</dt>
                    <dd className="mt-1">
                      <ul className="list-disc space-y-1 pl-5 marker:text-text-dim">
                        {group.lines.map((line) => (
                          <li key={line}>{withLinks(line, theme.text)}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </InfoSection>

            {arena && (
              <InfoSection title={tr("Lintasan", "Track")}>
                {arena.status === "available" && arenaFile?.imageUrl ? (
                  <div className="grid gap-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
                    <a
                      href={arenaFile.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tr(
                        `Buka gambar ${arenaTitle} ukuran penuh`,
                        `Open the full-size image of ${arenaTitle}`
                      )}
                      className="block self-start overflow-hidden rounded-md border border-navy-700 bg-white transition-opacity hover:opacity-90"
                    >
                      <img
                        key={arenaFile.imageUrl}
                        src={arenaFile.imageUrl}
                        width={arenaFile.imageWidth}
                        height={arenaFile.imageHeight}
                        alt={tr(`Denah ${arenaTitle}`, `Layout of ${arenaTitle}`)}
                        loading="lazy"
                        className="h-auto w-full"
                      />
                    </a>
                    <div>
                      {arena.variants && arena.variants.length > 1 && (
                        <div
                          role="group"
                          aria-label={tr("Varian lintasan", "Track variant")}
                          className="mb-4 flex flex-wrap gap-2"
                        >
                          {arena.variants.map((v) => {
                            const isSelected = v.id === arenaVariant?.id;
                            return (
                              <button
                                key={v.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => setArenaVariantId(v.id)}
                                className={`min-h-[44px] rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                                  isSelected
                                    ? theme.trackActive
                                    : "border-navy-700 bg-navy-900 text-text-soft hover:border-navy-600 hover:text-text-main active:bg-navy-800"
                                }`}
                              >
                                {tr(v.name, v.nameEn)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      <p className="font-semibold text-text-main">{arenaTitle}</p>
                      <p className="mt-1">{arenaDescription}</p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        <a
                          href={arenaFile.fileUrl}
                          download={arenaFile.fileName}
                          className={secondaryButton}
                        >
                          {tr("Unduh PDF", "Download PDF")}
                        </a>
                        {/* Phone browsers rarely render a PDF inside a page, so the viewer is offered from sm up */}
                        <div className="hidden sm:block">
                          <button
                            type="button"
                            onClick={() => setArenaModalOpen(true)}
                            className={secondaryButton}
                          >
                            {tr("Lihat layar penuh", "View fullscreen")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-text-main">
                      {tr("Denah belum dirilis", "Layout not released yet")}
                    </p>
                    <p className="mt-1">
                      {tr(arena.placeholderNotice || "", arena.placeholderNoticeEn || "")}
                    </p>
                  </div>
                )}
              </InfoSection>
            )}

            {category.scoringCriteria && category.scoringCriteria.length > 0 && (
              <InfoSection title={tr("Penilaian", "Scoring")}>
                <ul className="divide-y divide-navy-800">
                  {category.scoringCriteria.map((crit) => (
                    <li key={crit.criterion} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-semibold text-text-main">
                          {crit.criterion}
                        </span>
                        <span
                          className={`shrink-0 font-bold tabular-nums ${theme.text}`}
                        >
                          {crit.weight}
                        </span>
                      </div>
                      {crit.note && <p className="mt-1">{crit.note}</p>}
                    </li>
                  ))}
                </ul>
              </InfoSection>
            )}

            <InfoSection title={tr("Aturan", "Rules")}>
              <ul className="list-disc space-y-1 pl-5 marker:text-text-dim">
                {category.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              {category.stages && category.stages.length > 0 && (
                <>
                  <h3 className="mt-5 font-semibold text-text-main">
                    {t.competitionDetail.stages}
                  </h3>
                  <ol className="mt-2 divide-y divide-navy-800">
                    {category.stages.map((stage) => (
                      <li key={stage.name} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                          <span className="font-semibold text-text-main">
                            {stage.name}
                          </span>
                          {stage.date && (
                            <span className="text-xs font-semibold text-gold-400">
                              {stage.date}
                            </span>
                          )}
                        </div>
                        <p className="mt-1">{stage.description}</p>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              <p className="mt-5">
                {tr(
                  "Aturan lengkap dan mengikat ada di guidebook jenjang ini.",
                  "The full, binding rules are in this level's guidebook."
                )}{" "}
                <button
                  type="button"
                  onClick={() => openModal(category.guidebookDocId)}
                  className="font-semibold text-gold-400 underline underline-offset-2 hover:text-gold-500"
                >
                  {tr("Buka Guidebook", "Open Guidebook")}
                </button>
              </p>
            </InfoSection>
          </div>
        </div>

        <nav
          aria-labelledby="other-divisions-heading"
          className="mt-12 rounded-md border border-navy-800 bg-navy-900 p-5 sm:p-6"
        >
          <h2 id="other-divisions-heading" className="text-base font-bold text-text-main">
            {tr("Divisi lain", "Other divisions")}
          </h2>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-3">
            {otherDivisions.map((d) => (
              <li key={d.slug} className="border-t border-navy-800">
                <Link
                  href={divisionHref(d.slug)}
                  className="group block py-3.5"
                >
                  <span
                    className={`block text-sm font-bold text-text-main transition-colors ${getDivisionTheme(d.slug).textHover}`}
                  >
                    {d.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-text-soft">
                    {d.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {arena && (
        <SmartRoboticsTrackModal
          isOpen={arenaModalOpen}
          onClose={() => setArenaModalOpen(false)}
          initialTrackId={arena.id}
          initialVariantId={arenaVariant?.id}
        />
      )}
    </div>
  );
}
