import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const WEBP_QUALITY = 82;

const IMAGE_JOBS = [
  { src: 'images/work/Pepsi_03.jpg' },
  { src: 'images/work/Motherland_02.jpg' },
  { src: 'images/work/Piratas_02.jpg' },
  { src: 'images/work/The_Lion_king_01.jpg' },
  { src: 'images/work/Kombucha.jpg' },
  { src: 'images/work/Lays_01.jpg' },
  { src: 'images/work/Avatar_The_Last_Airbender_02.jpg' },
  { src: 'images/work/Godzilla_01.jpg' },
  { src: 'images/work/The_Umbrella_Academy.jpg' },
  { src: 'fx-before.png' },
  { src: 'fx-after.png' },
];

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function convertToWebP(src) {
  const srcPath = join(publicDir, src);
  const dir = srcPath.replace(/[^\\/]+$/, '');
  const name = basename(src, extname(src));
  const destPath = join(dir, `${name}.webp`);

  const beforeStat = await stat(srcPath).catch(() => null);
  if (!beforeStat) {
    console.log(`  SKIP  ${src} (file not found)`);
    return;
  }

  await sharp(srcPath).webp({ quality: WEBP_QUALITY }).toFile(destPath);

  const afterStat = await stat(destPath);
  const saved = ((1 - afterStat.size / beforeStat.size) * 100).toFixed(1);
  const arrow = `${formatKB(beforeStat.size)} → ${formatKB(afterStat.size)}`;
  console.log(`  OK    ${src.padEnd(50)} ${arrow}  (−${saved}%)`);
}

async function main() {
  console.log('\n=== optimize-assets ===\n');
  for (const job of IMAGE_JOBS) {
    await convertToWebP(job.src);
  }
  console.log('\nDone. Update content.ts references to .webp before running the dev server.');
}

main().catch(console.error);
