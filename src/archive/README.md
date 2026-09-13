# Archive

Earlier designs that are **no longer rendered**. Nothing here is imported by
`src/App.tsx`, so none of it ships in the production bundle — Vite tree-shakes
unreferenced modules. It is kept because each file represents a design
iteration that may be worth revisiting.

Everything still compiles and is type-checked, so it will not silently rot.

## Sections

| File | Why it was retired |
|---|---|
| `HeroSection.tsx` | Original 3D-character hero |
| `IntroBannerSection.tsx` | Replaced by the two Claude Design heroes |
| `HeroDarkSection.tsx` | Design 3C, refined dark hero |
| `MarqueeSection.tsx` | Horizontal scrolling banner |
| `AboutSection.tsx` | Folded into the hero copy. **Broken**: references four icon images that are not in `public/` |
| `ServicesSection.tsx` | Design 4A paper grid, replaced by `DisciplinesSection` |
| `ServicesListSection.tsx` | Earlier list layout |
| `ProjectsSection.tsx` | Dark sticky-stacking projects, replaced by `ProjectsPaperSection` |
| `BeforeAfterSection.tsx` | Dark before/after, replaced by `BeforeAfterPaperSection` |

## Components

`AnimatedText`, `ContactButton`, `FloatingAccent`, `LiveProjectButton` are each
used by exactly one archived section. `Magnet` is referenced by nothing at all.

## Restoring one

1. Move the file to `src/components/sections/`.
2. Fix its import depth: `../../components/common/FadeIn` → `../common/FadeIn`.
3. Import and render it in `src/App.tsx`.

Assets some of these rely on are still in place:
`public/assets/images/hero-character.png` and `apple-logo.png`.
