# CLAUDE.md

Guidance for AI coding agents working in this repository.

## Project

Company website for **Somincola LLC** (https://somincola.com) — an independent software studio.
Static site built with **Astro** + **Tailwind CSS 3**, deployed on **Cloudflare Pages** (the `functions/` folder holds
Pages Functions).

## Commands

| Command           | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Dev server at localhost:4321                    |
| `npm run build`   | Build to `./dist/`                              |
| `npm run preview` | Preview the production build                    |
| `npm run check`   | Astro type check + ESLint + Prettier (CI gate)  |
| `npm run fix`     | Auto-fix ESLint issues and format with Prettier |

## Structure

```
src/
├── site.ts             # Single source of truth: company info, nav, products
├── styles/global.css   # Design tokens (CSS variables, light/dark) + component classes
├── layouts/
│   ├── Base.astro      # <head>, SEO, header/footer, scroll-reveal script
│   └── Legal.astro     # Layout for markdown legal pages
├── components/         # Seo, Header, Footer, Logo, PageHero, home/* illustrations
└── pages/              # index, about, contact, privacy.md, terms.md, 404
functions/api/contact.ts  # Cloudflare Pages Function: contact form → Resend
public/                   # favicons, og.png, robots.txt, _headers, _redirects
```

## Design system

- Colors are RGB triplets in CSS variables (`--paper`, `--surface`, `--ink`, `--muted`, `--accent`) and switch
  automatically with `prefers-color-scheme`. Use Tailwind tokens `bg-paper`, `text-ink`, `text-muted`, `border-line`,
  `text-accent` — never hard-coded grays.
- Type: Instrument Serif (`.display`, headings) + Inter Variable (body) + system mono (`.eyebrow` labels).
- Reusable classes: `.container-site`, `.eyebrow`, `.display`, `.btn-primary`, `.btn-ghost`, `.link-underline`.
- Add `data-reveal` to an element for a subtle scroll-in animation (respects reduced motion; visible without JS).

## SEO

- Every page passes `title` / `description` (and optional `jsonLd`) to `Base.astro`; `Seo.astro` renders canonical,
  Open Graph, Twitter and JSON-LD tags. Organization schema lives on the home page.
- `build.format: 'file'` + `trailingSlash: 'never'` keep URLs clean (`/about`) on Cloudflare Pages.
- Legacy URLs are 301-redirected in `public/_redirects`.

## Contact form

`POST /api/contact` (JSON `{ name, email, message, company }`; `company` is a honeypot). Requires Cloudflare Pages env
vars `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
