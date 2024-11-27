import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string(),
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type CreateUserSchema = typeof createUserSchema._type
export type LoginUserSchema = typeof loginUserSchema._type
