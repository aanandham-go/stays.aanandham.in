import fs from 'fs';
import path from 'path';

console.log('--- RUNNING AANANDHAM COMPREHENSIVE META AUDIT ---');

let hasErrors = false;

function auditMetadata(name, title, description, canonical, options = {}) {
  console.log(`\nAuditing metadata for: [${name}]`);
  
  // Title Check (50-60 chars target, 45-65 acceptable)
  if (title) {
    const titleLen = title.length;
    console.log(`  [TITLE] "${title}" (${titleLen} chars)`);
    if (titleLen < 45 || titleLen > 65) {
      console.error(`  FAIL: Title length out of range: ${titleLen} (expected 45-65)`);
      hasErrors = true;
    } else {
      console.log(`  PASS: Title length valid.`);
    }
  } else {
    console.error(`  FAIL: Missing title`);
    hasErrors = true;
  }

  // Description Check (140-160 chars target, 120-180 acceptable)
  if (description) {
    const descLen = description.length;
    console.log(`  [DESC] "${description}" (${descLen} chars)`);
    if (descLen < 120 || descLen > 180) {
      console.error(`  FAIL: Description length out of range: ${descLen} (expected 120-180)`);
      hasErrors = true;
    } else {
      console.log(`  PASS: Description length valid.`);
    }
  } else {
    console.error(`  FAIL: Missing description`);
    hasErrors = true;
  }

  // Canonical Check
  if (canonical) {
    console.log(`  [CANONICAL] ${canonical}`);
    if (!canonical.startsWith('https://')) {
      console.error(`  FAIL: Canonical must be absolute HTTPS URL`);
      hasErrors = true;
    } else {
      console.log(`  PASS: Canonical valid.`);
    }
  }
}

