import { db } from '$lib/server/db/client';
import { locoTypes, type InsertLocoTypeParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createLocoType = async (locoType: InsertLocoTypeParams) => {
	await db.insert(locoTypes).values(locoType);
};

const fetchLocoTypeById = async (id: string) => {
	const locoType = await db.select().from(locoTypes).where(eq(locoTypes.id, id));

	return locoType[0];
};

const deleteLocoTypeById = async (id: string) => {
	await db.delete(locoTypes).where(eq(locoTypes.id, id));
};

const fetchAllLocoTypes = async () => {
	return await db.select().from(locoTypes).orderBy(asc(locoTypes.name));
};

const updateLocoTypeById = async (locoType: InsertLocoTypeParams & { id: string }) => {
	await db.update(locoTypes).set(locoType).where(eq(locoTypes.id, locoType.id));
};

export { updateLocoTypeById, fetchAllLocoTypes, deleteLocoTypeById, fetchLocoTypeById, createLocoType };