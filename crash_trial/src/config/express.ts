import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { ROUTES, router } from '../routes/routes'
import session from 'express-session'
import Env from '../shared/utils/env'
import passport from 'passport'
// import path from 'path';

export default function App(): Express {
  const app = express()

  const corsOptions = {
    origin: '*',
    credentials: true,
  }
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(
    session({
      secret: Env.get('SECRET'),
      resave: false,
      saveUninitialized: true,
    }),
  )

  app.use(passport.initialize()) // init passport on every route call
  app.use(passport.session())

  app.get('/', (_: Request, res: Response) => {
    res.send('Project Express + TypeScript Server')
  })

  app.use(ROUTES.V1_PATH, router)

  return app
}
