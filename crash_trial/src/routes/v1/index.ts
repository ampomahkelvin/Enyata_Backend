import express from 'express'
import UserRouter from '../../modules/user/user.routes'
import TaskRouter from '../../modules/task/task.routes'

const appRouter = express.Router()

appRouter.use('/user', UserRouter)
appRouter.use("/task", TaskRouter)

export const router = appRouter