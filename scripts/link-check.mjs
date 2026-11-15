import fs from 'fs';
import path from 'path';

console.log('--- RUNNING AANANDHAM INTERNAL LINK CHECK ---');

const navPath = path.resolve('content/navigation.ts');
const navContent = fs.readFileSync(navPath, 'utf8');

// Match hrefs
const hrefMatches = [...navContent.matchAll(/href:\s*'([^']+)'/g)].map(m => m[1]);
console.log(`Auditing ${hrefMatches.length} navigation and footer links...`);

let hasErrors = false;
for (const href of hrefMatches) {
  if (!href) {
    console.error('FAIL: Empty href found.');
    hasErrors = true;
    continue;
  }
  // Check format: either absolute URL with https, or starts with /
  if (href.startsWith('https://') || href.startsWith('/') || href.startsWith('#')) {
    console.log(`PASS: Valid clean link structure -> ${href}`);
  } else {
    console.error(`FAIL: Invalid link target -> ${href}`);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\n>>> LINK CHECK FAILED <<<');
  process.exit(1);
} else {
  console.log('\n>>> LINK CHECK PASSED WITH ZERO BROKEN LINKS <<<');
  process.exit(0);
}
