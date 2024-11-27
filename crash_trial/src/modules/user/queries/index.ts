const createUser = `
INSERT INTO "user" ("email", "password", "phoneNumber") VALUES($1, $2, $3) RETURNING *
`

const getAllUsers = `
SELECT * FROM "user"
`

const getUserById = `
SELECT * FROM "user" where "id" = $1
`

const deleteUserById = `
DELETE FROM "user" where "id" = $1
`

const updateUserById = `
UPDATE "user" SET "email" = $1, "password" = $2, "phoneNumber" = $3 WHERE "id" = $4 RETURNING *
`

const getUserByEmail = `
SELECT * FROM "user" WHERE "email" = $1
`

export const userQueries = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByEmail,
}
