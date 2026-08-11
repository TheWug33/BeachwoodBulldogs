import { useState, useEffect } from 'react'
import crest from './assets/logo/bulldogs-crest.png'
import { players, coaches, schedule, standings, videos, teamInfo } from './data/players.js'
import { photos } from './data/photos.js'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'standings', label: 'Standings' },
  { id: 'roster', label: 'Roster' },
  { id: 'coaches', label: 'Coaches' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Training' },
]

export default function App() {
  const [active, setActive] = useState('home')

  return (
    <div className="app">
      <Ticker />
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand" onClick={() => setActive('home')}>
            <img src={crest} alt="Beachwood Bulldogs crest" className="crest" />
            <div className="brand-text">
              <span className="brand-eyebrow">Beachwood</span>
              <span className="brand-name">BULLDOGS</span>
            </div>
          </div>
          <nav className="ribbon-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`ribbon-tab ${active === s.id ? 'is-active' : ''}`}
                onClick={() => setActive(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {active === 'home' && <Home onNav={setActive} />}
        {active === 'schedule' && <Schedule />}
        {active === 'standings' && <Standings />}
        {active === 'roster' && <Roster />}
        {active === 'coaches' && <Coaches />}
        {active === 'photos' && <Photos />}
        {active === 'videos' && <Videos />}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <span className="brand-eyebrow">Beachwood Bulldogs</span>
            <p className="footer-fields">
              {teamInfo.fields.map((f) => `${f.name} — ${f.address}`).join(' · ')}
            </p>
          </div>
          <div className="footer-links">
            {teamInfo.storeUrl ? (
              <a href={teamInfo.storeUrl} target="_blank" rel="noreferrer">Team Store</a>
            ) : (
              <span className="muted">Team Store link — add in data</span>
            )}
            {teamInfo.instagramHandle ? (
              <a href={`https://instagram.com/${teamInfo.instagramHandle}`} target="_blank" rel="noreferrer">
                @{teamInfo.instagramHandle}
              </a>
            ) : (
              <span className="muted">Instagram — add handle in data</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}

// ESPN-style scrolling headline ticker — pulls from the schedule so it always
// reflects real data once the Sheet is connected.
function Ticker() {
  const items = schedule.length
    ? schedule.map((g) => `${g.result ? g.result + ' ' : 'UPCOMING '}vs ${g.opponent} — ${g.date}`)
    : ['Season schedule coming soon']
  const loop = [...items, ...items]
  return (
    <div className="ticker">
      <span className="ticker-tag">BULLDOGS</span>
      <div className="ticker-track">
        <div className="ticker-scroll">
          {loop.map((t, i) => (
            <span className="ticker-item" key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ n, children }) {
  return (
    <div className="section-label">
      <span className="section-n">{n}</span>
      <h2>{children}</h2>
    </div>
  )
}

function Home({ onNav }) {
  const next = schedule[0]
  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-crest-wrap">
          <img src={crest} alt="" className="hero-crest" />
        </div>
        <div>
          <h1 className="hero-title">Beachwood Bulldogs</h1>
          <p className="hero-sub">2026 Season</p>
        </div>
      </div>

      <div className="score-bug">
        <div className="score-bug-label">Next Match</div>
        <div className="score-bug-body">
          <div className="score-bug-team">
            <img src={crest} alt="" />
            <span>BULLDOGS</span>
          </div>
          <div className="score-bug-vs">
            <span className="vs">VS</span>
            <span className="score-bug-date">{next.date}{next.time && ` · ${next.time}`}</span>
          </div>
          <div className="score-bug-team">
            <span className="opponent-initial">{next.opponent?.[0] || '?'}</span>
            <span>{next.opponent}</span>
          </div>
        </div>
      </div>

      <div className="hero-actions">
        <button onClick={() => onNav('roster')}>Meet the Team</button>
        <button className="ghost" onClick={() => onNav('schedule')}>Full Schedule</button>
      </div>
    </section>
  )
}

function Schedule() {
  return (
    <section className="panel">
      <SectionLabel n="01">Schedule</SectionLabel>
      <table className="data-table">
        <thead>
          <tr><th>Date</th><th>Time</th><th>Opponent</th><th>Location</th><th>Result</th></tr>
        </thead>
        <tbody>
          {schedule.map((g, i) => (
            <tr key={i}>
              <td>{g.date}</td>
              <td>{g.time || '—'}</td>
              <td>{g.opponent}</td>
              <td>{g.location}</td>
              <td>{g.result ? <span className="pill">{g.result}</span> : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function Standings() {
  return (
    <section className="panel">
      <SectionLabel n="02">Standings</SectionLabel>
      <table className="data-table">
        <thead>
          <tr><th>Team</th><th>W</th><th>L</th><th>T</th><th>Pts</th></tr>
        </thead>
        <tbody>
          {standings.map((t, i) => (
            <tr key={i} className={t.team.includes('Bulldogs') ? 'is-us' : ''}>
              <td>{t.team}</td>
              <td>{t.w}</td>
              <td>{t.l}</td>
              <td>{t.t}</td>
              <td className="pts-col">{t.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function Roster() {
  return (
    <section className="panel">
      <SectionLabel n="03">Roster</SectionLabel>
      <div className="roster-grid">
        {players.map((p) => (
          <div className="player-card" key={p.number}>
            <img src={p.photo} alt={`${p.name} card`} />
            {p.bio && <p className="player-bio">{p.bio}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

function Coaches() {
  return (
    <section className="panel">
      <SectionLabel n="04">Coaches</SectionLabel>
      <div className="coach-grid">
        {coaches.map((c, i) => (
          <div className="coach-card" key={i}>
            <div className="coach-photo">{c.photo ? <img src={c.photo} alt={c.name} /> : <span>{c.name.split(' ').map(w => w[0]).join('')}</span>}</div>
            <div>
              <h3>{c.name}</h3>
              <span className="coach-role">{c.role}</span>
              <p>{c.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Photos() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e) => { if (e.key === 'Escape') setOpenIndex(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex])

  return (
    <section className="panel">
      <SectionLabel n="05">Team Photos</SectionLabel>
      <div className="photo-grid">
        {photos.map((p, i) => (
          <figure
            className="photo-card"
            key={i}
            onClick={() => setOpenIndex(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenIndex(i) }}
          >
            <img src={p.src} alt={p.caption} />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="muted" style={{ marginTop: '1.5rem' }}>
        More photos will drop in automatically once the "Photos" tab of the Google Sheet is connected.
      </p>

      {openIndex !== null && (
        <PhotoLightbox
          photo={photos[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  )
}

function PhotoLightbox({ photo, onClose }) {
  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
        <img src={photo.src} alt={photo.caption} />
        <p className="lightbox-caption">{photo.caption}</p>
      </div>
    </div>
  )
}

function Videos() {
  return (
    <section className="panel">
      <SectionLabel n="06">Training Videos</SectionLabel>
      <div className="video-list">
        {videos.map((v, i) => (
          <div className="video-row" key={i}>
            {v.url ? (
              <a href={v.url} target="_blank" rel="noreferrer">{v.title}</a>
            ) : (
              <span className="muted">{v.title}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
