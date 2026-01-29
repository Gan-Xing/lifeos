import { redirect } from 'next/navigation'

import DashboardHeader from '@/components/DashboardHeader'
import ResetProtocol from '@/components/ResetProtocol'
import SignalField from '@/components/SignalField'
import { getSessionUser } from '@/lib/server/authSession'

export default async function ResetPage() {
  const session = await getSessionUser()
  if (!session) {
    redirect('/login')
  }

  return (
    <main className="hero-sky relative min-h-screen">
      <SignalField className="pointer-events-none fixed inset-0 z-0 opacity-80" />
      <div className="grid-halo relative z-10 min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-12">
          <DashboardHeader displayName={session.displayName} />
          <ResetProtocol />
        </div>
      </div>
    </main>
  )
}
