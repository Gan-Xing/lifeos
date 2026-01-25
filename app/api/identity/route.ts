import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/server/authSession'
import { prisma } from '@/lib/prisma'
import { identitySchema } from '@/lib/validators/identity'

export async function GET() {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const profile = await prisma.identityProfile.findUnique({
    where: { userId: session.id },
  })

  return NextResponse.json({ profile })
}

export async function POST(request: Request) {
  const session = await getSessionUser()
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = identitySchema.parse(await request.json())
    const profile = await prisma.identityProfile.upsert({
      where: { userId: session.id },
      update: {
        identityStatement: payload.identityStatement,
        visionMvp: payload.visionMvp,
        antiVision: payload.antiVision,
        constraints: payload.constraints ?? null,
      },
      create: {
        userId: session.id,
        identityStatement: payload.identityStatement,
        visionMvp: payload.visionMvp,
        antiVision: payload.antiVision,
        constraints: payload.constraints ?? null,
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    const message = error instanceof Error ? error.message : '保存失败'
    return NextResponse.json({ message }, { status: 400 })
  }
}
