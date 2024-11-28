import { TaskRepository } from '../repositories'
import { CreateTaskSchema, UpdateTaskSchema } from '../validation'

export class TaskService {
  static createTask = async (body: CreateTaskSchema) => {
    try {
      const {
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
      } = body
      if (!title || !startDate || !endDate) return
      const task = await TaskRepository.createTask({
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
      })
      return task
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static getAllTasks = async () => {
    try {
      return await TaskRepository.getAllTasks()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static getTaskById = async (id: number) => {
    try {
      return await TaskRepository.getTaskById(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static deleteTaskById = async (id: number) => {
    try {
      return await TaskRepository.deleteTaskById(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static getTasksByUser = async (userId: number) => {
    try {
      return await TaskRepository.getTasksByUser(userId)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static updateTaskById = async (taskId: number, body: UpdateTaskSchema) => {
    const {
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
    } = body

    try {
      const task = await TaskRepository.getTaskById(taskId)

      if (!task) throw new Error('Task not found')

      const updatedTask = await TaskRepository.updateTask({
        id: taskId,
        title: title || task.title,
        description: description || task.description,
        subtask: subtask || task.subtask,
        startDate: startDate || task.startDate,
        endDate: endDate || task.endDate,
        repeat: repeat || task.repeat,
        reminder: reminder || task.reminder,
        category: category || task.category,
        priorityLevel: priorityLevel || task.priorityLevel,
        color: color || task.color,
      })

      return updatedTask
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
