// Downloads the original photos from marcimetzger.com into client/public/images.
// Run on your own machine (Node 18+):  npm run images
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'client', 'public', 'images');
const BASE = 'https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e';

await fs.mkdir(outDir, { recursive: true });

async function save(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  await fs.writeFile(path.join(outDir, file), Buffer.from(await res.arrayBuffer()));
  console.log('saved', file);
}

// 1) Known images (full-size originals, no resize parameters)
await save(`${BASE}/mtn%20falls%20pond.jpg`, 'hero.jpg').catch((e) => console.warn(e.message));
await save(`${BASE}/photo-5db79f9.jpg`, 'marci.jpg').catch((e) => console.warn(e.message));

// 2) Every other image referenced on the live Home page
const html = await (await fetch('https://marcimetzger.com')).text();
const found = new Set();
for (const m of html.matchAll(/https?:\/\/img1\.wsimg\.com\/isteam\/ip\/[^"'\s)\\]+?\.(?:jpe?g|png|webp)/gi)) {
  // strip the "/:/rs=..." resize suffix to get the original file
  found.add(m[0].split('/:/')[0].replace(/&amp;/g, '&'));
}
const known = [`${BASE}/mtn%20falls%20pond.jpg`, `${BASE}/photo-5db79f9.jpg`];
const others = [...found].filter((u) => !known.includes(u));

let i = 1;
for (const url of others) {
  const ext = path.extname(new URL(url).pathname) || '.jpg';
  await save(url, `site-${String(i).padStart(2, '0')}${ext}`).catch((e) => console.warn(e.message));
  i++;
}

console.log(`\nDone. ${others.length} extra images saved as site-01, site-02, ...`);
console.log('Open client/src/data/images.js and point the listing, gallery and service slots at the files you want.');
