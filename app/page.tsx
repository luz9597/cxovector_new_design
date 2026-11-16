import Link from 'next/link'
import { FREE_BRIEF_ALLOWANCE, PLANS, TIER_BANDS, annualAsMonthlyCents, annualSavingCents, money } from '@/lib/core'
import { TIER_RANGE } from '@/components/brief-document'
import { SiteFooter, SiteHeader } from '@/components/chrome'
import { ArrowRight, Check } from '@/components/icons'
import { RoleEntry } from '@/components/role-entry'
import { getBrief } from '@/lib/mock'
import { TIER_LABEL, toCard } from '@/lib/present'

const CTA = `Start My ${FREE_BRIEF_ALLOWANCE} Free Briefs`

const TIER_MEANS = {
  priority: 'The role fits on title, industry, pay and place. Read these first.',
  watch: 'A strong fit with one reservation, and the brief says which.',
  monitor: 'Close enough to know about. One line each.',
} as const

export default function Landing() {
  // One role at full weight and two at the lightest, so the excerpt shows the range.
  const all = getBrief(7)!.items
  const sample = [all[0]!, ...all.filter((i) => i.band === 'monitor').slice(0, 2)].map(toCard)

  return (
    <>
      <SiteHeader mode="marketing" />
      <main id="main" className="wrap">
        <div className="rule-double" />

        <section className="hero">
          <div>
            <p className="kicker">Executive opportunity intelligence</p>
            <h1 className="display" style={{ marginTop: 18 }}>
              The executive roles worth your time. <em>Nothing else.</em>
            </h1>
            <p className="standfirst">
              Every night CXOVector reads more than 500 sources. Once a week it sends you the few openings that fit
              your profile, each one scored and explained, and none of them a repeat.
            </p>
            <div className="hero-actions">
              <Link href="/signup" className="btn">
                {CTA} <ArrowRight />
              </Link>
              <Link href="/brief/7" className="btn-quiet">
                Read a sample brief
              </Link>
            </div>
            <p className="hero-note">No charge today. Billing starts with your third brief.</p>
          </div>

          <figure className="sheet" aria-label="An excerpt from a brief">
            <p className="dateline kicker">
              <span>Brief No. 7</span>
              <span>Excerpt</span>
            </p>
            {sample.map((r) => (
              <RoleEntry key={r.id} role={r} preview />
            ))}
          </figure>
        </section>

        <section className="band" aria-labelledby="adv-h">
          <div className="band-head">
            <p className="kicker">Three advantages</p>
            <h2 className="headline" id="adv-h">
              Job boards show everyone everything. This is written for one person.
            </h2>
          </div>
          <div className="columns-3">
            <div>
              <p className="numeral">1</p>
              <h3>500+ sources. Weekly results.</h3>
              <p>
                Company career pages, retained search firms and the boards of single industries. A job board only
                shows you its own listings. This reads all of them.
              </p>
            </div>
            <div>
              <p className="numeral">2</p>
              <h3>Matched to you. Not to everyone.</h3>
              <p>
                Every opening is scored from 0 to 100 against your titles, industries, pay floor and location, with
                a short explanation of the score.
              </p>
            </div>
            <div>
              <p className="numeral">3</p>
              <h3>Only what is new.</h3>
              <p>
                A role you have been sent does not come back, unless it changes enough to move up a tier. Dismiss
                one and it is gone for good.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="how" aria-labelledby="how-h">
          <div className="band-head">
            <p className="kicker">How it works</p>
            <h2 className="headline" id="how-h">
              The work happens overnight. You get the result at 6:00 am.
            </h2>
          </div>
          <ol className="night">
            <li>
              <p className="when">Every night</p>
              <h3>The sweep</h3>
              <p>Each source is read again and new executive openings are collected.</p>
            </li>
            <li>
              <p className="when">Before dawn</p>
              <h3>The score</h3>
              <p>Every opening that passes your filters is scored against your profile.</p>
            </li>
            <li>
              <p className="when">Then</p>
              <h3>The cut</h3>
              <p>Anything you have already seen is removed. What is left is ranked.</p>
            </li>
            <li>
              <p className="when">Your day, 6:00 am</p>
              <h3>The brief</h3>
              <p>One email on the weekday you choose, in your time zone, with a page to read it on.</p>
            </li>
          </ol>

          <div className="split" style={{ marginTop: 12 }}>
            <ul className="scale" aria-label="What the scores mean">
              {TIER_BANDS.map((band) => (
                <li key={band}>
                  <div className={`score score-${band}`} aria-hidden="true">
                    {band === 'priority' ? 94 : band === 'watch' ? 81 : 63}
                  </div>
                  <div>
                    <strong>
                      {TIER_LABEL[band]}, {TIER_RANGE[band]}
                    </strong>
                    <br />
                    <span>{TIER_MEANS[band]}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="card" style={{ display: 'grid', alignContent: 'center' }}>
              <p className="title">A quiet week is reported as a quiet week.</p>
              <p className="muted" style={{ marginTop: 6 }}>
                If two roles fit, you are sent two.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="pricing" aria-labelledby="price-h">
          <div className="band-head">
            <p className="kicker">Pricing</p>
            <h2 className="headline" id="price-h">
              Start free. Stay because it works.
            </h2>
          </div>
          <div className="pricing">
            <div>
              <p className="kicker">Monthly</p>
              <p className="price">
                <b>{money(PLANS.month.amountCents)}</b>
                <span>a month</span>
              </p>
              <p>Cancel whenever you like.</p>
            </div>
            <div>
              <p className="kicker">Annual</p>
              <p className="price">
                <b>{money(PLANS.year.amountCents)}</b>
                <span>a year</span>
              </p>
              <p>
                {money(annualAsMonthlyCents())} a month, {money(annualSavingCents())} less than paying monthly. A
                twelve month commitment.
              </p>
            </div>
          </div>
          <ul className="terms">
            <li>
              <Check />
              <span>Your first {FREE_BRIEF_ALLOWANCE} briefs are free.</span>
            </li>
            <li>
              <Check />
              <span>Billing starts when your third brief is sent, not before.</span>
            </li>
            <li>
              <Check />
              <span>Cancel during the free briefs and you are never charged.</span>
            </li>
          </ul>
        </section>

        <section className="closing">
          <h2 className="display" style={{ maxWidth: '16ch' }}>
            Next week&rsquo;s brief could have <em>your next role in it.</em>
          </h2>
          <div className="hero-actions">
            <Link href="/signup" className="btn">
              {CTA} <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
