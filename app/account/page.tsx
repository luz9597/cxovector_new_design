import type { Metadata } from 'next'
import {
  GEO_LABELS,
  GEO_PREFERENCES,
  INDUSTRY_TAGS,
  PLANS,
  REMOTE_LABELS,
  REMOTE_PREFERENCES,
  money,
} from '@/lib/core'
import { SiteFooter, SiteHeader } from '@/components/chrome'
import { SUBSCRIBER } from '@/lib/mock'
import { Settings } from './settings'

export const metadata: Metadata = { title: 'Account' }

const plain = (s: string): string => s.replace(/\s[—–]\s/g, ', ')

const SECTIONS = [
  ['search', 'Search'],
  ['industries', 'Industries'],
  ['delivery', 'Delivery'],
  ['billing', 'Billing'],
  ['data', 'Your data'],
  ['delete', 'Delete account'],
] as const

export default function Account() {
  const price = money(PLANS[SUBSCRIBER.plan].amountCents)
  const ranks = Object.fromEntries([
    ...SUBSCRIBER.industriesPriority.map((i) => [i, 'priority'] as const),
    ...SUBSCRIBER.industriesAcceptable.map((i) => [i, 'acceptable'] as const),
    ...SUBSCRIBER.industriesExcluded.map((i) => [i, 'excluded'] as const),
  ])
  return (
    <>
      <SiteHeader mode="app" current="/account" />
      <main id="main" className="wrap">
        <div className="rule-double" />
        <p className="dateline kicker">
          <span>Account</span>
          <span>{SUBSCRIBER.email}</span>
        </p>
        <header className="page-head">
          <h1 className="display">Account settings</h1>
        </header>
        <div className="settings">
          <nav className="settings-nav" aria-label="Sections">
            <ul>
              {SECTIONS.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <Settings
            email={SUBSCRIBER.email}
            industries={INDUSTRY_TAGS}
            geo={GEO_PREFERENCES.map((value) => ({ value, label: plain(GEO_LABELS[value]) }))}
            remote={REMOTE_PREFERENCES.map((value) => ({ value, label: plain(REMOTE_LABELS[value]) }))}
            planLine={SUBSCRIBER.plan === 'month' ? `Monthly, ${price} a month` : `Annual, ${price} a year`}
            invoices={[
              { date: 'November 3, 2026', amount: price },
              { date: 'October 15, 2026', amount: price },
            ]}
            initial={{
              titles: SUBSCRIBER.targetTitles,
              excluded: SUBSCRIBER.excludedTitles,
              floor: SUBSCRIBER.compFloor,
              ranks,
            }}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
