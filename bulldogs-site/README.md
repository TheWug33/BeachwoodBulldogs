# Beachwood Bulldogs Team Site

React + Vite site for the Beachwood Bulldogs. Currently running on hardcoded
data in `src/data/players.js` — swap to a live Google Sheet whenever ready
(steps below).

## Run locally
```
npm install
npm run dev
```

## Deploy
Push to GitHub, then import the repo in Vercel (framework preset: Vite).
Every push to the main branch auto-deploys.

## What's built
- Home / hero with next-match callout
- Schedule
- Standings
- Roster (11 players, using the card photos you sent)
- Coaches (placeholder — needs a real name/bio/photo)
- Team Photos (placeholder grid — wire to Sheet or drop static images in)
- Training Videos (placeholder list — add YouTube links)
- Footer: Team Store link + Instagram handle (both empty — add in `src/data/players.js`)

## Connecting the Google Sheet
See `src/lib/sheets.js` for the fetch helper and instructions. Recommended
sheet structure — one tab per section:

- **Roster**: Number, Name, Position, PhotoURL, Bio
- **Schedule**: Date, Time, Opponent, Location, Result
- **Standings**: Team, W, L, T, Pts
- **Coaches**: Name, Role, Bio, PhotoURL
- **Photos**: ImageURL, Caption
- **Videos**: Title, URL
- **Info**: StoreURL, InstagramHandle, FieldName, FieldAddress

Once the sheet is published (File > Share > Publish to web > CSV per tab),
drop each tab's CSV link into `SHEET_URLS` in `src/lib/sheets.js`, then swap
each section's static data import for a `useEffect` + `fetchSheet()` call.
Happy to wire this up once the sheet exists — just send the link.

## Instagram
Not auto-posting (would require Meta Graph API + app review). Easiest path:
embed the feed read-only via a widget (e.g. SnapWidget, Elfsight) — drop the
embed code into the footer or a dedicated section.
