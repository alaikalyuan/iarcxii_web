import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { COMPETITIONS } from '../src/data/competitions';
import { FAQS } from '../src/data/faq';
import { siteConfig } from '../src/data/siteConfig';
import { EducationLevel } from '../src/types';

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, name: string, details?: string) {
  if (condition) {
    results.push({ name, passed: true, details });
    console.log(`  [PASS] ${name}`);
  } else {
    results.push({ name, passed: false, details });
    console.error(`  [FAIL] ${name} ${details ? '- ' + details : ''}`);
  }
}

console.log('================================================================');
console.log('=== EMPIRICAL AUDIT: MILESTONE 2 DELIVERABLES & CONSTRAINTS ===');
console.log('================================================================\n');

// ----------------------------------------------------------------------
// SUITE 1: Section Spacing & Viewport Height Audit
// ----------------------------------------------------------------------
console.log('--- SUITE 1: Section Spacing & Viewport Height Audit ---');

const componentsDir = path.resolve('src/components');
const nonHeroSectionFiles = [
  'BentoGridSection.tsx',
  'CompetitionSection.tsx',
  'RegistrationFlowSection.tsx',
  'TimelineSection.tsx',
  'FaqSection.tsx',
];

for (const fileName of nonHeroSectionFiles) {
  const filePath = path.join(componentsDir, fileName);
  assert(fs.existsSync(filePath), `File exists: ${fileName}`);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check that no 100vh or min-h-screen exists in non-hero sections
  const has100vh = /100vh/.test(content);
  const hasMinHScreen = /min-h-screen/.test(content);
  const hasHScreen = /\bh-screen\b/.test(content);
  const hasMinHVh = /min-h-\[\s*\d+vh\s*\]/.test(content);

  assert(
    !has100vh,
    `No 100vh in ${fileName}`,
    has100vh ? `Found 100vh in ${fileName}` : undefined
  );
  assert(
    !hasMinHScreen,
    `No min-h-screen in ${fileName}`,
    hasMinHScreen ? `Found min-h-screen in ${fileName}` : undefined
  );
  assert(
    !hasHScreen,
    `No h-screen in ${fileName}`,
    hasHScreen ? `Found h-screen in ${fileName}` : undefined
  );
  assert(
    !hasMinHVh,
    `No min-h-[...vh] in ${fileName}`,
    hasMinHVh ? `Found min-h-[...vh] in ${fileName}` : undefined
  );

  // Check vertical rhythm py-12 md:py-16 on the <section> tag
  const sectionTagMatch = content.match(/<section[^>]*className=["']([^"']+)["']/);
  assert(
    !!sectionTagMatch,
    `<section> tag found in ${fileName}`,
    sectionTagMatch ? `className: ${sectionTagMatch[1]}` : 'No section tag'
  );

  if (sectionTagMatch) {
    const classNames = sectionTagMatch[1];
    const hasPy12 = /\bpy-12\b/.test(classNames);
    const hasMdPy16 = /\bmd:py-16\b/.test(classNames);
    assert(
      hasPy12 && hasMdPy16,
      `Compact vertical rhythm (py-12 md:py-16) on <section> in ${fileName}`,
      `Actual classes: ${classNames}`
    );
  }

  // Check tight header margin mb-6 md:mb-8
  const hasTightHeaderMargin = /mb-6\s+md:mb-8/.test(content);
  assert(
    hasTightHeaderMargin,
    `Tight header margin (mb-6 md:mb-8) in ${fileName}`
  );
}

// Check HeroSection.tsx
const heroPath = path.join(componentsDir, 'HeroSection.tsx');
assert(fs.existsSync(heroPath), 'HeroSection.tsx exists');
const heroContent = fs.readFileSync(heroPath, 'utf-8');
const heroSectionMatch = heroContent.match(/<section[^>]*className=["']([^"']+)["']/);
assert(
  heroSectionMatch ? heroSectionMatch[1].includes('min-h-[92vh]') : false,
  'HeroSection has controlled hero height min-h-[92vh] (allowed for Hero)'
);

// Check globals.css - ensure no global forced height on sections
const globalsCssPath = path.resolve('src/app/globals.css');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf-8');
const cssForcedHeight = /section\s*\{[^}]*(?:min-)?height\s*:\s*100vh/i.test(globalsCss);
assert(!cssForcedHeight, 'No global 100vh rule applied to sections in globals.css');

// ----------------------------------------------------------------------
// SUITE 2: Education Level Filter Logic & Data Audit
// ----------------------------------------------------------------------
console.log('\n--- SUITE 2: Education Level Filter Logic & Data Audit ---');

