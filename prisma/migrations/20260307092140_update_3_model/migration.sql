/*
  Warnings:

  - Added the required column `taskId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `Documentation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Workspace_ownerId_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Documentation" ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "position" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "industryType" DROP NOT NULL,
ALTER COLUMN "onboardingCompleted" DROP NOT NULL,
ALTER COLUMN "roleType" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentation" ADD CONSTRAINT "Documentation_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
