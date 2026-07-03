// Build-time prerender: emit a static HTML file per blog post with correct,
// per-article Open Graph / Twitter meta tags baked into <head>.
//
// Social crawlers (LinkedIn, Facebook, X, Slack, WhatsApp) do NOT run JavaScript,
// so the client-side react-helmet-async tags never reach them. This step gives
// each /post/:id its own static <head> so link previews show the article.
//
// Runs after `vite build` (see package.json). No runtime dependency beyond
// esbuild, which Vite already ships.

import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE = 'https://viktorvansteenweghen.com';

// --- load the posts straight from the TS source (single source of truth) ---
async function loadPosts() {
  const result = await build({
    entryPoints: [resolve(ROOT, 'src/services/BlogService.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  const url = 'data:text/javascript;base64,' + Buffer.from(code, 'utf8').toString('base64');
  const mod = await import(url);
  return mod.blogService.getPosts();
}

const escAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// replace the content="" of a <meta> identified by its property/name attribute
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`, 'i');
  return html.replace(re, `$1${escAttr(value)}$2`);
}

function ogImageFor(post) {
  if (!post.image) return `${SITE}/og-image.png`;
  // social platforms don't render SVG; prefer the rasterised twin
  const img = post.image.endsWith('.svg') ? post.image.replace(/\.svg$/, '.png') : post.image;
  return img.startsWith('http') ? img : SITE + img;
}

function renderPost(template, post) {
  const title = `${post.title} | Viktor Van Steenweghen`;
  const desc = post.summary;
  const url = `${SITE}/post/${post.id}`;
  const image = ogImageFor(post);

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escText(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/i, `$1${escAttr(url)}$2`);
  html = setMeta(html, 'name', 'title', title);
  html = setMeta(html, 'name', 'description', desc);
  html = setMeta(html, 'property', 'og:type', 'article');
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', desc);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'twitter:url', url);
  html = setMeta(html, 'property', 'twitter:title', title);
  html = setMeta(html, 'property', 'twitter:description', desc);
  html = setMeta(html, 'property', 'twitter:image', image);
  return html;
}

async function main() {
  const distIndex = resolve(ROOT, 'dist/index.html');
  const template = await readFile(distIndex, 'utf8');
  const posts = await loadPosts();

  let count = 0;
  for (const post of posts) {
    const outDir = resolve(ROOT, 'dist/post', String(post.id));
    await mkdir(outDir, { recursive: true });
    await writeFile(resolve(outDir, 'index.html'), renderPost(template, post), 'utf8');
    count++;
  }
  console.log(`prerender: wrote ${count} post page(s) with per-article OG tags`);
}

main().catch((err) => {
  console.error('prerender failed:', err);
  process.exit(1);
});
