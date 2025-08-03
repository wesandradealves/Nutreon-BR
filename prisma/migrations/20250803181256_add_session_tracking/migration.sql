-- AlterTable
ALTER TABLE "public"."sessions" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "logged_out_at" TIMESTAMP(3);
