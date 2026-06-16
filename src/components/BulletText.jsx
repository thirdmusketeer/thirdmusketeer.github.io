export function BulletText({ text }) {
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  const parts = []
  let last = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[1]) {
      parts.push(
        <strong key={match.index} className="text-ink dark:text-zinc-100 font-semibold">
          {match[1]}
        </strong>
      )
    } else {
      parts.push(
        <a key={match.index} href={match[3]} target="_blank" rel="noopener">
          {match[2]}
        </a>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))

  return <>{parts}</>
}
