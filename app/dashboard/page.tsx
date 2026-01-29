import { redirect } from 'next/navigation'

import { getSessionUser } from '@/lib/server/authSession'
import DashboardHeader from '@/components/DashboardHeader'
import ConsoleIdentity from '@/components/ConsoleIdentity'
import CorrectionPanel from '@/components/CorrectionPanel'
import DashboardClient from '@/components/DashboardClient'
import InterruptPanel from '@/components/InterruptPanel'
import ProgressPanel from '@/components/ProgressPanel'
import QuestBoard from '@/components/QuestBoard'
import ReflectionPanel from '@/components/ReflectionPanel'
import SignalField from '@/components/SignalField'

export default async function DashboardPage() {
  const session = await getSessionUser()
  if (!session) {
    redirect('/login')
  }

  return (
    <main className="hero-sky relative min-h-screen">
      <SignalField className="pointer-events-none fixed inset-0 z-0 opacity-70" />
      <div className="grid-halo relative z-10 min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
          <DashboardHeader displayName={session.displayName} />
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <ConsoleIdentity />
            <InterruptPanel />
          </section>
          <QuestBoard />
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <DashboardClient />
            <div className="grid gap-6">
              <ProgressPanel />
              <CorrectionPanel />
            </div>
          </section>
          <ReflectionPanel />
        </div>
      </div>
    </main>
  )
}
