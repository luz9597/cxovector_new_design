/**
 * Turns a brief item into the words a card prints.
 *
 * Done once, on the server, so the interactive card takes strings and nothing
 * about dates or money can differ between the server render and the browser.
 */
import type { BriefViewItem, LinkKind, TierBand } from '@/lib/core'

export interface RoleCard {
  readonly id: string
  readonly band: TierBand
  readonly score: number
  readonly title: string
  readonly company: string
  readonly location?: string
  readonly arrangement?: string
  readonly comp?: string
  readonly posted?: string
  readonly source: string
  readonly linkKind: LinkKind
  readonly rationale: string
  readonly url: string
  /** "Watch", when the role was sent before in that tier and has moved up. */
  readonly movedUpFrom?: string
}

export const TIER_LABEL: Readonly<Record<TierBand, string>> = {
  priority: 'Priority',
  watch: 'Watch',
  monitor: 'Monitor',
}

export const TIER_NOTE: Readonly<Record<TierBand, string>> = {
  priority: 'Act on these this week.',
  watch: 'A strong fit with one reservation.',
  monitor: 'Worth knowing about.',
}

const usd = (n: number): string =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` : `$${Math.round(n / 1_000)}k`

/** A range in the product's own style: words, never a dash. */
export function compText(min?: number, max?: number): string | undefined {
  if (min !== undefined && max !== undefined) return `${usd(min)} to ${usd(max)}`
  if (min !== undefined) return `From ${usd(min)}`
  if (max !== undefined) return `Up to ${usd(max)}`
  return undefined
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts })
const SHORT = fmt({ month: 'short', day: 'numeric' })
const LONG = fmt({ weekday: 'long', month: 'long', day: 'numeric' })
const FULL = fmt({ month: 'long', day: 'numeric', year: 'numeric' })

const asDate = (d: Date | string): Date => (typeof d === 'string' ? new Date(`${d.slice(0, 10)}T12:00:00Z`) : d)

export const shortDate = (d: Date | string): string => SHORT.format(asDate(d))
export const longDate = (d: Date | string): string => LONG.format(asDate(d))
export const fullDate = (d: Date | string): string => FULL.format(asDate(d))

/** "November 5 to 11, 2026", or both months when the week crosses one. */
export function weekText(start: string, end: string): string {
  const a = asDate(start)
  const b = asDate(end)
  const sameMonth = a.getUTCMonth() === b.getUTCMonth()
  const month = fmt({ month: 'long' })
  const left = `${month.format(a)} ${a.getUTCDate()}`
  const right = sameMonth ? `${b.getUTCDate()}` : `${month.format(b)} ${b.getUTCDate()}`
  return `${left} to ${right}, ${b.getUTCFullYear()}`
}

export function toCard(item: BriefViewItem): RoleCard {
  const comp = compText(item.compMin, item.compMax)
  return {
    id: item.listingId,
    band: item.band,
    score: item.score,
    title: item.title,
    company: item.company,
    source: item.sourceName,
    linkKind: item.linkKind,
    rationale: item.rationale,
    url: item.url,
    ...(item.location !== undefined && { location: item.location }),
    ...(item.workArrangement !== undefined && { arrangement: item.workArrangement }),
    ...(comp !== undefined && { comp }),
    ...(item.postedAt !== undefined && { posted: shortDate(item.postedAt) }),
    ...(item.resurfacedFrom !== undefined && { movedUpFrom: TIER_LABEL[item.resurfacedFrom] }),
  }
}

const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']

/** A count as a word at the start of a sentence, a figure once it gets long. */
export const countWord = (n: number): string => WORDS[n] ?? String(n)

export const plural = (n: number, one: string, many = `${one}s`): string => (n === 1 ? one : many)
