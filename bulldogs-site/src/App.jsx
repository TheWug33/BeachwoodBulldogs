import { useState } from 'react'
import crest from './assets/logo/bulldogs-crest.png'
import { players, coaches, schedule, standings, videos, teamInfo } from './data/players.js'

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
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
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
      <div className="hero-crest-wrap">
        <img src={crest} alt="" className="hero-crest" />
      </div>
      <h1 className="hero-title">Beachwood Bulldogs</h1>
      <p className="hero-sub">2026 Season</p>
      <div className="hero-next">
        <span className="hero-next-label">Next Match</span>
        <span className="hero-next-detail">
          {next.opponent} · {next.date} {next.time && `— ${next.time}`}
        </span>
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
              <td>{g.result || '—'}</td>
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
              <td>{t.pts}</td>
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
  return (
    <section className="panel">
      <SectionLabel n="05">Team Photos</SectionLabel>
      <p className="muted">Photos will populate here once linked to the "Photos" tab of the Google Sheet (image URL + caption per row).</p>
      <div className="photo-grid placeholder">
        {[1, 2, 3, 4, 5, 6].map((i) => <div className="photo-slot" key={i} />)}
      </div>
    </section>
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
