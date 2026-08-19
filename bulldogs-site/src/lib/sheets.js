// Helper for pulling data from a published Google Sheet tab.
//
// Setup (do this once the Sheet exists):
// 1. In Google Sheets: File > Share > Publish to web > select the tab > CSV.
// 2. Copy the published CSV link it gives you.
// 3. Add it to SHEET_URLS below.
// 4. In a component, replace the static import from data/players.js with:
//      const [players, setPlayers] = useState([])
//      useEffect(() => { fetchSheet(SHEET_URLS.roster).then(setPlayers) }, [])
//
// Each row's column headers become object keys, e.g. a "Name" column
// becomes row.Name.

import Papa from 'papaparse'

export const SHEET_URLS = {
  roster: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HgGPQ0MSBo02p1N7UnKnVQQG53C5g-9og0lJh5F8IUtpoz3SIDeYz1Kt8-BeLg/pub?gid=266633233&single=true&output=csv',
  schedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HgGPQ0MSBo02p1N7UnKnVQQG53C5g-9og0lJh5F8IUtpoz3SIDeYz1Kt8-BeLg/pub?gid=1906911618&single=true&output=csv',
  standings: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HgGPQ0MSBo02p1N7UnKnVQQG53C5g-9og0lJh5F8IUtpoz3SIDeYz1Kt8-BeLg/pub?gid=2141598853&single=true&output=csv',
  coaches: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HgGPQ0MSBo02p1N7UnKnVQQG53C5g-9og0lJh5F8IUtpoz3SIDeYz1Kt8-BeLg/pub?gid=1903247065&single=true&output=csv',
  photos: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HgGPQ0MSBo02p1N7UnKnVQQG53C5g-9og0lJh5F8IUtpoz3SIDeYz1Kt8-BeLg/pub?gid=156056436&single=true&output=csv',
  videos: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HgGPQ0MSBo02p1N7UnKnVQQG53C5g-9og0lJh5F8IUtpoz3SIDeYz1Kt8-BeLg/pub?gid=2136287562&single=true&output=csv',
  info: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HgGPQ0MSBo02p1N7UnKnVQQG53C5g-9og0lJh5F8IUtpoz3SIDeYz1Kt8-BeLg/pub?gid=967153679&single=true&output=csv',
}

export async function fetchSheet(url) {
  if (!url) return []
  const res = await fetch(url)
  const csv = await res.text()
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true })
  return data
}
