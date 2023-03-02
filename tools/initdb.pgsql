-- Delete Tables
DROP TABLE IF EXISTS pets, users, shelters, ;

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('INDIVIDUAL', 'SHELTER');

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "shelterId" INTEGER NOT NULL,
    "breed" TEXT,
    "photo" TEXT NOT NULL,
    "vaccinated" BOOLEAN DEFAULT false,
    "neutered" BOOLEAN DEFAULT false,
    "adopted" BOOLEAN DEFAULT false

);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'INDIVIDUAL',
    "location" TEXT
);

-- CreateTable
CREATE TABLE "shelters" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pet_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "shelters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
