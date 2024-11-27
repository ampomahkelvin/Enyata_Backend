import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories'
import { CreateUserSchema, LoginUserSchema } from '../validation'
import Env from '../../../shared/utils/env'

export class UserService {
  static createUser = async (body: CreateUserSchema) => {
    try {
      const { email, password, phoneNumber } = body

      const user = await UserRepository.getUserByEmail(email)
      if (user) throw new Error('Email already in use')

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await UserRepository.createUser(email, hashedPassword, phoneNumber)
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        Env.get<string>('SECRET'),
        { expiresIn: '10d' },
      )

      return {newUser, token}
    } catch (error) {
      throw error
    }
  }

  static loginUser = async (body: LoginUserSchema) => {
    try {
      const { email, password } = body
      const user = await UserRepository.getUserByEmail(email)
      if (!user) throw new Error('User does not exist. Create an account')

      const isPassword = await bcrypt.compare(password, user.password)
      if (!isPassword) throw new Error('Invalid email or password')

      // const token = jwt.sign(
      //   { id: user.id, email: user.email },
      //   Env.get<string>('SECRET'),
      //   { expiresIn: '10d' },
      // )

      return {user}
    } catch (error) {
      console.log(`error logging in user: ${error}`)
      throw error
    }
  }

  static getAllUsers = async () => {
    try {
      return await UserRepository.getAllUsers()
    } catch (error) {
      throw error
    }
  }

  static getUserById = async (id: number) => {
    try {
      return await UserRepository.getUserById(id)
    } catch (error) {
      throw error
    }
  }

  static deleteUserById = async (id: number) => {
    try {
      return await UserRepository.deleteUserById(id)
    } catch (error) {
      throw error
    }
  }

  static updateUserById = async (
    email: string,
    password: string,
    phoneNumber: string,
    id: number,
  ) => {
    try {
      const user = await UserRepository.getUserById(id)

      if (!user) throw new Error('User not found')

      return await UserRepository.updateUserById({
        email: email || user.email,
        password: password || user.password,
        phoneNumber: phoneNumber || user.phoneNumber,
        id,
      })
    } catch (error) {
      throw error
    }
  }
}
