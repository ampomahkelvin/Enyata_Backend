/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "federatedCredentials" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "user" (id),
    "provider" TEXT NOT NULL,
    "subject" TEXT NOT NULL
)