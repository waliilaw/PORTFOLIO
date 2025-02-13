-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;
