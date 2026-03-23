/*
  Warnings:

  - You are about to drop the column `is_catholic` on the `historical_entities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "historical_entities" DROP COLUMN "is_catholic";

-- CreateTable
CREATE TABLE "entities_religions" (
    "id" TEXT NOT NULL,
    "entity_id" VARCHAR(100) NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    "religion" VARCHAR(100) NOT NULL,

    CONSTRAINT "entities_religions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "entities_religions_entity_id_idx" ON "entities_religions"("entity_id");

-- AddForeignKey
ALTER TABLE "entities_religions" ADD CONSTRAINT "entities_religions_ibfk1" FOREIGN KEY ("entity_id") REFERENCES "historical_entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
