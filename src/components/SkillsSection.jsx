import { skills } from '../data/skills'
import { SectionTitle } from './SectionTitle'

export function SkillsSection() {
  return (
    <section className="my-[34px]">
      <SectionTitle>Skills &amp; Technologies</SectionTitle>
      <div className="grid grid-cols-3 gap-x-8 max-sm:grid-cols-2 max-[420px]:grid-cols-1">
        {skills.map(group => (
          <div key={group.category}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-accent dark:text-zinc-400 mb-[10px]">
              {group.category}
            </h4>
            <ul className="list-none flex flex-col gap-[6px]">
              {group.items.map(item => (
                <li key={item} className="text-[14.5px] text-ink-soft dark:text-zinc-300">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
