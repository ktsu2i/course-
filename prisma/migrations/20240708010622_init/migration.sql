-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `clerkUserId` VARCHAR(191) NOT NULL,
    `tuid` INTEGER NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `tuMail` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `isCoordinator` BOOLEAN NOT NULL DEFAULT false,
    `isFaculty` BOOLEAN NOT NULL DEFAULT false,
    `isStaff` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_clerkUserId_key`(`clerkUserId`),
    UNIQUE INDEX `User_tuid_key`(`tuid`),
    UNIQUE INDEX `User_tuMail_key`(`tuMail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `recordKey` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `courseNum` INTEGER NOT NULL,
    `section` INTEGER NOT NULL,
    `crn` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `classType` VARCHAR(191) NOT NULL,
    `roomNum` INTEGER NULL,
    `hasSecuredRoom` BOOLEAN NULL,
    `schedule` JSON NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `credits` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'new',
    `userId` VARCHAR(191) NOT NULL,
    `isNewInstructor` BOOLEAN NOT NULL,
    `specialInfo` TEXT NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Course_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
