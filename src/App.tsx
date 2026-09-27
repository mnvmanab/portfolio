import { useEffect, useState } from 'react'
import HeroEditorialSection from './components/sections/HeroEditorialSection'
import ExperienceSection from './components/sections/ExperienceSection'
import DisciplinesSection from './components/sections/DisciplinesSection'
import ProjectsPaperSection from './components/sections/ProjectsPaperSection'
// import BeforeAfterPaperSection from './components/sections/BeforeAfterPaperSection' // hidden for now
import ContactSection from './components/sections/ContactSection'
import TutorMePage from './pages/TutorMePage'

/**
 * Single-page portfolio with a tiny hash-based router for case studies.
 * `#/tutorme` → the Tutor Me case-study view; anything else → the portfolio.
 *
 * A dependency-free `useHashRoute` keeps this in sync with browser
 * back/forward and lets case-study URLs be shared and bookmarked.
 *
 * Earlier designs that are no longer in the page live in src/archive/ —
 * see the README there for how to bring one back.
 */

function useHashRoute() {
  const [hash, setHash] = useState(() =>
    typeof window === 'undefined' ? '' : window.location.hash
  )
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()

  // Case-study routes take over the whole viewport — the portfolio sections
  // below don't render, so their global styles can't leak in.
  if (hash === '#/tutorme') {
    return <TutorMePage />
  }

  // Every live section is paper now — a dark page background would only show
  // through on overscroll.
  return (
    <main className="bg-[#e9e7e2]" style={{ overflowX: 'clip' }}>
      <HeroEditorialSection />
      <ExperienceSection />
      <DisciplinesSection />
      <ProjectsPaperSection />
      {/* <BeforeAfterPaperSection /> */}
      <ContactSection />
    </main>
  )
}
