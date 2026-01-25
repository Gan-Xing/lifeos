import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/server/authSession'
import { prisma } from '@/lib/prisma'
import { questSchema } from '@/lib/validators/quest'

export async function GET() {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const quests = await prisma.quest.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ quests })
}

export async function POST(request: Request) {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = questSchema.parse(await request.json())
    const quest = await prisma.quest.create({
      data: {
        userId: session.id,
        title: payload.title,
        description: payload.description ?? null,
        level: payload.level,
        dueDate: payload.dueDate ? new Date(payload.dueDate) : null,
        xp: payload.xp ?? 0,
      },
    })

    return NextResponse.json({ quest })
  } catch (error) {
    const message = error instanceof Error ? error.message : '保存失败'
    return NextResponse.json({ message }, { status: 400 })
  }
}
