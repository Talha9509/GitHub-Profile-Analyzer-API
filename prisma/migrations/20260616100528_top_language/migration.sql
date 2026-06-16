-- AlterTable
ALTER TABLE `github_profile` ADD COLUMN `analyzed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `top_language` VARCHAR(191) NULL;
