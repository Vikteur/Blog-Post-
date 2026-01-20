import sharp from 'sharp';
import { join, basename, extname } from 'path';

const publicDir = './public';

// Image resize configurations based on actual display sizes
// Using 2x for retina displays
const imageConfigs = [
  {
    input: 'Zelfportret.webp',
    // Avatar displayed at 192x192, resize to 384x384 for 2x retina
    width: 384,
    height: 384,
    fit: 'cover'
  },
  {
    input: 'edezwe.webp',
    // Project images displayed at h-48 (192px height), resize height to 384px for 2x
    height: 384,
    fit: 'inside'
  },
  {
    input: 'mijngezondheid.webp',
    // Project images displayed at h-48 (192px height), resize height to 384px for 2x
    height: 384,
    fit: 'inside'
  }
];

async function resizeImages() {
  for (const config of imageConfigs) {
    const inputPath = join(publicDir, config.input);
    const name = basename(config.input, extname(config.input));
    const outputPath = join(publicDir, `${name}-optimized.webp`);

    console.log(`Resizing ${config.input}...`);

    const originalMeta = await sharp(inputPath).metadata();
    console.log(`  Original: ${originalMeta.width}x${originalMeta.height}`);

    const resizeOptions = {};
    if (config.width) resizeOptions.width = config.width;
    if (config.height) resizeOptions.height = config.height;
    if (config.fit) resizeOptions.fit = config.fit;

    await sharp(inputPath)
      .resize(resizeOptions)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const newMeta = await sharp(outputPath).metadata();
    const { stat } = await import('fs/promises');
    const origStat = await stat(inputPath);
    const newStat = await stat(outputPath);

    console.log(`  Resized: ${newMeta.width}x${newMeta.height}`);
    console.log(`  Size: ${(origStat.size / 1024).toFixed(1)} KB -> ${(newStat.size / 1024).toFixed(1)} KB`);
    console.log(`  Output: ${outputPath}`);
  }

  console.log('\nResize complete! Now rename the -optimized files to replace originals.');
}

resizeImages().catch(console.error);
