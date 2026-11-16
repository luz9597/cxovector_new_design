import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/auth-shell'

export const metadata: Metadata = { title: 'Sign in' }

export default function Login() {
  return (
    <AuthShell kicker="Sign in" title="Welcome back." aside="Your brief is where you left it.">
      <form action="/dashboard" className="stack" style={{ ['--gap' as string]: '18px' }}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="input" autoComplete="current-password" required />
        </div>
        <button type="submit" className="btn btn-wide">
          Sign in
        </button>
      </form>
      <p className="below">
        <Link href="/reset-password" className="link">
          Forgot your password?
        </Link>
      </p>
      <p className="below">
        New here?{' '}
        <Link href="/signup" className="link">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}
