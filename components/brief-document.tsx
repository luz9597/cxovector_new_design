import Link from 'next/link'
import { DEFAULT_TIER_THRESHOLDS, LINK_KIND_NOTE, TIER_BANDS } from '@/lib/core'
import type { BriefView, LinkKind, TierBand } from '@/lib/core'
import { NEXT_DELIVERY, SUBSCRIBER } from '@/lib/mock'
import { TIER_LABEL, TIER_NOTE, compText, countWord, longDate, plural, toCard, weekText } from '@/lib/present'
import { RoleEntry } from './role-entry'

const T = DEFAULT_TIER_THRESHOLDS

/** The bounds come from one place, so the page cannot drift from the thresholds. */
export const TIER_RANGE: Readonly<Record<TierBand, string>> = {
  priority: `${T.priority} to 100`,
  watch: `${T.watch} to ${T.priority - 1}`,
  monitor: `${T.monitor} to ${T.watch - 1}`,
}

function standfirst(counts: Record<TierBand, number>, total: number): string {
  const cleared = `${countWord(total)} ${plural(total, 'role')} cleared your filters this week.`
  if (counts.priority > 0) {
    const n = counts.priority
    return `${cleared} ${countWord(n)} ${n === 1 ? 'deserves' : 'deserve'} your attention today.`
  }
  return `${cleared} None reached Priority.`
}

export function BriefDocument({ brief }: { brief: BriefView }) {
  const items = brief.items.filter((i) => !i.dismissed)
  const counts: Record<TierBand, number> = { priority: 0, watch: 0, monitor: 0 }
  for (const i of items) counts[i.band] += 1
  const total = items.length
  const light = total > 0 && total <= 3
  const week =
    brief.windowStart !== undefined && brief.windowEnd !== undefined
      ? weekText(brief.windowStart, brief.windowEnd)
      : undefined

  return (
    <div className="wrap">
      <div className="rule-double" />
      <p className="dateline kicker">
        <span>Brief No. {brief.sequence}</span>
        {week !== undefined && <span>Week of {week}</span>}
        {brief.deliveredAt !== undefined && <span>Delivered {longDate(brief.deliveredAt)}, 6:00 am</span>}
        <span>Prepared for {SUBSCRIBER.name}</span>
      </p>

      <header className="brief-head">
        <h1 className="display">Your Executive Brief</h1>
        {total > 0 && !light && <p className="standfirst">{standfirst(counts, total)}</p>}
      </header>

      {total === 0 && (
        <section className="quiet-week" aria-labelledby="quiet">
          <h2 className="headline" id="quiet">
            Nothing cleared your filters this week.
          </h2>
          <p className="prose">
            The sweep ran as usual, and nothing new scored {T.monitor} or higher against your profile. That is an
            answer too: there was no role this week worth your time. Your next brief is due{' '}
            {longDate(NEXT_DELIVERY)}.
          </p>
          <div className="lead-actions">
            <Link href="/account#search" className="btn btn-line">
              Review your search
            </Link>
            <Link href="/dashboard" className="btn-quiet">
              Back to your dashboard
            </Link>
          </div>
        </section>
      )}

      {light && (
        <section className="quiet-week" aria-labelledby="quiet">
          <h2 className="headline" id="quiet">
            Light week. Not every week produces the right role.
          </h2>
          <p className="prose">
            {countWord(total)} {plural(total, 'role')} cleared your filters. We would rather send {total} that{' '}
            {total === 1 ? 'fits' : 'fit'} than pad the list with ones that do not.
          </p>
        </section>
      )}

      {total > 0 && (
        <>
          {!light && (
            <nav className="tally" aria-label="Roles by tier">
              {TIER_BANDS.map((band) => (
                <a key={band} href={`#${band}`}>
                  <span className="tally-n">{counts[band]}</span>
                  <span className="tally-label">{TIER_LABEL[band]}</span>
                  <span className="tally-range">{TIER_RANGE[band]}</span>
                </a>
              ))}
            </nav>
          )}

          <div className="brief-grid">
            <div>
              {brief.extendedPass && (
                <p className="notice" style={{ marginBottom: 32 }}>
                  <strong>Wider pass.</strong>
                  <span>
                    Your priority industries were quiet this week, so this brief also looked across the industries
                    you marked acceptable.
                  </span>
                </p>
              )}
              {TIER_BANDS.filter((band) => counts[band] > 0).map((band) => (
                <section key={band} className="tier" id={band} aria-labelledby={`h-${band}`}>
                  <div className="section-head">
                    <h2 id={`h-${band}`}>{TIER_LABEL[band]}</h2>
                    <p className="kicker">
                      {counts[band]} {plural(counts[band], 'role')} · {TIER_NOTE[band]}
                    </p>
                  </div>
                  {items
                    .filter((i) => i.band === band)
                    .map((i) => (
                      <RoleEntry key={i.listingId} role={toCard(i)} />
                    ))}
                </section>
              ))}
            </div>

            <aside className="brief-rail" aria-label="About this brief">
              <div className="rail-block">
                <h2 className="kicker">Scored against</h2>
                <dl>
                  <dt>Titles</dt>
                  <dd>{SUBSCRIBER.targetTitles.join(', ')}</dd>
                  <dt>Priority industries</dt>
                  <dd>{SUBSCRIBER.industriesPriority.join(', ')}</dd>
                  <dt>Compensation floor</dt>
                  <dd>{compText(SUBSCRIBER.compFloor)?.replace('From ', '')}</dd>
                </dl>
                <Link href="/account#search" className="btn-quiet">
                  Change your search
                </Link>
              </div>
              <div className="rail-block">
                <h2 className="kicker">Link types</h2>
                <dl>
                  {(Object.keys(LINK_KIND_NOTE) as LinkKind[]).map((kind) => (
                    <div key={kind}>
                      <dt>{kind}</dt>
                      <dd>{LINK_KIND_NOTE[kind]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rail-block">
                <h2 className="kicker">Next brief</h2>
                <p>{longDate(NEXT_DELIVERY)}, 6:00 am {SUBSCRIBER.zone}</p>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  )
}
