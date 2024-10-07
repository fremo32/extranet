import { fetchAllRailwayCompanies, createRailwayCompany, updateRailwayCompanyById } from '$lib/server/db/railway-companies';
import type { PageServerLoad } from './$types';
import { type Actions } from '@sveltejs/kit';

export const load = (async () => {
	const railwayCompanies = await fetchAllRailwayCompanies();

	return {
		railwayCompanies
	};
}) satisfies PageServerLoad;

export const actions:Actions = {
	addRailwayCompany: async ({ request }) => {
		const { name, description, badgeColor } = Object.fromEntries(
      await request.formData()
    ) as {
			name: string;
			description: string;
			badgeColor: string;
		};

		await createRailwayCompany({
			name,
			description,
			badgeColor
		});

		return {success:true};
	},
	async updateRailwayCompany({ request }) {
		const { id, name, description, badgeColor } = Object.fromEntries(
			await request.formData()
		) as {
			id: string;
			name: string;
			description: string;
			badgeColor: string;
		};

    await updateRailwayCompanyById({
      id,
      name,
      description,
      badgeColor
    });

    return {success:true};
	}
};