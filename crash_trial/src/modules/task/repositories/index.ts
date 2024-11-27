import { sqlQuest } from '../../../config/database'
import { taskQueries } from '../queries'
import { CreateTaskSchema, UpdateTaskSchema } from '../validation'

export class TaskRepository {
  static createTask = async ({
    title,
    description,
    userId,
    subtask,
    startDate,
    endDate,
    repeat,
    reminder,
    category,
    priorityLevel,
    color,
  }: CreateTaskSchema) => {
    try {
      const task = await sqlQuest.one(taskQueries.createTask, [
        title,
        description,
        userId,
        subtask,
        startDate,
        endDate,
        repeat,
        reminder,
        category,
        priorityLevel,
        color,
      ])
      return task
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static getAllTasks = async () => {
    try {
      return await sqlQuest.manyOrNone(taskQueries.getAllTasks)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static getTaskById = async (id: number) => {
    try {
      return await sqlQuest.oneOrNone(taskQueries.getTaskById, [id])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static deleteTaskById = async (id: number) => {
    try {
      return await sqlQuest.none(taskQueries.deleteTaskById, [id])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static getTasksByUser = async (userId: number) => {
    try {
      return await sqlQuest.manyOrNone(taskQueries.getTasksByUser, [userId])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static updateTask = async ({
    title,
    description,
    subtask,
    startDate,
    endDate,
    repeat,
    reminder,
    category,
    priorityLevel,
    color,
    id,
  }: UpdateTaskSchema) => {
    try {
      return await sqlQuest.one(taskQueries.updateTask, [
        title,
        description,
        subtask,
        startDate,
        endDate,
        repeat,
        reminder,
        category,
        priorityLevel,
        color,
        id,
      ])
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
