import { redirect } from 'next/navigation'

import { getSessionUser } from '@/lib/server/authSession'
import DashboardAntiVision from '@/components/DashboardAntiVision'
import DashboardClient from '@/components/DashboardClient'
import DashboardHeader from '@/components/DashboardHeader'
import DashboardHero from '@/components/DashboardHero'
import IdentitySnapshot from '@/components/IdentitySnapshot'
import LensTabs from '@/components/LensTabs'

export default async function DashboardPage() {
  const session = await getSessionUser()
  if (!session) {
    redirect('/login')
  }

  return (
    <main className="hero-sky min-h-screen">
      <div className="grid-halo min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
          <DashboardHeader displayName={session.displayName} />
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-6">
              <div className="glass-panel rounded-3xl p-6">
                <LensTabs />
              </div>
              <IdentitySnapshot />
            </div>
            <div className="grid gap-6">
              <DashboardHero />
              <div className="glass-panel rounded-3xl p-6">
                <DashboardAntiVision />
              </div>
            </div>
          </section>
          <DashboardClient />
        </div>
      </div>
    </main>
  )
}
