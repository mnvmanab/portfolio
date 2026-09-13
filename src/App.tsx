import HeroEditorialSection from './components/sections/HeroEditorialSection'
import ExperienceSection from './components/sections/ExperienceSection'
import DisciplinesSection from './components/sections/DisciplinesSection'
import ProjectsPaperSection from './components/sections/ProjectsPaperSection'
import BeforeAfterPaperSection from './components/sections/BeforeAfterPaperSection'
import ContactSection from './components/sections/ContactSection'

/**
 * Single-page portfolio. Sections render in document order; each one owns its
 * own background, so there is no shared layout wrapper.
 *
 * Earlier designs that are no longer in the page live in src/archive/ —
 * see the README there for how to bring one back.
 */
export default function App() {
  // Every live section is paper now — a dark page background would only show
  // through on overscroll.
  return (
    <main className="bg-[#e9e7e2]" style={{ overflowX: 'clip' }}>
      <HeroEditorialSection />
      <ExperienceSection />
      <DisciplinesSection />
      <ProjectsPaperSection />
      <BeforeAfterPaperSection />
      <ContactSection />
    </main>
  )
}
