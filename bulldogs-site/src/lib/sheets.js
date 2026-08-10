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
  roster: '',
  schedule: '',
  standings: '',
  coaches: '',
  photos: '',
  videos: '',
  info: '',
}

export async function fetchSheet(url) {
  if (!url) return []
  const res = await fetch(url)
  const csv = await res.text()
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true })
  return data
}
