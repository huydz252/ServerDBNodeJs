/*
  Warnings:

  - Added the required column `className` to the `ExamResult` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExamResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentMachineName" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "className" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "ExamResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExamResult" ("id", "quizId", "score", "studentMachineName", "submittedAt") SELECT "id", "quizId", "score", "studentMachineName", "submittedAt" FROM "ExamResult";
DROP TABLE "ExamResult";
ALTER TABLE "new_ExamResult" RENAME TO "ExamResult";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
