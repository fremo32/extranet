import { fetchAllMeetings, createMeeting, updateMeetingById } from '$lib/server/db/meetings';
import type { PageServerLoad } from './$types';
import { type Actions } from '@sveltejs/kit';

export const load = (async () => {
	const meetings = await fetchAllMeetings();

	return {
		meetings
	};
}) satisfies PageServerLoad;

export const actions:Actions = {
	addMeeting: async ({ request }) => {
		const { title, startDate, endDate } = Object.fromEntries(
      await request.formData()
    ) as {
			title: string;
			startDate: string;
			endDate: string;
		};

		await createMeeting({
			title,
			startDate: new Date(startDate),
			endDate: new Date(endDate)
		});

		return {success:true};
	},
	async updateMeeting({ request }) {
		const { id, title, startDate, endDate } = Object.fromEntries(
			await request.formData()
		) as {
			id: string;
			title: string;
			startDate: string;
			endDate: string;
		};

    await updateMeetingById({
      id,
      title,
			startDate: new Date(startDate),
			endDate: new Date(endDate)
    });

    return {success:true};
	}
};