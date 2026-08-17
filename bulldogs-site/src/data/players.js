// ROSTER DATA
// For now this is hardcoded from the player cards you sent. Once the Google
// Sheet is set up, replace this file's export with a fetch from the
// published "Roster" tab (see src/lib/sheets.js for the helper + example).

import maguire from '../assets/players/maguire-8.png'
import farinella from '../assets/players/farinella-7.png'
import keelan from '../assets/players/keelan-10.png'
import tonra from '../assets/players/tonra-99.png'
import jimenez from '../assets/players/jimenez-16.png'
import westen from '../assets/players/westen-23.png'
import nesbihalD from '../assets/players/nesbihal-d-4.png'
import knapp from '../assets/players/knapp-73.png'
import meyer from '../assets/players/meyer-58.png'
import nesbihalR from '../assets/players/nesbihal-r-3.png'
import gibson from '../assets/players/gibson-17.png'
import coachWesten from '../assets/coaches/westen-head-coach.png'

export const players = [
  { number: 3, name: 'Ryder Nesbihal', position: 'Midfield', photo: nesbihalR, bio: '' },
  { number: 4, name: 'Dylan Nesbihal', position: 'Midfield', photo: nesbihalD, bio: '' },
  { number: 7, name: 'Kannin Farinella', position: 'Forward', photo: farinella, bio: '' },
  { number: 8, name: 'Johnny Maguire', position: 'Midfielder', photo: maguire, bio: '' },
  { number: 10, name: 'Brodie Keelan', position: 'Forward', photo: keelan, bio: '' },
  { number: 16, name: 'Ethan Jimenez', position: 'Defender', photo: jimenez, bio: '' },
  { number: 17, name: 'Bennett Gibson', position: 'Goalkeeper', photo: gibson, bio: '' },
  { number: 23, name: 'Miles Westen', position: 'Midfield', photo: westen, bio: '' },
  { number: 58, name: 'Caleb Meyer', position: 'Defender', photo: meyer, bio: '' },
  { number: 73, name: 'Nolan Knapp', position: 'Midfield', photo: knapp, bio: '' },
  { number: 99, name: 'Frankie Tonra', position: 'Forward', photo: tonra, bio: '' },
]

export const coaches = [
  { name: 'Heather Westen', role: 'Head Coach', bio: '', photo: coachWesten },
]

export const schedule = [
  { date: 'TBD', time: '', opponent: 'Opponent Name', location: 'Home', result: '' },
]

export const standings = [
  { team: 'Beachwood Bulldogs', w: 0, l: 0, t: 0, pts: 0 },
]

export const videos = [
  { title: '10 Best U12 Soccer Drills (MOJO)', url: 'https://www.youtube.com/watch?v=XWIP0VbJtKs' },
  { title: 'Complete Technical Training — Ball Mastery, Dribbling & Turning (U12–U15)', url: 'https://www.youtube.com/watch?v=Yp4k6eSGgWw' },
  { title: 'Double Square Rondo — Passing & Possession (U11–U14)', url: 'https://www.youtube.com/watch?v=D2vHV6dMvqo' },
  { title: '8v3 Rondo Possession Drill (U11–U13)', url: 'https://www.youtube.com/watch?v=9jQRQsnyfKw' },
]

export const teamInfo = {
  storeUrl: 'https://teamlocker.squadlocker.com/stores/beachwood-bulldogs',
  instagramHandle: '',
  fields: [
    { name: 'Home Field', address: 'Add address' },
  ],
}
