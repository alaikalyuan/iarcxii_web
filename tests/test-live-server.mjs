import { spawn } from 'node:child_process';
import http from 'node:http';

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
  console.log('=== STARTING NEXT.JS LIVE PRODUCTION SERVER TEST   ===');
  console.log('=== PORT: 3006                                     ===');
  console.log('======================================================\n');

  // Spawn `npx next start -p 3006`
  const isWindows = process.platform === 'win32';
  const npxCmd = isWindows ? 'npx.cmd' : 'npx';
  const server = spawn(npxCmd, ['next', 'start', '-p', '3006'], {
    cwd: process.cwd(),
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (d) => console.log(`[SERVER STDOUT] ${d.toString().trim()}`));
  server.stderr.on('data', (d) => console.error(`[SERVER STDERR] ${d.toString().trim()}`));

  // Wait for server to become responsive
  const maxAttempts = 20;
  let ready = false;
  console.log('Waiting for Next.js server on port 3006...');
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(1000);
    try {
      const res = await fetchUrl('http://127.0.0.1:3006/');
      if (res.statusCode === 200) {
        ready = true;
        console.log(`Server responded with 200 OK on attempt ${i + 1}`);
        break;
      }
    } catch {
      // not ready yet
    }
  }

  if (!ready) {
    console.error('Server failed to respond within 20 seconds!');
    server.kill();
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
    console.log('\n--- AUDITING ROOT PAGE RESPONSE (http://127.0.0.1:3006/) ---');
    const rootRes = await fetchUrl('http://127.0.0.1:3006/');
    assert(rootRes.statusCode === 200, 'HTTP status is 200 OK');
    assert(
      rootRes.headers['content-type'] && rootRes.headers['content-type'].includes('text/html'),
      'Content-Type is text/html'
    );

    const html = rootRes.body;
    assert(html.length > 5000, `HTML payload length is substantial (${html.length} bytes)`);

    // Section IDs
    const expectedSections = ['tentang', 'kompetisi', 'alur', 'timeline', 'faq'];
    for (const sec of expectedSections) {
      assert(
        html.includes(`id="${sec}"`),
        `HTML contains section anchor id="${sec}"`
      );
    }

    // Verify all 9 FAQ questions are rendered in SSR HTML
    const expectedFaqs = [
      'Bagaimana rangkaian umum kompetisi IARC XII?',
      'Siapa saja yang diperbolehkan mendaftar IARC XII?',
      'Apakah alat, mikrokontroler, atau robot disediakan oleh panitia?',
      'Apakah panitia menyediakan akomodasi penginapan bagi peserta dari luar kota atau pulau?',
      'Bagaimana ketentuan pembentukan tim dan guru atau dosen pendamping?',
      'Bagaimana proses dan verifikasi pembayaran pendaftaran?',
      'Apakah twibbon dan caption wajib diunggah oleh seluruh anggota tim?',
      'Apa saja perangkat lunak (software) yang harus dipersiapkan untuk cabang PLC?',
      'Apakah seluruh peserta mendapatkan sertifikat dan materi bimbingan?',
    ];

    console.log('\n--- VERIFYING 9 FAQS IN HTML ---');
    for (let i = 0; i < expectedFaqs.length; i++) {
      const q = expectedFaqs[i];
      assert(html.includes(q), `FAQ #${i + 1} present in HTML: "${q.slice(0, 45)}..."`);
    }

    // Verify education level filter buttons in HTML
    console.log('\n--- VERIFYING LEVEL FILTER BUTTONS IN HTML ---');
    const expectedLevels = ['Semua', 'SD', 'SMP', 'SMA/SMK', 'Mahasiswa', 'International'];
    for (const lvl of expectedLevels) {
      assert(
        html.includes(`>${lvl}<`),
        `Filter level button present in HTML: "${lvl}"`
      );
    }

    // Verify Section Spacing: No non-hero section has 100vh or min-h-screen
    console.log('\n--- VERIFYING SECTION SPACING IN RENDERED HTML ---');
    // Extract all <section> elements
    const sectionMatches = html.match(/<section[^>]*>/g) || [];
    assert(sectionMatches.length >= 6, `Found ${sectionMatches.length} <section> elements in HTML`);
    for (let i = 0; i < sectionMatches.length; i++) {
      const tag = sectionMatches[i];
      const isHero = i === 0 || (!tag.includes('id=') && i === 0);
      const has100vh = /100vh/.test(tag);
      const hasMinHScreen = /min-h-screen/.test(tag);
      const hasHScreen = /\bh-screen\b/.test(tag);

      if (!isHero) {
        assert(
          !has100vh && !hasMinHScreen && !hasHScreen,
          `Non-hero section #${i + 1} has NO 100vh/min-h-screen (${tag.slice(0, 50)}...)`
        );
        const hasPy12or16 = /py-12/.test(tag) && /md:py-16/.test(tag);
        assert(
          hasPy12or16,
          `Non-hero section #${i + 1} has compact rhythm (py-12 md:py-16)`
        );
      } else {
        console.log(`  [INFO] Hero section #${i + 1}: ${tag.slice(0, 60)}...`);
      }
    }

    // Verify critical content elements
    console.log('\n--- VERIFYING CONTENT INTEGRITY IN HTML ---');
    assert(!html.includes('1430996882'), 'BCA Account Number 1430996882 is NOT exposed in HTML');
    assert(!html.includes('Luna Aulia Afifah'), 'Account holder Luna Aulia Afifah is NOT exposed in HTML');
    assert(html.includes('https://its.id/m/TwibbonCompeIARCXII'), 'Twibbon link is present');
    assert(html.includes('https://its.id/m/CaptionTwibbonIARCXII'), 'Caption link is present');
    assert(html.includes('Engineering Systems That Moves the World'), 'Theme slogan is present');
    assert(html.includes('Departemen Teknik Elektro Otomasi'), 'Organizer is present');

    // Test static image assets
    console.log('\n--- VERIFYING MIGRATED STATIC ASSETS ON LIVE SERVER ---');
    const staticAssets = [
      '/images/logo-full.png',
      '/images/hero-deco.png',
      '/images/gear-logo.png',
      '/images/logo_robokidz.png',
      '/images/dokumentasi-1.jpg',
      '/images/dokumentasi-2.jpg',
      '/images/dokumentasi-3.jpg',
      '/images/dokumentasi-4.jpg',
    ];

    for (const asset of staticAssets) {
      const assetRes = await fetchUrl(`http://127.0.0.1:3006${asset}`);
      assert(
        assetRes.statusCode === 200,
        `Static asset ${asset} responds with HTTP 200 (length: ${assetRes.body.length})`
      );
    }
  } finally {
    console.log('\nShutting down Next.js test server on port 3006...');
    if (isWindows) {
      // On Windows spawn shell, kill tree
      spawn('taskkill', ['/pid', server.pid.toString(), '/f', '/t'], { stdio: 'ignore' });
    } else {
      server.kill('SIGTERM');
    }
  }

  console.log('\n======================================================');
  const failed = testResults.filter((t) => !t.passed).length;
  const passed = testResults.filter((t) => t.passed).length;
  console.log(`LIVE SERVER TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error during live server test:', err);
  process.exit(1);
});
