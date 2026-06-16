import { experiences as allExperiences } from '../data/experiences'
import { SectionTitle } from './SectionTitle'
import { BulletText } from './BulletText'

function ExperienceEntry({ exp, isLast }) {
  return (
    <div className={`grid grid-cols-[160px_1fr] gap-[26px] max-sm:grid-cols-1 max-sm:gap-2 ${!isLast ? 'pb-[30px] mb-[30px] border-b border-rule dark:border-zinc-800' : ''}`}>
      <div className="text-[13.5px] text-muted dark:text-zinc-500 pt-0.5 max-sm:pt-0">
        <span className="inline-flex mb-2 px-[9px] py-[3px] rounded-full bg-paper-2 dark:bg-zinc-900 border border-rule dark:border-zinc-800 font-semibold text-xs text-accent dark:text-zinc-400 tracking-[0.5px] whitespace-nowrap">
          {exp.period}
        </span>
        <br />
        <span className="text-muted dark:text-zinc-500">{exp.role}</span>
      </div>
      <div>
        <p className="font-semibold text-[20px] mb-0.5 leading-[1.2] text-ink dark:text-zinc-100">{exp.company}</p>
        <p className="text-[14px] text-muted dark:text-zinc-500 mb-3">{exp.location}</p>
        {exp.client && (
          <span className="inline-block text-xs font-semibold text-link dark:text-blue-400 bg-[#eef3f9] dark:bg-blue-950 border border-[#c6d7eb] dark:border-blue-900 px-2 py-0.5 rounded mb-[10px]">
            Client: {exp.client}
          </span>
        )}
        {exp.description && (
          <p className="mt-2 text-ink-soft dark:text-zinc-300 leading-[1.6]">{exp.description}</p>
        )}
        <ul className="mt-[10px] pl-[18px] list-disc space-y-2">
          {exp.bullets.map((bullet, i) => (
            <li key={i} className="text-ink-soft dark:text-zinc-300">
              <BulletText text={bullet} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ExperienceSection({ experienceIds }) {
  const filtered = experienceIds
    .map(id => allExperiences.find(e => e.id === id))
    .filter(Boolean)

  return (
    <section className="my-[34px]">
      <SectionTitle>Experience</SectionTitle>
      {filtered.map((exp, i) => (
        <ExperienceEntry key={exp.id} exp={exp} isLast={i === filtered.length - 1} />
      ))}
    </section>
  )
}
