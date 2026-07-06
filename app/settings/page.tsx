import type { Metadata } from 'next'
import { Settings } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { SettingsPanel } from '@/components/settings-panel'

export const metadata: Metadata = {
  title: 'Settings | TILAWA',
  description: 'Customize your TILAWA experience — theme, playback speed, repeat mode, and reciter.',
}

export default function SettingsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-32">
        <PageHero
          icon={Settings}
          eyebrow="Settings"
          title="Make TILAWA yours"
          description="Switch between light and dark themes, set your default playback preferences, and manage your reciter."
        />
        <section aria-label="App settings" className="mx-auto max-w-3xl px-4 py-12">
          <SettingsPanel />
        </section>
      </main>
    </>
  )
}
