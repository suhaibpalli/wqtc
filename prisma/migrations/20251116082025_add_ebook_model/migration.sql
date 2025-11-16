-- CreateTable
CREATE TABLE "tbl_ebook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "coverImage" TEXT,
    "description" TEXT,
    "pages" INTEGER,
    "createddate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT NOT NULL DEFAULT 'WQTCTeam'
);

-- CreateIndex
CREATE INDEX "tbl_ebook_createddate_idx" ON "tbl_ebook"("createddate");
