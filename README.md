# Portfolio

Personal portfolio for Manab Jyoti Gogoi — iOS engineer & UI/UX designer.
Single-page site, no router.

## Stack

| | |
|---|---|
| Build | Vite 5 |
| UI | React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion 12 |
| Icons | lucide-react |
| Fonts | Google Fonts, loaded in `index.html` |

## Commands

```bash
npm install
npm run dev      # dev server on :5174
npm run build    # tsc && vite build -> dist/
npm run preview  # serve the production build
```

## Structure

```
public/
  assets/
    images/            profile photo, archived hero art
    logos/             company logos for the experience section
src/
  components/
    common/            shared UI (FadeIn reveal wrapper)
    sections/          the six sections that make up the page
  data/                all content — edit these, not the components
  styles/globals.css   Tailwind entry + keyframes + shared classes
  archive/             retired designs, not rendered (see its README)
  App.tsx              section order
  main.tsx             React entry
```

## Editing content

Copy, links and lists live in `src/data/` so you rarely need to touch a
component:

| File | Contains |
|---|---|
| `site.ts` | Email, LinkedIn, nav, hero stats, badge, footer socials |
| `experience.ts` | Roles, dates, logos |
| `disciplines.ts` | The five "What I bring to the table" cards |
| `projects.ts` | Selected work |
| `caseStudies.ts` | Before/after UI fixes |
| `theme.ts` | Colour tokens |

### Adding images

Drop files in `public/assets/images/projects/` and set the `src` / `before` /
`after` / `logo` field in the matching data file. A `null` renders a labelled
placeholder slot instead, so the layout never breaks while art is pending.

Reference them by absolute path from the public root, e.g.
`/assets/images/projects/spendwise-home.png`.

## Sections

`HeroEditorial` → `Experience` → `Disciplines` → `ProjectsPaper` →
`BeforeAfterPaper` → `Contact`

Each section owns its own background and spacing; there is no layout wrapper.
The paper sheets overlap the section above using a negative top margin plus
`relative z-10`, which is what produces the stacked-paper effect.

## Known placeholders

- `EMAIL` in `data/site.ts` is not a real address.
- GitHub / Dribbble footer links are `#`.
- The hero's third stat (`India / IST`) needs a real city.
- Hero says "3+ years" while the experience section computes "4+".
- `index.html` points at `/vite.svg`, which does not exist — the favicon 404s.
- The page title is still `Jack -- 3D Creator`.
