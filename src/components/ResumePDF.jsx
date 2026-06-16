import { experiences } from '../data/experiences'
import { skills } from '../data/skills'
import { expertise } from '../data/expertise'

// Inline bullet parser (no import needed — keeps the PDF self-contained)
function BulletText({ text }) {
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  const parts = []
  let last = 0, match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[1]) parts.push(<strong key={match.index}>{match[1]}</strong>)
    else parts.push(<span key={match.index}>{match[2]}</span>)
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

export function ResumePDF({ variant }) {
  const filteredExperiences = variant.experiences
    .map(id => experiences.find(e => e.id === id))
    .filter(Boolean)

  const m = variant.meta

  // Auto-print if ?print=1
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('print') === '1') {
    setTimeout(() => window.print(), 500)
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f0f0f0; }

        .resume-wrap {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 9.5pt;
          line-height: 1.45;
          color: #1a1c20;
        }

        .resume-inner {
          padding: 14mm 14mm 12mm;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Header */
        .r-header {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 2px solid #3d5a80;
        }
        .r-name {
          font-size: 22pt;
          font-weight: 700;
          color: #1a1c20;
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .r-tagline {
          font-size: 9.5pt;
          color: #3f444c;
          margin-bottom: 5px;
        }
        .r-contact {
          font-size: 8.5pt;
          color: #6b7689;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .r-contact a { color: #3d5a80; text-decoration: none; }

        /* Body: two columns */
        .r-body {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-top: 10px;
        }
        .r-left { flex: 0 0 62%; }
        .r-right { flex: 1; }

        /* Section */
        .r-section { margin-bottom: 12px; }
        .r-section-title {
          font-size: 7.5pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #3d5a80;
          margin-bottom: 7px;
          padding-bottom: 3px;
          border-bottom: 1px solid #e3e5e9;
        }

        /* Experience entry */
        .r-entry { margin-bottom: 9px; }
        .r-entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 1px;
        }
        .r-company { font-weight: 700; font-size: 10pt; color: #1a1c20; }
        .r-period { font-size: 8pt; color: #8b9099; white-space: nowrap; }
        .r-role { font-size: 8.5pt; color: #3f444c; font-style: italic; margin-bottom: 2px; }
        .r-location { font-size: 8pt; color: #8b9099; margin-bottom: 2px; }
        .r-client {
          display: inline-block;
          font-size: 7.5pt;
          font-weight: 600;
          color: #3d5a80;
          background: #eef3f9;
          border: 1px solid #c6d7eb;
          padding: 1px 6px;
          border-radius: 3px;
          margin-bottom: 4px;
        }
        .r-desc { font-size: 8.5pt; color: #6b7689; font-style: italic; margin-bottom: 4px; }
        .r-bullets { padding-left: 13px; margin-top: 3px; }
        .r-bullets li {
          font-size: 8.5pt;
          color: #3f444c;
          margin-bottom: 2.5px;
          line-height: 1.4;
        }
        .r-bullets li strong { color: #1a1c20; font-weight: 600; }

        /* Right column */
        .r-skill-group { margin-bottom: 10px; }
        .r-skill-cat {
          font-size: 8pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #4a5568;
          margin-bottom: 3px;
        }
        .r-skill-list { list-style: none; }
        .r-skill-list li {
          font-size: 8.5pt;
          color: #3f444c;
          padding: 1.5px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .r-skill-list li:last-child { border-bottom: none; }

        .r-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px; }
        .r-tag {
          font-size: 7.5pt;
          padding: 2px 7px;
          border-radius: 999px;
          background: #f3f4f6;
          border: 1px solid #e3e5e9;
          color: #3f444c;
        }

        /* Download button - hidden on print */
        .r-download-btn {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 100;
          background: #3d5a80;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 2px 8px rgba(61,90,128,0.3);
          display: flex;
          align-items: center;
          gap: 7px;
          transition: background 0.15s;
        }
        .r-download-btn:hover { background: #2d4a6e; }

        /* Back link */
        .r-back-link {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 100;
          color: #3d5a80;
          font-size: 13px;
          font-family: inherit;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 5px;
          background: #fff;
          border: 1px solid #e3e5e9;
          padding: 8px 14px;
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .r-back-link:hover { background: #f3f4f6; }

        @media print {
          body { background: #fff; }
          .r-download-btn { display: none !important; }
          .r-back-link { display: none !important; }
          .resume-wrap { width: 100%; margin: 0; box-shadow: none; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      {/* Fixed UI buttons */}
      <a href="/" className="r-back-link">← Back</a>
      <button className="r-download-btn" onClick={() => window.print()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download PDF
      </button>

      <div className="resume-wrap">
        <div className="resume-inner">

          {/* Header */}
          <div className="r-header">
            <div className="r-name">{m.name}</div>
            <div className="r-tagline">{m.tagline}</div>
            <div className="r-contact">
              <span>{m.location}</span>
              <a href={`mailto:${m.social.email}`}>{m.social.email}</a>
              <a href={m.social.linkedin}>linkedin.com/in/thirdmusketeer</a>
              <a href={m.social.github}>github.com/thirdmusketeer</a>
            </div>
          </div>

          {/* Two-column body */}
          <div className="r-body">

            {/* LEFT: Experience */}
            <div className="r-left">
              <div className="r-section">
                <div className="r-section-title">Experience</div>
                {filteredExperiences.map(exp => (
                  <div key={exp.id} className="r-entry">
                    <div className="r-entry-header">
                      <span className="r-company">{exp.company}</span>
                      <span className="r-period">{exp.period}</span>
                    </div>
                    <div className="r-role">{exp.role}</div>
                    <div className="r-location">{exp.location}</div>
                    {exp.client && <span className="r-client">Client: {exp.client}</span>}
                    {exp.description && <div className="r-desc">{exp.description}</div>}
                    <ul className="r-bullets">
                      {exp.bullets.map((b, i) => (
                        <li key={i}><BulletText text={b} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Summary + Skills + Expertise */}
            <div className="r-right">

              {/* Summary */}
              <div className="r-section">
                <div className="r-section-title">Summary</div>
                <p style={{fontSize:'8.5pt', color:'#3f444c', lineHeight:'1.5'}}>
                  {m.intro}
                </p>
              </div>

              {/* Skills */}
              <div className="r-section">
                <div className="r-section-title">Skills</div>
                {skills.map(group => (
                  <div key={group.category} className="r-skill-group">
                    <div className="r-skill-cat">{group.category}</div>
                    <ul className="r-skill-list">
                      {group.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Expertise */}
              <div className="r-section">
                <div className="r-section-title">Expertise</div>
                <div className="r-tags">
                  {expertise.map(tag => (
                    <span key={tag} className="r-tag">{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
