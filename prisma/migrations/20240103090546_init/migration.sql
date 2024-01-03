/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `Tasks` (
    `taskId` INTEGER NOT NULL AUTO_INCREMENT,
    `taskName` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `note` VARCHAR(191) NULL,
    `priority` BOOLEAN NOT NULL DEFAULT false,
    `editTime` DATETIME(3) NOT NULL,
    `executeDate` DATETIME(3) NULL,
    `listId` INTEGER NOT NULL,

    UNIQUE INDEX `Tasks_userId_key`(`userId`),
    UNIQUE INDEX `Tasks_listId_key`(`listId`),
    PRIMARY KEY (`taskId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lists` (
    `listId` INTEGER NOT NULL AUTO_INCREMENT,
    `listName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`listId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Steps` (
    `stepId` INTEGER NOT NULL AUTO_INCREMENT,
    `stepName` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `taskId` INTEGER NOT NULL,

    UNIQUE INDEX `Steps_taskId_key`(`taskId`),
    PRIMARY KEY (`stepId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `Lists`(`listId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Steps` ADD CONSTRAINT `Steps_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Tasks`(`taskId`) ON DELETE RESTRICT ON UPDATE CASCADE;
