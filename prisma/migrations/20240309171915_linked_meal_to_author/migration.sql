-- AlterTable
ALTER TABLE `Meal` ADD COLUMN `authorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
