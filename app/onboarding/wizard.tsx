'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChipSet, CompFloor, Field, OptionSet, Segmented } from '@/components/fields'
import { ArrowLeft, ArrowRight } from '@/components/icons'

const STEPS = ['About you', 'Targets', 'Industries', 'Delivery', 'Activate'] as const

const TITLES = [
  'Chief Executive Officer',
  'Chief Financial Officer',
  'Chief Operating Officer',
  'Chief Technology Officer',
  'Chief Marketing Officer',
  'Chief Revenue Officer',
  'Chief People Officer',
  'President',
  'General Manager',
  'Executive Vice President',
  'Senior Vice President',
  'Vice President',
]

const DAYS = [
  { value: 'mon', label: 'Mon', long: 'Mondays' },
  { value: 'tue', label: 'Tue', long: 'Tuesdays' },
  { value: 'wed', label: 'Wed', long: 'Wednesdays' },
  { value: 'thu', label: 'Thu', long: 'Thursdays' },
  { value: 'fri', label: 'Fri', long: 'Fridays' },
  { value: 'sat', label: 'Sat', long: 'Saturdays' },
  { value: 'sun', label: 'Sun', long: 'Sundays' },
] as const
type Day = (typeof DAYS)[number]['value']

const ZONES = ['Eastern', 'Central', 'Mountain', 'Pacific', 'Alaska', 'Hawaii'] as const

type Rank = 'priority' | 'acceptable' | 'excluded'
const RANKS = [
  { value: 'priority', label: 'Priority' },
  { value: 'acceptable', label: 'Acceptable' },
  { value: 'excluded', label: 'Exclude' },
] as const

export interface WizardProps {
  readonly industries: readonly string[]
  readonly geo: readonly { value: string; label: string }[]
  readonly remote: readonly { value: string; label: string }[]
  readonly prices: { readonly month: string; readonly year: string; readonly yearMonthly: string; readonly saving: string }
  readonly freeBriefs: number
  readonly initialStep: number
}

