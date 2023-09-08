-- AlterTable
ALTER TABLE `Notification` MODIFY `type` ENUM('Like', 'Dislike', 'Comment', 'Follow', 'Post') NOT NULL;
