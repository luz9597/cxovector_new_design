/**
 * The product's own facts and shapes, in one place: tiers, prices, industries
 * and what a brief looks like. This front end reads them from here so a change
 * of price or threshold is one edit, and so the data file can be replaced by a
 * live source without touching a component.
 */

export const TIER_BANDS = ['priority', 'watch', 'monitor'] as const
export type TierBand = (typeof TIER_BANDS)[number]

export const DEFAULT_TIER_THRESHOLDS = { priority: 90, watch: 70, monitor: 50 } as const

export type LinkKind = 'Direct' | 'Contact firm' | "Login req'd"

export const LINK_KIND_NOTE: Readonly<Record<LinkKind, string>> = {
  Direct: 'goes straight to the listing',
  'Contact firm': 'retained search',
  "Login req'd": 'platform sign-in',
}

export type WorkArrangement = 'Remote' | 'Hybrid' | 'On site'

export type BriefStatus = 'pending' | 'delivered' | 'delayed' | 'empty' | 'failed'

/** One role in a brief, as the subscriber reads it. */
export interface BriefViewItem {
  readonly listingId: string
  readonly dismissed: boolean
  readonly band: TierBand
  readonly score: number
  readonly rationale: string
  readonly title: string
  readonly company: string
  readonly location?: string
  readonly url: string
  readonly postedAt?: Date
  readonly compMin?: number
  readonly compMax?: number
  readonly sourceName: string
  readonly linkKind: LinkKind
  readonly workArrangement?: WorkArrangement
  /** A role sent in an earlier brief and back a tier higher: the tier it was sent in. */
  readonly resurfacedFrom?: TierBand
}

export interface BriefView {
  readonly id: string
  readonly sequence: number
  readonly status: BriefStatus
  readonly windowStart?: string
  readonly windowEnd?: string
  readonly deliveredAt?: Date
  readonly createdAt: Date
  readonly extendedPass: boolean
  readonly items: readonly BriefViewItem[]
}

export type PlanInterval = 'month' | 'year'

export const PLANS: Readonly<Record<PlanInterval, { readonly interval: PlanInterval; readonly amountCents: number }>> = {
  month: { interval: 'month', amountCents: 1_000 },
  year: { interval: 'year', amountCents: 9_600 },
}

/** Briefs delivered at no charge before the first one is billed. */
export const FREE_BRIEF_ALLOWANCE = 2

export const annualSavingCents = (): number => PLANS.month.amountCents * 12 - PLANS.year.amountCents

export const annualAsMonthlyCents = (): number => Math.round(PLANS.year.amountCents / 12)

export const money = (cents: number): string =>
  `$${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`

export const INDUSTRY_TAGS = [
  'Agriculture & Natural Resources',
  'Construction & Home Services',
  'Manufacturing & Industrial',
  'Energy, Oil & Gas',
  'Aerospace & Defense',
  'Pharma, Chemical & Life Sciences',
  'Transportation & Logistics',
  'Automotive',
  'Wholesale & Distribution',
  'Finance, Banking & Insurance',
  'Professional & Consulting Services',
  'Technology / Software',
  'Media, Publishing, Advertising & Telecom',
  'Events, Trade Shows & Associations',
  'Healthcare & Health Services',
  'Education',
  'Nonprofit & Social Services',
  'Hospitality, Food & Travel',
  'Retail & Consumer Goods',
] as const

export const GEO_PREFERENCES = ['national', 'regional', 'local'] as const
export type GeoPreference = (typeof GEO_PREFERENCES)[number]

export const GEO_LABELS: Readonly<Record<GeoPreference, string>> = {
  national: 'Anywhere in the US',
  regional: "Regional, I'll specify",
  local: 'Local / metro only',
}

export const REMOTE_PREFERENCES = ['remote', 'hybrid', 'open'] as const
export type RemotePreference = (typeof REMOTE_PREFERENCES)[number]

export const REMOTE_LABELS: Readonly<Record<RemotePreference, string>> = {
  remote: 'Remote-first (travel OK)',
  hybrid: 'Hybrid, some in-office fine',
  open: 'Open to anything',
}
