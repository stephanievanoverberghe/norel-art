UPDATE "Category"
SET "imageUrl" = '/images/categories/portrait.jpg',
    "imageAlt" = 'Portrait artistique Norel Art'
WHERE "slug" = 'portrait' AND "imageUrl" IS NULL;

UPDATE "Category"
SET "imageUrl" = '/images/categories/pop-art.jpg',
    "imageAlt" = 'Categorie Pop Art Norel Art'
WHERE "slug" = 'pop-art' AND "imageUrl" IS NULL;

UPDATE "Category"
SET "imageUrl" = '/images/categories/manga.jpg',
    "imageAlt" = 'Categorie Manga Norel Art'
WHERE "slug" = 'manga' AND "imageUrl" IS NULL;

UPDATE "Category"
SET "imageUrl" = '/images/categories/graphisme.jpg',
    "imageAlt" = 'Categorie Graphisme Norel Art'
WHERE "slug" = 'graphisme' AND "imageUrl" IS NULL;

UPDATE "Category"
SET "imageUrl" = '/images/categories/street-art.jpg',
    "imageAlt" = 'Categorie Street Art Norel Art'
WHERE "slug" = 'street-art' AND "imageUrl" IS NULL;
