import express from 'express'
import { TaskController } from './task.controller'
import { ValidationMiddleware } from '../../shared/validators/task-middleware'
import { createTaskSchema } from './validation'
import { UserAuthMiddleware } from '../user/middleware/auth-middleware'

const router = express.Router()

router.post("/create", UserAuthMiddleware.tokenGuard,ValidationMiddleware.validateRequest(createTaskSchema), TaskController.createTask)
router.get("/", TaskController.getAllTasks)
router.get("/:id", TaskController.getTaskById)
router.delete("/delete/:id", TaskController.deleteTaskById)
router.get("/get/:userId", TaskController.getTasksByUser)
router.put("/update/:taskId", TaskController.updateTaskById)

export default router