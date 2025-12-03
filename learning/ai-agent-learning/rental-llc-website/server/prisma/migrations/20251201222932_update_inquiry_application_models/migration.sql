/*
  Warnings:

  - You are about to drop the column `applicantName` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `employmentInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `moveInDate` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `rentalHistory` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Inquiry` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inquiryType` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "desiredMoveInDate" DATETIME,
    "leaseTerm" TEXT,
    "numberOfOccupants" INTEGER,
    "hasPets" BOOLEAN NOT NULL DEFAULT false,
    "petDetails" TEXT,
    "employmentStatus" TEXT,
    "employer" TEXT,
    "jobTitle" TEXT,
    "monthlyIncome" REAL,
    "currentAddress" TEXT,
    "landlordName" TEXT,
    "landlordPhone" TEXT,
    "reasonForLeaving" TEXT,
    "reference1Name" TEXT,
    "reference1Phone" TEXT,
    "reference1Relationship" TEXT,
    "reference2Name" TEXT,
    "reference2Phone" TEXT,
    "reference2Relationship" TEXT,
    "additionalInfo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Application_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("createdAt", "email", "id", "phone", "propertyId", "status", "updatedAt") SELECT "createdAt", "email", "id", "phone", "propertyId", "status", "updatedAt" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
CREATE TABLE "new_Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "inquiryType" TEXT NOT NULL,
    "preferredDate" DATETIME,
    "preferredTime" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inquiry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Inquiry" ("createdAt", "email", "id", "message", "name", "phone", "propertyId") SELECT "createdAt", "email", "id", "message", "name", "phone", "propertyId" FROM "Inquiry";
DROP TABLE "Inquiry";
ALTER TABLE "new_Inquiry" RENAME TO "Inquiry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
