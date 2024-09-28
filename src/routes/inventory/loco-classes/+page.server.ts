import { fetchLocoClasses, fetchLocoTypes,createLocoClass } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { error, type Actions } from '@sveltejs/kit';

export const load = (() => {
	const locoClasses = fetchLocoClasses();
  const locoTypes = fetchLocoTypes();

	return {
		locoClasses, locoTypes
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	addLocoClass: async ({ request }) => {
		const data = await request.formData();

    const name = data.get('name')?.toString();

		const locoTypeIdStr = data.get('locoTypeId')?.toString();
		const locoTypeId = locoTypeIdStr ? parseInt(locoTypeIdStr) : null;


		if (!(name && locoTypeId)) {
			throw error(400, 'Name or LocoType missing');
		}

		createLocoClass(name, locoTypeId);
	}
};