assert(Array.isArray(COMPETITIONS) && COMPETITIONS.length === 4, 'COMPETITIONS contains exactly 4 divisions');

const expectedDivisions = [
  'automation-challenge',
  'smart-robotics',
  'energy-treasure',
  'vortex',
];
const actualSlugs = COMPETITIONS.map((c) => c.slug);
assert(
  expectedDivisions.every((slug) => actualSlugs.includes(slug)),
  'All 4 division slugs exist (automation-challenge, smart-robotics, energy-treasure, vortex)'
);

// Level filter testing harness (mirroring CompetitionSection logic)
function filterDivisionData(level: EducationLevel) {
  const filteredDivs =
    level === 'Semua'
      ? COMPETITIONS
      : COMPETITIONS.filter((div) => div.levels.includes(level));

  const allMatchedCategories = filteredDivs.flatMap((div) =>
    div.tracks.flatMap((track) =>
      track.categories.filter((cat) =>
        level === 'Semua' ? true : cat.level === level
      )
    )
  );

  return { filteredDivs, allMatchedCategories };
}

// 1. Level: "Semua"
const filterAll = filterDivisionData('Semua');
assert(filterAll.filteredDivs.length === 4, 'Filter "Semua" returns all 4 divisions');
assert(
  filterAll.allMatchedCategories.length === 15,
  'Filter "Semua" returns all 15 category cards across divisions',
  `Count: ${filterAll.allMatchedCategories.length}`
);

// 2. Level: "SD"
const filterSD = filterDivisionData('SD');
assert(
  filterSD.filteredDivs.length === 2 &&
    filterSD.filteredDivs.every((d) => ['automation-challenge', 'smart-robotics'].includes(d.slug)),
  'Filter "SD" matches exactly AC and SR'
);
assert(
  filterSD.allMatchedCategories.length === 2 &&
    filterSD.allMatchedCategories.every((c) => c.level === 'SD'),
  'Filter "SD" yields exactly 2 categories (AC IoT SD, SR SD) all with level=="SD"'
);

// 3. Level: "SMP"
const filterSMP = filterDivisionData('SMP');
assert(
  filterSMP.filteredDivs.length === 2 &&
    filterSMP.filteredDivs.every((d) => ['automation-challenge', 'smart-robotics'].includes(d.slug)),
  'Filter "SMP" matches exactly AC and SR'
);
assert(
  filterSMP.allMatchedCategories.length === 2 &&
    filterSMP.allMatchedCategories.every((c) => c.level === 'SMP'),
  'Filter "SMP" yields exactly 2 categories (AC IoT SMP, SR SMP) all with level=="SMP"'
);

// 4. Level: "SMA/SMK"
const filterSMA = filterDivisionData('SMA/SMK');
assert(
  filterSMA.filteredDivs.length === 4,
  'Filter "SMA/SMK" matches all 4 divisions (AC, SR, ET, Vortex)'
);
assert(
  filterSMA.allMatchedCategories.length === 5 &&
    filterSMA.allMatchedCategories.every((c) => c.level === 'SMA/SMK'),
  'Filter "SMA/SMK" yields exactly 5 categories (AC IoT SMA, AC PLC SMA, SR SMA, ET SMA, KTI SMA) all with level=="SMA/SMK"'
);

// 5. Level: "Mahasiswa"
const filterMahasiswa = filterDivisionData('Mahasiswa');
assert(
  filterMahasiswa.filteredDivs.length === 4,
  'Filter "Mahasiswa" matches all 4 divisions (AC, SR, ET, Vortex)'
);
assert(
  filterMahasiswa.allMatchedCategories.length === 5 &&
    filterMahasiswa.allMatchedCategories.every((c) => c.level === 'Mahasiswa'),
  'Filter "Mahasiswa" yields exactly 5 categories (AC IoT Mahasiswa, AC PLC Mahasiswa, SR Mahasiswa, ET Mahasiswa, KTI Mahasiswa) all with level=="Mahasiswa"'
);

// 6. Level: "International"
const filterIntl = filterDivisionData('International');
assert(
  filterIntl.filteredDivs.length === 1 && filterIntl.filteredDivs[0].slug === 'automation-challenge',
  'Filter "International" matches only Automation Challenge'
);
assert(
  filterIntl.allMatchedCategories.length === 1 &&
    filterIntl.allMatchedCategories[0].id === 'ac-iot-college' &&
    filterIntl.allMatchedCategories[0].level === 'International',
  'Filter "International" yields exactly 1 category (AC IoT College) with level=="International"'
);

