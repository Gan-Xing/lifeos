import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/auth/password'

export interface AuthUser {
  id: number
  username: string
  email: string
  displayName: string
}

const mapUser = (user: { id: number; username: string; email: string; displayName: string }): AuthUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  displayName: user.displayName,
})

export const registerUser = async (payload: {
  username: string
  email: string
  displayName: string
  password: string
}) => {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { username: payload.username.toLowerCase() },
        { email: payload.email.toLowerCase() },
      ],
    },
    select: { id: true },
  })

  if (existing) {
    throw new Error('用户名或邮箱已存在')
  }

  const user = await prisma.user.create({
    data: {
      username: payload.username.toLowerCase(),
      email: payload.email.toLowerCase(),
      displayName: payload.displayName,
      passwordHash: hashPassword(payload.password),
    },
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
    },
  })

  return mapUser(user)
}

export const loginUser = async (usernameOrEmail: string, password: string) => {
  const normalized = usernameOrEmail.trim().toLowerCase()
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: normalized }, { email: normalized }],
    },
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
      passwordHash: true,
    },
  })

  if (!user) {
    throw new Error('用户不存在')
  }

  if (!verifyPassword(password, user.passwordHash)) {
    throw new Error('密码错误')
  }

  return mapUser(user)
}
