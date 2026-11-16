'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChipSet, CompFloor, Field, OptionSet, Segmented } from '@/components/fields'
import { Check } from '@/components/icons'

/**
 * One section of the page, with its own Save.
 *
 * Saving confirms in place and goes nowhere, so changing a
 * delivery day can never lead into a step that asks
 * for a card.
 */
function Panel({
  id,
  title,
  note,
  children,
  save = true,
  danger = false,
}: {
  id: string
  title: string
  note?: string
  children: ReactNode
  save?: boolean
  danger?: boolean
}) {
  const [saved, setSaved] = useState(false)
  return (
    <section
      className={danger ? 'panel panel-danger' : 'panel'}
      id={id}
      aria-labelledby={`${id}-h`}
      onChange={() => setSaved(false)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('.chip, .seg, .option') !== null) setSaved(false)
      }}
    >
      <div className="panel-head">
        <h2 id={`${id}-h`}>{title}</h2>
        {note !== undefined && <p>{note}</p>}
      </div>
      <div className="stack" style={{ ['--gap' as string]: '24px' }}>
        {children}
      </div>
      {save && (
        <div className="panel-foot">
          <button type="button" className="btn" onClick={() => setSaved(true)}>
            Save changes
          </button>
          <span className="saved" role="status">
            {saved && (
              <>
                <Check /> Saved
              </>
            )}
          </span>
        </div>
      )}
    </section>
  )
}

const DAYS = [
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu' },
  { value: 'fri', label: 'Fri' },
  { value: 'sat', label: 'Sat' },
  { value: 'sun', label: 'Sun' },
] as const

type Rank = 'priority' | 'acceptable' | 'excluded'
const RANKS = [
  { value: 'priority', label: 'Priority' },
  { value: 'acceptable', label: 'Acceptable' },
  { value: 'excluded', label: 'Exclude' },
] as const

export interface SettingsProps {
  readonly email: string
  readonly industries: readonly string[]
  readonly geo: readonly { value: string; label: string }[]
  readonly remote: readonly { value: string; label: string }[]
  readonly planLine: string
  readonly invoices: readonly { date: string; amount: string }[]
  readonly initial: {
    readonly titles: readonly string[]
    readonly excluded: readonly string[]
    readonly floor: number
    readonly ranks: Readonly<Record<string, Rank>>
  }
}

export function Settings({ email, industries, geo, remote, planLine, invoices, initial }: SettingsProps) {
  const [titles, setTitles] = useState<string[]>([...initial.titles])
  const [excluded, setExcluded] = useState<string[]>([...initial.excluded])
  const [floor, setFloor] = useState(initial.floor)
  const [geoPref, setGeoPref] = useState(geo[0]?.value ?? '')
  const [remotePref, setRemotePref] = useState(remote[2]?.value ?? '')
  const [ranks, setRanks] = useState<Record<string, Rank | undefined>>({ ...initial.ranks })
  const [day, setDay] = useState<(typeof DAYS)[number]['value']>('thu')
  const [confirmClear, setConfirmClear] = useState(false)
  const [cleared, setCleared] = useState(false)
  const [typed, setTyped] = useState('')

  const clear = () => {
    setTitles([])
    setExcluded([])
    setRanks({})
    setFloor(150_000)
    setConfirmClear(false)
    setCleared(true)
  }

  return (
    <div>
      <Panel id="search" title="Search" note="What each brief is scored against. Changes apply from your next brief.">
        <ChipSet
          legend="Target titles"
          options={['Chief Financial Officer', 'Chief Operating Officer', 'Chief Executive Officer', 'President', 'Senior Vice President']}
          value={titles}
          onChange={setTitles}
          addLabel="Add another title"
        />
        <ChipSet legend="Leave out" options={['Interim', 'Fractional', 'Deputy']} value={excluded} onChange={setExcluded} addLabel="Add a word" />
        <CompFloor value={floor} onChange={setFloor} />
        <OptionSet legend="Where" choices={geo} value={geoPref} onChange={setGeoPref} />
        <OptionSet legend="Work style" choices={remote} value={remotePref} onChange={setRemotePref} />
      </Panel>

      <Panel id="industries" title="Industries" note="Priority scores highest. Excluded never appears.">
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
      </Panel>

      <Panel id="delivery" title="Delivery" note="Your brief arrives at 6:00 am in your time zone.">
        <fieldset>
          <legend className="legend">Delivery day</legend>
          <div style={{ marginTop: 12, overflowX: 'auto' }}>
            <Segmented label="Delivery day" choices={DAYS} value={day} onChange={(d) => d !== undefined && setDay(d)} />
          </div>
        </fieldset>
        <Field label="Time zone">
          {(id) => (
            <select id={id} className="select" defaultValue="Central">
              {['Eastern', 'Central', 'Mountain', 'Pacific', 'Alaska', 'Hawaii'].map((z) => (
                <option key={z}>{z}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Email" hint="Where the brief is sent, and how you sign in.">
          {(id) => <input id={id} className="input" type="email" defaultValue={email} autoComplete="email" />}
        </Field>
      </Panel>

      <Panel id="billing" title="Billing" save={false}>
        <dl className="deflist">
          <div>
            <dt>Plan</dt>
            <dd>{planLine}</dd>
          </div>
          <div>
            <dt>Next charge</dt>
            <dd>December 3, 2026</dd>
          </div>
          <div>
            <dt>Card</dt>
            <dd className="num">Visa ending 4242</dd>
          </div>
        </dl>
        <div className="panel-foot" style={{ marginTop: 0 }}>
          <button type="button" className="btn btn-line btn-small">
            Update card
          </button>
          <button type="button" className="btn-quiet">
            Cancel plan
          </button>
        </div>
        <p className="hint">To move to the annual plan, write to us and we will switch it for you.</p>
        <div className="table-scroll">
          <table className="ledger" style={{ minWidth: 0 }}>
            <caption className="kicker">Invoices</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col" className="r">
                  Amount
                </th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.date}>
                  <td>{inv.date}</td>
                  <td className="r">{inv.amount}</td>
                  <td className="r">
                    <a href="#" className="link" aria-label={`Receipt for ${inv.date}`}>
                      Receipt
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel
        id="data"
        title="Your data"
        note="Clearing resets your search and nothing else. Your plan, your past briefs and the list of roles you have already seen are kept."
        save={false}
      >
        {cleared && (
          <p className="saved" role="status">
            <Check /> Search parameters cleared
          </p>
        )}
        {confirmClear ? (
          <div className="notice">
            <strong>Clear every search parameter?</strong>
            <span>Titles, industries, pay floor and location go back to empty. Briefs pause until you set them again.</span>
            <div className="panel-foot" style={{ marginTop: 8 }}>
              <button type="button" className="btn btn-small" onClick={clear}>
                Yes, clear them
              </button>
              <button type="button" className="btn-quiet" onClick={() => setConfirmClear(false)}>
                Keep them
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button type="button" className="btn btn-line" onClick={() => setConfirmClear(true)}>
              Clear all search parameters
            </button>
          </div>
        )}
      </Panel>

      <Panel
        id="delete"
        title="Delete account"
        note="Ends any plan first, then removes your profile and every brief. This cannot be undone."
        save={false}
        danger
      >
        <Field label="Type DELETE to confirm">
          {(id) => (
            <input
              id={id}
              className="input"
              style={{ maxWidth: 280 }}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoComplete="off"
            />
          )}
        </Field>
        <div>
          <button type="button" className="btn btn-danger" disabled={typed !== 'DELETE'}>
            Delete my account
          </button>
        </div>
      </Panel>
    </div>
  )
}
