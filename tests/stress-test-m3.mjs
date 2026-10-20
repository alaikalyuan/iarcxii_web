import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

console.log('================================================================');
console.log('=== ADVERSARIAL STRESS TEST HARNESS — MILESTONE 3            ===');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName}${details ? ` -> ${details}` : ''}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
    failCount++;
  }
}

// 1. Data Integrity & Boundary Stress Testing
console.log('--- 1. Competition Data Integrity & Category Completeness ---');
const compModule = await import('../src/data/competitions.ts');
const { COMPETITIONS, getCompetitionBySlug } = compModule;

assert(Array.isArray(COMPETITIONS), 'COMPETITIONS is an array');
assert(COMPETITIONS.length === 4, 'COMPETITIONS has exactly 4 divisions', `Count: ${COMPETITIONS.length}`);

// Test getCompetitionBySlug with adversarial inputs
const adversarialInputs = [
  null,
  undefined,
  '',
  ' ',
  'AUTOMATION-CHALLENGE',
  'automation_challenge',
  '../competition/automation-challenge',
  '<script>alert(1)</script>',
  'undefined',
  '__proto__',
  'constructor',
  '12345',
];

for (const input of adversarialInputs) {
  let result;
  let threw = false;
  try {
    result = getCompetitionBySlug(input);
  } catch (e) {
    threw = true;
  }
  assert(!threw && result === undefined, `getCompetitionBySlug safely returns undefined for "${input}"`);
}

// Verify every competition and every track/category
let totalCategories = 0;
for (const comp of COMPETITIONS) {
  assert(Boolean(comp.slug && comp.name && comp.tagline && comp.description), `Division "${comp.name}" has complete metadata`);
  assert(Array.isArray(comp.levels) && comp.levels.length > 0, `Division "${comp.name}" has valid levels`);
  assert(Array.isArray(comp.scoringRubric) && comp.scoringRubric.length > 0, `Division "${comp.name}" has scoring rubric`);
  assert(Array.isArray(comp.stages) && comp.stages.length > 0, `Division "${comp.name}" has stages`);

  for (const track of comp.tracks) {
    assert(Boolean(track.id && track.name && track.tagline && track.description), `Track "${track.name}" has metadata`);
    assert(Array.isArray(track.hardwareSpecs) && track.hardwareSpecs.length > 0, `Track "${track.name}" has hardware specs`);
    assert(Array.isArray(track.softwareSpecs) && track.softwareSpecs.length > 0, `Track "${track.name}" has software specs`);

    for (const cat of track.categories) {
      totalCategories++;
      assert(Boolean(cat.id && cat.name && cat.level), `Category "${cat.name}" has ID, name, level`);
      assert(typeof cat.teamRequirement === 'string' && cat.teamRequirement.length > 5, `Category "${cat.name}" has teamRequirement`);
      assert(cat.registrationUrl.startsWith('https://its.id/m/'), `Category "${cat.name}" registrationUrl starts with https://its.id/m/`, cat.registrationUrl);
      assert(!cat.registrationUrl.includes(' - ') && !cat.registrationUrl.startsWith('-'), `Category "${cat.name}" registrationUrl is clean without dashes`);
      assert(Boolean(cat.fees && cat.fees.batch1 && cat.fees.batch2 && cat.fees.batch3), `Category "${cat.name}" has 3-batch fees`);
      assert(Array.isArray(cat.highlights) && cat.highlights.length >= 2, `Category "${cat.name}" has multiple highlights`);
    }
  }
}

assert(totalCategories === 15, 'Total categories across all divisions is exactly 15', `Found: ${totalCategories}`);

// 2. Guidebook Mapping Integrity
console.log('\n--- 2. Guidebook Mapping Integrity ---');
const gbModule = await import('../src/data/guidebooks.ts');
const { GUIDEBOOKS, getGuidebookById, getGuidebooksByDivision } = gbModule;

assert(Array.isArray(GUIDEBOOKS) && GUIDEBOOKS.length === 16, 'GUIDEBOOKS contains 16 total books (1 utama + 15 categories)', `Found: ${GUIDEBOOKS.length}`);

for (const gb of GUIDEBOOKS) {
  assert(Boolean(gb.id && gb.title && gb.division && gb.driveFileId), `Guidebook "${gb.title}" has complete metadata`);
  assert(gb.previewUrl === `https://drive.google.com/file/d/${gb.driveFileId}/preview`, `Guidebook "${gb.id}" previewUrl is standard`);
  assert(gb.downloadUrl === `https://drive.google.com/uc?export=download&id=${gb.driveFileId}`, `Guidebook "${gb.id}" downloadUrl is standard`);
}

// 3. Static Generation Parameters
console.log('\n--- 3. Static Params Functionality ---');
const pageModule = await import('../src/app/competition/[...slug]/page.tsx');
const { generateStaticParams, generateMetadata } = pageModule;

const staticParams = await generateStaticParams();
assert(Array.isArray(staticParams) && staticParams.length >= 4, 'generateStaticParams() returns static routes', JSON.stringify(staticParams));

// Test metadata generator
for (const param of staticParams) {
  const meta = await generateMetadata({ params: Promise.resolve(param) });
  assert(typeof meta.title === 'string' && meta.title.includes('IARC XII'), `generateMetadata for ${JSON.stringify(param.slug)} has title`, meta.title);
  assert(typeof meta.description === 'string' && meta.description.length > 20, `generateMetadata for ${JSON.stringify(param.slug)} has description`);
}

// Test metadata generator for invalid slug
const notFoundMeta = await generateMetadata({ params: Promise.resolve({ slug: ['unknown-slug'] }) });
assert(notFoundMeta.title === 'Kompetisi Tidak Ditemukan - IARC XII', 'generateMetadata handles not-found slug gracefully', notFoundMeta.title);

// 4. Cross-Route Navigation Anchors Verification
console.log('\n--- 4. Cross-Route Navigation Anchors in Navbar & Footer ---');
const navbarTsx = fs.readFileSync(path.join(ROOT_DIR, 'src', 'components', 'Navbar.tsx'), 'utf8');
const footerTsx = fs.readFileSync(path.join(ROOT_DIR, 'src', 'components', 'Footer.tsx'), 'utf8');

// Ensure section anchors start with /# so they navigate back to home page from /competition/[slug]
const requiredAnchors = ['/#tentang', '/#kompetisi', '/#alur', '/#timeline', '/#faq'];
for (const anchor of requiredAnchors) {
  assert(navbarTsx.includes(anchor), `Navbar includes root-relative anchor ${anchor}`);
}
assert(footerTsx.includes('/#kompetisi'), 'Footer includes root-relative /#kompetisi anchor');

// 5. Anti-Slop Check: Verify no em dashes
console.log('\n--- 5. Anti-Slop Check: Verify zero em dashes ---');
const compDetailTsx = fs.readFileSync(path.join(ROOT_DIR, 'src', 'components', 'CompetitionDetailClient.tsx'), 'utf8');
const timelineTsx = fs.readFileSync(path.join(ROOT_DIR, 'src', 'components', 'TimelineSection.tsx'), 'utf8');

assert(!compDetailTsx.includes('—'), 'CompetitionDetailClient has zero em dashes (—)');
assert(!timelineTsx.includes('—'), 'TimelineSection has zero em dashes (—)');

console.log('\n================================================================');
console.log(`TOTAL STRESS TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL ADVERSARIAL STRESS TESTS PASSED!');
  process.exit(0);
}
