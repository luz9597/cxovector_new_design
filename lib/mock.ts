/**
 * Everything this front end shows, until it is wired to the backend.
 *
 * The shapes are the ones in lib/core.ts, so replacing this file
 * with a live source is a change of source and not of any component. Every person and company
 * here is invented.
 */
import type { BriefView, BriefViewItem } from '@/lib/core'

export const SUBSCRIBER = {
  name: 'Dana Whitfield',
  email: 'dana.whitfield@example.com',
  currentTitle: 'Chief Financial Officer',
  currentCompany: 'Harbor Point Health Services',
  city: 'Chicago, IL',
  targetTitles: ['Chief Financial Officer', 'Chief Operating Officer'],
  excludedTitles: ['Interim', 'Fractional'],
  industriesPriority: ['Healthcare & Health Services', 'Technology / Software'],
  industriesAcceptable: ['Finance, Banking & Insurance', 'Professional & Consulting Services'],
  industriesExcluded: ['Energy, Oil & Gas'],
  compFloor: 350_000,
  geography: 'Anywhere in the US',
  workStyle: 'Open to anything',
  deliveryDay: 'Thursday',
  zone: 'Central',
  plan: 'month' as 'month' | 'year',
}

const day = (iso: string): Date => new Date(`${iso}T12:00:00Z`)

const role = (
  listingId: string,
  band: BriefViewItem['band'],
  score: number,
  title: string,
  company: string,
  rationale: string,
  rest: Partial<BriefViewItem> & Pick<BriefViewItem, 'sourceName' | 'linkKind'>,
): BriefViewItem => ({
  listingId,
  band,
  score,
  title,
  company,
  rationale,
  dismissed: false,
  url: `https://example.com/listings/${listingId}`,
  ...rest,
})

/** The pool every brief below is cut from, best first within each tier. */
const POOL: readonly BriefViewItem[] = [
  role(
    'r01', 'priority', 96, 'Chief Financial Officer', 'Northlake Health Partners',
    'A multi-site physician group preparing a refinancing, which is the work you led at Harbor Point. The role reports to the chief executive, sits in your metro, and the stated range clears your floor by $30k.',
    { location: 'Chicago, IL', workArrangement: 'Hybrid', compMin: 380_000, compMax: 450_000, postedAt: day('2026-11-09'), sourceName: 'Northlake careers', linkKind: 'Direct' },
  ),
  role(
    'r02', 'priority', 93, 'Chief Financial Officer', 'Calder Diagnostics',
    'A sponsor-backed laboratory services company two years into its hold, hiring a finance chief to carry it through a sale. Your exit experience is the stated requirement. No range is published, and retained mandates at this level rarely fall under your floor.',
    { workArrangement: 'Remote', postedAt: day('2026-11-07'), sourceName: 'Harlow Reed Executive Search', linkKind: 'Contact firm' },
  ),
  role(
    'r03', 'priority', 91, 'Chief Operating Officer', 'Meridian Care Software',
    'Reposted this week with a wider remit that now includes finance operations and payer contracting. That change is why it moved up. Healthcare software, in Chicago, with a range well above your floor.',
    { location: 'Chicago, IL', workArrangement: 'On site', compMin: 400_000, compMax: 475_000, postedAt: day('2026-11-10'), sourceName: 'Meridian careers', linkKind: 'Direct', resurfacedFrom: 'watch' },
  ),
  role(
    'r04', 'watch', 88, 'Chief Financial Officer', 'Lakeshore Behavioral Health',
    'Strong on industry and scope. It sits in Watch because the top of the range only just reaches your floor and the role is based in Milwaukee three days a week.',
    { location: 'Milwaukee, WI', workArrangement: 'Hybrid', compMin: 320_000, compMax: 360_000, postedAt: day('2026-11-06'), sourceName: 'Lakeshore careers', linkKind: 'Direct' },
  ),
  role(
    'r05', 'watch', 84, 'Senior Vice President, Finance', 'Tessera Health Systems',
    'One step below your target title at a system four times the size of your current employer. The posting describes it as the successor seat to the finance chief.',
    { workArrangement: 'Remote', compMin: 360_000, compMax: 410_000, postedAt: day('2026-11-08'), sourceName: 'Tessera careers', linkKind: 'Direct' },
  ),
  role(
    'r06', 'watch', 81, 'Chief Financial Officer', 'Brightwell Analytics',
    'A priority industry and a clean title match. The company sells to retailers, not to providers, so your healthcare background counts for less here than elsewhere in this brief.',
    { location: 'Austin, TX', compMin: 360_000, compMax: 420_000, postedAt: day('2026-11-05'), sourceName: 'Brightwell careers', linkKind: 'Direct' },
  ),
  role(
    'r07', 'watch', 78, 'Chief Operating Officer', 'Parkline Medical Group',
    'In your metro and your industry. The posting gives no range and reads as an operations role with little finance in it, which is the reason for the score.',
    { location: 'Chicago, IL', workArrangement: 'On site', sourceName: 'Parkline careers', linkKind: 'Direct' },
  ),
  role(
    'r08', 'watch', 74, 'Chief Financial Officer', 'Ardent Ridge Capital Services',
    'An acceptable industry, not a priority one. The full listing sits behind a member sign-in, so the scope is scored from the summary alone.',
    { location: 'New York, NY', workArrangement: 'Hybrid', postedAt: day('2026-11-04'), sourceName: 'ExecuNet', linkKind: "Login req'd" },
  ),
  role(
    'r09', 'watch', 71, 'Vice President, Finance and Strategy', 'Solace Home Health',
    'Below your floor on salary and included because the posting leads with equity. You asked to see roles like this.',
    { workArrangement: 'Remote', compMin: 300_000, compMax: 340_000, postedAt: day('2026-11-09'), sourceName: 'Solace careers', linkKind: 'Direct' },
  ),
  role(
    'r10', 'monitor', 68, 'Chief Financial Officer', 'Fenwick Dental Alliance',
    'Right title, smaller company than you asked for.',
    { location: 'Columbus, OH', compMin: 310_000, compMax: 350_000, sourceName: 'Fenwick careers', linkKind: 'Direct' },
  ),
  role(
    'r11', 'monitor', 66, 'Chief Operating Officer', 'Quillon Payments',
    'Financial technology, an acceptable industry. Heavy on product operations.',
    { workArrangement: 'Remote', postedAt: day('2026-11-03'), sourceName: 'Quillon careers', linkKind: 'Direct' },
  ),
  role(
    'r12', 'monitor', 63, 'Senior Vice President, Finance', 'Aldergate Insurance Group',
    'Acceptable industry and a relocation to Hartford.',
    { location: 'Hartford, CT', workArrangement: 'On site', compMin: 340_000, compMax: 380_000, sourceName: 'Aldergate careers', linkKind: 'Direct' },
  ),
  role(
    'r13', 'monitor', 61, 'Chief Financial Officer', 'Wrenfield Senior Living',
    'A retained search with no employer details beyond the sector.',
    { location: 'Nashville, TN', sourceName: 'Marlow and Pryce', linkKind: 'Contact firm' },
  ),
  role(
    'r14', 'monitor', 58, 'Vice President, Financial Planning', 'Corvane Systems',
    'Two steps below your target. Shown because the company is one you would know.',
    { workArrangement: 'Hybrid', location: 'Chicago, IL', postedAt: day('2026-11-06'), sourceName: 'Corvane careers', linkKind: 'Direct' },
  ),
  role(
    'r15', 'monitor', 56, 'Chief Operating Officer', 'Tidewater Consulting Partners',
    'Professional services, with travel most weeks.',
    { location: 'Atlanta, GA', compMin: 350_000, compMax: 390_000, sourceName: 'Tidewater careers', linkKind: 'Direct' },
  ),
  role(
    'r16', 'monitor', 53, 'Chief Financial Officer', 'Oakhaven Community Clinics',
    'A nonprofit clinic network. The range tops out under your floor.',
    { location: 'Madison, WI', workArrangement: 'Hybrid', compMin: 260_000, compMax: 310_000, sourceName: 'Oakhaven careers', linkKind: 'Direct' },
  ),
  role(
    'r17', 'monitor', 51, 'Senior Director, Finance', 'Lumen Ridge Software',
    'At the lowest level you receive. Priority industry, fully remote.',
    { workArrangement: 'Remote', postedAt: day('2026-11-02'), sourceName: 'Lumen Ridge careers', linkKind: 'Direct' },
  ),
]

