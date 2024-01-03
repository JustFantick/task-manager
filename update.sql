-- DropForeignKey
ALTER TABLE `Tasks` DROP FOREIGN KEY `Tasks_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tasks` DROP FOREIGN KEY `Tasks_listId_fkey`;

-- DropForeignKey
ALTER TABLE `Steps` DROP FOREIGN KEY `Steps_taskId_fkey`;

-- DropTable
DROP TABLE `Users`;

-- DropTable
DROP TABLE `Tasks`;

-- DropTable
DROP TABLE `Lists`;

-- DropTable
DROP TABLE `Steps`;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

