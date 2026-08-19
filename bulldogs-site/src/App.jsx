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
        <img src={crest} alt="" className="topbar-watermark" aria-hidden="true" />
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
            {teamInfo.storeUrl && (
              <a
                href={teamInfo.storeUrl}
                target="_blank"
                rel="noreferrer"
                className="ribbon-tab ribbon-tab-store"
              >
                Team Store
              </a>
            )}
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

const QUICK_LINKS = [
  { id: 'schedule', label: 'Schedule', icon: '📅' },
  { id: 'roster', label: 'Roster', icon: '👥' },
  { id: 'standings', label: 'Standings', icon: '🏆' },
  { id: 'photos', label: 'Photos', icon: '🖼️' },
  { id: 'videos', label: 'Training', icon: '🎥' },
]

function Home({ onNav }) {
  const next = schedule[0]
  return (
    <section className="hero">
      <div className="hero-banner">
        <img src={crest} alt="Beachwood Bulldogs" className="hero-banner-crest" />
      </div>

      <div className="quick-nav">
        {QUICK_LINKS.map((q) => (
          <button className="quick-nav-item" key={q.id} onClick={() => onNav(q.id)}>
            <span className="quick-nav-icon">{q.icon}</span>
            <span>{q.label}</span>
          </button>
        ))}
        {teamInfo.storeUrl && (
          <a
            className="quick-nav-item"
            href={teamInfo.storeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="quick-nav-icon">🛒</span>
            <span>Store</span>
          </a>
        )}
      </div>

      <p className="hero-sub hero-sub-standalone">2026 Season</p>

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
      <div className="roster-grid">
        {coaches.map((c, i) => (
          <div className="player-card" key={i}>
            <img src={c.photo} alt={`${c.name} — ${c.role}`} />
            {c.bio && <p className="player-bio">{c.bio}</p>}
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

// Pulls a YouTube video ID out of common URL formats so we can show a real
// thumbnail + play an inline embed, instead of a plain text link.
function getYouTubeId(url) {
  if (!url) return null
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

function Videos() {
  const [openVideo, setOpenVideo] = useState(null)

  useEffect(() => {
    if (!openVideo) return
    const onKey = (e) => { if (e.key === 'Escape') setOpenVideo(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openVideo])

  return (
    <section className="panel">
      <SectionLabel n="06">Training Videos</SectionLabel>
      <div className="video-grid">
        {videos.map((v, i) => {
          const ytId = getYouTubeId(v.url)
          return (
            <figure
              className="video-card"
              key={i}
              onClick={() => ytId && setOpenVideo(v)}
              role={ytId ? 'button' : undefined}
              tabIndex={ytId ? 0 : undefined}
              onKeyDown={(e) => { if (ytId && (e.key === 'Enter' || e.key === ' ')) setOpenVideo(v) }}
            >
              {ytId ? (
                <div className="video-thumb">
                  <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={v.title} />
                  <span className="play-badge">▶</span>
                </div>
              ) : (
                <div className="video-thumb video-thumb-empty">
                  <span className="play-badge muted-badge">▶</span>
                </div>
              )}
              <figcaption>{v.title}</figcaption>
            </figure>
          )
        })}
      </div>

      {openVideo && (
        <div className="lightbox-backdrop" onClick={() => setOpenVideo(null)}>
          <div className="lightbox-inner video-lightbox" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setOpenVideo(null)} aria-label="Close">✕</button>
            <div className="video-embed-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(openVideo.url)}?autoplay=1`}
                title={openVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="lightbox-caption">{openVideo.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}
