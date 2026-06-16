-- CreateTable
CREATE TABLE `github_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `public_repos` INTEGER NOT NULL,
    `followers` INTEGER NOT NULL,
    `following` INTEGER NOT NULL,
    `total_stars` INTEGER NOT NULL,

    UNIQUE INDEX `github_profile_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
