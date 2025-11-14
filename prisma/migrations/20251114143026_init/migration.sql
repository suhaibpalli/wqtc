-- CreateTable
CREATE TABLE "tbl_surah" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "verses" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tbl_library_video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "surah_no" INTEGER NOT NULL,
    "surah_name" TEXT,
    "starting_ayah" INTEGER NOT NULL,
    "ending_ayah" INTEGER,
    "time_start_ayah" TEXT,
    "youTube_link" TEXT NOT NULL,
    "video_identifier" TEXT,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT 'WQTC_Team',
    "keywords" TEXT,
    CONSTRAINT "tbl_library_video_surah_no_fkey" FOREIGN KEY ("surah_no") REFERENCES "tbl_surah" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "active" TEXT NOT NULL DEFAULT 'YES',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "tbl_library_video_surah_no_idx" ON "tbl_library_video"("surah_no");

-- CreateIndex
CREATE INDEX "tbl_library_video_starting_ayah_idx" ON "tbl_library_video"("starting_ayah");

-- CreateIndex
CREATE INDEX "tbl_library_video_created_date_idx" ON "tbl_library_video"("created_date");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");
