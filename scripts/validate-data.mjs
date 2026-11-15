import fs from 'fs';
import path from 'path';
import ts from 'typescript';

console.log('--- RUNNING AANANDHAM DATA LAYER VALIDATION ---');

let hasErrors = false;

function loadTsModule(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Rule: Check for unpopulated TODO(owner) placeholders
  if (content.includes('TODO(owner)')) {
    console.error(`FAIL: Unpopulated "TODO(owner)" detected in ${filePath}`);
    hasErrors = true;
  }

  const transpiled = ts.transpileModule(content, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;

  const exports = {};
  const module = { exports };
  const fn = new Function('exports', 'module', 'require', transpiled);
  fn(exports, module, () => ({}));
  return module.exports;
}

const dataDir = path.resolve('content/data');
const regionsMod = loadTsModule(path.join(dataDir, 'regions.ts'));
const locationsMod = loadTsModule(path.join(dataDir, 'locations.ts'));
const propertiesMod = loadTsModule(path.join(dataDir, 'properties.ts'));
const guidesMod = loadTsModule(path.join(dataDir, 'guides.ts'));
const reviewsMod = loadTsModule(path.join(dataDir, 'reviews.ts'));

const regions = regionsMod.regionsData || [];
const locations = locationsMod.locationsData || [];
const properties = propertiesMod.propertiesData || [];
const guides = guidesMod.guidesData || [];
const reviews = reviewsMod.reviewsData || [];

console.log(`[COLLECTION COUNTS]`);
console.log(`- Regions: ${regions.length}`);
console.log(`- Locations: ${locations.length}`);
console.log(`- Properties: ${properties.length}`);
console.log(`- Guides: ${guides.length}`);
console.log(`- Reviews: ${reviews.length}`);

// 1. Duplicate Slug Detection across ALL entities
const seenSlugs = new Map();
function checkSlug(slug, entityType, id) {
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    console.error(`FAIL: Missing slug in ${entityType} [${id}]`);
    hasErrors = true;
    return;
  }
  if (seenSlugs.has(slug)) {
    console.error(`FAIL: Duplicate slug detected: "${slug}" in ${entityType} [${id}] (previously in ${seenSlugs.get(slug)})`);
    hasErrors = true;
  } else {
    seenSlugs.set(slug, `${entityType} [${id}]`);
  }
}

// 2. Duplicate Primary Keyword Detection across ALL entities
const seenKeywords = new Map();
function checkKeyword(keyword, entityType, id) {
  if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
    console.error(`FAIL: Missing primary keyword in ${entityType} [${id}]`);
    hasErrors = true;
    return;
  }
  const normalized = keyword.toLowerCase().trim();
  if (seenKeywords.has(normalized)) {
    console.error(`FAIL: Duplicate primary keyword detected: "${keyword}" in ${entityType} [${id}] (previously in ${seenKeywords.get(normalized)})`);
    hasErrors = true;
  } else {
    seenKeywords.set(normalized, `${entityType} [${id}]`);
  }
}

// 3. SEO Meta Length Verifier (Strict 50-60 title, 140-160 description)
function checkSeoMeta(entityType, id, title, desc) {
  if (!title || title.length < 50 || title.length > 60) {
    console.error(`FAIL: SEO Title length out of bounds (50-60 required): ${title ? title.length : 0} chars in ${entityType} [${id}] -> "${title}"`);
    hasErrors = true;
  }
  if (!desc || desc.length < 140 || desc.length > 160) {
    console.error(`FAIL: SEO Description length out of bounds (140-160 required): ${desc ? desc.length : 0} chars in ${entityType} [${id}] -> "${desc}"`);
    hasErrors = true;
  }
}

// Validate Regions
const validRegionIds = new Set(regions.map(r => r.id));
for (const r of regions) {
  checkSlug(r.slug, 'Region', r.id);
  checkKeyword(r.primaryKeyword, 'Region', r.id);
  checkSeoMeta('Region', r.id, r.seoTitle, r.seoDescription);
  if (!r.name || !r.state || typeof r.weight !== 'number') {
    console.error(`FAIL: Missing core attributes in Region [${r.id}]`);
    hasErrors = true;
  }
}

