import type { Metadata } from 'next'
import {
  FREE_BRIEF_ALLOWANCE,
  GEO_LABELS,
  GEO_PREFERENCES,
  INDUSTRY_TAGS,
  PLANS,
  REMOTE_LABELS,
  REMOTE_PREFERENCES,
  annualAsMonthlyCents,
  annualSavingCents,
  money,
} from '@/lib/core'
import { SiteHeader } from '@/components/chrome'
import { Wizard } from './wizard'

export const metadata: Metadata = { title: 'Set up your brief' }

// No dashes in anything a subscriber reads,
// whatever a label carries.
const plain = (s: string): string => s.replace(/\s[—–]\s/g, ', ')

export default async function Onboarding({ searchParams }: { searchParams: Promise<{ step?: string }> }) {
  const { step } = await searchParams
  const n = Number(step)
  return (
    <>
      <SiteHeader mode="bare" />
      <main id="main">
        <div className="wrap">
          <div className="rule-double" />
        </div>
        <Wizard
          industries={INDUSTRY_TAGS}
          geo={GEO_PREFERENCES.map((value) => ({ value, label: plain(GEO_LABELS[value]) }))}
          remote={REMOTE_PREFERENCES.map((value) => ({ value, label: plain(REMOTE_LABELS[value]) }))}
          prices={{
            month: money(PLANS.month.amountCents),
            year: money(PLANS.year.amountCents),
            yearMonthly: money(annualAsMonthlyCents()),
            saving: money(annualSavingCents()),
          }}
          freeBriefs={FREE_BRIEF_ALLOWANCE}
          initialStep={Number.isInteger(n) && n >= 1 && n <= 6 ? n : 1}
        />
      </main>
    </>
  )
}
