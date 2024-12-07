import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { ROUTES, router } from '../routes/routes'
import session from 'express-session'
import Env from '../shared/utils/env'
import passport from 'passport'
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth2'
import { UserRepository } from '../modules/user/repositories'
import { ApiError } from '../shared/utils/api.error'
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

  app.use(passport.initialize())
  app.use(passport.session())

  const clientId = Env.get('GOOGLE_CLIENT_ID')
  const clientSecret = Env.get('GOOGLE_CLIENT_SECRET')

  if (!clientId) {
    console.error('Google OAuth2 clientID is required.')
  }

  if (!clientSecret) {
    console.error('ClientSecret is required.')
    process.exit(1) // Exit the process if the environment variables are missing
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: Env.get('GOOGLE_CLIENT_ID'),
        clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
        callbackURL: 'http://localhost:4000/api/v1/user/auth/google/callback',
        passReqToCallback: true,
      },
      async function (
        _request: Request,
        _accessToken: string,
        _refreshToken: string,
        profile: passport.Profile,
        done: VerifyCallback,
      ) {
        const email = profile.emails?.[0].value
       try {
        if (email) {
          if (await UserRepository.getUserByEmail(email)) {

            return done(null, profile)
          }
        } 
        throw new Error('User not found')

       } catch (error) {  
        console.log(error)
        throw error
       }
      },
    ),
  )
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (id, done) {
    done(null, { id })
  })

  app.get('/', (_: Request, res: Response) => {
    res.send('Project Express + TypeScript Server')
  })

  app.use(ROUTES.V1_PATH, router)

  app.use(ApiError.genericError)

  return app
}
