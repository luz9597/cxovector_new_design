'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'

/** A labelled text field. The label is always visible; a placeholder is only ever an example. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: (id: string) => ReactNode
}) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint !== undefined && <span className="hint">{hint}</span>}
      {children(id)}
    </div>
  )
}

/** Pick any number from a list, and add ones that are not on it. */
export function ChipSet({
  legend,
  hint,
  options,
  value,
  onChange,
  addLabel,
}: {
  legend: string
  hint?: string
  options: readonly string[]
  value: readonly string[]
  onChange: (next: string[]) => void
  addLabel?: string
}) {
  const [draft, setDraft] = useState('')
  const id = useId()
  const all = [...options, ...value.filter((v) => !options.includes(v))]
  const toggle = (v: string) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  const add = () => {
    const v = draft.trim()
    if (v !== '' && !value.includes(v)) onChange([...value, v])
    setDraft('')
  }
  return (
    <fieldset>
      <legend className="legend">{legend}</legend>
      {hint !== undefined && <p className="hint" style={{ marginTop: 4 }}>{hint}</p>}
      <div className="chips" style={{ marginTop: 12 }}>
        {all.map((o) => (
          <button key={o} type="button" className="chip" aria-pressed={value.includes(o)} onClick={() => toggle(o)}>
            {o}
          </button>
        ))}
      </div>
      {addLabel !== undefined && (
        <div className="chip-add">
          <label htmlFor={id} className="skip">
            {addLabel}
          </label>
          <input
            id={id}
            className="input"
            value={draft}
            placeholder={addLabel}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                add()
              }
            }}
          />
          <button type="button" className="btn btn-line btn-small" onClick={add}>
            Add
          </button>
        </div>
      )}
    </fieldset>
  )
}

export interface Choice<T extends string> {
  readonly value: T
  readonly label: string
  readonly note?: string
}

/** One of a few, each with room for a line of explanation. */
export function OptionSet<T extends string>({
  legend,
  choices,
  value,
  onChange,
}: {
  legend: string
  choices: readonly Choice<T>[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <fieldset>
      <legend className="legend">{legend}</legend>
      <div className="options" style={{ marginTop: 12 }}>
        {choices.map((c) => (
          <button
            key={c.value}
            type="button"
            className="option"
            aria-pressed={value === c.value}
            onClick={() => onChange(c.value)}
          >
            <b>{c.label}</b>
            {c.note !== undefined && <span>{c.note}</span>}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** One of a few, side by side. Pressing the chosen one again clears it when `clearable`. */
export function Segmented<T extends string>({
  label,
  choices,
  value,
  onChange,
  clearable = false,
}: {
  label: string
  choices: readonly { value: T; label: string }[]
  value: T | undefined
  onChange: (next: T | undefined) => void
  clearable?: boolean
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {choices.map((c) => (
        <button
          key={c.value}
          type="button"
          aria-pressed={value === c.value}
          onClick={() => onChange(clearable && value === c.value ? undefined : c.value)}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

const dollars = (n: number): string => (n >= 1_000_000 ? '$1M+' : `$${Math.round(n / 1_000)}k`)

/** A pay floor: drag it, and read the figure in the size it deserves. */
export function CompFloor({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>Compensation floor</label>
      <span className="hint">Base salary. Roles that state less are left out.</span>
      <div className="range-row">
        <input
          id={id}
          type="range"
          min={150_000}
          max={1_000_000}
          step={10_000}
          value={value}
          aria-valuetext={dollars(value)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <output htmlFor={id}>{dollars(value)}</output>
      </div>
    </div>
  )
}
