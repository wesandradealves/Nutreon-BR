-- AlterTable
ALTER TABLE "public"."cart_items" 
ADD COLUMN "image" TEXT NOT NULL DEFAULT 'https://cdn.oceanserver.com.br/lojas/gymchef/uploads_produto/56-kibe-recheado-pure-de-cenoura-230g-683cbdf74d6a8.webp',
ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Produto',
ADD COLUMN "price" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- Remove defaults after adding columns
ALTER TABLE "public"."cart_items" 
ALTER COLUMN "image" DROP DEFAULT,
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "price" DROP DEFAULT;
