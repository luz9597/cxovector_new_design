import type { Metadata } from 'next'
import Link from 'next/link'
import { FREE_BRIEF_ALLOWANCE } from '@/lib/core'
import { AuthShell } from '@/components/auth-shell'

export const metadata: Metadata = { title: 'Create an account' }

export default function Signup() {
  return (
    <AuthShell
      kicker="Create an account"
      title={`Start with ${FREE_BRIEF_ALLOWANCE} free briefs.`}
      aside="Every listing that matters. Matched to you, and only what is new."
    >
      <form action="/verify-email" className="stack" style={{ ['--gap' as string]: '18px' }}>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" className="input" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <span className="hint">A personal address. Your brief is sent here.</span>
          <input id="email" name="email" type="email" className="input" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <span className="hint">At least 10 characters, with a capital letter, a number and a symbol.</span>
          <input id="password" name="password" type="password" className="input" autoComplete="new-password" minLength={10} required />
        </div>
        <button type="submit" className="btn btn-wide">
          Create account
        </button>
      </form>
      <p className="below">
        By creating an account you agree to the <a href="#" className="link">Terms of Use</a> and{' '}
        <a href="#" className="link">Privacy Policy</a>.
      </p>
      <p className="below">
        Already have an account?{' '}
        <Link href="/login" className="link">
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}
