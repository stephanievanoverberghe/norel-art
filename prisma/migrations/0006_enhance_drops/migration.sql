ALTER TABLE "Drop"
ADD COLUMN "eyebrow" TEXT,
ADD COLUMN "heroImageAlt" TEXT,
ADD COLUMN "heroImagePublicId" TEXT,
ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "waitlistEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "accessLabel" TEXT,
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "seoDescription" TEXT;

CREATE INDEX "Drop_isFeatured_status_idx" ON "Drop"("isFeatured", "status");
