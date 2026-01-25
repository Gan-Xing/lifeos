import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/server/authSession'

export async function GET() {
  const session = await getSessionUser()
  return NextResponse.json({ session })
}
