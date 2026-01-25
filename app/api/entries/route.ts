import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/server/authSession'
import { prisma } from '@/lib/prisma'
import { entrySchema } from '@/lib/validators/entry'

export async function GET() {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const entries = await prisma.entry.findMany({
    where: { userId: session.id },
    orderBy: { entryDate: 'desc' },
    take: 30,
  })

  return NextResponse.json({ entries })
}

export async function POST(request: Request) {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = entrySchema.parse(await request.json())
    const entry = await prisma.entry.create({
      data: {
        userId: session.id,
        title: payload.title,
        narrative: payload.narrative,
        identityStatement: payload.identityStatement ?? null,
        antiVision: payload.antiVision ?? null,
        microAction: payload.microAction ?? null,
        alignmentScore: payload.alignmentScore ?? null,
        energyScore: payload.energyScore ?? null,
        moodScore: payload.moodScore ?? null,
      },
    })

    return NextResponse.json({ entry })
  } catch (error) {
    const message = error instanceof Error ? error.message : '保存失败'
    return NextResponse.json({ message }, { status: 400 })
  }
}
