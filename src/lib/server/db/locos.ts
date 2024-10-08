import { db } from '$lib/server/db/client';
import { locoClasses, locos, modelManufacturers, railwayCompanies, railwayGauges, users, type InsertLocoParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createLoco = async (loco: InsertLocoParams) => {
	return await db.insert(locos).values(loco).returning();
};

const fetchLocoById = async (id: string) => {
	const loco = await db.select().from(locos).where(eq(locos.id, id));

	return loco[0];
};

const deleteLocoById = async (id: string) => {
	await db.delete(locos).where(eq(locos.id, id));
};

const fetchAllLocos = async () => {
	return await db.select({
		id: locos.id,
		railwayCompanyId: locos.railwayCompanyId,
		railwayCompanyName: railwayCompanies.name,
		railwayCompanyBadgeColor: railwayCompanies.badgeColor,
		locoClassId: locos.locoClassId,
		locoClassName: locoClasses.name,
		locoClassGenre: locoClasses.genre,
		serial: locos.serial,
		epoch: locos.epoch,
  	railwayGaugeId: locos.railwayGaugeId,
		railwayGaugeName: railwayGauges.name,
		railwayGaugeBadgeColor: railwayGauges.badgeColor,
		notes: locos.notes,
		modelManufacturerId: locos.modelManufacturerId,
		modelManufacturerName: modelManufacturers.name,
		hasWeathering: locos.hasWeathering,
		hasFredi: locos.hasFredi,
		hasCard: locos.hasCard,
		userId: locos.userId,
		userFirstName: users.firstName,
		userLastName: users.lastName,
		dccAddress: locos.dccAddress,
		createdAt: locos.createdAt,
		updatedAt: locos.updatedAt
	})
		.from(locos)
		.leftJoin(railwayCompanies, eq(railwayCompanies.id, locos.railwayCompanyId))
		.leftJoin(locoClasses, eq(locoClasses.id, locos.locoClassId))
		.leftJoin(railwayGauges, eq(railwayGauges.id, locos.railwayGaugeId))
		.leftJoin(modelManufacturers, eq(modelManufacturers.id, locos.modelManufacturerId))
		.leftJoin(users, eq(users.id, locos.userId))
		.orderBy(asc(locos.serial));
};

const updateLocoById = async (loco: InsertLocoParams & { id: string }) => {
	await db.update(locos).set(loco).where(eq(locos.id, loco.id));
};

export { updateLocoById, fetchAllLocos, deleteLocoById, fetchLocoById, createLoco };