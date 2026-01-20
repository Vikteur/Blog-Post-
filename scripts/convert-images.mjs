import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const publicDir = './public';
const imageExtensions = ['.jpg', '.jpeg', '.png'];

async function convertImages() {
  const files = await readdir(publicDir);

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) continue;

    const inputPath = join(publicDir, file);
    const outputPath = join(publicDir, basename(file, ext) + '.webp');

    console.log(`Converting ${file} to WebP...`);

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    const inputSize = (await sharp(inputPath).metadata()).size;
    const outputSize = (await sharp(outputPath).metadata()).size;

    console.log(`  ${file}: Done`);
  }

  console.log('\nConversion complete!');
}

convertImages().catch(console.error);