// 1. Audit Root Layout
const layoutContent = fs.readFileSync(path.resolve('src/app/layout.jsx'), 'utf8');
const rootTitle = layoutContent.match(/default:\s*['"`]([^'"`]+)['"`]/)?.[1];
const rootDesc = layoutContent.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/)?.[1];
const rootCanonical = layoutContent.match(/canonical:\s*['"`]([^'"`]+)['"`]/)?.[1];
auditMetadata('Root Layout / Home', rootTitle, rootDesc, rootCanonical);

// 2. Audit Treks Layout
const treksLayoutPath = path.resolve('src/app/treks/layout.jsx');
if (fs.existsSync(treksLayoutPath)) {
  const treksContent = fs.readFileSync(treksLayoutPath, 'utf8');
  const treksTitle = treksContent.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1];
  const treksDesc = treksContent.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/)?.[1];
  const treksCanonical = treksContent.match(/canonical:\s*`?\${siteUrl}(\/[^`'"]+)`?/)?.[1];
  auditMetadata('Treks Route (/treks)', treksTitle, treksDesc, 'https://stays.aanandham.in' + (treksCanonical || '/treks'));
}

// 3. Audit Himachal Camps Page
const himachalPagePath = path.resolve('src/app/camps/himachal/page.jsx');
if (fs.existsSync(himachalPagePath)) {
  const himachalContent = fs.readFileSync(himachalPagePath, 'utf8');
  const himachalTitle = himachalContent.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1];
  const himachalDesc = himachalContent.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/)?.[1];
  const himachalCanonical = himachalContent.match(/canonical:\s*['"`]([^'"`]+)['"`]/)?.[1];
  auditMetadata('Himachal Camps (/camps/himachal)', himachalTitle, himachalDesc, himachalCanonical);
}

// 4. Audit About Page Layout
const aboutLayoutPath = path.resolve('src/app/about/layout.jsx');
if (fs.existsSync(aboutLayoutPath)) {
  const aboutContent = fs.readFileSync(aboutLayoutPath, 'utf8');
  const aboutTitle = aboutContent.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1];
  const aboutDesc = aboutContent.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/)?.[1];
  const aboutCanonical = aboutContent.match(/canonical:\s*['"`]([^'"`]+)['"`]/)?.[1];
  auditMetadata('About Page (/about)', aboutTitle, aboutDesc, aboutCanonical);
}

// 5. Audit Blog Index Page
const blogPagePath = path.resolve('src/app/blog/page.jsx');
if (fs.existsSync(blogPagePath)) {
  const blogContent = fs.readFileSync(blogPagePath, 'utf8');
  const blogTitle = blogContent.match(/title:\s*['"`]([^'"`]+)['"`]/)?.[1];
  const blogDesc = blogContent.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/)?.[1];
  const blogCanonical = blogContent.match(/canonical:\s*['"`]([^'"`]+)['"`]/)?.[1];
  auditMetadata('Blog Index (/blog)', blogTitle, blogDesc, blogCanonical);
}

// 5. Audit H1 Tag Count on Home Page
const homeContent = fs.readFileSync(path.resolve('src/app/page.jsx'), 'utf8');
const homeH1Matches = homeContent.match(/<(?:motion\.)?h1[\s\S]*?>[\s\S]*?<\/(?:motion\.)?h1>/gi) || [];
console.log(`\n[H1 COUNT AUDIT] Home page H1 count: ${homeH1Matches.length}`);
if (homeH1Matches.length !== 1) {
  console.error(`FAIL: Home page must have exactly 1 H1 (found ${homeH1Matches.length})`);
  hasErrors = true;
} else {
  console.log('PASS: Exactly 1 H1 on Home page.');
}

// 6. Audit H1 Tag Count on Treks Page
const treksPageContent = fs.readFileSync(path.resolve('src/app/treks/page.jsx'), 'utf8');
const treksH1Matches = treksPageContent.match(/<h1[\s\S]*?>[\s\S]*?<\/h1>/gi) || [];
console.log(`[H1 COUNT AUDIT] Treks page H1 count: ${treksH1Matches.length}`);
if (treksH1Matches.length !== 1) {
  console.error(`FAIL: Treks page must have exactly 1 H1 (found ${treksH1Matches.length})`);
  hasErrors = true;
} else {
  console.log('PASS: Exactly 1 H1 on Treks page.');
}

// 7. Audit H1 Tag Count on About Page
const aboutPageContent = fs.readFileSync(path.resolve('src/app/about/page.jsx'), 'utf8');
const aboutH1Matches = aboutPageContent.match(/<(?:motion\.)?h1[\s\S]*?>[\s\S]*?<\/(?:motion\.)?h1>/gi) || [];
console.log(`[H1 COUNT AUDIT] About page H1 count: ${aboutH1Matches.length}`);
if (aboutH1Matches.length !== 1) {
  console.error(`FAIL: About page must have exactly 1 H1 (found ${aboutH1Matches.length})`);
  hasErrors = true;
} else {
  console.log('PASS: Exactly 1 H1 on About page.');
}

// 8. Audit H1 Tag in Himachal Guide
if (fs.existsSync(himachalPagePath)) {
  const himachalPageSrc = fs.readFileSync(himachalPagePath, 'utf8');
  const himachalGuideH1s = himachalPageSrc.match(/<h1[\s\S]*?>[\s\S]*?<\/h1>/gi) || [];
  console.log(`[H1 COUNT AUDIT] Himachal Guide internal H1 count: ${himachalGuideH1s.length} (delegates single H1 to CampsDirectoryClient hero)`);
  if (himachalGuideH1s.length > 0) {
    console.error(`FAIL: Himachal guide must not introduce extra H1 tags (found ${himachalGuideH1s.length})`);
    hasErrors = true;
  } else {
    console.log('PASS: Himachal guide correctly delegates the single H1 to directory hero.');
  }
}

if (hasErrors) {
  console.error('\n>>> COMPREHENSIVE META AUDIT FAILED <<<');
  process.exit(1);
} else {
  console.log('\n>>> COMPREHENSIVE META AUDIT PASSED WITH ZERO ERRORS <<<');
  process.exit(0);
}