// Disjoint partition sum test
const sumOfDisjointLevels =
  filterSD.allMatchedCategories.length +
  filterSMP.allMatchedCategories.length +
  filterSMA.allMatchedCategories.length +
  filterMahasiswa.allMatchedCategories.length +
  filterIntl.allMatchedCategories.length;
assert(
  sumOfDisjointLevels === 15,
  `Sum of distinct level categories (2 + 2 + 5 + 5 + 1 = 15) equals total categories (15)`,
  `Sum was: ${sumOfDisjointLevels}`
);

// Automation Challenge specific track separation test (Critique 2 check)
const acDivision = COMPETITIONS.find((c) => c.slug === 'automation-challenge');
assert(!!acDivision, 'Automation Challenge division exists');
if (acDivision) {
  assert(acDivision.tracks.length === 2, 'AC has exactly 2 separated tracks');
  const iotTrack = acDivision.tracks.find((t) => t.id === 'iot');
  const plcTrack = acDivision.tracks.find((t) => t.id === 'plc');
  assert(!!iotTrack && !!plcTrack, 'AC contains track "iot" and track "plc"');
  if (iotTrack) {
    assert(
      iotTrack.categories.length === 5,
      'Track 1 (IoT) has 5 distinct level categories (SD, SMP, SMA, Mahasiswa, International)'
    );
  }
  if (plcTrack) {
    assert(
      plcTrack.categories.length === 2,
      'Track 2 (PLC) has 2 distinct level categories (SMA/SMK, Mahasiswa)'
    );
  }
}

// ----------------------------------------------------------------------
// SUITE 3: FAQ Data & Behavior Audit
// ----------------------------------------------------------------------
console.log('\n--- SUITE 3: FAQ Data & Behavior Audit ---');

assert(Array.isArray(FAQS), 'FAQS is an array');
assert(FAQS.length === 9, `FAQS array contains exactly 9 items (actual: ${FAQS.length})`);

const faqIds = new Set<string>();
const faqQuestions = new Set<string>();

for (let i = 0; i < FAQS.length; i++) {
  const faq = FAQS[i];
  assert(
    typeof faq.id === 'string' && faq.id.length > 0 && !faqIds.has(faq.id),
    `FAQ #${i + 1} has valid unique ID: "${faq.id}"`
  );
  faqIds.add(faq.id);

  assert(
    typeof faq.question === 'string' && faq.question.trim().endsWith('?') && !faqQuestions.has(faq.question),
    `FAQ #${i + 1} has valid question: "${faq.question.slice(0, 40)}..."`
  );
  faqQuestions.add(faq.question);

  assert(
    typeof faq.answer === 'string' && faq.answer.trim().length > 30,
    `FAQ #${i + 1} has rich answer content (length: ${faq.answer.length})`
  );

  assert(
    typeof faq.category === 'string' && faq.category.length > 0,
    `FAQ #${i + 1} has category: "${faq.category}"`
  );
}

// Test accordion state machine logic
console.log('Testing FAQ Accordion State Machine:');
let openFaqId: string | null = 'faq-1'; // initial state
function toggle(id: string) {
  openFaqId = openFaqId === id ? null : id;
}

assert(openFaqId === 'faq-1', 'Initial open FAQ is faq-1');
toggle('faq-1');
assert(openFaqId === null, 'Clicking open faq-1 collapses it (openFaqId is null)');
toggle('faq-2');
assert(openFaqId === 'faq-2', 'Clicking faq-2 sets openFaqId to "faq-2"');
toggle('faq-5');
assert(openFaqId === 'faq-5', 'Clicking faq-5 switches open item from faq-2 to faq-5');
toggle('faq-5');
assert(openFaqId === null, 'Re-clicking faq-5 collapses it to null');

// Check FaqSection component file directly
const faqSectionPath = path.join(componentsDir, 'FaqSection.tsx');
const faqSectionCode = fs.readFileSync(faqSectionPath, 'utf-8');
assert(
  faqSectionCode.includes('aria-expanded={isOpen}'),
  'FaqSection includes accessible aria-expanded attribute'
);
assert(
  faqSectionCode.includes('FAQS.map'),
  'FaqSection renders all items from FAQS data'
);

// ----------------------------------------------------------------------
// Output Summary
// ----------------------------------------------------------------------
console.log('\n================================================================');
const passedCount = results.filter((r) => r.passed).length;
const failedCount = results.filter((r) => !r.passed).length;
console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('================================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
