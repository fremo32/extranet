import { db } from '$lib/server/db/client';
import { railwayCompanies, type InsertRailwayCompanyParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

export type RailwayCompany = {
	id: number;
	name: string;
	description: string;
	badgeColor: string;
};

const createRailwayCompany = async (railwayCompany: InsertRailwayCompanyParams) => {
	await db.insert(railwayCompanies).values(railwayCompany);
};

const fetchRailwayCompanyById = async (id: string) => {
	const railwayCompany = await db.select().from(railwayCompanies).where(eq(railwayCompanies.id, id));

	return railwayCompany[0];
};

const deleteRailwayCompanyById = async (id: string) => {
	await db.delete(railwayCompanies).where(eq(railwayCompanies.id, id));
};

const fetchAllRailwayCompanies = async () => {
	return await db.select().from(railwayCompanies).orderBy(asc(railwayCompanies.name));
};

const updateRailwayCompanyById = async (railwayCompany: InsertRailwayCompanyParams & { id: string }) => {
	await db.update(railwayCompanies).set(railwayCompany).where(eq(railwayCompanies.id, railwayCompany.id));
};

export { updateRailwayCompanyById, fetchAllRailwayCompanies, deleteRailwayCompanyById, fetchRailwayCompanyById, createRailwayCompany };