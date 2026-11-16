'use client'

import { useState } from 'react'
import type { RoleCard } from '@/lib/present'
import { ArrowOut, ArrowUp } from './icons'

/**
 * One role, as a card.
 *
 * The three tiers are the same card at three weights. Priority gets a filled
 * score and the most room; Watch an outlined score; Monitor a tinted one on a
 * single line, with the reasoning opened on request so a long Monitor list
 * stays scannable on a phone.
 *
 * The card lays itself out by its own width (a container query), so the same
 * component is three columns in the brief and one in the landing excerpt.
 *
 * Dismiss is local here. Wired up, it calls a server action
 * and the undo calls its reverse.
 */
export function RoleEntry({ role, preview = false }: { role: RoleCard; preview?: boolean }) {
  const [dismissed, setDismissed] = useState(false)
  const [open, setOpen] = useState(false)
  const compact = role.band === 'monitor'
  const whyId = `why-${role.id}`

  if (dismissed) {
    return (
      <div className="entry-gone" role="status">
        <span>
          Dismissed. This role won&rsquo;t come back in any brief.{' '}
          <span className="muted">
            {role.title}, {role.company}
          </span>
        </span>
        <button type="button" className="btn-quiet" onClick={() => setDismissed(false)}>
          Undo
        </button>
      </div>
    )
  }

  const facts = (
    <dl className="facts">
      {role.comp !== undefined && (
        <div>
          <dt>Compensation</dt>
          <dd>{role.comp}</dd>
        </div>
      )}
      {role.posted !== undefined && (
        <div>
          <dt>Posted</dt>
          <dd>{role.posted}</dd>
        </div>
      )}
      <div>
        <dt>Found on</dt>
        <dd>{role.source}</dd>
      </div>
      <div>
        <dt>Link</dt>
        <dd>{role.linkKind}</dd>
      </div>
    </dl>
  )

  const dismiss = !preview && (
    <button type="button" className="btn-quiet" onClick={() => setDismissed(true)}>
      Dismiss
    </button>
  )

  return (
    <article className={`entry entry-${role.band}`} aria-labelledby={`t-${role.id}`}>
      <div className="entry-in">
        <div className={`score score-${role.band}`} aria-label={`Score ${role.score} of 100`}>
          {role.score}
        </div>

        <div className="entry-main">
          {role.movedUpFrom !== undefined && (
            <p className="tag">
              <ArrowUp />
              Moved up from {role.movedUpFrom}
            </p>
          )}
          <h3 className="entry-title" id={`t-${role.id}`}>
            {role.title}
          </h3>
          <p className="entry-org">
            <span className="org">{role.company}</span>
            {role.location !== undefined && <span>{role.location}</span>}
            {role.arrangement !== undefined && <span>{role.arrangement}</span>}
            {compact && role.comp !== undefined && <span className="num">{role.comp}</span>}
          </p>
          {(!compact || open) && (
            <p className="entry-why" id={whyId}>
              {role.rationale}
            </p>
          )}
          {compact && open && facts}
        </div>

        <div className="entry-side">
          {!compact && facts}
          <div className="entry-actions">
            {compact ? (
              <>
                <button
                  type="button"
                  className="btn-quiet"
                  aria-expanded={open}
                  aria-controls={whyId}
                  onClick={() => setOpen((v) => !v)}
                >
                  {open ? 'Hide detail' : 'Why it is here'}
                </button>
                <a className="btn-quiet" href={role.url} target="_blank" rel="noopener noreferrer">
                  Open <ArrowOut />
                </a>
              </>
            ) : (
              <a
                className={role.band === 'priority' ? 'btn btn-small' : 'btn btn-line btn-small'}
                href={role.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open listing <ArrowOut />
              </a>
            )}
            {dismiss}
          </div>
        </div>
      </div>
    </article>
  )
}
