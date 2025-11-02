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
        const destPath = path.join(destImagesDir, filename);
        await copyIfExists(srcPath, destPath);
      }
    }
    console.log('Done copying team images.');
  } catch (err) {
    console.error('Error copying team images:', err);
    process.exit(1);
  }
}

main();