export function Wizard({ industries, geo, remote, prices, freeBriefs, initialStep }: WizardProps) {
  const [step, setStep] = useState(initialStep)
  const [titles, setTitles] = useState<string[]>(['Chief Financial Officer', 'Chief Operating Officer'])
  const [excluded, setExcluded] = useState<string[]>(['Interim'])
  const [floor, setFloor] = useState(350_000)
  const [geoPref, setGeoPref] = useState(geo[0]?.value ?? '')
  const [remotePref, setRemotePref] = useState(remote[2]?.value ?? '')
  const [ranks, setRanks] = useState<Record<string, Rank | undefined>>({
    'Healthcare & Health Services': 'priority',
    'Technology / Software': 'priority',
    'Finance, Banking & Insurance': 'acceptable',
  })
  const [day, setDay] = useState<Day>('thu')
  const [zone, setZone] = useState<string>('Central')
  const [plan, setPlan] = useState<'month' | 'year'>('month')

  const done = step > STEPS.length
  const count = (r: Rank) => Object.values(ranks).filter((v) => v === r).length
  const dayLong = DAYS.find((d) => d.value === day)?.long ?? ''
  const go = (n: number) => {
    setStep(n)
    window.scrollTo({ top: 0 })
  }

  if (done) {
    return (
      <div className="wrap" style={{ paddingBlock: 'clamp(28px, 6vw, 72px)' }}>
        <p className="kicker">You are set</p>
        <h1 className="display" style={{ marginTop: 14, maxWidth: '14ch' }}>
          Your search is set. <em>The first sweep runs tonight.</em>
        </h1>
        <div className="dates" style={{ marginTop: 40, maxWidth: 760 }}>
          <div>
            <p className="kicker">Brief 1</p>
            <strong>Tomorrow morning</strong>
            <span>6:00 am {zone}. Free.</span>
          </div>
          <div>
            <p className="kicker">Brief 2</p>
            <strong>The {dayLong.slice(0, -1)} after next</strong>
            <span>Then every week on {dayLong}. Free.</span>
          </div>
        </div>
        <p className="prose" style={{ marginTop: 24 }}>
          Nothing was charged. Billing starts when your third brief is sent, and you can cancel before then from
          your account.
        </p>
        <div className="hero-actions">
          <Link href="/dashboard?state=first" className="btn">
            Go to your dashboard <ArrowRight />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap wizard">
      <nav className="steps" aria-label="Setup progress">
        <p className="kicker" style={{ marginBottom: 10 }}>
          Step {step} of {STEPS.length}
        </p>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s} className={i + 1 < step ? 'done' : ''} {...(i + 1 === step && { 'aria-current': 'step' as const })}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </li>
          ))}
        </ol>
      </nav>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          go(step + 1)
        }}
      >
        {step === 1 && (
          <>
            <h1 className="headline">Tell us who the brief is for.</h1>
            <p className="prose" style={{ marginTop: 12, marginBottom: 28 }}>
              This is read whole when each role is scored. The more plainly you write, the better the match.
            </p>
            <div className="form-section">
              <div className="grid-2">
                <Field label="Current title">
                  {(id) => <input id={id} className="input" defaultValue="Chief Financial Officer" autoComplete="organization-title" />}
                </Field>
                <Field label="Current company">
                  {(id) => <input id={id} className="input" defaultValue="Harbor Point Health Services" autoComplete="organization" />}
                </Field>
              </div>
              <Field label="City">
                {(id) => <input id={id} className="input" defaultValue="Chicago, IL" autoComplete="address-level2" />}
              </Field>
            </div>
            <div className="form-section">
              <Field label="The role you want, in your own words" hint="The most useful thing you can tell us.">
                {(id) => (
                  <textarea
                    id={id}
                    className="textarea"
                    placeholder="For example: finance chief of a sponsor-backed healthcare company between $300M and $2B in revenue, with a sale or listing ahead of it."
                  />
                )}
              </Field>
              <Field label="Resume summary" hint="Paste the top of your resume or a few lines about your career.">
                {(id) => <textarea id={id} className="textarea" />}
              </Field>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="headline">What should the brief look for?</h1>
            <div className="form-section" style={{ marginTop: 32 }}>
              <ChipSet
                legend="Target titles"
                hint="Choose every title you would take a call about."
                options={TITLES}
                value={titles}
                onChange={setTitles}
                addLabel="Add another title"
              />
            </div>
            <div className="form-section">
              <ChipSet
                legend="Leave out"
                hint="Words in a title that rule a role out."
                options={['Interim', 'Fractional', 'Deputy', 'Regional']}
                value={excluded}
                onChange={setExcluded}
                addLabel="Add a word"
              />
            </div>
            <div className="form-section">
              <CompFloor value={floor} onChange={setFloor} />
            </div>
            <div className="form-section">
              <OptionSet legend="Where" choices={geo} value={geoPref} onChange={setGeoPref} />
              <OptionSet legend="Work style" choices={remote} value={remotePref} onChange={setRemotePref} />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="headline">Which industries?</h1>
            <p className="prose" style={{ marginTop: 12 }}>
              Priority industries score highest. Acceptable ones are still read. Excluded ones never appear. Leave
              the rest unmarked.
            </p>
            <p className="kicker" style={{ marginTop: 20, marginBottom: 10 }} aria-live="polite">
              {count('priority')} priority / {count('acceptable')} acceptable / {count('excluded')} excluded
            </p>
            <div className="form-section">
            <ul className="industry-list">
              {industries.map((name) => (
                <li key={name}>
                  <span>{name}</span>
                  <Segmented
                    label={name}
                    choices={RANKS}
                    value={ranks[name]}
                    clearable
                    onChange={(r) => setRanks((prev) => ({ ...prev, [name]: r }))}
                  />
                </li>
              ))}
            </ul>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="headline">When should it arrive?</h1>
            <div className="form-section" style={{ marginTop: 32 }}>
              <fieldset>
                <legend className="legend">Delivery day</legend>
                <div style={{ marginTop: 12, overflowX: 'auto' }}>
                  <Segmented label="Delivery day" choices={DAYS} value={day} onChange={(d) => d !== undefined && setDay(d)} />
                </div>
              </fieldset>
              <Field label="Your time zone">
                {(id) => (
                  <select id={id} className="select" value={zone} onChange={(e) => setZone(e.target.value)}>
                    {ZONES.map((z) => (
                      <option key={z}>{z}</option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
            <div className="dates">
              <div>
                <p className="kicker">Your brief arrives</p>
                <strong>{dayLong}, 6:00 am</strong>
                <span>{zone} time, before your day starts</span>
              </div>
            </div>
            <p className="notice" style={{ marginTop: 12 }}>
              <strong>Nothing to pay today.</strong>
              <span>The next step asks for a card and charges nothing.</span>
            </p>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="headline">Start your {freeBriefs} free briefs.</h1>
            <div className="form-section" style={{ marginTop: 32 }}>
              <OptionSet
                legend="Plan, from your third brief"
                value={plan}
                onChange={setPlan}
                choices={[
                  { value: 'month', label: `${prices.month} a month`, note: 'Cancel whenever you like.' },
                  {
                    value: 'year',
                    label: `${prices.year} a year`,
                    note: `${prices.yearMonthly} a month, ${prices.saving} less. A twelve month commitment.`,
                  },
                ]}
              />
            </div>
            <div className="form-section">
              <p className="legend">Card</p>
              <div className="card-fields" aria-label="Card details">
                <Field label="Card number">
                  {(id) => <input id={id} className="input num" inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" />}
                </Field>
                <div className="grid-2">
                  <Field label="Expiry">
                    {(id) => <input id={id} className="input num" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" />}
                  </Field>
                  <Field label="Security code">
                    {(id) => <input id={id} className="input num" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" />}
                  </Field>
                </div>
              </div>
              <p className="hint">Held by Stripe. We never see the number.</p>
            </div>
            <dl className="deflist form-section" style={{ marginTop: 12 }}>
              <div>
                <dt>Due today</dt>
                <dd>$0</dd>
              </div>
              <div>
                <dt>Briefs 1 and 2</dt>
                <dd>Free</dd>
              </div>
              <div>
                <dt>From brief 3</dt>
                <dd>{plan === 'month' ? `${prices.month} a month` : `${prices.year} a year`}</dd>
              </div>
            </dl>
          </>
        )}

        <div className="wizard-foot">
          {step > 1 ? (
            <button type="button" className="btn-quiet" onClick={() => go(step - 1)}>
              <ArrowLeft /> Back
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className="btn">
            {step === STEPS.length ? 'Start my briefs' : 'Continue'} <ArrowRight />
          </button>
        </div>
      </form>
    </div>
  )
}
