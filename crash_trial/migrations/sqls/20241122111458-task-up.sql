/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "task" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "title" VARCHAR(255)  NOT NULL,
    "description" TEXT,
    "subtask" VARCHAR(300)[],
    "startDate" TIMESTAMPTZ  NOT NULL,
    "endDate" TIMESTAMPTZ  NOT NULL,
    "repeat" VARCHAR,
    "reminder" VARCHAR,
    "category" VARCHAR,
    "priorityLevel" VARCHAR,
    "color" VARCHAR,
    "userId" int  NOT NULL,
    FOREIGN KEY ("userId") references "user" ("id") ON DELETE CASCADE
);