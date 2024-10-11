import { db } from '$lib/server/db/client';
import { meetingLocoTurnarounds, type InsertMeetingLocoTurnaroundParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createMeetingLocoTurnaround = async (meetingLocoTurnaround: InsertMeetingLocoTurnaroundParams) => {
	await db.insert(meetingLocoTurnarounds).values(meetingLocoTurnaround);
};

const fetchMeetingLocoTurnaroundById = async (id: string) => {
	const meetingLocoTurnaround = await db.select().from(meetingLocoTurnarounds).where(eq(meetingLocoTurnarounds.id, id));

	return meetingLocoTurnaround[0];
};

const deleteMeetingLocoTurnaroundById = async (id: string) => {
	await db.delete(meetingLocoTurnarounds).where(eq(meetingLocoTurnarounds.id, id));
};

const fetchAllMeetingLocoTurnarounds = async () => {
	return await db.select().from(meetingLocoTurnarounds).orderBy(asc(meetingLocoTurnarounds.name));
};

const updateMeetingLocoTurnaroundById = async (meetingLocoTurnaround: InsertMeetingLocoTurnaroundParams & { id: string }) => {
	await db.update(meetingLocoTurnarounds).set(meetingLocoTurnaround).where(eq(meetingLocoTurnarounds.id, meetingLocoTurnaround.id));
};

const fetchMeetingLocoTurnaroundsByMeetingId = async (meetingId: string) => {
	return await db.select().from(meetingLocoTurnarounds).where(eq(meetingLocoTurnarounds.meetingId, meetingId));
};

export { 
	updateMeetingLocoTurnaroundById, 
	fetchAllMeetingLocoTurnarounds, 
	deleteMeetingLocoTurnaroundById, 
	fetchMeetingLocoTurnaroundById, 
	createMeetingLocoTurnaround,
	fetchMeetingLocoTurnaroundsByMeetingId
};