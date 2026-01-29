import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/server/authSession'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const feedbacks = await prisma.feedback.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'desc' },
    take: 8,
    include: {
      entry: {
        select: {
          title: true,
          entryDate: true,
        },
      },
    },
  })

  return NextResponse.json({ feedbacks })
}
