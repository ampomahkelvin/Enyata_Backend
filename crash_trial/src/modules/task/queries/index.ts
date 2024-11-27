const createTask = `
INSERT INTO "task" ("title", "description", "userId", "subtask", "startDate", "endDate", "repeat", "reminder", "category", "priorityLevel", "color") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
`

const getAllTasks = `
SELECT * FROM "task"
`

const getTaskById = `
SELECT * FROM "task" WHERE "id" = $1
`

const deleteTaskById = `
DELETE FROM "task" WHERE "id" = $1
`

const getTasksByUser = `
SELECT * FROM "task" WHERE "userId" = $1;
`

const updateTask = `
UPDATE "task" SET "title" = $1, "description" = $2, "subtask" = $3, "startDate" = $4, "endDate" = $5, "repeat" = $6, "reminder" = $7, "category" = $8, "priorityLevel" = $9, "color" = $10 WHERE "id" = $11 RETURNING *
`

export const taskQueries = {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  getTasksByUser,
  updateTask,
}
