import { sqlQuest } from '../../../config/database'
import { userQueries } from '../queries/index'

export class UserRepository {
  static createUser = async (
    email: string,
    password: string,
    phoneNumber: string,
  ) => {
    try {
      return await sqlQuest.one(userQueries.createUser, [
        email,
        password,
        phoneNumber,
      ])
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static getAllUsers = async () => {
    try {
      return await sqlQuest.manyOrNone(userQueries.getAllUsers)
    } catch (error) {
      throw error
    }
  }

  static getUserById = async (id: number) => {
    try {
      return await sqlQuest.oneOrNone(userQueries.getUserById, [id])
    } catch (error) {
      throw error
    }
  }

  static getUserByEmail = async(email:String) => {
    try {
      return await sqlQuest.oneOrNone(userQueries.getUserByEmail, [email])
    } catch (error) {
      throw error
    }
  }

  static deleteUserById = async (id: number) => {
    try {
      return await sqlQuest.none(userQueries.deleteUserById, [id])
    } catch (error) {
      throw error
    }
  }

  static updateUserById = async ({
    email,
    password,
    phoneNumber,
    id,
  }: {
    email: String
    password: String
    phoneNumber: String
    id: Number
  }) => {
    try {
      return await sqlQuest.oneOrNone(userQueries.updateUserById, [
        email,
        password,
        phoneNumber,
        id,
      ])
    } catch (error) {
      throw error
    }
  }
}
