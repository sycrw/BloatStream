/*
  Warnings:

  - You are about to drop the column `content` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `redirectLink` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `content`,
    DROP COLUMN `redirectLink`,
    ADD COLUMN `relatedLikeId` INTEGER NULL,
    ADD COLUMN `relatedPostId` INTEGER NULL,
    ADD COLUMN `relatedUserId` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('Like', 'Dislike', 'Comment', 'Follow') NOT NULL,
    MODIFY `seen` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_relatedPostId_fkey` FOREIGN KEY (`relatedPostId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_relatedLikeId_fkey` FOREIGN KEY (`relatedLikeId`) REFERENCES `Like`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_relatedUserId_fkey` FOREIGN KEY (`relatedUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
