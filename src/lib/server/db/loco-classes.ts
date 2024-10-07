import { db } from '$lib/server/db/client';
import { locoClasses, locoTypes, railwayCompanies, type InsertLocoClassParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createLocoClass = async (locoClass: InsertLocoClassParams) => {
	return await db.insert(locoClasses).values(locoClass).returning();
};

const fetchLocoClassById = async (id: string) => {
	const locoClass = await db.select().from(locoClasses).where(eq(locoClasses.id, id));

	return locoClass[0];
};

const deleteLocoClassById = async (id: string) => {
	await db.delete(locoClasses).where(eq(locoClasses.id, id));
};

const fetchAllLocoClasses = async () => {
	return await db.select({
		id: locoClasses.id,
		railwayCompanyId: locoClasses.railwayCompanyId,
		railwayCompanyName: railwayCompanies.name,
		railwayCompanyBadgeColor: railwayCompanies.badgeColor,
		name: locoClasses.name,
		genre: locoClasses.genre,
  	locoTypeId: locoClasses.locoTypeId,
		locoTypeName: locoTypes.name
	})
		.from(locoClasses)
		.leftJoin(locoTypes, eq(locoTypes.id, locoClasses.locoTypeId))
		.leftJoin(railwayCompanies, eq(railwayCompanies.id, locoClasses.railwayCompanyId))
		.orderBy(asc(locoClasses.name));
};

const updateLocoClassById = async (locoClass: InsertLocoClassParams & { id: string }) => {
	await db.update(locoClasses).set(locoClass).where(eq(locoClasses.id, locoClass.id));
};

export { updateLocoClassById, fetchAllLocoClasses, deleteLocoClassById, fetchLocoClassById, createLocoClass };