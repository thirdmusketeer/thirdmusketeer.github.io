export function SectionTitle({ children }) {
  return (
    <h2 className="uppercase tracking-[0.18em] text-xs font-semibold text-accent dark:text-zinc-400 mb-[26px] flex items-center gap-[14px]">
      {children}
      <span className="flex-1 h-px bg-rule dark:bg-zinc-800" />
    </h2>
  )
}
