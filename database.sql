CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(255),
"password" VARCHAR(255)
);

CREATE TABLE "event" (
"id" SERIAL PRIMARY KEY,
"date" DATE,
"name" VARCHAR(255),
"user_id" INT REFERENCES "user")
;