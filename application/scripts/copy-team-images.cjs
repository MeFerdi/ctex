#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const authorsPath = path.join(root, 'src', 'lib', 'data', 'authors.json');
const srcImagesDir = path.join(root, 'src', 'assets', 'images');
const destImagesDir = path.join(root, 'public', 'assets', 'images');

function ensureDir(dir) {
  return fs.promises.mkdir(dir, { recursive: true });
}

async function copyIfExists(src, dest) {
  try {
    await fs.promises.copyFile(src, dest);
    console.log('Copied', path.basename(src));
  } catch (err) {
    console.warn('Could not copy', src, '-', err.message);
  }
}

async function main() {
  try {
    await ensureDir(destImagesDir);
    const raw = await fs.promises.readFile(authorsPath, 'utf-8');
    const authors = JSON.parse(raw);
    for (const a of authors) {
      if (!a.image) continue;
      if (a.image.startsWith('/src/assets/images')) {
        const filename = path.basename(a.image);
        const srcPath = path.join(srcImagesDir, filename);
        // create a sanitized filename for the public folder: lowercase, replace
        // spaces and unsafe chars with dashes, keep extension
        const ext = path.extname(filename);
        const base = path.basename(filename, ext);
        const safeBase = base.replace(/[^a-z0-9._-]+/gi, '-').replace(/-+/g, '-').toLowerCase();
        const safeFilename = `${safeBase}${ext.toLowerCase()}`;
        const destPath = path.join(destImagesDir, safeFilename);
        try {
          await copyIfExists(srcPath, destPath);
          // also copy original name as a fallback (some pages may still request it)
          const destPathOrig = path.join(destImagesDir, filename);
          if (destPathOrig !== destPath) {
            await copyIfExists(srcPath, destPathOrig);
          }
          console.log(`Mapped ${filename} -> ${safeFilename}`);
        } catch (err) {
          console.warn('copy error for', filename, err && err.message);
        }
      }
    }
    console.log('Done copying team images.');
  } catch (err) {
    console.error('Error copying team images:', err);
    process.exit(1);
  }
}

main();
