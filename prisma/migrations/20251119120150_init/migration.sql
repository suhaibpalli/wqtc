-- CreateTable
CREATE TABLE "tbl_surah" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "verses" INTEGER NOT NULL,

    CONSTRAINT "tbl_surah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_library_video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "surah_no" INTEGER NOT NULL,
    "surah_name" TEXT,
    "starting_ayah" INTEGER NOT NULL,
    "ending_ayah" INTEGER,
    "time_start_ayah" TEXT,
    "youTube_link" TEXT NOT NULL,
    "video_identifier" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL DEFAULT 'WQTC_Team',
    "keywords" TEXT,

    CONSTRAINT "tbl_library_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "active" TEXT NOT NULL DEFAULT 'YES',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_ebook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "coverImage" TEXT,
    "description" TEXT,
    "pages" INTEGER,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT NOT NULL DEFAULT 'WQTCTeam',

    CONSTRAINT "tbl_ebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_class_registration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "language" TEXT NOT NULL,
    "classType" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "additionalNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_class_registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tbl_library_video_surah_no_idx" ON "tbl_library_video"("surah_no");

-- CreateIndex
CREATE INDEX "tbl_library_video_starting_ayah_idx" ON "tbl_library_video"("starting_ayah");

-- CreateIndex
CREATE INDEX "tbl_library_video_created_date_idx" ON "tbl_library_video"("created_date");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE INDEX "tbl_ebook_createddate_idx" ON "tbl_ebook"("createddate");

-- CreateIndex
CREATE INDEX "tbl_class_registration_email_idx" ON "tbl_class_registration"("email");

-- CreateIndex
CREATE INDEX "tbl_class_registration_status_idx" ON "tbl_class_registration"("status");

-- CreateIndex
CREATE INDEX "tbl_class_registration_createdAt_idx" ON "tbl_class_registration"("createdAt");

-- AddForeignKey
ALTER TABLE "tbl_library_video" ADD CONSTRAINT "tbl_library_video_surah_no_fkey" FOREIGN KEY ("surah_no") REFERENCES "tbl_surah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
