import type { ReactNode } from 'react'
import { Wordmark } from './chrome'
import { ThemeToggle } from './theme-toggle'

/** The four signed-out forms share one frame: the form, and a quiet statement beside it. */
export function AuthShell({
  kicker,
  title,
  children,
  aside,
}: {
  kicker: string
  title: ReactNode
  children: ReactNode
  aside: string
}) {
  return (
    <div className="auth">
      <div className="auth-main">
        <div className="site-head" style={{ paddingBlock: 0 }}>
          <Wordmark />
          <ThemeToggle />
        </div>
        <main id="main" className="auth-form">
          <p className="kicker">{kicker}</p>
          <h1 className="headline">{title}</h1>
          {children}
        </main>
      </div>
      <aside className="auth-aside">
        <p className="kicker">CXOVector</p>
        <blockquote>{aside}</blockquote>
      </aside>
    </div>
  )
}
