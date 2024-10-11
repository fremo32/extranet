import { fetchMeetingById } from '$lib/server/db/meetings.js';
import { error } from '@sveltejs/kit';
import { createMeetingLocoTurnaround, updateMeetingLocoTurnaroundById } from '$lib/server/db/meeting-loco-turnaround';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchMeetingLocoTurnaroundsByMeetingId } from '$lib/server/db/meeting-loco-turnaround';
import { fetchMeetingLocoRegistrationsByMeetingId } from '$lib/server/db/meeting-loco-registrations';

export const load = (async ({ params }) => {
	const { meetingId } = params;
	const meeting = await fetchMeetingById(meetingId)

	if (!meeting) {
		error(404, 'Meeting not found');
	}

	const meetingLocoTurnarounds = await fetchMeetingLocoTurnaroundsByMeetingId(meetingId);
	const meetingLocoRegistrations = await fetchMeetingLocoRegistrationsByMeetingId(meetingId);

	return {
		meeting, meetingLocoTurnarounds,meetingLocoRegistrations
	};
}) satisfies PageServerLoad;

export const actions:Actions = {
	addLocoTurnaround: async ({ params, request }) => {
    const { meetingId } = params;

    if (meetingId == undefined) {
      return {success:false}
    }

		const { name, locoClasses, startPosition, trainNumber } = Object.fromEntries(
      await request.formData()
    ) as {
			name: string;
			locoClasses: string | null;
      startPosition: string | null;
      trainNumber: string | null;
		};

		await createMeetingLocoTurnaround({
      meetingId,
      name,
      locoClasses, 
      startPosition,
      trainNumber
		});

		return {success:true};
	},
	async updateLocoTurnaround({ params, request }) {
    const { meetingId } = params;

    if (meetingId == undefined) {
      return {success:false}
    }

		const { id, name, locoClasses, startPosition, trainNumber } = Object.fromEntries(
			await request.formData()
		) as {
			id: string;
			name: string;
			locoClasses: string | null;
      startPosition: string | null;
      trainNumber: string | null;
		};

    await updateMeetingLocoTurnaroundById({
      id,
      meetingId,
      name,
      locoClasses, 
      startPosition,
      trainNumber
    });

    return {success:true};
	}
};