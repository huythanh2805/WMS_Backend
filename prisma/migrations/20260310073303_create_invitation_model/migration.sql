/*
  Warnings:

  - You are about to drop the column `updatedBy` on the `Documentation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Documentation` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.
  - Made the column `position` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('POST', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED');

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "type",
ADD COLUMN     "type" "ActivityType" NOT NULL;

-- AlterTable
ALTER TABLE "Documentation" DROP COLUMN "updatedBy",
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "invitedById" TEXT,
    "accessLevel" "AccessLevel" NOT NULL DEFAULT 'MEMBER',
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- CreateIndex
CREATE INDEX "Invitation_email_idx" ON "Invitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Documentation_taskId_key" ON "Documentation"("taskId");

-- AddForeignKey
ALTER TABLE "Documentation" ADD CONSTRAINT "Documentation_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
