'use client'

import { Contrast } from './icons'

/**
 * Light or dark, remembered on this device.
 *
 * The page follows the system until the reader chooses; after that the choice
 * is an attribute on <html>, which the stylesheet reads. Storage can be
 * unavailable in a private window, and the toggle still works for the visit.
 */
export function ThemeToggle() {
  const flip = () => {
    const root = document.documentElement
    const dark =
      root.dataset.theme === 'dark' ||
      (root.dataset.theme === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const next = dark ? 'light' : 'dark'
    root.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Nothing to do: the attribute is already set for this visit.
    }
  }
  return (
    <button type="button" className="icon-btn" onClick={flip} aria-label="Switch between light and dark">
      <Contrast />
    </button>
  )
}
