import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BriefDocument } from '@/components/brief-document'
import { SiteFooter, SiteHeader } from '@/components/chrome'
import { getBrief } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `Brief No. ${id}` }
}

export default async function BriefPage({ params }: Props) {
  const { id } = await params
  const brief = getBrief(Number(id))
  if (brief === null) notFound()
  return (
    <>
      <SiteHeader mode="app" current="/brief" />
      <main id="main">
        <BriefDocument brief={brief} />
      </main>
      <SiteFooter />
    </>
  )
}
