import { Request, Response } from 'express'
import { TaskService } from './services'
import { CreateTaskSchema } from './validation'

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      console.log((req as any).user)
      const body = req.body as CreateTaskSchema
      const newTask = await TaskService.createTask(body)
      res.json({
        status: 201,
        message: 'Task added successfully',
        task: newTask,
      })
    } catch (error) {
      res.json({
        status: 400,
        message: 'error occured while creating task',
      })
    }
  }

  static getAllTasks = async (_: Request, res: Response) => {
    try {
      const tasks = await TaskService.getAllTasks()
      res.json({
        status: 200,
        message: 'Successfully got all tasks',
        length: tasks.length,
        tasks,
      })
    } catch (error) {
      res.json({
        status: 400,
        message: 'Error occured while fetching all tasks',
      })
    }
  }

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const task = await TaskService.getTaskById(parseInt(id))
      res.json({
        status: 200,
        message: 'Successfull got the task',
        task,
      })
    } catch (error) {
      res.json({
        status: 400,
        message: 'Error occured here',
      })
    }
  }

  static deleteTaskById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await TaskService.deleteTaskById(parseInt(id))
      res.json({
        status: 200,
        message: 'Successfully deleted task',
      })
    } catch (error) {
      res.json({
        status: 400,
        message: 'Something went wrong',
      })
    }
  }

  static getTasksByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const tasks = await TaskService.getTasksByUser(parseInt(userId))
      res.json({
        status: 200,
        message: `Gotten all tasks by user ${userId}`,
        length: tasks.length,
        tasks,
      })
    } catch (error) {
      res.json({
        status: 400,
        message: 'Failed to get tasks by user',
      })
    }
  }

  static updateTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const taskBody = req.body

      const updatedTask = await TaskService.updateTaskById(
        parseInt(taskId),
        taskBody,
      )
      res.status(200).json({
        status: 200,
        message: 'Updated user successfully',
        updatedTask,
      })
    } catch (error) {
      res.json({
        status: 400,
        message: 'Failed to update task',
      })
    }
  }
}
