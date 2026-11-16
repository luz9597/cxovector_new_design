import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/chrome'
import { ArrowRight } from '@/components/icons'
import { ARCHIVE, LATEST, NEXT_DELIVERY, SUBSCRIBER, getBrief } from '@/lib/mock'
import { compText, fullDate, longDate, shortDate } from '@/lib/present'

export const metadata: Metadata = { title: 'Dashboard' }

/** What the subscriber's account is waiting on. `ready` is the ordinary week. */
type State = 'ready' | 'first' | 'card' | 'pastdue'
const STATES: readonly State[] = ['ready', 'first', 'card', 'pastdue']

const HEAD: Record<State, { title: string; em: string; lead: string }> = {
  ready: {
    title: 'Your latest brief',
    em: 'is waiting.',
    lead: 'Three roles reached Priority this week. Each one says why it fits you.',
  },
  first: {
    title: 'Your search is set.',
    em: 'No brief has run yet.',
    lead: 'The first sweep against your profile runs tonight. Nothing is needed from you.',
  },
  card: {
    title: 'Your search is set.',
    em: 'Add a card to start it.',
    lead: 'Nothing is charged today. Your first 2 briefs are free, and billing starts with the third.',
  },
  pastdue: {
    title: 'A payment did not',
    em: 'go through.',
    lead: 'Your briefs are still being delivered while the card is retried. Updating it takes a minute.',
  },
}

function Search() {
  const rows: [string, string][] = [
    ['Target titles', SUBSCRIBER.targetTitles.join(', ')],
    ['Priority industries', SUBSCRIBER.industriesPriority.join(', ')],
    ['Compensation floor', compText(SUBSCRIBER.compFloor)?.replace('From ', '') ?? ''],
    ['Geography', SUBSCRIBER.geography],
    ['Delivery', `${SUBSCRIBER.deliveryDay}s, 6:00 am ${SUBSCRIBER.zone}`],
  ]
  return (
    <section className="card" aria-labelledby="search-h">
      <h2 className="title" id="search-h" style={{ marginBottom: 8 }}>
        Your search
      </h2>
      <dl className="deflist">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <Link href="/account#search" className="btn btn-line btn-small" style={{ marginTop: 14 }}>
        Change your search
      </Link>
    </section>
  )
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const { state: raw } = await searchParams
  const state: State = STATES.includes(raw as State) ? (raw as State) : 'ready'
  const head = HEAD[state]
  const hasBriefs = state === 'ready' || state === 'pastdue'
  const brief = getBrief(LATEST.sequence)!
  const top = brief.items.filter((i) => i.band === 'priority')

  return (
    <>
      <SiteHeader mode="app" current="/dashboard" />
      <main id="main" className="wrap">
        <div className="rule-double" />
        <p className="dateline kicker">
          <span>{fullDate('2026-11-14')}</span>
          <span>{SUBSCRIBER.name}</span>
          {hasBriefs && <span>Next brief {shortDate(NEXT_DELIVERY)}</span>}
        </p>

        {state === 'pastdue' && (
          <div className="notice notice-alert" style={{ marginTop: 24 }} role="alert">
            <strong>Your card ending 4242 was declined on November 12.</strong>
            <span>
              We will try it again on November 16.{' '}
              <Link href="/account#billing" className="link">
                Update your card
              </Link>
            </span>
          </div>
        )}

        <header className="page-head">
          <h1 className="display">
            {head.title} <em>{head.em}</em>
          </h1>
          <p className="standfirst">{head.lead}</p>
        </header>

        <div className="split">
          <div>
            {hasBriefs && (
              <section className="lead-brief" aria-labelledby="lead-h">
                <p className="kicker">
                  Brief No. {LATEST.sequence} · Delivered {longDate(LATEST.delivered)}
                </p>
                <h2 className="headline" id="lead-h" style={{ marginTop: 8 }}>
                  {LATEST.priority} Priority, {LATEST.watch} Watch, {LATEST.monitor} Monitor
                </h2>
                <ol>
                  {top.map((i) => (
                    <li key={i.listingId}>
                      <div className="score score-priority" aria-label={`Score ${i.score} of 100`}>
                        {i.score}
                      </div>
                      <div>
                        <strong>{i.title}</strong>
                        <span>
                          {i.company}
                          {i.location !== undefined && `, ${i.location}`}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="lead-actions">
                  <Link href={`/brief/${LATEST.sequence}`} className="btn">
                    Open Brief {LATEST.sequence} <ArrowRight />
                  </Link>
                  <span className="muted">{brief.items.length} roles in all.</span>
                </div>
              </section>
            )}

            {state === 'first' && (
              <section aria-label="Your first two briefs">
                <div className="dates" style={{ marginTop: 0 }}>
                  <div>
                    <p className="kicker">Brief 1</p>
                    <strong>{longDate('2026-11-15')}</strong>
                    <span>The morning after you activated, 6:00 am {SUBSCRIBER.zone}</span>
                  </div>
                  <div>
                    <p className="kicker">Brief 2</p>
                    <strong>{longDate('2026-11-26')}</strong>
                    <span>Then every {SUBSCRIBER.deliveryDay}, the day you chose</span>
                  </div>
                </div>
                <p className="prose" style={{ marginTop: 20 }}>
                  Both are free. You will get an email when each one is ready, and it will be here too.
                </p>
              </section>
            )}

            {state === 'card' && (
              <section className="lead-brief" aria-label="Add a card">
                <p className="prose">
                  Your profile is saved and ready to run. The sweep starts the night after a card is on file, and
                  your first brief arrives the next morning.
                </p>
                <div className="lead-actions">
                  <Link href="/onboarding?step=5" className="btn">
                    Add a card <ArrowRight />
                  </Link>
                  <span className="muted">Nothing to pay today.</span>
                </div>
              </section>
            )}

            {hasBriefs && (
              <section className="card" aria-labelledby="archive-h" style={{ marginTop: 12 }}>
                <div className="table-scroll">
                  <table className="ledger">
                    <caption id="archive-h">
                      Every brief you have received
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Brief</th>
                        <th scope="col">Delivered</th>
                        <th scope="col" className="r">
                          Priority
                        </th>
                        <th scope="col" className="r">
                          Watch
                        </th>
                        <th scope="col" className="r">
                          Monitor
                        </th>
                        <th scope="col">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ARCHIVE.map((b) => {
                        const total = b.priority + b.watch + b.monitor
                        return (
                          <tr key={b.sequence}>
                            <td>
                              <Link href={`/brief/${b.sequence}`}>No. {b.sequence}</Link>
                            </td>
                            <td>{fullDate(b.delivered)}</td>
                            <td className="r">{b.priority}</td>
                            <td className="r">{b.watch}</td>
                            <td className="r">{b.monitor}</td>
                            <td className="muted">
                              {total === 0 ? 'Nothing cleared' : total <= 3 ? 'Light week' : ''}
                              {b.extendedPass && ', wider pass'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>

          <div className="stack" style={{ ['--gap' as string]: '12px' }}>
            {hasBriefs && (
              <section className="card" aria-labelledby="next-h">
                <h2 className="kicker" id="next-h">
                  Next brief
                </h2>
                <p className="title" style={{ marginTop: 6 }}>
                  {longDate(NEXT_DELIVERY)}
                </p>
                <p className="muted">6:00 am {SUBSCRIBER.zone}, in your inbox and here</p>
              </section>
            )}
            <Search />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
