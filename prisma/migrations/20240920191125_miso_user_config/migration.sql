/*
  Warnings:

  - You are about to drop the column `dob_location` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `birth_city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_country` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_state` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `dob_location`,
    DROP COLUMN `username`,
    ADD COLUMN `birth_city` VARCHAR(191) NOT NULL,
    ADD COLUMN `birth_country` VARCHAR(191) NOT NULL,
    ADD COLUMN `birth_state` VARCHAR(191) NOT NULL,
    MODIFY `last_name` VARCHAR(191) NULL;
