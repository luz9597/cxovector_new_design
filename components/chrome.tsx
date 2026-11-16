import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Wordmark({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="wordmark" aria-label="CXOVector, home">
      <b>CXO</b>
      <i>Vector</i>
    </Link>
  )
}

type Mode = 'marketing' | 'app' | 'bare'

/** One header, three sets of links: a visitor, a subscriber, and a form with nothing to leave for. */
export function SiteHeader({ mode, current }: { mode: Mode; current?: string }) {
  const here = (href: string) => (current === href ? ({ 'aria-current': 'page' } as const) : {})
  return (
    <header className="wrap site-head">
      <Wordmark href={mode === 'app' ? '/dashboard' : '/'} />
      <nav className="site-nav" aria-label="Main">
        {mode === 'marketing' && (
          <>
            <a href="/#how">How it works</a>
            <Link href="/brief/7">Sample brief</Link>
            <a href="/#pricing">Pricing</a>
            <Link href="/login">Sign in</Link>
          </>
        )}
        {mode === 'app' && (
          <>
            <Link href="/dashboard" {...here('/dashboard')}>
              Dashboard
            </Link>
            <Link href="/brief/7" {...here('/brief')}>
              Latest brief
            </Link>
            <Link href="/account" {...here('/account')}>
              Account
            </Link>
          </>
        )}
        <ThemeToggle />
        {mode === 'marketing' && (
          <Link href="/signup" className="btn btn-small">
            Start free
          </Link>
        )}
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="wrap">
      <div className="site-foot">
        <span>© 2026 CXOVector. Prepared for one reader at a time.</span>
        <nav aria-label="Footer">
          <Link href="/review">All screens</Link>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
