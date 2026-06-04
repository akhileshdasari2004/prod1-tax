#!/usr/bin/env node
/**
 * Generates PNG brand assets from public/logo.svg (run: node scripts/generate-brand-assets.mjs).
 * Replace public/logo.svg with your logofa.st export and re-run.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const svg = join(root, 'public/logo.svg');

if (!existsSync(svg)) {
  console.error('Missing public/logo.svg');
  process.exit(1);
}

const sizes = [
  ['public/logo.png', 512],
  ['public/apple-touch-icon.png', 180],
  ['public/android-chrome-192x192.png', 192],
  ['public/android-chrome-512x512.png', 512],
];

for (const [out, size] of sizes) {
  const dest = join(root, out);
  execSync(
    `sips -z ${size} ${size} -s format png "${svg}" --out "${dest}"`,
    { stdio: 'inherit' },
  );
}

// Favicon ICO from 32px PNG
const fav32 = join(root, 'public/.favicon-32.png');
execSync(`sips -z 32 32 -s format png "${svg}" --out "${fav32}"`, { stdio: 'inherit' });
try {
  execSync(
    `sips -s format ico "${fav32}" --out "${join(root, 'public/favicon.ico')}"`,
    { stdio: 'inherit' },
  );
} catch {
  console.warn('ICO conversion skipped (sips may not support ico on this OS). Keep existing favicon.ico.');
}

console.log('Brand PNG assets generated.');
