import { fetchAllLocoClasses, createLocoClass, updateLocoClassById } from '$lib/server/db/loco-classes';
import { fetchAllLocoTypes } from '$lib/server/db/loco-types';
import { fetchAllRailwayCompanies } from '$lib/server/db/railway-companies';
import type { PageServerLoad } from './$types';
import { type Actions } from '@sveltejs/kit';

export const load = (async () => {
	const locoClasses = await fetchAllLocoClasses();
	const railwayCompanies = await fetchAllRailwayCompanies();
	const locoTypes = await fetchAllLocoTypes();

	return {
		locoClasses, locoTypes, railwayCompanies
	};
}) satisfies PageServerLoad;

export const actions:Actions = {
	addLocoClass: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { railwayCompanyId, name, genre, locoTypeId } = formData as {
			railwayCompanyId: string;
			name: string;
			genre: string;
			locoTypeId: string;
		};

		const locoClass = {
			railwayCompanyId,
			name,
			genre,
			locoTypeId
		};

		await createLocoClass(locoClass);

		return {success:true};
	},
	async updateLocoClass({ request }) {
		// const { locoClassId } = params;
		const { id, railwayCompanyId, name, genre, locoTypeId} = Object.fromEntries(
			await request.formData()
		) as {
			id: string;
			railwayCompanyId: string;
			name: string;
			genre: string;
			locoTypeId: string;
		};

		
			await updateLocoClassById({
				id,
				railwayCompanyId,
				name,
				genre,
				locoTypeId,
			});
	
			return {success:true};
	}
};