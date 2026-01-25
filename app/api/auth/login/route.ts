import { NextResponse } from 'next/server'

import { loginSchema } from '@/lib/validators/auth'
import { loginUser } from '@/lib/server/authStore'
import { issueSession } from '@/lib/server/authSession'

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json())
    const user = await loginUser(payload.identifier, payload.password)
    const session = await issueSession(user)
    return NextResponse.json({ session })
  } catch (error) {
    const message = error instanceof Error ? error.message : '登录失败'
    return NextResponse.json({ message }, { status: 400 })
  }
}
