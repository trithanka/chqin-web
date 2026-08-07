# ChqIn — web

A local, runnable copy of the ChqIn landing page originally deployed as an
Emergent preview (`entrance-future.preview.emergentagent.com`).

## How this was obtained

The preview host ran a **Create React App dev server**, which served an
unminified `bundle.js` alongside `bundle.js.map`. That sourcemap contained
`sourcesContent` for every module, so all 14 application files are the
**original source, recovered verbatim** — not a reconstruction from rendered
HTML. The CSS was recovered the same way, from the sourcemap embedded in the
webpack `css-loader` module (which is why `index.css` still has its
`@tailwind` directives rather than compiled output).

## Running

```bash
npm install
cp .env.example .env   # then edit if you have a backend
npm run dev            # http://localhost:3000
```

`npm run build` → `dist/`, `npm run preview` to serve it.

## What changed from the original

The application source in `src/` is untouched. Only the build scaffolding
differs, because the original project's config files were not in the bundle:

| File | Note |
| --- | --- |
| `vite.config.js` | Replaces CRA/CRACO. Keeps the `@/` → `src/` alias. |
| `tailwind.config.js` | **Reconstructed.** Not recoverable from the bundle; the shadcn-style token mapping was derived from the original compiled stylesheet. |
| `postcss.config.js` | Standard Vite equivalent. |
| `index.html` | Vite equivalent of the CRA template. Emergent's analytics/preview scripts (PostHog, `emergent-main.js`, visual-edit overlay) were dropped. `<title>` and `<meta description>` were changed from the Emergent defaults (`Emergent \| Fullstack App`) to ChqIn ones. |
| `src/App.jsx`, `src/index.jsx` | Renamed from `.js` — they contain JSX, which Vite's esbuild will not transform in a `.js` file. No content changed; imports use the `@/` alias so no import needed updating. |

`src/components/sections/Final.jsx` reads
`process.env.REACT_APP_BACKEND_URL`. Rather than edit the recovered source,
`vite.config.js` shims that expression via `define`, so the CRA-style env var
name still works.

## Enhancements applied

Beyond the recovered original. Page height and layout are unchanged (verified
at 6379px, identical to the original).

**Accessibility / correctness**

- **Reduced motion is now fully honored.** The original disabled Lenis and
  three CSS animations but left every Framer Motion animation running,
  including four infinite loops. `<MotionConfig reducedMotion="user">` in
  `App.jsx` handles transforms globally, and the infinite opacity/scale loops
  in `Arrival`, `Experience` and `OneQR` are guarded with `useReducedMotion()`.
- **Nav links work.** All four previously pointed at `href="#top"`. They now
  target real sections, via `src/lib/scroll.js` — a Lenis-aware helper, since
  native anchors and `scrollIntoView` fight with Lenis's hijacked scrolling.
  `Developers` and `Pricing` were replaced with `Everywhere` and `Network`,
  because no such content exists on the page.
- **Waitlist form**: real `<label>`, `autoComplete`, `aria-invalid`, and an
  `aria-live` error region (errors were toast-only before). Success state is a
  `role="status"`. The submit button has an accessible name.
- **`QRGlyph` is `aria-hidden`.** It was `role="img" aria-label="ChqIn QR"` on
  a matrix its own comment calls "purely decorative" — screen readers were
  told about a QR code that cannot be scanned.
- **Error boundary + 404 route.** One throwing section used to blank the whole
  page, and any path other than `/` rendered nothing.

**Performance**

- `Final` is `React.lazy`-split, and it alone. It is the only carrier of
  `axios` + `sonner` (52KB / 20KB gz), and being the last section, the height
  correction when its chunk lands has nothing below it to push down.
  Splitting the other sections was tried and reverted: they are a few KB each,
  and a generic placeholder cannot predict a section's real height — Business
  runs 979px against a 900px fallback — which introduced a measured 79px
  mid-document layout shift. Verified: `scrollHeight` is 6379px from 250ms
  onward, identical before and after all chunks land.
- Vendor split into `react` and `motion` chunks for cache longevity.
- Initial JS dropped from **462KB / 148KB gz** to **419KB / 132KB gz**.
- All images have intrinsic `width`/`height` (no layout shift), `loading="lazy"`,
  `decoding="async"`, and meaningful or explicitly empty `alt`.
- `OneQR` preloads the next carousel frame — previously each image was fetched
  only when it became active, flashing on the first pass.

## Not included

The **backend is not part of this copy.** `Final.jsx` POSTs the waitlist form
to `${REACT_APP_BACKEND_URL}/api/waitlist`; the original Emergent deployment
had a FastAPI service behind it. Until you point `REACT_APP_BACKEND_URL` at
your own API, submitting the form shows the "Something went wrong" toast.
Everything else on the page is static and fully functional.

All imagery is hotlinked from Unsplash and Pexels — there are no local binary
assets, so nothing is missing.

## Verification

Rendered at 1440×900 and compared against the live original: both produce a
**6379px page height and byte-identical body text (652 chars)**. Every Tailwind
class used in the JSX resolves in the generated CSS. The only frame-to-frame
differences are animation phase (marquee offset, and which scene the OneQR
carousel is showing).

Verification artifacts — the original `bundle.js.map`, the original compiled
stylesheet, and comparison screenshots — are in `.reference/` (gitignored).
Keep them: the preview container sleeps and the sourcemap cannot be re-fetched
once it does.

## Stack

React 19, react-router-dom, Tailwind, framer-motion, lenis (smooth scroll),
lucide-react, sonner, axios, @tanstack/react-query.

React 19 (not 18) was confirmed from the sourcemap: the original bundle
references `react-dom/cjs/react-dom-client.development.js`, a file that only
exists in React 19.
