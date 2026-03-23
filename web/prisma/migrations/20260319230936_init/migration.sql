-- CreateTable
CREATE TABLE "historical_entities" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    "is_catholic" BOOLEAN NOT NULL,
    "color" VARCHAR(100),
    "ai_generated" BOOLEAN NOT NULL,

    CONSTRAINT "historical_entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "territories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "country_code" VARCHAR(100) NOT NULL,
    "continent" VARCHAR(100) NOT NULL,

    CONSTRAINT "territories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entities_territories" (
    "entity_id" VARCHAR(100) NOT NULL,
    "territory_id" VARCHAR(100) NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    "percentage_controlled" DOUBLE PRECISION NOT NULL,
    "geojson_boundary" JSONB NOT NULL,

    CONSTRAINT "entities_territories_pkey" PRIMARY KEY ("entity_id","territory_id","start_year")
);

-- CreateIndex
CREATE INDEX "entity_id" ON "entities_territories"("entity_id");

-- AddForeignKey
ALTER TABLE "entities_territories" ADD CONSTRAINT "entities_territories_ibfk_1" FOREIGN KEY ("entity_id") REFERENCES "historical_entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities_territories" ADD CONSTRAINT "entities_territories_ibfk_2" FOREIGN KEY ("territory_id") REFERENCES "territories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
