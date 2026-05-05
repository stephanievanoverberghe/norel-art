CREATE TYPE "CollectionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

ALTER TABLE "Collection"
ADD COLUMN "eyebrow" TEXT,
ADD COLUMN "heroImageAlt" TEXT,
ADD COLUMN "heroImagePublicId" TEXT,
ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "publishedAt" TIMESTAMP(3),
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "seoDescription" TEXT,
ADD COLUMN "status" "CollectionStatus" NOT NULL DEFAULT 'DRAFT';

UPDATE "Collection"
SET
    "status" = 'PUBLISHED',
    "publishedAt" = COALESCE("publishedAt", "createdAt"),
    "position" = ranked.row_number - 1
FROM (
    SELECT
        "id",
        ROW_NUMBER() OVER (ORDER BY "createdAt" ASC, "name" ASC) AS row_number
    FROM "Collection"
) AS ranked
WHERE "Collection"."id" = ranked."id";

CREATE INDEX "Collection_status_position_idx" ON "Collection"("status", "position");
CREATE INDEX "Collection_isFeatured_status_idx" ON "Collection"("isFeatured", "status");
