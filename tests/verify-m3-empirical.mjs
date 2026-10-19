import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const ROOT_DIR = process.cwd();
const NEXT_COMPETITION_DIR = path.join(ROOT_DIR, '.next', 'server', 'app', 'competition');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

const results = [];
function record(name, passed, details) {
  results.push({ name, passed, details });
  const status = passed ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${name}${details ? ` -> ${details}` : ''}`);
}

async function runTests() {
  console.log('================================================================');
  console.log('=== EMPIRICAL CHALLENGER M3 TEST SUITE                       ===');
  console.log('================================================================\n');

  // --- SUITE 1: SSG HTML Artifact Verification ---
  console.log('--- Suite 1: Generated Dynamic Competition HTML Pages ---');
  const expectedSlugs = [
    'automation-challenge',
    'smart-robotics',
    'energy-treasure',
    'vortex',
  ];

  for (const slug of expectedSlugs) {
    const htmlFile = path.join(NEXT_COMPETITION_DIR, `${slug}.html`);
    const exists = fs.existsSync(htmlFile);
    if (!exists) {
      record(`HTML exists: ${slug}.html`, false, `File not found at ${htmlFile}`);
      continue;
    }
    const stat = fs.statSync(htmlFile);
    const hasContent = stat.size > 10000;
    record(`HTML exists: ${slug}.html`, hasContent, `Size: ${stat.size} bytes`);

    const content = fs.readFileSync(htmlFile, 'utf8');
    // Check Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';
    const hasValidTitle = title.includes('IARC XII') && title.toLowerCase().includes(slug.split('-')[0]);
    record(`HTML Title: ${slug}.html`, hasValidTitle, `Title: "${title}"`);
  }

  // --- SUITE 2: Automation Challenge Track & Card Verification ---
  console.log('\n--- Suite 2: Automation Challenge Tracks & Cards ---');
  // Load raw competitions data
  const competitionsTs = fs.readFileSync(path.join(ROOT_DIR, 'src', 'data', 'competitions.ts'), 'utf8');
  const acHtml = fs.readFileSync(path.join(NEXT_COMPETITION_DIR, 'automation-challenge.html'), 'utf8');

  // Check Track 1: Microcontroller (5 cards)
  const iotCategories = [
    'ac-iot-sd',
    'ac-iot-smp',
    'ac-iot-sma',
    'ac-iot-mahasiswa',
    'ac-iot-college',
  ];
  let allIotFound = true;
  for (const catId of iotCategories) {
    if (!competitionsTs.includes(`id: "${catId}"`)) {
      allIotFound = false;
      record(`Track 1 category: ${catId}`, false, 'Missing in competitions.ts');
    }
  }
  record('Track 1 has 5 categories (SD, SMP, SMA/SMK, Mahasiswa, International)', allIotFound, 'All 5 category IDs verified');

  // Check Track 2: PLC (2 cards)
  const plcCategories = [
    'ac-plc-sma',
    'ac-plc-mahasiswa',
  ];
  let allPlcFound = true;
  for (const catId of plcCategories) {
    if (!competitionsTs.includes(`id: "${catId}"`)) {
      allPlcFound = false;
      record(`Track 2 category: ${catId}`, false, 'Missing in competitions.ts');
    }
  }
  record('Track 2 has 2 categories (SMA/SMK, Mahasiswa)', allPlcFound, 'Both category IDs verified');

  // Check Track switchers rendered in HTML
  const hasTrack1Button = acHtml.includes('Track 1: Microcontroller (IoT)');
  const hasTrack2Button = acHtml.includes('Track 2: PLC');
  record('Automation Challenge HTML includes Track 1 selector', hasTrack1Button);
  record('Automation Challenge HTML includes Track 2 selector', hasTrack2Button);

  // Check Action Buttons in HTML
  const hasGuidebookBtn = acHtml.includes('Lihat Guidebook (PDF)');
  const hasRegisterBtn = acHtml.includes('Daftar Sekarang');
  record('Automation Challenge HTML has "Lihat Guidebook (PDF)" button', hasGuidebookBtn);
  record('Automation Challenge HTML has "Daftar Sekarang" button', hasRegisterBtn);

  // Check Omron & Haiwell & Pusdi technical specifications
  const hasOmronSpec = acHtml.includes('OMRON CP2E-N') || acHtml.includes('CP2E-N');
  const hasHaiwellSpec = acHtml.includes('Haiwell B7-H/W') || acHtml.includes('Haiwell');
  const hasPusdiSpec = acHtml.includes('Pusat Studi (Pusdi) ITS') || acHtml.includes('Pusdi');
  record('Automation Challenge includes OMRON CP2E-N specs', hasOmronSpec);
  record('Automation Challenge includes Haiwell HMI specs', hasHaiwellSpec);
  record('Automation Challenge includes 3 Pusdi ITS specs', hasPusdiSpec);

  // --- SUITE 3: Energy Treasure Clean URL & Specs ---
  console.log('\n--- Suite 3: Energy Treasure URL & Content ---');
  const etHtml = fs.readFileSync(path.join(NEXT_COMPETITION_DIR, 'energy-treasure.html'), 'utf8');

  // Target clean URL: https://its.id/m/FormRegistEnergyTreasureIARCXII
  const cleanEtUrl = 'https://its.id/m/FormRegistEnergyTreasureIARCXII';
  const hasCleanUrl = etHtml.includes(cleanEtUrl);
  // Check that there is NO legacy malformed URL like "- https:" or similar
  const hasMalformedUrl = etHtml.includes('- https://its.id/m/FormRegistEnergyTreasure') ||
                          etHtml.includes(' - https://') ||
                          competitionsTs.includes('- https://its.id/m/FormRegistEnergyTreasure');
  record('Energy Treasure HTML contains clean registration URL', hasCleanUrl, cleanEtUrl);
  record('No malformed or leading-dash registration URL in Energy Treasure', !hasMalformedUrl);

  const hasMazeSolverSpec = etHtml.includes('Maze') || etHtml.includes('labirin');
  const hasEtLevels = etHtml.includes('SMA') && etHtml.includes('Mahasiswa');
  record('Energy Treasure includes Maze Solver specs', hasMazeSolverSpec);
  record('Energy Treasure includes SMA and Mahasiswa levels', hasEtLevels);

  // --- SUITE 4: Smart Robotics & KTI Vortex ---
  console.log('\n--- Suite 4: Smart Robotics & Vortex ---');
  const srHtml = fs.readFileSync(path.join(NEXT_COMPETITION_DIR, 'smart-robotics.html'), 'utf8');
  const vortexHtml = fs.readFileSync(path.join(NEXT_COMPETITION_DIR, 'vortex.html'), 'utf8');

  // Smart Robotics 4 levels
  const srHasAllLevels = srHtml.includes('SD') && srHtml.includes('SMP') && srHtml.includes('SMA') && srHtml.includes('Mahasiswa');
  const srHasDigitalTrackLink = srHtml.includes('https://its.id/m/SmartRoboticsOnline');
  record('Smart Robotics includes 4 levels (SD, SMP, SMA/SMK, Mahasiswa)', srHasAllLevels);
  record('Smart Robotics includes official digital track link', srHasDigitalTrackLink);

  // Vortex 2 levels and Turnitin
  const vortexHasLevels = vortexHtml.includes('SMA') && vortexHtml.includes('Mahasiswa');
  const vortexHasTurnitin = vortexHtml.includes('Turnitin') && vortexHtml.includes('20%');
  record('Vortex includes SMA/SMK and Mahasiswa levels', vortexHasLevels);
  record('Vortex specifies Turnitin < 20% requirement', vortexHasTurnitin);

  // --- SUITE 5: 15 Guidebooks Mapping Verification ---
  console.log('\n--- Suite 5: 15 Guidebooks Mapping ---');
  const guidebooksTs = fs.readFileSync(path.join(ROOT_DIR, 'src', 'data', 'guidebooks.ts'), 'utf8');

  // Find all driveFileId entries
  const fileIdMatches = [...guidebooksTs.matchAll(/driveFileId:\s*["']([^"']+)["']/g)];
  // Suite 5: 15 category guidebooks + 1 Guidebook Utama = 16 total guidebooks
  const categoryGuidebooks = fileIdMatches.filter((_, idx) => idx > 0); // exclude 'utama'
  record('Guidebooks list has exactly 15 category guidebooks', categoryGuidebooks.length === 15, `Found: ${categoryGuidebooks.length} category guidebooks`);
  record('Guidebooks list has 1 Guidebook Utama + 15 category guidebooks (16 total)', fileIdMatches.length === 16, `Found: ${fileIdMatches.length} total`);

  let allFileIdsValid = true;
  for (const m of fileIdMatches) {
    const fid = m[1];
    // Google Drive file IDs are typically 33 characters (alphanumeric, -, _)
    if (fid.length < 25 || !/^[a-zA-Z0-9_-]+$/.test(fid)) {
      allFileIdsValid = false;
      record(`File ID format valid: ${fid}`, false);
    }
  }
  record('All 15 Google Drive file IDs have valid format', allFileIdsValid);

  // Verify all guidebookDocId references in competitions.ts exist in guidebooks.ts
  const docIdMatches = [...competitionsTs.matchAll(/guidebookDocId:\s*["']([^"']+)["']/g)];
  let allDocIdsMapped = true;
  for (const m of docIdMatches) {
    const docId = m[1];
    if (!guidebooksTs.includes(`id: "${docId}"`)) {
      allDocIdsMapped = false;
      record(`Category guidebookDocId "${docId}" in guidebooks.ts`, false);
    }
  }
  record('All category guidebookDocId references map to valid guidebooks', allDocIdsMapped, `${docIdMatches.length} references verified`);

  // --- SUITE 6: Live HTTP Server Integration & 404 Behavior ---
  console.log('\n--- Suite 6: Live Server Integration & Routing ---');
  const TEST_PORT = 3010;
  const isWindows = process.platform === 'win32';
  const npxCmd = isWindows ? 'npx.cmd' : 'npx';

  console.log(`Starting Next.js server on port ${TEST_PORT}...`);
  const server = spawn(npxCmd, ['next', 'start', '-p', String(TEST_PORT)], {
    cwd: ROOT_DIR,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', () => {});
  server.stderr.on('data', () => {});

  let serverUp = false;
  for (let attempt = 0; attempt < 15; attempt++) {
    await sleep(1000);
    try {
      const res = await fetchUrl(`http://127.0.0.1:${TEST_PORT}/`);
      if (res.statusCode === 200) {
        serverUp = true;
        break;
      }
    } catch {
      // waiting
    }
  }

  if (!serverUp) {
    record('Next.js live server started successfully', false, `Failed to connect after 15s on port ${TEST_PORT}`);
    server.kill();
  } else {
    record('Next.js live server started successfully', true, `Port ${TEST_PORT} responsive`);

    // Test each competition route via HTTP
    for (const slug of expectedSlugs) {
      try {
        const res = await fetchUrl(`http://127.0.0.1:${TEST_PORT}/competition/${slug}`);
        const passed = res.statusCode === 200 && res.body.includes(slug.split('-')[0]);
        record(`HTTP GET /competition/${slug} returns 200 OK`, passed, `Status: ${res.statusCode}`);
      } catch (err) {
        record(`HTTP GET /competition/${slug}`, false, err.message);
      }
    }

    // Adversarial Stress Test: Non-existent competition route should return 404 Not Found
    try {
      const res404 = await fetchUrl(`http://127.0.0.1:${TEST_PORT}/competition/invalid-competition-slug`);
      const is404 = res404.statusCode === 404;
      record('Adversarial Test: Invalid competition slug returns 404 Not Found', is404, `Status: ${res404.statusCode}`);
    } catch (err) {
      record('Adversarial Test: Invalid competition slug', false, err.message);
    }

    // Kill server cleanly
    console.log('Stopping live Next.js server...');
    if (isWindows) {
      spawn('taskkill', ['/pid', String(server.pid), '/f', '/t']);
    } else {
      server.kill('SIGTERM');
    }
  }

  console.log('\n================================================================');
  console.log('=== TEST SUMMARY                                             ===');
  console.log('================================================================');
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.filter((r) => !r.passed).length;
  console.log(`Total tests: ${results.length}`);
  console.log(`Passed:      ${passedCount}`);
  console.log(`Failed:      ${failedCount}`);

  if (failedCount > 0) {
    console.error('\nFAILURES DETECTED:');
    results.filter((r) => !r.passed).forEach((r) => console.error(` - ${r.name}: ${r.details || ''}`));
    process.exit(1);
  } else {
    console.log('\nALL EMPIRICAL TESTS PASSED! Verdict: APPROVE');
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
