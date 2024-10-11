import { fetchMeetingById } from '$lib/server/db/meetings.js';
import { error } from '@sveltejs/kit';
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
		meeting, meetingLocoTurnarounds, meetingLocoRegistrations
	};
}) satisfies PageServerLoad;
