import { db } from '$lib/server/db/client';
import { modelManufacturers, type InsertModelManufacturerParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createModelManufacturer = async (modelManufacturer: InsertModelManufacturerParams) => {
	await db.insert(modelManufacturers).values(modelManufacturer);
};

const fetchModelManufacturerById = async (id: string) => {
	const modelManufacturer = await db.select().from(modelManufacturers).where(eq(modelManufacturers.id, id));

	return modelManufacturer[0];
};

const deleteModelManufacturerById = async (id: string) => {
	await db.delete(modelManufacturers).where(eq(modelManufacturers.id, id));
};

const fetchAllModelManufacturers = async () => {
	return await db.select().from(modelManufacturers).orderBy(asc(modelManufacturers.name));
};

const updateModelManufacturerById = async (modelManufacturer: InsertModelManufacturerParams & { id: string }) => {
	await db.update(modelManufacturers).set(modelManufacturer).where(eq(modelManufacturers.id, modelManufacturer.id));
};

export { updateModelManufacturerById, fetchAllModelManufacturers, deleteModelManufacturerById, fetchModelManufacturerById, createModelManufacturer };