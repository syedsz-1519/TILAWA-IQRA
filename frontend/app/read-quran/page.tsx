'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { MushafReader } from '@/components/quran/MushafReader'

function ReadQuranContent() {
  const searchParams = useSearchParams()
  const surah = Number(searchParams.get('surah')) || 1
  const ayah = Number(searchParams.get('ayah')) || 1

  return <MushafReader initialSurah={surah} initialAyah={ayah} />
}

export default function ReadQuranPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Quran reader...</div>}>
      <ReadQuranContent />
    </Suspense>
  )
}
