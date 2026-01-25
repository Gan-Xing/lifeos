import { NextResponse } from 'next/server'

import { registerSchema } from '@/lib/validators/auth'
import { registerUser } from '@/lib/server/authStore'
import { issueSession } from '@/lib/server/authSession'

export async function POST(request: Request) {
  try {
    const payload = registerSchema.parse(await request.json())
    const user = await registerUser(payload)
    const session = await issueSession(user)
    return NextResponse.json({ session })
  } catch (error) {
    const message = error instanceof Error ? error.message : '注册失败'
    return NextResponse.json({ message }, { status: 400 })
  }
}
