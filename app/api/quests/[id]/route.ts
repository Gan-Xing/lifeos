import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/server/authSession'
import { prisma } from '@/lib/prisma'
import { questUpdateSchema } from '@/lib/validators/quest'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const questId = Number(id)
  if (!Number.isInteger(questId)) {
    return NextResponse.json({ message: 'Invalid id' }, { status: 400 })
  }

  try {
    const payload = questUpdateSchema.parse(await request.json())
    const existing = await prisma.quest.findFirst({
      where: { id: questId, userId: session.id },
    })
    if (!existing) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    const quest = await prisma.quest.update({
      where: { id: questId },
      data: {
        title: payload.title,
        description: payload.description ?? undefined,
        dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
        xp: payload.xp ?? undefined,
        status: payload.status,
        parentQuestId: payload.parentQuestId ?? undefined,
      },
    })

    return NextResponse.json({ quest })
  } catch (error) {
    const message = error instanceof Error ? error.message : '更新失败'
    return NextResponse.json({ message }, { status: 400 })
  }
}
