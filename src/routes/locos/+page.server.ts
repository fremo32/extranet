import { fetchAllLocoClasses } from '$lib/server/db/loco-classes';
import { fetchAllLocos, createLoco, updateLocoById } from '$lib/server/db/locos';
import { fetchAllModelManufacturers } from '$lib/server/db/model-manufacturers';
import { fetchAllRailwayCompanies } from '$lib/server/db/railway-companies';
import { fetchAllRailwayGauges } from '$lib/server/db/railway-gauges';
import { fetchAllUsers } from '$lib/server/db/users';
import type { PageServerLoad } from './$types';
import { type Actions } from '@sveltejs/kit';

export const load = (async () => {
	const locos = await fetchAllLocos();
	const railwayCompanies = await fetchAllRailwayCompanies();
	const locoClasses = await fetchAllLocoClasses();
	const railwayGauges = await fetchAllRailwayGauges();
	const modelManufacturers = await fetchAllModelManufacturers();
	const users = await fetchAllUsers();

	return {
		locos,
		railwayCompanies,
		locoClasses,
		railwayGauges,
		modelManufacturers,
		users
	};
}) satisfies PageServerLoad;

export const actions:Actions = {
	addLoco: async ({ request }) => {
		const { 
			railwayCompanyId,
			locoClassId,
			serial,
			epoch,
			railwayGaugeId,
			notes, 
			modelManufacturerId, 
			hasWeathering,
			hasFredi,
			hasCard,
			userId } = Object.fromEntries(
			await request.formData()
		) as {
			railwayCompanyId: string;
			locoClassId: string;
			serial: string;
			epoch: string;
			railwayGaugeId: string;
			notes: string;
			modelManufacturerId: string;
			hasWeathering: string;
			hasFredi: string;
			hasCard: string;
			userId: string;
		};

		await createLoco({
			railwayCompanyId,
			locoClassId,
			serial,
			epoch,
			railwayGaugeId,
			notes,
			modelManufacturerId,
			hasWeathering,
			hasFredi,
			hasCard,
			userId
		});

		return {success:true};
	},
	async updateLoco({ request }) {
		const { 
			id,
			railwayCompanyId,
			locoClassId,
			serial,
			epoch,
			railwayGaugeId,
			notes, 
			modelManufacturerId, 
			hasWeathering,
			hasFredi,
			hasCard,
			userId } = Object.fromEntries(
			await request.formData()
		) as {
			id: string;
			railwayCompanyId: string;
			locoClassId: string;
			serial: string;
			epoch: string;
			railwayGaugeId: string;
			notes: string;
			modelManufacturerId: string;
			hasWeathering: string;
			hasFredi: string;
			hasCard: string;
			userId: string;
		};

		await updateLocoById({
      id,
      railwayCompanyId,
			locoClassId,
			serial,
			epoch,
			railwayGaugeId,
			notes,
			modelManufacturerId,
			hasWeathering: (hasWeathering == undefined || hasWeathering == null) ? '0' : '1',
			hasFredi: (hasFredi == undefined || hasFredi == null) ? '0' : '1',
			hasCard: (hasCard == undefined || hasCard == null) ? '0' : '1',
			userId
    });

    return {success:true};
	}
};