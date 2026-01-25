import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string().min(2, '用户名至少 2 个字符').max(32),
  email: z.string().email('邮箱格式不正确'),
  displayName: z.string().min(1, '请输入昵称').max(50),
  password: z.string().min(8, '密码至少 8 位'),
})

export const loginSchema = z.object({
  identifier: z.string().min(1, '请输入用户名或邮箱'),
  password: z.string().min(1, '请输入密码'),
})