export interface BriefSummary {
  readonly sequence: number
  /** The Thursday it was delivered. */
  readonly delivered: string
  readonly priority: number
  readonly watch: number
  readonly monitor: number
  readonly extendedPass: boolean
}

/** Newest first. Brief 7 is a full week, 5 a light one, 3 an empty one. */
export const ARCHIVE: readonly BriefSummary[] = [
  { sequence: 7, delivered: '2026-11-12', priority: 3, watch: 6, monitor: 8, extendedPass: false },
  { sequence: 6, delivered: '2026-11-05', priority: 2, watch: 5, monitor: 7, extendedPass: false },
  { sequence: 5, delivered: '2026-10-29', priority: 0, watch: 1, monitor: 1, extendedPass: true },
  { sequence: 4, delivered: '2026-10-22', priority: 1, watch: 4, monitor: 6, extendedPass: false },
  { sequence: 3, delivered: '2026-10-15', priority: 0, watch: 0, monitor: 0, extendedPass: false },
  { sequence: 2, delivered: '2026-10-08', priority: 2, watch: 3, monitor: 5, extendedPass: false },
  { sequence: 1, delivered: '2026-10-01', priority: 1, watch: 5, monitor: 8, extendedPass: false },
]

export const NEXT_DELIVERY = '2026-11-19'

const shift = (iso: string, days: number): string => {
  const d = day(iso)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function getBrief(sequence: number): BriefView | null {
  const s = ARCHIVE.find((b) => b.sequence === sequence)
  if (s === undefined) return null
  const take = (band: BriefViewItem['band'], n: number) => POOL.filter((r) => r.band === band).slice(0, n)
  const items = [...take('priority', s.priority), ...take('watch', s.watch), ...take('monitor', s.monitor)]
  const delivered = new Date(`${s.delivered}T12:00:00Z`)
  return {
    id: String(s.sequence),
    sequence: s.sequence,
    status: items.length === 0 ? 'empty' : 'delivered',
    windowStart: shift(s.delivered, -7),
    windowEnd: shift(s.delivered, -1),
    deliveredAt: delivered,
    createdAt: delivered,
    extendedPass: s.extendedPass,
    items,
  }
}

export const LATEST = ARCHIVE[0]!
