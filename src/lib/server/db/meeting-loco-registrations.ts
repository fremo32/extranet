import { db } from '$lib/server/db/client';
import { meetingLocoRegistrations, type InsertMeetingLocoRegistrationParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createMeetingLocoRegistration = async (meetingLocoRegistration: InsertMeetingLocoRegistrationParams) => {
	await db.insert(meetingLocoRegistrations).values(meetingLocoRegistration);
};

const fetchMeetingLocoRegistrationById = async (id: string) => {
	const meetingLocoRegistration = await db.select().from(meetingLocoRegistrations).where(eq(meetingLocoRegistrations.id, id));

	return meetingLocoRegistration[0];
};

const deleteMeetingLocoRegistrationById = async (id: string) => {
	await db.delete(meetingLocoRegistrations).where(eq(meetingLocoRegistrations.id, id));
};

const fetchAllMeetingLocoRegistrations = async () => {
	return await db.select().from(meetingLocoRegistrations).orderBy(asc(meetingLocoRegistrations.locoSerial));
};

const updateMeetingLocoRegistrationById = async (meetingLocoRegistration: InsertMeetingLocoRegistrationParams & { id: string }) => {
	await db.update(meetingLocoRegistrations).set(meetingLocoRegistration).where(eq(meetingLocoRegistrations.id, meetingLocoRegistration.id));
};

const fetchMeetingLocoRegistrationsByMeetingId = async (meetingId: string) => {
	return await db.select().from(meetingLocoRegistrations).where(eq(meetingLocoRegistrations.meetingId, meetingId));
};

const fetchMeetingLocoRegistrationsByLocoId = async (locoId: string) => {
	return await db.select().from(meetingLocoRegistrations).where(eq(meetingLocoRegistrations.locoId, locoId));
};

export { 
	updateMeetingLocoRegistrationById, 
	fetchAllMeetingLocoRegistrations, 
	deleteMeetingLocoRegistrationById, 
	fetchMeetingLocoRegistrationById, 
	createMeetingLocoRegistration,
	fetchMeetingLocoRegistrationsByMeetingId,
	fetchMeetingLocoRegistrationsByLocoId
};