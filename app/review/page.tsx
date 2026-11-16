import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/chrome'

export const metadata: Metadata = { title: 'All screens' }

/** Every screen and every state, one click each. For reviewing the design, not for subscribers. */
const GROUPS: readonly { name: string; items: readonly [string, string, string][] }[] = [
  {
    name: 'The brief',
    items: [
      ['/brief/7', 'A full week', '3 Priority, 6 Watch, 8 Monitor, one role moved up'],
      ['/brief/5', 'A light week', '2 roles, with the wider pass note'],
      ['/brief/3', 'An empty week', 'Nothing cleared the filters'],
    ],
  },
  {
    name: 'Dashboard',
    items: [
      ['/dashboard', 'Latest brief is waiting', 'The ordinary week, with the archive'],
      ['/dashboard?state=first', 'No brief has run yet', 'Dates of brief 1 and brief 2'],
      ['/dashboard?state=card', 'A card is needed', 'Search saved, not yet started'],
      ['/dashboard?state=pastdue', 'A payment did not go through', 'Briefs continue while the card is retried'],
    ],
  },
  {
    name: 'Getting started',
    items: [
      ['/', 'Landing page', 'Advantages, how it works, pricing'],
      ['/signup', 'Create an account', ''],
      ['/verify-email', 'Confirm your email', ''],
      ['/onboarding', 'Setup, step 1', 'About you'],
      ['/onboarding?step=2', 'Setup, step 2', 'Targets'],
      ['/onboarding?step=3', 'Setup, step 3', 'Industries'],
      ['/onboarding?step=4', 'Setup, step 4', 'Delivery'],
      ['/onboarding?step=5', 'Setup, step 5', 'Activate'],
      ['/onboarding?step=6', 'Setup, confirmation', 'Dates of the first two briefs'],
    ],
  },
  {
    name: 'Account',
    items: [
      ['/account', 'Account settings', 'Search, industries, delivery, billing, data, delete'],
      ['/login', 'Sign in', ''],
      ['/reset-password', 'Reset password', ''],
    ],
  },
]

export default function Review() {
  return (
    <>
      <SiteHeader mode="marketing" />
      <main id="main" className="wrap">
        <div className="rule-double" />
        <header className="page-head">
          <p className="kicker">Design review</p>
          <h1 className="display" style={{ marginTop: 14 }}>
            Every screen, <em>every state.</em>
          </h1>
          <p className="standfirst">
            All data here is sample data. The contrast button in the header switches between light and dark.
          </p>
        </header>
        <div className="stack" style={{ ['--gap' as string]: '48px' }}>
          {GROUPS.map((g) => (
            <section key={g.name} aria-labelledby={`g-${g.name}`}>
              <h2 className="kicker" id={`g-${g.name}`} style={{ marginBottom: 10 }}>
                {g.name}
              </h2>
              <ul className="index-list">
                {g.items.map(([href, title, note]) => (
                  <li key={href}>
                    <Link href={href}>
                      <b>{title}</b>
                      <span>{note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
