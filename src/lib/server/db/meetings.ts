import { db } from '$lib/server/db/client';
import { meetings, type InsertMeetingParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createMeeting = async (meeting: InsertMeetingParams) => {
	await db.insert(meetings).values(meeting);
};

const fetchMeetingById = async (id: string) => {
	const meeting = await db.select().from(meetings).where(eq(meetings.id, id));

	return meeting[0];
};

const deleteMeetingById = async (id: string) => {
	await db.delete(meetings).where(eq(meetings.id, id));
};

const fetchAllMeetings = async () => {
	return await db.select().from(meetings).orderBy(asc(meetings.startDate));
};

const updateMeetingById = async (meeting: InsertMeetingParams & { id: string }) => {
	await db.update(meetings).set(meeting).where(eq(meetings.id, meeting.id));
};

export { updateMeetingById, fetchAllMeetings, deleteMeetingById, fetchMeetingById, createMeeting };