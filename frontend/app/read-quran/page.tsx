'use client'

import { useSearchParams } from 'next/navigation'
import { MushafReader } from '@/components/quran/MushafReader'

export default function ReadQuranPage() {
  const searchParams = useSearchParams()
  const surah = Number(searchParams.get('surah')) || 1
  const ayah = Number(searchParams.get('ayah')) || 1

  return <MushafReader initialSurah={surah} initialAyah={ayah} />
}
