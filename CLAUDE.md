# Viktor's Portfolio & Blog

Personal portfolio and blog at viktorvansteenweghen.com.

## Tech Stack

- React 18 + TypeScript (strict) + Vite 5
- Tailwind CSS 3 + shadcn/ui (Radix primitives, CVA, tailwind-merge)
- React Router DOM 6 (client-side SPA routing)
- React Helmet Async for per-page meta/SEO
- Sharp for image optimization scripts
- Deployed to Hetzner via GitHub Actions (rsync over SSH to /var/www/blog/)

## Project Structure

```
src/
  components/       # Reusable UI components
  components/ui/    # shadcn/ui primitives — don't modify directly
  hooks/            # Custom hooks (useBlogPosts, useBlogPost, useProfile, useFocusTrap)
  pages/            # Route-level components (Portfolio, Home/blog listing, BlogPostDetail)
  services/         # Data layer with interfaces (currently mock data, no backend yet)
  types/            # TypeScript interfaces (BlogPost, ProfileInfo)
  utils/            # Helpers (formatDate)
  lib/              # shadcn utility (cn)
scripts/            # Image optimization (convert-images.mjs, resize-images.mjs)
public/             # Static assets, sitemap.xml, robots.txt
.github/agents/     # AI agent instructions (json-LD.agent.md)
.github/workflows/  # CI/CD (deploy.yml)
```

## Routes

- `/` — Portfolio page (default)
- `/blogs` — Blog listing
- `/post/:postId` — Blog post detail
- `/portfolio` — Redirects to `/`
- `*` — Redirects to `/`

## Coding Conventions

- **Components**: PascalCase, functional, hooks-first, named exports
- **Path aliases**: `@/*` maps to `src/*`
- **Styling**: Tailwind utility-first, HSL CSS variables for theming, mobile-first responsive (`md:`, `lg:`)
- **TypeScript**: Strict mode, `noUnusedLocals`, `noUnusedParameters` enabled
- **Imports**: React/external first, then components, hooks, utils, types
- **Service layer**: Interface-driven (`IBlogService`, `IProfileService`) — data is mock for now

## Commit Messages

Follow the pattern visible in git history. Use conventional-ish style:

- `fix: description` for bug fixes
- `feat: description` for new features
- `refactor: description` for restructuring
- Descriptive subject, optional longer body for context

## SEO & Structured Data

This is a high-priority area. When modifying pages:

1. **JSON-LD**: Follow `.github/agents/json-LD.agent.md` strictly. Uses `@graph` pattern with stable entity IDs (`#viktor`, `#website`, `#webpage`, `#article`, `#blog`)
2. **SEO component**: Every page uses `<SEO>` from `src/components/SEO.tsx` with title, description, canonicalUrl, ogImage, structuredData
3. **Sitemap**: Update `public/sitemap.xml` when adding new pages/routes
4. **Lighthouse**: Keep scores high — watch LCP and CLS especially

## Accessibility

Non-negotiable on every change:

- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<article>`, `<section>`)
- ARIA labels on interactive elements
- Keyboard navigation support
- Skip-to-content link and route announcer already implemented
- Proper heading hierarchy (h1 > h2 > h3)
- Alt text on all images

## Build & Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (esbuild minify, drops console/debugger)
- `npm run lint` — ESLint
- `npm run preview` — Preview production build
- `node scripts/convert-images.mjs` — Convert images to WebP
- `node scripts/resize-images.mjs` — Resize images to display dimensions

## Important Notes

- Production build drops all `console.*` and `debugger` statements via esbuild
- React vendor chunk is manually split (react, react-dom, react-router-dom)
- Images should be WebP format, optimized for display size
- No backend/API exists yet — services use in-memory mock data
- No test framework is configured yet
- No Prettier configured — match existing formatting when editing files
