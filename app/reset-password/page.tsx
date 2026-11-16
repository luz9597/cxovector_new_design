import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/auth-shell'

export const metadata: Metadata = { title: 'Reset your password' }

export default function ResetPassword() {
  return (
    <AuthShell kicker="Password reset" title="Reset your password." aside="Your brief is where you left it.">
      <p className="prose" style={{ marginTop: 20 }}>
        Enter the address you signed up with. If there is an account for it, a reset link is on its way.
      </p>
      <form action="/login" className="stack" style={{ ['--gap' as string]: '18px' }}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" required />
        </div>
        <button type="submit" className="btn btn-wide">
          Send reset link
        </button>
      </form>
      <p className="below">
        <Link href="/login" className="link">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  )
}
