import { fetchAllModelManufacturers, createModelManufacturer, updateModelManufacturerById } from '$lib/server/db/model-manufacturers';
import type { PageServerLoad } from './$types';
import { type Actions } from '@sveltejs/kit';

export const load = (async () => {
	const modelManufacturers = await fetchAllModelManufacturers();

	return {
		modelManufacturers
	};
}) satisfies PageServerLoad;

export const actions:Actions = {
	addModelManufacturer: async ({ request }) => {
		const { name } = Object.fromEntries(
      await request.formData()
    ) as {
			name: string;
		};

		await createModelManufacturer({
			name
		});

		return {success:true};
	},
	async updateModelManufacturer({ request }) {
		const { id, name } = Object.fromEntries(
			await request.formData()
		) as {
			id: string;
			name: string;
		};

    await updateModelManufacturerById({
      id,
      name
    });

    return {success:true};
	}
};