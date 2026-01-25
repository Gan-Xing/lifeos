import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/server/authSession'
import { prisma } from '@/lib/prisma'
import { reflectionSchema } from '@/lib/validators/reflection'

export async function GET() {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const reflections = await prisma.reflection.findMany({
    where: { userId: session.id },
    orderBy: { entryDate: 'desc' },
    take: 30,
  })

  return NextResponse.json({ reflections })
}

export async function POST(request: Request) {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = reflectionSchema.parse(await request.json())
    const reflection = await prisma.reflection.create({
      data: {
        userId: session.id,
        aliveMoments: payload.aliveMoments,
        numbMoments: payload.numbMoments,
        enemyInsight: payload.enemyInsight,
        nextIntent: payload.nextIntent,
      },
    })

    return NextResponse.json({ reflection })
  } catch (error) {
    const message = error instanceof Error ? error.message : '保存失败'
    return NextResponse.json({ message }, { status: 400 })
  }
}
