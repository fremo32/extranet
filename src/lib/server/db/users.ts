import { db } from '$lib/server/db/client';
import { users, type InsertUserParams } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

const createUser = async (user: InsertUserParams) => {
	await db.insert(users).values(user);
};

const fetchUserById = async (id: string) => {
	const user = await db.select().from(users).where(eq(users.id, id));

	return user[0];
};

const deleteUserById = async (id: string) => {
	await db.delete(users).where(eq(users.id, id));
};

const fetchAllUsers = async () => {
	return await db.select().from(users).orderBy(asc(users.username));
};

const updateUserById = async (user: InsertUserParams & { id: string }) => {
	await db.update(users).set(user).where(eq(users.id, user.id));
};

export { updateUserById, fetchAllUsers, deleteUserById, fetchUserById, createUser };