import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  subtask: z.string().array().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  repeat: z.string().optional(),
  reminder: z.string().optional(),
  category: z.string().optional(),
  priorityLevel: z.string().optional(),
  color: z.string().optional(),
  userId: z.number(),
})

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  subtask: z.string().array().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  repeat: z.string().optional(),
  reminder: z.string().optional(),
  category: z.string().optional(),
  priorityLevel: z.string().optional(),
  color: z.string().optional(),
  id: z.number(),
})

export type CreateTaskSchema = typeof createTaskSchema._type
export type UpdateTaskSchema = typeof updateTaskSchema._type
