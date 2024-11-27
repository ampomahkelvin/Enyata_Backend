/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "phoneNumber" VARCHAR(20)
);