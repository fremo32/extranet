import { fetchAllUsers, createUser, updateUserById } from '$lib/server/db/users';
import type { PageServerLoad } from './$types';
import { type Actions } from '@sveltejs/kit';

export const load = (async () => {
	const users = await fetchAllUsers();

	return {
		users
	};
}) satisfies PageServerLoad;

export const actions:Actions = {
	addUser: async ({ request }) => {
		const { username, firstName, lastName, memberId } = Object.fromEntries(
      await request.formData()
    ) as {
			username: string;
			firstName: string;
			lastName: string;
			memberId: string;
		};

		await createUser({
			username,
			firstName,
			lastName,
			memberId
		});

		return {success:true};
	},
	async updateUser({ request }) {
		const { id, username, firstName, lastName, memberId } = Object.fromEntries(
			await request.formData()
		) as {
			id: string;
			username: string;
			firstName: string;
			lastName: string;
			memberId: string;
		};

    await updateUserById({
      id,
      username,
      firstName,
      lastName,
      memberId,
    });

    return {success:true};
	}
};