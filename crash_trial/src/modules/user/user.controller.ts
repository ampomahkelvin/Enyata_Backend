import { Request, Response } from 'express'
import { UserService } from './services'
import { CreateUserSchema, LoginUserSchema } from './validation'

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    const body = req.body as CreateUserSchema
    // const myPrivateKey = process.env.JWT_SECRET
    // const { email, phoneNumber, password } = req.body

    try {
      if (!body.email || !body.password || !body.phoneNumber) {
        res.status(400).json({
          status: 400,
          message: 'Missing required fields.',
        })
      }

      const { newUser, token } = await UserService.createUser(body)

      res.status(201).json({
        status: 201,
        message: 'User created',
        token,
        user: newUser,
      })
    } catch (error) {
      console.error('Error creating user:', error)
      res.json({
        status: 401,
        message: 'Something went wrong',
      })
    }
  }

  static loginUser = async (req: Request, res: Response) => {
    const body = req.body as LoginUserSchema

    try {
      if (!body.email || !body.password)
        res.json({ status: 400, message: 'Missing fields' })

      const { user } = await UserService.loginUser({
        email: body.email,
        password: body.password,
      })

      if (!user)
        res.json({ status: 400, message: 'Email or password is incorrect' })

      console.log(req.session)

      req.session!.user = {
        id: user.id,
        email: user.email,
      }

      res.json({
        status: 200,
        message: 'Login successful',
        // token,
        user,
      })
    } catch (error) {
      console.log(`error logging in: ${error}`)
      throw error
    }
  }

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        throw new Error('Login first')
      }
      const users = await UserService.getAllUsers()
      res.status(200).json({
        status: 200,
        message: 'Successfully got all users',
        length: users.length,
        users,
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: 400,
        message: 'Something went wrong',
      })
    }
  }

  static getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user = await UserService.getUserById(parseInt(id))
      if (!user) {
        res.json({
          status: 400,
          message: 'Something went wrong',
        })
        return
      }
      res.status(200).json({
        status: 200,
        message: 'Got all users successfully',
        user,
      })
    } catch (error) {
      res.json({
        status: 400,
        message: 'Something went wrong',
      })
    }
  }

  static deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await UserService.deleteUserById(parseInt(id))
      res.status(200).json({
        status: 200,
        message: 'Deleted user successfully',
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: 400,
        message: 'Something went wrong',
      })
    }
  }

  static updateUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { email, phoneNumber, password } = req.body
      const user = await UserService.updateUserById(
        email,
        password,
        phoneNumber,
        parseInt(id),
      )
      if (!user) {
        res.json({
          status: 400,
          message: 'User not found',
        })
        return
      }
      res.status(200).json({
        status: 200,
        message: 'Updated user successfully',
        user,
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: 400,
        message: 'Something went wrong',
      })
    }
  }
}
