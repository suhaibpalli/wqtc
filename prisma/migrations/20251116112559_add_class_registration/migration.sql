-- CreateTable
CREATE TABLE "tbl_class_registration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "tbl_class_registration_email_idx" ON "tbl_class_registration"("email");

-- CreateIndex
CREATE INDEX "tbl_class_registration_status_idx" ON "tbl_class_registration"("status");

-- CreateIndex
CREATE INDEX "tbl_class_registration_createdAt_idx" ON "tbl_class_registration"("createdAt");
