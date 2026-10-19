import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

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

async function main() {
  console.log('======================================================');
  console.log('=== EMPIRICAL CHALLENGER: MILESTONE 3 LIVE SERVER  ===');
  console.log('=== PORT: 3007                                     ===');
  console.log('======================================================\n');

  const isWindows = process.platform === 'win32';
  const npxCmd = isWindows ? 'npx.cmd' : 'npx';
  
  // Start server on port 3007
  console.log('Spawning "next start -p 3007"...');
  const server = spawn(npxCmd, ['next', 'start', '-p', '3007'], {
    cwd: process.cwd(),
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.log(`[SERVER STDOUT] ${msg}`);
  });
  server.stderr.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.error(`[SERVER STDERR] ${msg}`);
  });

  const maxAttempts = 25;
  let ready = false;
  console.log('Waiting for Next.js production server on port 3007...');
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(1000);
    try {
      const res = await fetchUrl('http://127.0.0.1:3007/');
      if (res.statusCode === 200) {
        ready = true;
        console.log(`Server responded with 200 OK on attempt ${i + 1}`);
        break;
      }
    } catch {
      // still starting up
    }
  }

  if (!ready) {
    console.error('ERROR: Server failed to respond within 25 seconds!');
    if (isWindows && server.pid) {
      spawn('taskkill', ['/pid', server.pid.toString(), '/f', '/t'], { stdio: 'ignore' });
    } else {
      server.kill();
    }
    process.exit(1);
  }

  const testResults = [];
  function assert(condition, name, details) {
    if (condition) {
      testResults.push({ name, passed: true });
      console.log(`  [PASS] ${name}`);
    } else {
      testResults.push({ name, passed: false, details });
      console.error(`  [FAIL] ${name} ${details ? '- ' + details : ''}`);
    }
  }

  try {
    // -------------------------------------------------------------
    // 1. ROUTE VERIFICATION (HTTP Status Codes)
    // -------------------------------------------------------------
    console.log('\n--- 1. HTTP STATUS CODES ON LIVE PORT 3007 ---');

    // 1.1 Root
    const rootRes = await fetchUrl('http://127.0.0.1:3007/');
    assert(rootRes.statusCode === 200, 'GET / returns HTTP 200 OK', `Got ${rootRes.statusCode}`);

    // 1.2 Competition routes
    const competitionRoutes = [
      'automation-challenge',
      'smart-robotics',
      'energy-treasure',
      'vortex',
    ];

    const competitionBodies = {};

    for (const slug of competitionRoutes) {
      const res = await fetchUrl(`http://127.0.0.1:3007/competition/${slug}`);
      assert(res.statusCode === 200, `GET /competition/${slug} returns HTTP 200 OK`, `Got ${res.statusCode}`);
      competitionBodies[slug] = res.body;
    }

    // 1.3 Invalid slug 404 test
    const invalidSlugRes = await fetchUrl('http://127.0.0.1:3007/competition/invalid-slug');
    assert(invalidSlugRes.statusCode === 404, 'GET /competition/invalid-slug returns HTTP 404', `Got ${invalidSlugRes.statusCode}`);

    const nonExistentSlugRes = await fetchUrl('http://127.0.0.1:3007/competition/non-existent-comp');
    assert(nonExistentSlugRes.statusCode === 404, 'GET /competition/non-existent-comp returns HTTP 404', `Got ${nonExistentSlugRes.statusCode}`);

    // -------------------------------------------------------------
    // 2. AUTOMATION CHALLENGE TRACK SEPARATION & DETAILS
    // -------------------------------------------------------------
    console.log('\n--- 2. AUTOMATION CHALLENGE VERIFICATION ---');
    const acHtml = competitionBodies['automation-challenge'];
    assert(acHtml && acHtml.length > 5000, 'Automation Challenge page payload substantial');
    assert(acHtml.includes('Track 1: Microcontroller (IoT)'), 'Contains Track 1: Microcontroller (IoT)');
    assert(acHtml.includes('Track 2: PLC'), 'Contains Track 2: PLC');
    
    // Categories
    assert(acHtml.includes('SD Beginner') || acHtml.includes('SD'), 'Includes SD category');
    assert(acHtml.includes('SMP Junior') || acHtml.includes('SMP'), 'Includes SMP category');
    assert(acHtml.includes('SMA/SMK Senior') || acHtml.includes('SMA/SMK'), 'Includes SMA/SMK category');
    assert(acHtml.includes('Mahasiswa') || acHtml.includes('Mahasiswa Nasional'), 'Includes Mahasiswa category');
    assert(acHtml.includes('International (College)') || acHtml.includes('College'), 'Includes International category');

    // Technical specs
    assert(acHtml.includes('Pusdi') || acHtml.includes('Pusat Penelitian'), 'Includes Pusdi ITS reference');
    assert(acHtml.includes('Omron') || acHtml.includes('CP2E-N'), 'Includes Omron CP2E-N spec');
    assert(acHtml.includes('Haiwell'), 'Includes Haiwell Cloud SCADA / HMI spec');
    assert(acHtml.includes('Lihat Guidebook') || acHtml.includes('Guidebook'), 'Has Lihat Guidebook button');
    assert(acHtml.includes('Daftar Sekarang'), 'Has Daftar Sekarang button');

    // -------------------------------------------------------------
    // 3. SMART ROBOTICS, ENERGY TREASURE, & VORTEX VERIFICATION
    // -------------------------------------------------------------
    console.log('\n--- 3. OTHER COMPETITIONS VERIFICATION ---');
    const srHtml = competitionBodies['smart-robotics'];
    assert(srHtml.includes('Smart Robotics Online') || srHtml.includes('SmartRoboticsOnline'), 'Smart Robotics has digital track link');
    assert(srHtml.includes('SD') && srHtml.includes('SMP') && srHtml.includes('SMA') && srHtml.includes('Mahasiswa'), 'Smart Robotics covers all 4 education levels');

    const etHtml = competitionBodies['energy-treasure'];
    assert(etHtml.includes('https://its.id/m/FormRegistEnergyTreasureIARCXII'), 'Energy Treasure has clean sanitized registration link without legacy typo');
    assert(etHtml.includes('Maze Solver') || etHtml.includes('Line Follower'), 'Energy Treasure mentions maze solver');

    const vortexHtml = competitionBodies['vortex'];
    assert(vortexHtml.includes('Turnitin') || vortexHtml.includes('20%'), 'Vortex specifies Turnitin similarity threshold');
    assert(vortexHtml.includes('Idea') || vortexHtml.includes('Innovation'), 'Vortex specifies Idea / Innovation challenge tracks');

    // -------------------------------------------------------------
    // 4. LANDING PAGE CONTENT & INTERACTIVITY AUDIT
    // -------------------------------------------------------------
    console.log('\n--- 4. LANDING PAGE CONTENT & INTERACTIVITY AUDIT ---');
    const rootHtml = rootRes.body;

    // Theme philosophy & organizer
    assert(rootHtml.includes('Engineering Systems That Moves the World'), 'Root has theme philosophy: "Engineering Systems That Moves the World"');
    assert(rootHtml.includes('Departemen Teknik Elektro Otomasi'), 'Root has organizer: Departemen Teknik Elektro Otomasi ITS');

    // Section anchors
    const expectedSections = ['tentang', 'kompetisi', 'alur', 'timeline', 'faq'];
    for (const sec of expectedSections) {
      assert(rootHtml.includes(`id="${sec}"`), `Root contains section anchor id="${sec}"`);
    }

    // Bank Account & Twibbon
    assert(rootHtml.includes('1430996882'), 'BCA Account 1430996882 present');
    assert(rootHtml.includes('Luna Aulia Afifah'), 'Account holder Luna Aulia Afifah present');
    assert(rootHtml.includes('https://its.id/m/TwibbonCompeIARCXII'), 'Twibbon link present');
    assert(rootHtml.includes('https://its.id/m/CaptionTwibbonIARCXII'), 'Caption link present');

    // Navbar CTAs
    assert(rootHtml.includes('Guidebook Utama'), 'Navbar has active Guidebook Utama CTA');
    assert(rootHtml.includes('Daftar Sekarang'), 'Navbar has active Daftar Sekarang CTA');

    // Level filter buttons
    const expectedFilters = ['Semua', 'SD', 'SMP', 'SMA/SMK', 'Mahasiswa', 'International'];
    for (const f of expectedFilters) {
      assert(rootHtml.includes(`>${f}<`), `Filter button "${f}" rendered`);
    }

    // -------------------------------------------------------------
    // 5. SECTION SPACING & VIEWPORT HEIGHT AUDIT
    // -------------------------------------------------------------
    console.log('\n--- 5. SECTION SPACING AUDIT ---');
    const sectionTags = rootHtml.match(/<section[^>]*>/g) || [];
    assert(sectionTags.length >= 6, `Found ${sectionTags.length} <section> elements on root page`);
    for (let i = 0; i < sectionTags.length; i++) {
      const tag = sectionTags[i];
      const isHero = i === 0;
      if (!isHero) {
        const has100vh = /100vh/.test(tag);
        const hasMinHScreen = /min-h-screen/.test(tag);
        const hasHScreen = /\bh-screen\b/.test(tag);
        assert(!has100vh && !hasMinHScreen && !hasHScreen, `Non-hero section #${i + 1} has NO 100vh/min-h-screen`);
        const hasCompactRhythm = /py-12/.test(tag) && /md:py-16/.test(tag);
        assert(hasCompactRhythm, `Non-hero section #${i + 1} has compact rhythm (py-12 md:py-16)`);
      }
    }

    // -------------------------------------------------------------
    // 6. ALL 15+1 GOOGLE DRIVE PDF MAPPING AUDIT
    // -------------------------------------------------------------
    console.log('\n--- 6. ALL 15+1 GOOGLE DRIVE PDF MAPPINGS AUDIT ---');
    const guidebooksPath = path.resolve('src/data/guidebooks.ts');
    const guidebooksCode = fs.readFileSync(guidebooksPath, 'utf-8');
    
    // Extract driveFileIds
    const driveIds = [...guidebooksCode.matchAll(/driveFileId:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    assert(driveIds.length === 16, `Exactly 16 Google Drive PDF IDs mapped (found ${driveIds.length})`);
    
    // Check uniqueness
    const uniqueDriveIds = new Set(driveIds);
    assert(uniqueDriveIds.size === 16, `All 16 Google Drive PDF IDs are strictly unique (found ${uniqueDriveIds.size} unique)`);

    // Verify preview and download URLs
    const previewUrls = [...guidebooksCode.matchAll(/previewUrl:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    const downloadUrls = [...guidebooksCode.matchAll(/downloadUrl:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    assert(previewUrls.length === 16, `16 preview URLs constructed`);
    assert(downloadUrls.length === 16, `16 download URLs constructed`);

    for (let i = 0; i < 16; i++) {
      const id = driveIds[i];
      assert(
        previewUrls[i] === `https://drive.google.com/file/d/${id}/preview`,
        `Preview URL #${i + 1} matches standard https://drive.google.com/file/d/${id}/preview`
      );
      assert(
        downloadUrls[i] === `https://drive.google.com/uc?export=download&id=${id}`,
        `Download URL #${i + 1} matches standard https://drive.google.com/uc?export=download&id=${id}`
      );
    }

    // -------------------------------------------------------------
    // 7. RESPONSIVENESS AND MOBILE/TABLET/DESKTOP BREAKPOINTS
    // -------------------------------------------------------------
    console.log('\n--- 7. RESPONSIVENESS & BREAKPOINT AUDIT ---');
    // Check root and detail pages have responsive viewport meta and Tailwind responsive prefixes
    assert(rootHtml.includes('name="viewport"') && rootHtml.includes('width=device-width'), 'Viewport meta tag is set correctly');
    
    // Check responsive classes across components
    const componentsDir = path.resolve('src/components');
    const compFiles = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.tsx'));
    let hasMobileBreakpoints = false;
    let hasTabletBreakpoints = false;
    let hasDesktopBreakpoints = false;

    for (const file of compFiles) {
      const content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
      if (/sm:/.test(content)) hasMobileBreakpoints = true;
      if (/md:/.test(content)) hasTabletBreakpoints = true;
      if (/lg:|xl:|2xl:/.test(content)) hasDesktopBreakpoints = true;
    }

    assert(hasMobileBreakpoints, 'Components implement mobile breakpoints (sm:)');
    assert(hasTabletBreakpoints, 'Components implement tablet breakpoints (md:)');
    assert(hasDesktopBreakpoints, 'Components implement desktop breakpoints (lg:/xl:)');

  } finally {
    console.log('\nStopping Next.js server on port 3007...');
    if (isWindows && server.pid) {
      spawn('taskkill', ['/pid', server.pid.toString(), '/f', '/t'], { stdio: 'ignore' });
    } else {
      server.kill('SIGTERM');
    }
  }

  console.log('\n======================================================');
  const failed = testResults.filter((t) => !t.passed).length;
  const passed = testResults.filter((t) => t.passed).length;
  console.log(`ACCEPTANCE TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error in acceptance test:', err);
  process.exit(1);
});
