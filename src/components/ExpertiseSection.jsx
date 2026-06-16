import { expertise } from '../data/expertise'
import { SectionTitle } from './SectionTitle'

export function ExpertiseSection() {
  return (
    <section className="my-[34px]">
      <SectionTitle>Areas of Expertise</SectionTitle>
      <div className="flex flex-wrap gap-[9px]">
        {expertise.map(tag => (
          <span key={tag} className="text-[13px] px-3 py-[5px] rounded-full bg-paper-2 dark:bg-zinc-900 border border-rule dark:border-zinc-800 text-ink-soft dark:text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
