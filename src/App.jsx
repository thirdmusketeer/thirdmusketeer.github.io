import { useVariant } from './hooks/useVariant'
import { useTheme } from './hooks/useTheme'
import { ThemeToggle } from './components/ThemeToggle'
import { Header } from './components/Header'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { ExpertiseSection } from './components/ExpertiseSection'
import { Footer } from './components/Footer'
import { ResumePDF } from './components/ResumePDF'

export default function App() {
  const [dark, setDark] = useTheme()
  const variant = useVariant()

  // PDF export mode
  const isPDF = new URLSearchParams(window.location.search).get('export') === 'pdf'
  if (isPDF) {
    return <ResumePDF variant={variant} />
  }

  return (
    <div className="bg-paper dark:bg-zinc-950 text-ink dark:text-zinc-100 font-sans text-[16.5px] leading-[1.65] body-gradient transition-colors duration-300 min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <a
          href="/?export=pdf"
          target="_blank"
          rel="noopener"
          aria-label="Export PDF"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-paper-2 dark:bg-zinc-800 border border-rule dark:border-zinc-700 text-ink-soft dark:text-zinc-400 hover:bg-rule dark:hover:bg-zinc-700 transition-colors duration-200 shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </a>
        <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      </div>
      <div className="max-w-[940px] mx-auto px-7">
        <Header meta={variant.meta} />
        <ExperienceSection experienceIds={variant.experiences} />
        {variant.sections.skills && <SkillsSection />}
        {variant.sections.expertise && <ExpertiseSection />}
        <Footer meta={variant.meta} />
      </div>
    </div>
  )
}
