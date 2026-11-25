import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const outDir = path.resolve('deploy-infinityfree');
const SKIP_TOP_LEVEL = new Set(['papers', 'crops']);

if (!fs.existsSync(distDir)) {
  console.error('dist/ directory not found. Run `npm run build` first.');
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

function copyDirFiltered(src, dest, depth = 0) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (depth === 0 && SKIP_TOP_LEVEL.has(entry.name)) {
      continue;
    }
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirFiltered(srcPath, destPath, depth + 1);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirFiltered(distDir, outDir);

function folderStats(dir) {
  let bytes = 0;
  let files = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const s = folderStats(p);
      bytes += s.bytes;
      files += s.files;
    } else {
      bytes += fs.statSync(p).size;
      files += 1;
    }
  }
  return { bytes, files };
}

const { bytes, files } = folderStats(outDir);
console.log(
  `Prepared deploy-infinityfree/ (${files} files, ${(bytes / (1024 * 1024)).toFixed(2)} MB — papers/ & crops/ excluded for R2 CDN).`
);
