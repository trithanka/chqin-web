# ChqIn — web

A local, runnable copy of the ChqIn landing page originally deployed as an
Emergent preview (`entrance-future.preview.emergentagent.com`).

## How this was obtained

The preview host ran a **Create React App dev server**, which served an
unminified `bundle.js` alongside `bundle.js.map`. That sourcemap contained
`sourcesContent` for every module, so all 17 application files are the
**original source, recovered verbatim** — not a reconstruction from rendered
HTML. The CSS was recovered the same way, from the sourcemap embedded in the
webpack `css-loader` module (which is why `index.css` still has its
`@tailwind` directives rather than compiled output).

**Binary assets are not in the sourcemap** and had to be fetched separately:
`public/mosaic/env-01…12.png` are 12 photos that `Business.jsx` tiles into a
140-cell scroll-zoom mosaic. They were downloaded straight from the preview
host. (They are actually JPEG data under a `.png` name — the source references
`.png`, so the names are kept as-is.)

Re-running this after further Emergent edits: wake the container, refetch
`/static/js/bundle.js.map`, re-extract, then diff the package list in the new
map against the old one to catch newly added libraries.

## Running

```bash
npm install
cp .env.example .env   # then edit if you have a backend
npm run dev            # http://localhost:3000
```

`npm run build` → `dist/`, `npm run preview` to serve it.

## What changed from the original

> [!IMPORTANT]
> **`src/` is no longer a pure copy.** `src/lib/indiaGeo.js` (generated) is a
> local addition, and `src/components/sections/Network.jsx` was edited to use
> it — see "Local changes" below. The refresh procedure deletes `src/` and
> re-extracts, so **that work is destroyed by the next re-copy** unless it is
> committed to git first, or rebuilt inside Emergent so it arrives via the
> sourcemap.

Apart from the local change noted above, the application source in `src/` is
the recovered original. The build scaffolding differs, because the original
project's config files were not in the bundle:

| File | Note |
| --- | --- |
| `vite.config.js` | Replaces CRA/CRACO. Keeps the `@/` → `src/` alias. |
| `tailwind.config.js` | **Reconstructed.** Not recoverable from the bundle; the shadcn-style token mapping and the `tailwindcss-animate` plugin were both derived from the original compiled stylesheet (which emits `.animate-in`, `--tw-enter-opacity`, `@keyframes enter` — proof the plugin is in their config, and `components/ui/dialog.jsx` depends on it). |
| `postcss.config.js` | Standard Vite equivalent. |
| `index.html` | Vite equivalent of the CRA template. Emergent's analytics/preview scripts (PostHog, `emergent-main.js`, visual-edit overlay) were dropped. `<title>` and `<meta description>` were changed from the Emergent defaults (`Emergent \| Fullstack App`) to ChqIn ones. |
| `src/App.jsx`, `src/index.jsx` | Renamed from `.js` — they contain JSX, which Vite's esbuild will not transform in a `.js` file. No content changed; imports use the `@/` alias so no import needed updating. |

`src/components/sections/Final.jsx` reads
`process.env.REACT_APP_BACKEND_URL`. Rather than edit the recovered source,
`vite.config.js` shims that expression via `define`, so the CRA-style env var
name still works.

## Local changes (not from Emergent)

**India map border in the Network section.** The 20 city nodes used to be
hand-placed on a 100×100 box to *approximate* India's shape, so a real outline
would not have lined up with them. Both now come from one projection:

- `src/lib/indiaGeo.js` — **generated, do not hand-edit.** Exports `INDIA_PATH`
  (the border) and `NODES` (the cities). Built from DataMeet's
  `india-composite.geojson`, which depicts India's full claimed boundary
  including J&K — the correct depiction for an Indian company, and the one that
  avoids a legal problem in India. Andaman & Nicobar are included.
- Projection: equirectangular with a cosine correction at mid-latitude
  (`x = lon·cos(21.9°)`, `y = −lat`), fitted into the 0..100 box with a
  **single** scale so the aspect ratio stays true. City lat/lon go through the
  exact same function — that is what makes them land inside the outline.
- Simplified with Douglas-Peucker at tolerance 0.08 (252k points → ~20KB path).
  Note a closed ring must be *opened* before simplifying: with
  `pts[0] === pts[n-1]` the baseline has zero length, every perpendicular
  distance computes as 0, and each ring collapses to two points.
- **Verified** by ray-casting every city against the simplified border: all 20
  inside. Tolerance 0.14 pushed the west coast inland past Kochi; 0.08 has
  margin.

`Network.jsx` imports these and renders the border behind the edges; its
`EDGES` array is index-based, so it stayed valid through the reposition. The
old faint-dot backdrop was removed — the real border replaces it. Cost: ~20KB
on the bundle.

To regenerate, the script is `genindia.mjs` (kept with the scratch artifacts,
not in the repo).

## Not included

The **backend is not part of this copy.** `Final.jsx` POSTs the waitlist form
to `${REACT_APP_BACKEND_URL}/api/waitlist`; the original Emergent deployment
had a FastAPI service behind it. Until you point `REACT_APP_BACKEND_URL` at
your own API, submitting the form shows the "Something went wrong" toast.
Everything else on the page is static and fully functional.

All imagery is hotlinked from Unsplash and Pexels — there are no local binary
assets, so nothing is missing.

## Verification

Rendered at 1440×900 and compared against the live original: both produce an
**8465px page height** and the same body text. All **296** Tailwind classes
used in the JSX resolve in the generated CSS — checked against the original
compiled stylesheet, zero gaps. All **144 images load, none broken**, no failed
requests. The only frame-to-frame differences are animation phase (the live
check-in counter ticking at a different value).

Verification artifacts — the original `bundle.js.map`, the original compiled
stylesheet, and comparison screenshots — are in `.reference/` (gitignored).
Keep them: the preview container sleeps and the sourcemap cannot be re-fetched
once it does.

## Stack

React 19, react-router-dom, Tailwind (+ `tailwindcss-animate`), framer-motion,
lenis (smooth scroll), lucide-react, sonner, axios, @tanstack/react-query,
`@radix-ui/react-dialog` with `clsx` + `tailwind-merge` (the shadcn `cn()`
helper in `src/lib/utils.js`).

React 19 (not 18) was confirmed from the sourcemap: the original bundle
references `react-dom/cjs/react-dom-client.development.js`, a file that only
exists in React 19.
