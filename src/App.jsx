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
      <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
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