// Validate Locations
const validLocationIds = new Set(locations.map(l => l.id));
for (const l of locations) {
  checkSlug(l.slug, 'Location', l.id);
  checkKeyword(l.primaryKeyword, 'Location', l.id);
  checkSeoMeta('Location', l.id, l.seoTitle, l.seoDescription);
  if (!validRegionIds.has(l.regionId)) {
    console.error(`FAIL: Invalid regionId "${l.regionId}" in Location [${l.id}]`);
    hasErrors = true;
  }
  if (!l.altitudeFt || !l.coordinates || !l.howToReach || l.howToReach.length === 0) {
    console.error(`FAIL: Missing geographic / transit info in Location [${l.id}]`);
    hasErrors = true;
  }
}

// Validate Properties
const validPropertyIds = new Set(properties.map(p => p.id));
for (const p of properties) {
  checkSlug(p.slug, 'Property', p.id);
  checkKeyword(p.primaryKeyword, 'Property', p.id);
  checkSeoMeta('Property', p.id, p.seoTitle, p.seoDescription);
  if (!validRegionIds.has(p.regionId)) {
    console.error(`FAIL: Invalid regionId "${p.regionId}" in Property [${p.id}]`);
    hasErrors = true;
  }
  if (!validLocationIds.has(p.locationId)) {
    console.error(`FAIL: Invalid locationId "${p.locationId}" in Property [${p.id}]`);
    hasErrors = true;
  }
  if (!p.fullAddress || !p.fullAddress.street || !p.coordinates || !p.phone) {
    console.error(`FAIL: Missing full address or coordinates in Property [${p.id}]`);
    hasErrors = true;
  }
  if (!p.priceRange || typeof p.priceRange.min !== 'number' || typeof p.priceRange.max !== 'number') {
    console.error(`FAIL: Invalid priceRange in Property [${p.id}]`);
    hasErrors = true;
  }
}

// Validate Guides
for (const g of guides) {
  checkSlug(g.slug, 'Guide', g.id);
  checkKeyword(g.primaryKeyword, 'Guide', g.id);
  checkSeoMeta('Guide', g.id, g.seoTitle, g.seoDescription);
  if (!validRegionIds.has(g.regionId)) {
    console.error(`FAIL: Invalid regionId "${g.regionId}" in Guide [${g.id}]`);
    hasErrors = true;
  }
  if (!validLocationIds.has(g.locationId)) {
    console.error(`FAIL: Invalid locationId "${g.locationId}" in Guide [${g.id}]`);
    hasErrors = true;
  }
  if (!g.sections || g.sections.length === 0 || !g.lastReviewed) {
    console.error(`FAIL: Missing sections or lastReviewed in Guide [${g.id}]`);
    hasErrors = true;
  }
}

// Validate Reviews
for (const rv of reviews) {
  if (!validPropertyIds.has(rv.propertyId)) {
    console.error(`FAIL: Review [${rv.id}] references invalid propertyId "${rv.propertyId}"`);
    hasErrors = true;
  }
  if (!rv.author || !rv.rating || !rv.quote) {
    console.error(`FAIL: Missing author, rating, or quote in Review [${rv.id}]`);
    hasErrors = true;
  }
}

// Regional Isolation Check: Ensure Himachal and Munnar entities are strictly isolated
for (const p of properties) {
  const loc = locations.find(l => l.id === p.locationId);
  if (loc && loc.regionId !== p.regionId) {
    console.error(`FAIL: Cross-regional contamination: Property [${p.id}] in region "${p.regionId}" assigned to location in region "${loc.regionId}"`);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\n>>> DATA LAYER VALIDATION FAILED <<<');
  process.exit(1);
} else {
  console.log('\n>>> DATA LAYER VALIDATION PASSED (0 ERRORS, 0 DUPLICATES) <<<');
  process.exit(0);
}
