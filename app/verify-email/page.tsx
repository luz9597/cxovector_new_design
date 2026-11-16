import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/auth-shell'
import { SUBSCRIBER } from '@/lib/mock'

export const metadata: Metadata = { title: 'Confirm your email' }

export default function VerifyEmail() {
  return (
    <AuthShell kicker="One step first" title="Confirm your email address." aside="Discreet by design. Your search is yours alone.">
      <p className="prose" style={{ marginTop: 20 }}>
        We sent a link to <strong style={{ color: 'var(--ink)' }}>{SUBSCRIBER.email}</strong>. Open it on this device
        and setup comes next.
      </p>
      <div className="stack" style={{ marginTop: 28, ['--gap' as string]: '12px' }}>
        <button type="button" className="btn btn-line btn-wide">
          Send the link again
        </button>
        <Link href="/onboarding" className="btn-quiet">
          I have confirmed it
        </Link>
      </div>
      <p className="below">
        Wrong address?{' '}
        <Link href="/signup" className="link">
          Start again
        </Link>
      </p>
    </AuthShell>
  )
}
