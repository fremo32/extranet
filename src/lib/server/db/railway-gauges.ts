import { db } from '$lib/server/db/client';
import { railwayGauges } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const fetchRailwayGaugeById = async (id: string) => {
	const railwayGauge = await db.select().from(railwayGauges).where(eq(railwayGauges.id, id));

	return railwayGauge[0];
};

const fetchAllRailwayGauges = async () => {
	return await db.select().from(railwayGauges).orderBy(asc(railwayGauges.name));
};

export { fetchRailwayGaugeById,  fetchAllRailwayGauges };