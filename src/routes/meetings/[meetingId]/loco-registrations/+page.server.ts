import { fetchMeetingById } from '$lib/server/db/meetings.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchMeetingLocoRegistrationsByMeetingId, deleteMeetingLocoRegistrationById } from '$lib/server/db/meeting-loco-registrations';
import { fetchMeetingLocoTurnaroundsByMeetingId } from '$lib/server/db/meeting-loco-turnaround';
import { type Actions } from '@sveltejs/kit';

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

export const actions:Actions = {
	deleteLocoRegistration: async ({ request }) => {
  const { id } = Object.fromEntries(
    await request.formData()
  ) as { id: string; };

  await deleteMeetingLocoRegistrationById(id);

  return {success:true};
}}